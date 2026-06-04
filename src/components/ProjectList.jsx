"use client";

import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import projects from '@/data/projects.json';

function Thumb({ id, image, alt }) {
  const initial = image ? `/${image}` : `/${id}.png`;
  const [src, setSrc] = useState(initial);

  const handleError = () => {
    if (src.endsWith('.png')) setSrc(image ? `/${id}.png` : `/${id}.svg`);
    else if (src.endsWith('.svg')) setSrc('/portfolio.png');
    else setSrc('/portfolio.png');
  };

  return <img src={src} alt={alt} onError={handleError} className="h-full w-full object-contain p-2" />;
}

export default function ProjectList() {
  if (projects.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-gray-400">No projects found.</p>
      </div>
    );
  }

  return (
    <div className="border-t border-white/10">
      {projects.map((project, idx) => {
        const num = String(idx + 1).padStart(2, '0');
        const marker = project.status || (project.featured ? 'Featured' : null);

        return (
          <Link
            key={`${project.id}-${idx}`}
            href={`/projects/${project.id}`}
            className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-white/10 px-2 py-7 transition-colors hover:bg-white/[0.02] sm:gap-8 sm:py-9"
          >
            {/* Index */}
            <span className="font-mono text-sm tabular-nums text-gray-600 transition-colors group-hover:text-amber-300">
              {num}
            </span>

            {/* Title block */}
            <div className="min-w-0">
              <div className="mb-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-gray-500">
                <span>{project.category}</span>
                {project.year && (
                  <>
                    <span className="text-gray-700">·</span>
                    <span>{project.year}</span>
                  </>
                )}
                {marker && (
                  <>
                    <span className="text-gray-700">·</span>
                    <span className="inline-flex items-center gap-1.5 text-amber-300/90">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                      {marker}
                    </span>
                  </>
                )}
              </div>
              <h3 className="truncate text-3xl font-light text-white transition-transform duration-300 group-hover:translate-x-1 sm:text-4xl">
                {project.title}
              </h3>
              <p className="mt-2 hidden max-w-xl truncate text-sm text-gray-500 sm:block">
                {project.shortDescription || project.description}
              </p>
            </div>

            {/* Right: hover thumb + arrow */}
            <div className="flex items-center gap-6">
              <div className="pointer-events-none hidden h-20 w-32 overflow-hidden rounded-lg border border-white/10 bg-[#0b0b0b] opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:block">
                <Thumb id={project.id} image={project.image} alt={project.title} />
              </div>
              <ArrowUpRight className="h-6 w-6 shrink-0 text-gray-600 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-amber-300" />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
