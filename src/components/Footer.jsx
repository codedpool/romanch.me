"use client";

import { Phone, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { label: 'Home', onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { label: 'Projects', onClick: () => scrollToSection('projects') },
    { label: 'About', onClick: () => scrollToSection('about') },
    { label: 'Contact', onClick: () => scrollToSection('contact') },
  ];

  const socials = [
    { icon: Phone, href: 'tel:+919155808901', label: 'Call' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/romanch11/', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/codedpool', label: 'GitHub' },
  ];

  return (
    <footer className="bg-black text-white">
      {/* Top row: avatar / nav / socials */}
      <div className="px-6 pb-14 pt-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
          {/* Left: avatar + name */}
          <div className="order-1 flex items-center gap-3">
            <div className="h-8 w-8 overflow-hidden rounded-full border border-white/20">
              <img src="/portfolio.png" alt="avatar" className="h-full w-full object-cover" />
            </div>
            <span className="text-lg" style={{ fontFamily: 'var(--font-kaushan), cursive' }}>
              Romanch Roshan Singh
            </span>
          </div>

          {/* Center: nav */}
          <nav className="order-3 w-full md:order-2 md:w-auto">
            <ul className="flex flex-wrap justify-center gap-8 font-mono text-xs uppercase tracking-[0.15em]">
              {navItems.map((item) => (
                <li key={item.label}>
                  <button onClick={item.onClick} className="text-gray-400 transition-colors hover:text-white">
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right: social icons */}
          <div className="order-2 flex items-center gap-3 md:order-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-gray-300 transition-colors hover:border-amber-300/50 hover:text-amber-300"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/5" />

      {/* Bottom bar */}
      <div className="px-6 py-5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 text-center md:flex-row md:text-left">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-gray-600">
            © 2026 Romanch Roshan Singh
          </div>
          <div className="text-sm italic text-gray-500">small town kid with big ambitions</div>
        </div>
      </div>
    </footer>
  );
}
