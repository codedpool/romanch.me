"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import projects from '@/data/projects.json';

function ImageWithFallback({ id, alt, image }) {
  const initial = image ? `/${image}` : `/${id}.png`;
  const [src, setSrc] = useState(initial);

  const handleError = () => {
    if (src.endsWith('.png')) setSrc(image ? `/${id}.png` : `/${id}.svg`);
    else if (src.endsWith('.svg')) setSrc('/portfolio.png');
    else setSrc('/portfolio.png');
  };

  return (
    <img
      src={src}
      alt={alt}
      onError={handleError}
      className="absolute inset-0 h-full w-full object-contain p-5 drop-shadow-2xl transition-transform duration-700 ease-out group-hover:scale-[1.04]"
    />
  );
}

// Depth treatment behind a floating (object-contain) image: dotted texture,
// a soft center spotlight, and a warm glow from the bottom.
function FrameBackdrop() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
          maskImage: 'radial-gradient(ellipse at center, black 35%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 35%, transparent 78%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 35%, rgba(255,255,255,0.08), transparent 60%), radial-gradient(ellipse at 50% 118%, rgba(251,191,36,0.10), transparent 55%)',
        }}
      />
    </>
  );
}

function ProjectCard({ project, index }) {
  const num = String(index + 1).padStart(2, '0');
  const marker = project.status || (project.featured ? 'Featured' : null);

  const openExternal = (e, url) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(url, '_blank');
  };

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.04]"
    >
      {/* Framed image */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-[#0a0a0a]">
        <FrameBackdrop />
        <ImageWithFallback id={project.id} alt={project.title} image={project.image} />
        {marker && (
          <div className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-gray-200">{marker}</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-gray-500">
          <span>
            <span className="text-amber-300/80">{num}</span>&nbsp; /&nbsp; {project.category}
          </span>
          {project.year && <span>{project.year}</span>}
        </div>

        <h3 className="mt-4 text-2xl font-light text-white">{project.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-400">
          {project.shortDescription || project.description}
        </p>

        <p className="mt-4 line-clamp-1 font-mono text-xs text-gray-500">
          {project.technologies.join('  ·  ')}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="inline-flex items-center gap-1.5 text-sm text-gray-300 transition-colors group-hover:text-white">
            View case study
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
          <div className="flex items-center gap-1">
            {project.codeUrl && (
              <button
                onClick={(e) => openExternal(e, project.codeUrl)}
                aria-label="Source code"
                className="rounded-md p-2 text-gray-500 transition-colors hover:bg-white/5 hover:text-white"
              >
                <Github className="h-4 w-4" />
              </button>
            )}
            {project.demoUrl && (
              <button
                onClick={(e) => openExternal(e, project.demoUrl)}
                aria-label="Live demo"
                className="rounded-md p-2 text-gray-500 transition-colors hover:bg-white/5 hover:text-white"
              >
                <ExternalLink className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Projects({ showAll = false }) {
  const [displayedProjects, setDisplayedProjects] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const projectsPerLoad = 3;

  useEffect(() => {
    if (showAll) {
      setDisplayedProjects(projects);
      setCurrentIndex(projects.length);
      return;
    }
    const initial = projects.slice(0, projectsPerLoad);
    setDisplayedProjects(initial);
    setCurrentIndex(initial.length);
  }, [showAll]);

  const loadMoreProjects = () => {
    if (isLoading || currentIndex >= projects.length) return;
    setIsLoading(true);
    setTimeout(() => {
      const nextProjects = projects.slice(currentIndex, currentIndex + projectsPerLoad);
      setDisplayedProjects((prev) => [...prev, ...nextProjects]);
      setCurrentIndex((prev) => prev + nextProjects.length);
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (!showAll) return;
    const handleScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 250;
      if (nearBottom && !isLoading) loadMoreProjects();
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentIndex, isLoading, showAll]);

  return (
    <section id="projects" className="min-h-screen bg-black px-6 py-20 text-white">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-light uppercase tracking-wider text-gray-400">PORTFOLIO</p>
          <h1 className="mb-6 text-4xl font-light leading-tight md:text-5xl">
            Discover what I&apos;ve created
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-300">
            Each piece reflects my passion for innovation and commitment to delivering
            high-quality results. Feel free to explore and get inspired!
          </p>
        </div>

        {/* Projects Grid */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayedProjects.map((project, idx) => (
            <ProjectCard key={`${project.id}-${idx}`} project={project} index={idx} />
          ))}
        </div>

        {/* Loading indicator */}
        {isLoading && (
          <div className="mb-8 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-amber-300" />
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-gray-500">Loading</p>
          </div>
        )}

        {/* View All Projects */}
        <div className="text-center">
          <Link
            href="/all-projects"
            className="group inline-flex items-center gap-2 rounded-md border border-white/15 px-6 py-3 text-sm text-gray-200 transition-colors hover:border-white/40 hover:text-white"
          >
            View all projects
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
