"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { useState } from 'react';
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
      className="absolute inset-0 w-full h-full object-contain p-4 drop-shadow-2xl transition-transform duration-300 group-hover:scale-[1.03]"
    />
  );
}

export default function ProjectList() {
  return (
    <>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {projects.map((project, idx) => (
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
                <div className="flex gap-2 flex-wrap justify-end">
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
                  <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                    {project.category}
                  </span>
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

      {/* No projects found */}
  {projects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No projects found in this category.</p>
        </div>
      )}
    </>
  );
}
