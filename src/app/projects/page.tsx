import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Duffy Construction",
  description: "Browse Duffy Construction's portfolio of custom homes, luxury renovations, and historic restorations across San Francisco.",
};

const projects = [
  {
    title: "Pacific Heights Residence",
    type: "Custom Build",
    location: "Pacific Heights",
    year: "2024",
    sqft: "4,200 sq ft",
    description:
      "A sweeping new-build on one of Pacific Heights' most coveted streets. Designed in collaboration with a local architect, featuring a roof deck with bay views, open-plan entertaining floors, and a full lower-level guest suite.",
    gradient: "from-stone-400 to-stone-600",
  },
  {
    title: "Noe Valley Kitchen & Primary Suite",
    type: "Luxury Renovation",
    location: "Noe Valley",
    year: "2024",
    sqft: "1,800 sq ft",
    description:
      "A complete reimagination of a 1940s Craftsman's ground floor — blending the home's original character with a fully modern kitchen, breakfast room, and adjacent primary suite with spa bath.",
    gradient: "from-terra-200 to-terra-500",
  },
  {
    title: "Haight-Ashbury Victorian Restoration",
    type: "Historic Restoration",
    location: "Haight-Ashbury",
    year: "2023",
    sqft: "3,100 sq ft",
    description:
      "Meticulous restoration of an 1892 Painted Lady, preserving original millwork and plaster detailing while integrating updated systems, seismic retrofitting, and a seamlessly modernized kitchen.",
    gradient: "from-cream-300 to-stone-400",
  },
  {
    title: "Russian Hill Penthouse",
    type: "Full-Floor Remodel",
    location: "Russian Hill",
    year: "2023",
    sqft: "2,600 sq ft",
    description:
      "Top-floor transformation of a classic Russian Hill condominium, opening up the entire floor plan, adding a chef's kitchen, wet bar, and custom library with floor-to-ceiling built-ins.",
    gradient: "from-stone-600 to-stone-800",
  },
  {
    title: "Twin Peaks Custom Home",
    type: "Custom Build",
    location: "Twin Peaks",
    year: "2022",
    sqft: "3,800 sq ft",
    description:
      "A bold hillside home engineered for San Francisco's challenging terrain, offering panoramic views from three levels of glass-fronted living space, a cantilevered deck, and a two-car garage.",
    gradient: "from-terra-300 to-terra-700",
  },
  {
    title: "Mission Dolores ADU + Renovation",
    type: "ADU & Renovation",
    location: "Mission Dolores",
    year: "2022",
    sqft: "900 sq ft ADU",
    description:
      "Addition of a detached accessory dwelling unit to a Mission Dolores lot, alongside a full renovation of the primary home's second floor — all completed within 14 months.",
    gradient: "from-cream-200 to-cream-400",
  },
];

export default function ProjectsPage() {
  return (
    <>
      {/* Page header */}
      <section className="pt-40 pb-20 bg-stone-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="section-label text-terra-500">Portfolio</p>
          <h1 className="text-5xl md:text-7xl text-white font-serif leading-tight max-w-xl">
            Our Work
          </h1>
          <p className="text-stone-400 mt-6 max-w-xl leading-relaxed">
            Each project is a collaboration — between our team, our clients, and the city we call home. Browse a selection of our completed builds and renovations.
          </p>
        </div>
      </section>

      {/* Project grid */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <article key={i} className="group flex flex-col">
                {/* Image placeholder */}
                <div className={`relative aspect-[4/3] bg-gradient-to-br ${project.gradient} mb-6 overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/40 text-xs tracking-widest uppercase font-sans">Project Photo</span>
                  </div>
                  <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/20 transition-colors duration-300" />
                  {/* Type badge */}
                  <div className="absolute top-4 left-4 bg-cream-100 px-3 py-1">
                    <span className="text-[9px] tracking-[0.25em] uppercase text-terra-600 font-sans">{project.type}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs text-stone-400 font-sans">{project.location}</span>
                  <span className="text-stone-300">·</span>
                  <span className="text-xs text-stone-400 font-sans">{project.year}</span>
                  <span className="text-stone-300">·</span>
                  <span className="text-xs text-stone-400 font-sans">{project.sqft}</span>
                </div>

                <h2 className="font-serif text-xl text-stone-900 mb-3 group-hover:text-terra-600 transition-colors">
                  {project.title}
                </h2>
                <p className="text-sm text-stone-500 leading-relaxed">{project.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream-200 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-2">Have a project in mind?</h2>
            <p className="text-stone-500">Let&apos;s talk about what you&apos;re looking to build.</p>
          </div>
          <a href="/contact" className="btn-primary shrink-0">Get in Touch</a>
        </div>
      </section>
    </>
  );
}
