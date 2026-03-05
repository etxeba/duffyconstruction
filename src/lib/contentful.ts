import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

function assetUrl(asset: any): string {
  return `https:${asset.fields.file.url}`;
}

function assetAlt(asset: any): string {
  return asset.fields.title ?? '';
}

// ── Projects ────────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  title: string;
  projectType: string;
  location: string;
  year: string;
  sqft: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  featured: boolean;
  order: number;
}

export async function getProjects(): Promise<Project[]> {
  const res = await client.getEntries({
    content_type: 'project',
    order: ['fields.order'],
    include: 1,
  });
  return res.items.map((item: any) => ({
    id: item.sys.id,
    title: item.fields.title,
    projectType: item.fields.projectType,
    location: item.fields.location,
    year: item.fields.year,
    sqft: item.fields.sqft,
    description: item.fields.description,
    imageUrl: assetUrl(item.fields.image),
    imageAlt: assetAlt(item.fields.image),
    featured: item.fields.featured ?? false,
    order: item.fields.order ?? 0,
  }));
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const res = await client.getEntries({
    content_type: 'project',
    'fields.featured': true,
    order: ['fields.order'],
    include: 1,
  });
  return res.items.map((item: any) => ({
    id: item.sys.id,
    title: item.fields.title,
    projectType: item.fields.projectType,
    location: item.fields.location,
    year: item.fields.year,
    sqft: item.fields.sqft,
    description: item.fields.description,
    imageUrl: assetUrl(item.fields.image),
    imageAlt: assetAlt(item.fields.image),
    featured: true,
    order: item.fields.order ?? 0,
  }));
}

// ── Testimonials ─────────────────────────────────────────────────────────────

export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  clientLocation: string;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const res = await client.getEntries({
    content_type: 'testimonial',
    order: ['fields.order'],
  });
  return res.items.map((item: any) => ({
    id: item.sys.id,
    quote: item.fields.quote,
    clientName: item.fields.clientName,
    clientLocation: item.fields.clientLocation,
  }));
}

// ── Services ─────────────────────────────────────────────────────────────────

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export async function getServices(): Promise<Service[]> {
  const res = await client.getEntries({
    content_type: 'service',
    order: ['fields.order'],
  });
  return res.items.map((item: any) => ({
    id: item.sys.id,
    title: item.fields.title,
    description: item.fields.description,
    icon: item.fields.icon,
  }));
}

// ── Homepage Settings ─────────────────────────────────────────────────────────

export interface HomepageSettings {
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl: string;
  heroImageAlt: string;
  aboutTitle: string;
  aboutBody: string;
  aboutImageUrl: string;
  aboutImageAlt: string;
  stats: { value: string; label: string }[];
}

export async function getHomepageSettings(): Promise<HomepageSettings> {
  const res = await client.getEntries({
    content_type: 'homepageSettings',
    limit: 1,
    include: 1,
  });
  const f: any = res.items[0].fields;
  return {
    heroTitle:    f.heroTitle,
    heroSubtitle: f.heroSubtitle,
    heroImageUrl: assetUrl(f.heroImage),
    heroImageAlt: assetAlt(f.heroImage),
    aboutTitle:   f.aboutTitle,
    aboutBody:    f.aboutBody,
    aboutImageUrl: assetUrl(f.aboutImage),
    aboutImageAlt: assetAlt(f.aboutImage),
    stats: [
      { value: f.stat1Value, label: f.stat1Label },
      { value: f.stat2Value, label: f.stat2Label },
      { value: f.stat3Value, label: f.stat3Label },
      { value: f.stat4Value, label: f.stat4Label },
    ],
  };
}
