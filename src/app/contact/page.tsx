"use client";

import { useState } from "react";
import type { FormEvent } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // In production: send to your backend / form service here
    setSubmitted(true);
  }

  return (
    <>
      {/* Header */}
      <section className="pt-40 pb-20 bg-stone-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="section-label text-terra-500">Let&apos;s Talk</p>
          <h1 className="text-5xl md:text-7xl text-white font-serif leading-tight max-w-xl">
            Start Your Project
          </h1>
          <p className="text-stone-400 mt-6 max-w-lg leading-relaxed">
            We take on a limited number of projects each year. Reach out early — we&apos;d love to hear about what you&apos;re planning.
          </p>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Contact details */}
            <div className="space-y-10">
              <div>
                <p className="section-label">Phone</p>
                <a href="tel:+14155550100" className="font-serif text-2xl text-stone-900 hover:text-terra-600 transition-colors">
                  (415) 555-0100
                </a>
                <p className="text-stone-500 text-sm mt-1">Mon – Fri, 8am – 5pm PT</p>
              </div>

              <div>
                <p className="section-label">Email</p>
                <a href="mailto:hello@duffyconstruction.com" className="font-serif text-xl text-stone-900 hover:text-terra-600 transition-colors break-all">
                  hello@duffyconstruction.com
                </a>
              </div>

              <div>
                <p className="section-label">Office</p>
                <address className="not-italic text-stone-600 leading-relaxed text-sm">
                  123 Market Street, Suite 400<br />
                  San Francisco, CA 94105
                </address>
              </div>

              <div>
                <p className="section-label">License</p>
                <p className="text-stone-600 text-sm">CA CSLB #12345678</p>
                <p className="text-stone-600 text-sm">Fully bonded &amp; insured</p>
              </div>

              <div className="bg-cream-200 p-6 border-l-4 border-terra-600">
                <p className="text-sm text-stone-600 leading-relaxed">
                  <strong className="text-stone-800 font-sans">Response time:</strong> We typically respond to all inquiries within one business day.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="bg-cream-200 border border-terra-200 p-12 text-center">
                  <div className="text-terra-600 text-5xl mb-4">✓</div>
                  <h2 className="font-serif text-2xl text-stone-900 mb-3">Thank you, {form.name.split(" ")[0]}!</h2>
                  <p className="text-stone-600 leading-relaxed max-w-sm mx-auto">
                    We&apos;ve received your message and will be in touch within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="section-label block mb-2" htmlFor="name">Full Name *</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-terra-500 transition-colors"
                        placeholder="Jane Smith"
                      />
                    </div>
                    <div>
                      <label className="section-label block mb-2" htmlFor="email">Email Address *</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-terra-500 transition-colors"
                        placeholder="jane@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="section-label block mb-2" htmlFor="phone">Phone Number</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-terra-500 transition-colors"
                        placeholder="(415) 555-0000"
                      />
                    </div>
                    <div>
                      <label className="section-label block mb-2" htmlFor="projectType">Project Type *</label>
                      <select
                        id="projectType"
                        name="projectType"
                        required
                        value={form.projectType}
                        onChange={handleChange}
                        className="w-full border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-terra-500 transition-colors"
                      >
                        <option value="" disabled>Select a type…</option>
                        <option>Custom Home Build</option>
                        <option>Luxury Renovation</option>
                        <option>Historic Restoration</option>
                        <option>ADU / Addition</option>
                        <option>Design-Build</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="section-label block mb-2" htmlFor="budget">Approximate Budget</label>
                      <select
                        id="budget"
                        name="budget"
                        value={form.budget}
                        onChange={handleChange}
                        className="w-full border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-terra-500 transition-colors"
                      >
                        <option value="">Prefer not to say</option>
                        <option>Under $500K</option>
                        <option>$500K – $1M</option>
                        <option>$1M – $2.5M</option>
                        <option>$2.5M – $5M</option>
                        <option>$5M+</option>
                      </select>
                    </div>
                    <div>
                      <label className="section-label block mb-2" htmlFor="timeline">Desired Start</label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={form.timeline}
                        onChange={handleChange}
                        className="w-full border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-terra-500 transition-colors"
                      >
                        <option value="">Not sure yet</option>
                        <option>Within 3 months</option>
                        <option>3 – 6 months</option>
                        <option>6 – 12 months</option>
                        <option>12+ months</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="section-label block mb-2" htmlFor="message">Tell Us About Your Project *</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      className="w-full border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-terra-500 transition-colors resize-none"
                      placeholder="Describe your project, goals, neighborhood, and anything else that would help us understand what you're looking to build…"
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full text-center py-4">
                    Send Inquiry
                  </button>

                  <p className="text-xs text-stone-400 text-center">
                    We respect your privacy and will never share your information.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
