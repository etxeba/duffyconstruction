import type { Metadata } from "next";
import Image from "next/image";
import { getProjects } from "@/lib/contentful";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Projects | Duffy Construction",
  description: "Browse Duffy Construction's portfolio of custom homes, luxury renovations, and historic restorations across San Francisco.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      {/* Page header */}
      <section className="pt-40 pb-20 bg-stone-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="section-label text-terra-500">Portfolio</p>
          <h1 className="text-5xl md:text-7xl text-white font-serif leading-tight max-w-xl">Our Work</h1>
          <p className="text-stone-400 mt-6 max-w-xl leading-relaxed">
            Each project is a collaboration — between our team, our clients, and the city we call home. Browse a selection of our completed builds and renovations.
          </p>
        </div>
      </section>

      {/* Project grid */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <article key={project.id} className="group flex flex-col">
                <div className="relative aspect-[4/3] mb-6 overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/20 transition-colors duration-300" />
                  <div className="absolute top-4 left-4 bg-cream-100 px-3 py-1">
                    <span className="text-[9px] tracking-[0.25em] uppercase text-terra-600 font-sans">{project.projectType}</span>
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
