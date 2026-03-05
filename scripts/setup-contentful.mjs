#!/usr/bin/env node
import pkg from 'contentful-management';
const { createClient } = pkg;
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const MGMT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

if (!SPACE_ID || !MGMT_TOKEN) {
  console.error('Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN env vars');
  process.exit(1);
}
const IMAGES_DIR = path.join(__dirname, '../public/images');

const client = createClient({ accessToken: MGMT_TOKEN });

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function upsertContentType(env, id, def) {
  let ct;
  try {
    ct = await env.getContentType(id);
    ct.name = def.name;
    ct.displayField = def.displayField;
    ct.fields = def.fields;
    ct = await ct.update();
  } catch {
    ct = await env.createContentTypeWithId(id, def);
  }
  try { ct = await ct.publish(); } catch {}
  console.log(`  ✓ ${id}`);
  return ct;
}

async function uploadAsset(env, file, title) {
  const filePath = path.join(IMAGES_DIR, file);
  const fileBuffer = fs.readFileSync(filePath);

  const uploadRes = await fetch(`https://upload.contentful.com/spaces/${SPACE_ID}/uploads`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${MGMT_TOKEN}`,
      'Content-Type': 'application/octet-stream',
    },
    body: fileBuffer,
  });
  if (!uploadRes.ok) throw new Error(`Upload failed for ${title}: ${await uploadRes.text()}`);
  const upload = await uploadRes.json();

  const asset = await env.createAsset({
    fields: {
      title: { 'en-US': title },
      file: {
        'en-US': {
          contentType: 'image/jpeg',
          fileName: file,
          uploadFrom: { sys: { type: 'Link', linkType: 'Upload', id: upload.sys.id } },
        },
      },
    },
  });

  await asset.processForLocale('en-US');

  let processed = asset;
  for (let i = 0; i < 30; i++) {
    await sleep(2000);
    processed = await env.getAsset(asset.sys.id);
    if (processed.fields.file?.['en-US']?.url) break;
  }

  const published = await processed.publish();
  console.log(`  ✓ ${title}`);
  return published;
}

function link(id) {
  return { 'en-US': { sys: { type: 'Link', linkType: 'Asset', id } } };
}

function sym(val) { return { 'en-US': val }; }
function txt(val) { return { 'en-US': val }; }
function bool(val) { return { 'en-US': val }; }
function num(val) { return { 'en-US': val }; }

async function createAndPublish(env, contentType, fields) {
  const entry = await env.createEntry(contentType, { fields });
  await entry.publish();
  return entry;
}

async function main() {
  console.log('🔧 Setting up Contentful...\n');

  const space = await client.getSpace(SPACE_ID);
  const env = await space.getEnvironment('master');

  // ── 1. Content Types ────────────────────────────────────────────────────────
  console.log('Creating content types...');

  await upsertContentType(env, 'project', {
    name: 'Project',
    displayField: 'title',
    fields: [
      { id: 'title',       name: 'Title',                type: 'Symbol',  required: true },
      { id: 'projectType', name: 'Type',                 type: 'Symbol',  required: true },
      { id: 'location',    name: 'Location',             type: 'Symbol' },
      { id: 'year',        name: 'Year',                 type: 'Symbol' },
      { id: 'sqft',        name: 'Square Footage',       type: 'Symbol' },
      { id: 'description', name: 'Description',          type: 'Text' },
      { id: 'image',       name: 'Image',                type: 'Link',    linkType: 'Asset', required: true },
      { id: 'featured',    name: 'Featured on Homepage', type: 'Boolean' },
      { id: 'order',       name: 'Display Order',        type: 'Integer' },
    ],
  });

  await upsertContentType(env, 'testimonial', {
    name: 'Testimonial',
    displayField: 'clientName',
    fields: [
      { id: 'quote',          name: 'Quote',         type: 'Text',    required: true },
      { id: 'clientName',     name: 'Client Name',   type: 'Symbol',  required: true },
      { id: 'clientLocation', name: 'Location',      type: 'Symbol' },
      { id: 'order',          name: 'Display Order', type: 'Integer' },
    ],
  });

  await upsertContentType(env, 'service', {
    name: 'Service',
    displayField: 'title',
    fields: [
      { id: 'title',       name: 'Title',         type: 'Symbol',  required: true },
      { id: 'description', name: 'Description',   type: 'Text' },
      { id: 'icon',        name: 'Icon',          type: 'Symbol' },
      { id: 'order',       name: 'Display Order', type: 'Integer' },
    ],
  });

  await upsertContentType(env, 'homepageSettings', {
    name: 'Homepage Settings',
    displayField: 'heroTitle',
    fields: [
      { id: 'heroTitle',    name: 'Hero Title',    type: 'Symbol' },
      { id: 'heroSubtitle', name: 'Hero Subtitle', type: 'Text' },
      { id: 'heroImage',    name: 'Hero Image',    type: 'Link', linkType: 'Asset' },
      { id: 'aboutTitle',   name: 'About Title',   type: 'Symbol' },
      { id: 'aboutBody',    name: 'About Body',    type: 'Text' },
      { id: 'aboutImage',   name: 'About Image',   type: 'Link', linkType: 'Asset' },
      { id: 'stat1Value',   name: 'Stat 1 Value',  type: 'Symbol' },
      { id: 'stat1Label',   name: 'Stat 1 Label',  type: 'Symbol' },
      { id: 'stat2Value',   name: 'Stat 2 Value',  type: 'Symbol' },
      { id: 'stat2Label',   name: 'Stat 2 Label',  type: 'Symbol' },
      { id: 'stat3Value',   name: 'Stat 3 Value',  type: 'Symbol' },
      { id: 'stat3Label',   name: 'Stat 3 Label',  type: 'Symbol' },
      { id: 'stat4Value',   name: 'Stat 4 Value',  type: 'Symbol' },
      { id: 'stat4Label',   name: 'Stat 4 Label',  type: 'Symbol' },
    ],
  });

  // ── 2. Upload Images ────────────────────────────────────────────────────────
  console.log('\nUploading images...');

  const imageList = [
    { key: 'cabinetry',    file: '642087133_17879741871496592_7238232007788388898_n.jpg', title: 'Custom Built-In Cabinetry' },
    { key: 'grayBath',     file: '642541260_17879739297496592_455130578999384048_n.jpg',  title: 'Gray Subway Tile Bathroom' },
    { key: 'zelligeShower',file: '587602941_17867908071496592_6963609221874814487_n.jpg', title: 'Blue Zellige Shower with Skylight' },
    { key: 'greenVanity',  file: '583510980_17866601583496592_952832549729722277_n.jpg',  title: 'Dark Green Vanity Bathroom' },
    { key: 'barnDoor',     file: '573645951_17865753090496592_6301026469543731515_n.jpg', title: 'Antique Barn Door' },
    { key: 'darkKitchen',  file: '572148719_17865014400496592_2523341007754314006_n.jpg', title: 'Dark Luxury Kitchen' },
    { key: 'navyBath',     file: '568171484_17863987626496592_5384976402719089360_n.jpg', title: 'Navy Bathroom with Antique Vanity' },
    { key: 'whiteBath',    file: '562457234_17862825900496592_8760888062752089865_n.jpg', title: 'Modern White and Gold Bathroom' },
    { key: 'lightKitchen', file: '562004184_17862825777496592_5147611480708400393_n.jpg', title: 'Light Wood Kitchen Island' },
    { key: 'darkGreenBath',file: '561619316_17862825624496592_2555780607546507481_n.jpg', title: 'Dark Green Zellige Bathroom' },
    { key: 'wallpaperHall',file: '642419457_17879741880496592_4616791475486331085_n.jpg', title: 'Victorian Wallpaper Hallway' },
  ];

  const assets = {};
  for (const img of imageList) {
    const asset = await uploadAsset(env, img.file, img.title);
    assets[img.key] = asset.sys.id;
  }

  // ── 3. Create Entries ───────────────────────────────────────────────────────
  console.log('\nCreating entries...');

  // Homepage Settings
  await createAndPublish(env, 'homepageSettings', {
    heroTitle:    sym('Crafting Homes Worth Living In'),
    heroSubtitle: txt('Duffy Construction builds exceptional custom homes and luxury renovations across San Francisco — with the craftsmanship and integrity your project deserves.'),
    heroImage:    link(assets.darkKitchen),
    aboutTitle:   sym('Built on Craft, Driven by Integrity'),
    aboutBody:    txt('For over 25 years, Duffy Construction has been building some of San Francisco\'s finest homes. Founded by Patrick Duffy, our team combines old-world craftsmanship with modern construction methods and rigorous project management.\n\nWe work with a select number of clients each year to ensure every project receives the time and attention it deserves. From hillside custom builds in Twin Peaks to Victorian restorations in the Haight, we know this city and we build to last.'),
    aboutImage:   link(assets.barnDoor),
    stat1Value:   sym('25+'),  stat1Label: sym('Years in Business'),
    stat2Value:   sym('180+'), stat2Label: sym('Homes Completed'),
    stat3Value:   sym('100%'), stat3Label: sym('Client Satisfaction'),
    stat4Value:   sym('SF Bay'), stat4Label: sym('Area Focused'),
  });
  console.log('  ✓ Homepage Settings');

  // Projects
  const projects = [
    { title: 'Pacific Heights Residence',          projectType: 'Custom Build',         location: 'Pacific Heights', year: '2024', sqft: '4,200 sq ft',   imageKey: 'lightKitchen',  featured: true,  order: 1, description: "A sweeping new-build on one of Pacific Heights' most coveted streets. Designed in collaboration with a local architect, featuring a roof deck with bay views, open-plan entertaining floors, and a full lower-level guest suite." },
    { title: 'Noe Valley Kitchen & Primary Suite', projectType: 'Luxury Renovation',    location: 'Noe Valley',      year: '2024', sqft: '1,800 sq ft',   imageKey: 'darkKitchen',   featured: true,  order: 2, description: "A complete reimagination of a 1940s Craftsman's ground floor — blending the home's original character with a fully modern kitchen, breakfast room, and adjacent primary suite with spa bath." },
    { title: 'Haight-Ashbury Victorian Restoration',projectType: 'Historic Restoration', location: 'Haight-Ashbury', year: '2023', sqft: '3,100 sq ft',   imageKey: 'wallpaperHall', featured: true,  order: 3, description: "Meticulous restoration of an 1892 Painted Lady, preserving original millwork and plaster detailing while integrating updated systems, seismic retrofitting, and a seamlessly modernized kitchen." },
    { title: 'Russian Hill Penthouse',             projectType: 'Full-Floor Remodel',   location: 'Russian Hill',    year: '2023', sqft: '2,600 sq ft',   imageKey: 'whiteBath',     featured: false, order: 4, description: "Top-floor transformation of a classic Russian Hill condominium, opening up the entire floor plan, adding a chef's kitchen, wet bar, and custom library with floor-to-ceiling built-ins." },
    { title: 'Twin Peaks Custom Home',             projectType: 'Custom Build',         location: 'Twin Peaks',      year: '2022', sqft: '3,800 sq ft',   imageKey: 'darkGreenBath', featured: false, order: 5, description: "A bold hillside home engineered for San Francisco's challenging terrain, offering panoramic views from three levels of glass-fronted living space, a cantilevered deck, and a two-car garage." },
    { title: 'Mission Dolores ADU + Renovation',   projectType: 'ADU & Renovation',     location: 'Mission Dolores', year: '2022', sqft: '900 sq ft ADU', imageKey: 'greenVanity',   featured: false, order: 6, description: "Addition of a detached accessory dwelling unit to a Mission Dolores lot, alongside a full renovation of the primary home's second floor — all completed within 14 months." },
  ];

  for (const p of projects) {
    await createAndPublish(env, 'project', {
      title:       sym(p.title),
      projectType: sym(p.projectType),
      location:    sym(p.location),
      year:        sym(p.year),
      sqft:        sym(p.sqft),
      description: txt(p.description),
      image:       link(assets[p.imageKey]),
      featured:    bool(p.featured),
      order:       num(p.order),
    });
    console.log(`  ✓ Project: ${p.title}`);
  }

  // Testimonials
  const testimonials = [
    { quote: "Duffy Construction transformed our Pacific Heights property into something extraordinary. Every detail was handled with care.", clientName: "Catherine M.",      clientLocation: "Pacific Heights", order: 1 },
    { quote: "They stayed on schedule, on budget, and exceeded our expectations. We've recommended them to everyone we know.",              clientName: "James & Priya R.", clientLocation: "Noe Valley",      order: 2 },
    { quote: "The craftsmanship on our kitchen remodel is simply stunning. Worth every penny — it's a joy to live in.",                    clientName: "Thomas A.",        clientLocation: "Russian Hill",    order: 3 },
  ];

  for (const t of testimonials) {
    await createAndPublish(env, 'testimonial', {
      quote:          txt(t.quote),
      clientName:     sym(t.clientName),
      clientLocation: sym(t.clientLocation),
      order:          num(t.order),
    });
    console.log(`  ✓ Testimonial: ${t.clientName}`);
  }

  // Services
  const services = [
    { title: 'Custom Home Builds',    icon: '⌂', order: 1, description: "From foundation to finishing touches, we manage every detail of your new custom residence with expert craftsmanship." },
    { title: 'Luxury Renovations',    icon: '◈', order: 2, description: "We transform existing homes into refined living spaces — kitchens, bathrooms, full-floor remodels, and beyond." },
    { title: 'Design-Build',          icon: '◎', order: 3, description: "One team, one vision. We partner with leading architects and designers to deliver a seamless build experience." },
    { title: 'Historic Restorations', icon: '❧', order: 4, description: "San Francisco's Victorian and Edwardian homes deserve careful, respectful restoration. We specialize in legacy properties." },
  ];

  for (const s of services) {
    await createAndPublish(env, 'service', {
      title:       sym(s.title),
      description: txt(s.description),
      icon:        sym(s.icon),
      order:       num(s.order),
    });
    console.log(`  ✓ Service: ${s.title}`);
  }

  console.log('\n✅ Contentful setup complete!');
}

main().catch(err => {
  console.error('\n❌ Error:', err.message || err);
  process.exit(1);
});
