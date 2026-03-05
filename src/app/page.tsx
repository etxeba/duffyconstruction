import Link from "next/link";
import Image from "next/image";
import { getHomepageSettings, getFeaturedProjects, getTestimonials, getServices } from "@/lib/contentful";

export const revalidate = 60;

export default async function Home() {
  const [settings, projects, testimonials, services] = await Promise.all([
    getHomepageSettings(),
    getFeaturedProjects(),
    getTestimonials(),
    getServices(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <Image
          src={settings.heroImageUrl}
          alt={settings.heroImageAlt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-stone-900/60" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="max-w-2xl">
            <p className="section-label text-terra-300 mb-6">San Francisco&apos;s Premier Builder</p>
            <h1 className="text-5xl md:text-7xl text-white leading-tight mb-6">
              {settings.heroTitle}
            </h1>
            <p className="text-stone-300 text-lg leading-relaxed mb-10 max-w-lg">
              {settings.heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/projects" className="btn-primary">View Our Work</Link>
              <Link href="/contact" className="btn-outline border-stone-300 text-stone-300 hover:bg-stone-300 hover:text-stone-900">
                Start a Project
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-400">
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <span className="w-px h-10 bg-stone-500 animate-pulse" />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-terra-600 py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {settings.stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-serif text-4xl text-white mb-1">{stat.value}</div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-terra-200 font-sans">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={settings.aboutImageUrl}
                alt={settings.aboutImageAlt}
                fill
                className="object-cover"
              />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-terra-600 -z-10" />
            </div>
            <div>
              <p className="section-label">About Duffy Construction</p>
              <h2 className="text-4xl md:text-5xl text-stone-900 leading-tight mb-6">
                {settings.aboutTitle}
              </h2>
              {settings.aboutBody.split('\n\n').map((para, i) => (
                <p key={i} className="text-stone-600 leading-relaxed mb-4">{para}</p>
              ))}
              <Link href="/about" className="btn-outline mt-4 inline-block">Our Story</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-cream-200 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="section-label">What We Do</p>
            <h2 className="text-4xl md:text-5xl text-stone-900">Our Services</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-cream-100 p-8 group hover:bg-terra-600 transition-colors duration-300">
                <div className="text-3xl mb-5 text-terra-500 group-hover:text-terra-200">{service.icon}</div>
                <h3 className="font-serif text-xl text-stone-900 group-hover:text-white mb-3">{service.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed group-hover:text-terra-100">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <p className="section-label">Selected Work</p>
              <h2 className="text-4xl md:text-5xl text-stone-900">Recent Projects</h2>
            </div>
            <Link href="/projects" className="btn-outline shrink-0">View All Projects</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="group cursor-pointer">
                <div className="relative aspect-[4/3] mb-4 overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/20 transition-colors duration-300" />
                </div>
                <p className="section-label mb-1">{project.projectType} · {project.year}</p>
                <h3 className="font-serif text-xl text-stone-900 group-hover:text-terra-600 transition-colors">{project.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-stone-900 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="section-label text-terra-500">Client Stories</p>
            <h2 className="text-4xl md:text-5xl text-white">What Our Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.id} className="border border-stone-700 p-8">
                <p className="text-terra-500 text-4xl font-serif leading-none mb-4">&ldquo;</p>
                <p className="text-stone-300 leading-relaxed mb-6 text-sm">{t.quote}</p>
                <div>
                  <div className="text-white font-serif">{t.clientName}</div>
                  <div className="text-stone-500 text-xs tracking-widest uppercase font-sans mt-1">{t.clientLocation}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-terra-600 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl md:text-5xl text-white mb-4">Ready to Build Your Dream Home?</h2>
          <p className="text-terra-100 mb-8 max-w-xl mx-auto">
            We take on a limited number of projects each year. Get in touch early to discuss your vision.
          </p>
          <Link href="/contact" className="inline-block bg-white text-terra-700 px-10 py-4 text-sm tracking-widest uppercase font-sans hover:bg-cream-100 transition-colors">
            Start the Conversation
          </Link>
        </div>
      </section>
    </>
  );
}
