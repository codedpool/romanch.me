"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, ArrowLeft, Star, Calendar, Tag, Users, Sparkles, Award } from 'lucide-react';
import projects from '@/data/projects.json';

export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // helper to show project image from public/ with fallbacks
  function ImageWithFallback({ id, image, alt }) {
    const initial = image ? `/${image}` : `/${id}.png`;
    const [src, setSrc] = useState(initial);

    const handleError = () => {
      if (src === `/${image}`) {
        setSrc(`/${id}.png`);
      } else if (src.endsWith('.png')) {
        setSrc(`/${id}.svg`);
      } else {
        setSrc('/portfolio.png');
      }
    };

    return (
      <img
        src={src}
        alt={alt}
        onError={handleError}
        className="absolute inset-0 w-full h-full object-contain p-6 drop-shadow-2xl"
      />
    );
  }

  useEffect(() => {
    const foundProject = projects.find(p => p.id === params.id);
    setProject(foundProject);
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
          <p className="text-gray-400">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-gray-400 mb-8">The project you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/all-projects">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Button
              size="sm"
              onClick={() => router.back()}
              className="bg-white text-black hover:bg-gray-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            {project.featured && (
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-600 rounded-full">
                <Star className="w-4 h-4" />
                <span className="text-sm font-medium">Featured Project</span>
              </div>
            )}
            {project.status && (
              <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 rounded-full">
                <span className="text-sm font-medium">{project.status}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Project Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Tag className="w-5 h-5 text-gray-400" />
                <span className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full border border-gray-700">
                  {project.category}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {project.demoUrl && (
                  <Button
                    asChild
                    className="bg-white text-black hover:bg-gray-200"
                  >
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Live Demo
                    </a>
                  </Button>
                )}
                {project.codeUrl && (
                  <Button
                    asChild
                    className="bg-white text-black hover:bg-gray-200"
                  >
                    <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      View Source Code
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* Project Image */}
            <div className="relative h-80 bg-gray-800 rounded-xl overflow-hidden">
              {/* Sunburst Pattern Background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full relative">
                  {/* Sunburst rays */}
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute top-1/2 left-1/2 origin-bottom bg-gradient-to-t from-gray-600 to-gray-400 opacity-60"
                      style={{
                        width: '3px',
                        height: '200px',
                        transform: `translate(-50%, -100%) rotate(${i * 15}deg)`,
                      }}
                    />
                  ))}
                  {/* Center circle */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gray-500 rounded-full opacity-80" />
                </div>
              </div>
              {/* project image (from public/) */}
              <ImageWithFallback id={project.id} image={project.image} alt={project.title} />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        {project.highlight && (
          <div className="mb-10 flex items-start gap-3 bg-gray-900 border border-amber-500/40 rounded-lg p-4">
            <Award className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-200 leading-relaxed font-medium">{project.highlight}</p>
          </div>
        )}
        {project.aiNote && (
          <div className="mb-10 flex items-start gap-3 bg-gray-900 border border-amber-500/30 rounded-lg p-4">
            <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-300 leading-relaxed">{project.aiNote}</p>
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Features */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Key Features</h2>
              <div className="grid gap-4">
                {project.features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                      <p className="text-gray-300 leading-relaxed">{feature}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Tech Stack Details */}
            {project.techStack && (
              <section>
                <h2 className="text-3xl font-bold mb-6">Technology Stack</h2>
                <div className="grid gap-6">
                  {Object.entries(project.techStack).map(([category, technologies]) => (
                    <div
                      key={category}
                      className="bg-gray-900 border border-gray-800 rounded-lg p-6"
                    >
                      <h3 className="text-xl font-semibold mb-4 capitalize text-blue-400">
                        {category.replace(/([A-Z])/g, ' $1').trim()}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full border border-gray-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Info */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Project Info</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Tag className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Category</p>
                    <p className="text-white">{project.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Status</p>
                    <p className="text-white">{project.status || (project.featured ? 'Featured' : 'Active')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Technologies */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full border border-gray-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Related Projects */}
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">More Projects</h3>
              <div className="space-y-3">
                {projects
                  .filter(p => p.id !== project.id && p.category === project.category)
                  .slice(0, 3)
                  .map((relatedProject, idx) => (
                    <Link
                      key={`${relatedProject.id}-${idx}`}
                      href={`/projects/${relatedProject.id}`}
                      className="block p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <h4 className="font-medium text-white mb-1">{relatedProject.title}</h4>
                      <p className="text-sm text-gray-400 line-clamp-2">
                        {relatedProject.shortDescription || relatedProject.description}
                      </p>
                    </Link>
                  ))}
                {projects.filter(p => p.id !== project.id && p.category === project.category).length === 0 && (
                  <p className="text-gray-400 text-sm">No related projects found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
