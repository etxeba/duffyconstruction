import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About | Duffy Construction",
  description: "Learn the story of Duffy Construction — a San Francisco residential builder built on craft, integrity, and 25+ years of experience.",
};

const team = [
  {
    name: "Patrick Duffy",
    title: "Founder & General Contractor",
    bio: "Patrick founded Duffy Construction in 1999 after a decade of framing and finish carpentry across the Bay Area. A licensed general contractor with deep roots in San Francisco neighborhoods, he oversees every project personally.",
    initials: "PD",
  },
  {
    name: "Maria Santos",
    title: "Project Manager",
    bio: "Maria brings 15 years of construction management experience to every project she oversees. Known for meticulous scheduling and client communication, she ensures nothing falls through the cracks.",
    initials: "MS",
  },
  {
    name: "David Chen",
    title: "Lead Superintendent",
    bio: "David has been on Duffy job sites for over a decade. His on-the-ground leadership and trade expertise keep every build running safely, on schedule, and to our exacting quality standards.",
    initials: "DC",
  },
  {
    name: "Elena Vasquez",
    title: "Design Coordinator",
    bio: "Elena works at the intersection of design and construction, coordinating with architects and designers to ensure that every specification translates beautifully from drawing to built reality.",
    initials: "EV",
  },
];

const values = [
  {
    title: "Craftsmanship First",
    description:
      "We don't cut corners. Every nail, joint, and finish reflects the pride we take in building homes that endure.",
  },
  {
    title: "Transparent Communication",
    description:
      "You'll always know where your project stands — budget, schedule, and decisions. No surprises.",
  },
  {
    title: "Selective by Choice",
    description:
      "We take on fewer projects so we can give each one the full attention it deserves. Your home is our priority.",
  },
  {
    title: "Community Rooted",
    description:
      "San Francisco is our home too. We hire local trades, support local suppliers, and build for the long term.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-40 pb-20 bg-stone-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="section-label text-terra-500">Our Story</p>
          <h1 className="text-5xl md:text-7xl text-white font-serif leading-tight max-w-2xl">
            Building San Francisco Since 1999
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Image */}
            <div className="sticky top-28">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/images/587602941_17867908071496592_6963609221874814487_n.jpg"
                  alt="Blue zellige tile shower with skylight and gold hardware"
                  fill
                  className="object-cover"
                />
                <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-terra-600 -z-10" />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6 text-stone-600 leading-relaxed">
              <p className="text-2xl font-serif text-stone-900 leading-snug">
                What started as one contractor&apos;s commitment to quality has grown into San Francisco&apos;s most trusted residential builder.
              </p>
              <p>
                Patrick Duffy grew up watching the tradespeople in his family turn raw materials into homes that families would live in for generations. That respect for craft never left him. In 1999, after years of working on high-end jobs across the Bay Area, he founded Duffy Construction with a single principle: build it right, or don&apos;t build it at all.
              </p>
              <p>
                Today, our team of 18 full-time professionals manages every phase of the residential construction process — from pre-construction planning through final punch list — for a carefully selected roster of clients each year. We work on custom builds, full renovations, and historic restorations across every San Francisco neighborhood.
              </p>
              <p>
                We are proud to have never missed a scheduled project start, and our repeat and referral rate speaks to the relationships we build alongside the homes. Many of our clients come back for second and third projects, and many more come through the recommendations of neighbors and friends.
              </p>
              <p>
                San Francisco is a city of extraordinary homes. We consider it a privilege — and a responsibility — to add to that legacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream-200 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="section-label">What We Stand For</p>
            <h2 className="text-4xl md:text-5xl text-stone-900">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {values.map((value, i) => (
              <div key={i} className="bg-cream-100 p-10 border-l-4 border-terra-600">
                <h3 className="font-serif text-xl text-stone-900 mb-3">{value.title}</h3>
                <p className="text-stone-500 leading-relaxed text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="section-label">The People Behind the Work</p>
            <h2 className="text-4xl md:text-5xl text-stone-900">Our Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                {/* Avatar placeholder */}
                <div className="w-24 h-24 rounded-full bg-terra-600 flex items-center justify-center mx-auto mb-5">
                  <span className="font-serif text-white text-xl">{member.initials}</span>
                </div>
                <h3 className="font-serif text-lg text-stone-900 mb-1">{member.name}</h3>
                <p className="text-[10px] tracking-[0.2em] uppercase text-terra-600 font-sans mb-3">{member.title}</p>
                <p className="text-xs text-stone-500 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="bg-stone-900 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap justify-center gap-12 text-center">
            {[
              { label: "CA License", value: "#12345678" },
              { label: "CSLB Verified", value: "Class B General" },
              { label: "Insurance", value: "Fully Bonded & Insured" },
              { label: "Member", value: "NAHB · NARI · AIA Partner" },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-xs text-stone-500 tracking-widest uppercase mb-1 font-sans">{item.label}</div>
                <div className="text-white font-serif">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
