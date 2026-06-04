"use client";

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

const STATS = [
  { value: '9.01', label: 'CGPA' },
  { value: '5', label: 'Hackathons won' },
  { value: '100+', label: 'Members led' },
  { value: '7+', label: 'Top-10 finishes' },
];

const TOOLBOX = [
  { k: 'Languages', v: 'Java · JavaScript · Python · C++' },
  { k: 'Frameworks', v: 'React · Next.js · Node.js · FastAPI · Express' },
  { k: 'Data & Infra', v: 'PostgreSQL · MongoDB · Redis · Docker · AWS' },
];

export default function About() {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="bg-black px-6 py-24 text-white">
      <div className="container mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Portrait */}
          <div className="relative order-2 lg:order-1">
            <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div
                className="h-3/4 w-3/4 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.06), transparent 65%)', filter: 'blur(34px)' }}
              />
            </div>
            <div className="relative z-10 flex justify-center">
              <Image src="/portfolio2.png" alt="Romanch Roshan Singh" width={500} height={500} className="object-contain" />
            </div>
          </div>

          {/* Text */}
          <div className="order-1 space-y-8 lg:order-2">
            <div>
              <p className="mb-5 inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.25em] text-gray-500">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                About
              </p>
              <h2 className="mb-6 text-4xl font-light leading-tight md:text-5xl">
                Developer who loves to<br />build stuff.
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-gray-400">
                <p>
                  Hey! I&apos;m Romanch, a developer who loves turning ideas into impactful products. I enjoy building
                  applications that don&apos;t just work, but actually solve real problems.
                </p>
                <p>
                  I&apos;m always up for amazing projects—whether it&apos;s designing clean, user-friendly interfaces,
                  scaling backend systems, or experimenting with new technologies. I pick things up fast, adapt quickly,
                  and bring energy and precision to every line of code I write.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="bg-black p-5">
                  <div className="text-2xl font-light text-white">{s.value}</div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection('contact')}
                className="rounded-md bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-gray-200"
              >
                Get in touch
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="group inline-flex items-center gap-2 rounded-md border border-white/15 px-6 py-3 text-sm text-gray-200 transition-colors hover:border-white/40 hover:text-white"
              >
                View projects
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Toolbox spec strip */}
        <div className="mt-16 grid gap-8 border-t border-white/10 pt-10 md:grid-cols-[180px_1fr]">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gray-500">Toolbox</p>
          <dl className="border-t border-white/10">
            {TOOLBOX.map((s) => (
              <div key={s.k} className="grid gap-2 border-b border-white/10 py-4 sm:grid-cols-[160px_1fr] sm:gap-6">
                <dt className="font-mono text-xs uppercase tracking-wider text-gray-500">{s.k}</dt>
                <dd className="font-mono text-sm text-gray-300">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
