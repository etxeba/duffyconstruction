import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="font-serif text-white text-xl mb-1">Duffy Construction</div>
            <div className="text-[10px] tracking-[0.3em] text-terra-400 uppercase font-sans mb-4">San Francisco</div>
            <p className="text-sm leading-relaxed">
              Crafting exceptional homes across San Francisco with precision, integrity, and enduring craftsmanship.
            </p>
          </div>

          {/* Nav */}
          <div>
            <div className="section-label text-terra-500 mb-4">Navigation</div>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/", label: "Home" },
                { href: "/projects", label: "Projects" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors duration-150">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="section-label text-terra-500 mb-4">Contact</div>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="tel:+14155550100" className="hover:text-white transition-colors">
                  (415) 555-0100
                </a>
              </li>
              <li>
                <a href="mailto:hello@duffyconstruction.com" className="hover:text-white transition-colors">
                  hello@duffyconstruction.com
                </a>
              </li>
              <li className="pt-1 text-stone-500 leading-relaxed">
                123 Market Street, Suite 400<br />
                San Francisco, CA 94105
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-600">
          <span>© {new Date().getFullYear()} Duffy Construction. All rights reserved.</span>
          <span>CA License #12345678</span>
        </div>
      </div>
    </footer>
  );
}
