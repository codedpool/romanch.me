'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { label: 'Projects', id: 'projects' },
    { label: 'About', id: 'about' },
    { label: 'Experience', id: 'experience' },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between border-b border-white/5 px-6 py-5">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 overflow-hidden rounded-full border border-white/20">
            <Image src="/portfolio.png" alt="Romanch Roshan Singh" width={32} height={32} className="h-full w-full object-cover" />
          </div>
          <span className="text-lg italic md:text-2xl" style={{ fontFamily: 'Kaushan Script, cursive' }}>
            Romanch Roshan Singh
          </span>
        </div>

        <div className="hidden items-center gap-8 font-mono text-xs uppercase tracking-[0.15em] md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-gray-400 transition-colors hover:text-white"
            >
              {item.label}
            </button>
          ))}
          <Link
            href="https://dev.to/codedpool"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 transition-colors hover:text-white"
          >
            Blog
          </Link>
          <button
            onClick={() => scrollToSection('contact')}
            className="rounded-md border border-white/15 px-4 py-2 text-gray-200 transition-colors hover:border-white/40 hover:text-white"
          >
            Contact
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left */}
          <div>
            <p className="mb-6 inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.25em] text-gray-500">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
              Full-Stack · Backend · AI
            </p>
            <p className="mb-4 text-2xl italic text-gray-200 md:text-3xl" style={{ fontFamily: 'Kaushan Script, cursive' }}>
              Romanch Roshan Singh
            </p>
            <h1 className="mb-6 text-6xl font-light leading-[1.0] tracking-tight md:text-7xl">
              I build systems<br />that actually ship.
            </h1>
            <p className="mb-8 max-w-lg text-lg leading-relaxed text-gray-400 md:text-xl">
              Full-Stack Developer focused on backend systems, real-time infrastructure, and AI integration.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection('contact')}
                className="rounded-md bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-gray-200"
              >
                Get in touch
              </button>
              <a
                href={process.env.NEXT_PUBLIC_RESUME_URL || '/resume.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex cursor-pointer items-center gap-2 rounded-md border border-white/15 px-6 py-3 text-sm text-gray-200 transition-colors hover:border-white/40 hover:text-white"
              >
                View Resume
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Right - Portrait */}
          <div className="relative">
            <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div
                className="h-4/5 w-4/5 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.12), transparent 65%)', filter: 'blur(34px)' }}
              />
            </div>
            <div className="relative z-10 flex justify-center">
              <Image
                src="/portfolio.png"
                alt="Romanch Roshan Singh - Full Stack Developer"
                width={600}
                height={800}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="mt-10 hidden justify-center md:flex">
          <button
            onClick={() => scrollToSection('about')}
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-gray-600 transition-colors hover:text-gray-300"
          >
            Scroll
            <span className="inline-block animate-bounce">↓</span>
          </button>
        </div>
      </div>
    </section>
  );
}
