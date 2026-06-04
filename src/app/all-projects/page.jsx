"use client";

import ProjectList from "@/components/ProjectList";
import projects from "@/data/projects.json";

export default function AllProjectsPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
      <div className="container mx-auto max-w-5xl">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-gray-500">
          Index · {projects.length} Projects
        </p>
        <h1 className="mb-12 text-4xl font-light leading-tight md:text-6xl">All Projects</h1>
        <ProjectList />
      </div>
    </main>
  );
}
