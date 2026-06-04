"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github } from 'lucide-react'
import projects from '@/data/projects.json';

export default function Projects({ showAll = false }) {
  const [displayedProjects, setDisplayedProjects] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const projectsPerLoad = 3; // Show 3 projects initially

  // Load initial projects
  useEffect(() => {
    if (showAll) {
      // when showing all, load everything immediately
      setDisplayedProjects(projects);
      setCurrentIndex(projects.length);
      return;
    }

    // otherwise load only the initial slice
    const initial = projects.slice(0, projectsPerLoad);
    setDisplayedProjects(initial);
    setCurrentIndex(initial.length);
  }, [showAll]);

  const loadMoreProjects = () => {
    if (isLoading || currentIndex >= projects.length) return;
    setIsLoading(true);

    // Simulate loading delay for better UX
    setTimeout(() => {
      const nextProjects = projects.slice(currentIndex, currentIndex + projectsPerLoad);
      setDisplayedProjects(prev => [...prev, ...nextProjects]);
      setCurrentIndex(prev => prev + nextProjects.length);
      setIsLoading(false);
    }, 500);
  };

  // Infinite scroll handler - only when showAll is true
  useEffect(() => {
    if (!showAll) return;

    const handleScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 250;
      if (nearBottom && !isLoading) {
        loadMoreProjects();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentIndex, isLoading, showAll]);

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
        className="absolute inset-0 w-full h-full object-contain p-4 drop-shadow-2xl transition-transform duration-300 group-hover:scale-[1.03]"
      />
    );
  }

  return (
    <section id="projects" className="min-h-screen bg-black text-white py-20 px-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-light text-gray-400 mb-4 uppercase tracking-wider">PORTFOLIO</p>
          <h1 className="text-4xl md:text-5xl font-light leading-tight mb-6">
            Discover what I've created
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
            Each piece reflects my passion for innovation and commitment to delivering 
            high-quality results. Feel free to explore and get inspired!
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedProjects.map((project, idx) => (
            <Link
              key={`${project.id}-${idx}`}
              href={`/projects/${project.id}`}
              className="group bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-gray-600 transition-all duration-300 cursor-pointer"
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gray-800 overflow-hidden">
                {/* Sunburst Pattern Background */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full relative">
                    {/* Sunburst rays */}
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute top-1/2 left-1/2 origin-bottom bg-gradient-to-t from-gray-600 to-gray-400 opacity-60"
                        style={{
                          width: '2px',
                          height: '120px',
                          transform: `translate(-50%, -100%) rotate(${i * 22.5}deg)`,
                        }}
                      />
                    ))}
                    {/* Center circle */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gray-500 rounded-full opacity-80" />
                  </div>
                </div>
                {/* project image */}
                <ImageWithFallback id={project.id} alt={project.title} image={project.image} />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  {project.demoUrl && (
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white text-black hover:bg-gray-200"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.open(project.demoUrl, '_blank');
                      }}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </Button>
                  )}
                  {project.codeUrl && (
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white text-black hover:bg-gray-200"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        window.open(project.codeUrl, '_blank');
                      }}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                  )}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-medium text-white">
                    {project.title}
                  </h3>
                  <div className="flex gap-2 shrink-0">
                    {project.status && (
                      <span className="px-2 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs rounded-full whitespace-nowrap">
                        {project.status}
                      </span>
                    )}
                    {project.featured && (
                      <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {project.shortDescription || project.description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full border border-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Loading indicator */}
        {isLoading && (
          <div className="text-center mb-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <p className="text-gray-400 mt-2">Loading more projects...</p>
          </div>
        )}

  {/* Infinite scroll loads remaining projects automatically; kept "View All Projects" button below */}

        {/* View All Projects Button */}
        <div className="text-center">
          <Button
            asChild
            variant="secondary"
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-md"
          >
            <a href="/all-projects">View All Projects</a>
          </Button>
        </div>
      </div>

      {/* Additional geometric elements for visual interest */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white opacity-30 rounded-full"></div>
      <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-white opacity-50 rounded-full"></div>
    </section>
  )
}
