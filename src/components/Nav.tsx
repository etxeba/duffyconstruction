"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream-100/95 backdrop-blur-sm border-b border-cream-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-11 h-11 shrink-0">
            <Image
              src="/images/duffybadge.png"
              alt="Duffy Construction LLC"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-serif text-xl text-stone-900 tracking-wide">Duffy Construction</span>
            <span className="text-[10px] tracking-[0.3em] text-terra-600 uppercase font-sans">San Francisco</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs tracking-[0.2em] uppercase font-sans transition-colors duration-150 ${
                pathname === link.href
                  ? "text-terra-600"
                  : "text-stone-500 hover:text-stone-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary text-xs py-2 px-5">
            Get a Quote
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px bg-stone-800 transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-px bg-stone-800 transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-stone-800 transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-cream-100 border-t border-cream-300 px-6 pb-6 pt-4 flex flex-col gap-5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`text-xs tracking-[0.2em] uppercase font-sans ${
                pathname === link.href ? "text-terra-600" : "text-stone-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary text-center text-xs py-3">
            Get a Quote
          </Link>
        </div>
      )}
    </header>
  );
}
