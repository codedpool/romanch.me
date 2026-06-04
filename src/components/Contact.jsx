"use client";

import { ArrowUpRight } from 'lucide-react';

const CONTACTS = [
  { label: 'Email', value: 'romanchroshansingh@gmail.com', href: 'mailto:romanchroshansingh@gmail.com' },
  { label: 'Phone', value: '+91 91558 08901', href: 'tel:+919155808901' },
  { label: 'LinkedIn', value: 'linkedin.com/in/romanch11', href: 'https://www.linkedin.com/in/romanch11/' },
  { label: 'GitHub', value: 'github.com/codedpool', href: 'https://github.com/codedpool' },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-black px-6 py-24 text-white">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left */}
          <div>
            <p className="mb-5 inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.25em] text-gray-500">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
              Contact
            </p>
            <h2 className="mb-6 text-4xl font-light leading-tight md:text-6xl">
              Let&apos;s talk.
            </h2>
            <p className="mb-8 max-w-md text-lg leading-relaxed text-gray-400">
              Feel free to reach out — I&apos;m here to help and will respond within 24 hours. Your questions matter to me!
            </p>
            <p className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-gray-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-amber-300" />
              Open to roles &amp; freelance
            </p>
          </div>

          {/* Right - contact list */}
          <div className="border-t border-white/10">
            {CONTACTS.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group flex items-center justify-between gap-4 border-b border-white/10 py-5 transition-colors hover:bg-white/[0.02]"
              >
                <div className="min-w-0">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-gray-500">{c.label}</span>
                  <div className="truncate text-base text-gray-200 transition-colors group-hover:text-white sm:text-lg">
                    {c.value}
                  </div>
                </div>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-gray-600 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-amber-300" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
