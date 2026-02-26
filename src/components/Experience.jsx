"use client";

import { ExternalLink } from "lucide-react";
import experiences from "@/data/experiences.json";

export default function Experience() {
  return (
    <section id="experience" className="bg-black text-white py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="mb-14">
          <p className="text-sm font-light text-gray-400 mb-4 uppercase tracking-wider">
            EXPERIENCE
          </p>
          <h2 className="text-4xl md:text-5xl font-light leading-tight">
            Where I&apos;ve worked<br />
            and contributed
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-800" />

          <div className="space-y-12">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative pl-8">
                {/* Dot */}
                <div
                  className={`absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full border-2 -translate-x-[5px] ${
                    exp.current
                      ? "border-white bg-white"
                      : "border-gray-500 bg-black"
                  }`}
                />

                {/* Card */}
                <div className="border border-gray-800 rounded-lg p-6 hover:border-gray-600 transition-colors duration-300">
                  {/* Top row */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-xl font-medium text-white">
                          {exp.role}
                        </h3>
                        {exp.current && (
                          <span className="text-xs font-medium bg-white text-black px-2 py-0.5 rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-gray-300 font-light">
                          {exp.company}
                        </span>
                        {exp.type && (
                          <>
                            <span className="text-gray-600">·</span>
                            <span className="text-gray-500 text-sm">
                              {exp.type}
                            </span>
                          </>
                        )}
                        {exp.location && (
                          <>
                            <span className="text-gray-600">·</span>
                            <span className="text-gray-500 text-sm">
                              {exp.location}
                            </span>
                          </>
                        )}
                        {exp.liveUrl && (
                          <a
                            href={exp.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-sm"
                          >
                            <ExternalLink size={13} />
                            <span>Live Link</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Date */}
                    <span className="text-sm text-gray-500 whitespace-nowrap shrink-0">
                      {exp.startDate} – {exp.endDate}
                    </span>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-2">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} className="flex gap-3 text-gray-400 text-sm leading-relaxed">
                        <span className="text-gray-600 mt-1.5 shrink-0">•</span>
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
