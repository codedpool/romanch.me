"use client";

import { ExternalLink } from "lucide-react";
import experiences from "@/data/experiences.json";

export default function Experience() {
  return (
    <section id="experience" className="bg-black px-6 py-24 text-white">
      <div className="container mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="mb-14">
          <p className="mb-5 inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.25em] text-gray-500">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
            Experience
          </p>
          <h2 className="text-4xl font-light leading-tight md:text-5xl">
            Where I&apos;ve worked<br />
            and contributed
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute bottom-0 left-0 top-0 w-px bg-white/10" />

          <div className="space-y-10">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative pl-8">
                {/* Dot */}
                <div
                  className={`absolute left-0 top-2 h-2.5 w-2.5 -translate-x-[5px] rounded-full border-2 ${
                    exp.current ? "border-amber-300 bg-amber-300" : "border-white/30 bg-black"
                  }`}
                />

                {/* Card */}
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 transition-colors duration-300 hover:border-white/25">
                  {/* Top row */}
                  <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-normal text-white">{exp.role}</h3>
                        {exp.current && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-amber-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                            Current
                          </span>
                        )}
                      </div>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2">
                        <span className="font-light text-gray-300">{exp.company}</span>
                        {exp.type && (
                          <>
                            <span className="text-gray-700">·</span>
                            <span className="text-sm text-gray-500">{exp.type}</span>
                          </>
                        )}
                        {exp.location && (
                          <>
                            <span className="text-gray-700">·</span>
                            <span className="text-sm text-gray-500">{exp.location}</span>
                          </>
                        )}
                        {exp.liveUrl && (
                          <a
                            href={exp.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-amber-300"
                          >
                            <ExternalLink size={13} />
                            <span>Live Link</span>
                          </a>
                        )}
                      </div>
                      {exp.links && exp.links.length > 0 && (
                        <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5">
                          {exp.links.map((link) => (
                            <a
                              key={link.url}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 font-mono text-xs text-gray-400 transition-colors hover:text-amber-300"
                            >
                              <ExternalLink size={12} />
                              <span>{link.label}</span>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Date */}
                    <span className="shrink-0 whitespace-nowrap font-mono text-xs uppercase tracking-wider text-gray-500">
                      {exp.startDate} – {exp.endDate}
                    </span>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-2">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed text-gray-400">
                        <span className="mt-1.5 shrink-0 text-amber-300/50">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
