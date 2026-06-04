"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Github, ExternalLink, Award, Sparkles } from 'lucide-react';
import projects from '@/data/projects.json';

function ImageWithFallback({ id, image, alt }) {
  const initial = image ? `/${image}` : `/${id}.png`;
  const [src, setSrc] = useState(initial);

  const handleError = () => {
    if (src === `/${image}`) setSrc(`/${id}.png`);
    else if (src.endsWith('.png')) setSrc(`/${id}.svg`);
    else setSrc('/portfolio.png');
  };

  return (
    <img
      src={src}
      alt={alt}
      onError={handleError}
      className="absolute inset-0 h-full w-full object-contain drop-shadow-2xl"
    />
  );
}

// Split "Lead-in: body" feature strings into an emphasized lead + body.
function splitFeature(f) {
  const i = f.indexOf(': ');
  if (i > 0 && i < 48) return { lead: f.slice(0, i), body: f.slice(i + 2) };
  return { lead: null, body: f };
}

const prettify = (s) => s.replace(/([A-Z])/g, ' $1').trim();

// Depth treatment behind a floating (object-contain) image: dotted texture,
// a soft center spotlight, and a warm glow from the bottom.
function FrameBackdrop() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
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

function Label({ children }) {
  return <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-gray-500">{children}</h2>;
}

function ActionLink({ href, icon: Icon, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 border-b border-white/25 pb-1 text-sm text-white transition-colors hover:border-amber-300"
    >
      <Icon className="h-4 w-4 text-gray-400 transition-colors group-hover:text-amber-300" />
      {children}
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}

function Callout({ icon: Icon, label, children }) {
  return (
    <div className="border-l-2 border-amber-400/60 pl-5">
      <div className="mb-1.5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-amber-300">
        <Icon className="h-3.5 w-3.5" /> {label}
      </div>
      <p className="text-sm leading-relaxed text-gray-300">{children}</p>
    </div>
  );
}

export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProject(projects.find((p) => p.id === params.id));
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-b-2 border-amber-300" />
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-gray-500">Loading</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-light">Project not found</h1>
          <p className="mb-8 text-gray-400">The project you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/all-projects"
            className="inline-flex items-center gap-2 border-b border-white/25 pb-1 text-sm transition-colors hover:border-amber-300"
          >
            <ArrowLeft className="h-4 w-4" /> Back to projects
          </Link>
        </div>
      </div>
    );
  }

  const kicker = [project.category, project.year, project.status].filter(Boolean).join('  ·  ');
  const related = projects.filter((p) => p.id !== project.id);
  const sameCat = related.filter((p) => p.category === project.category);
  const more = [...sameCat, ...related.filter((p) => p.category !== project.category)].slice(0, 4);
  const hasCallout = project.highlight || project.aiNote;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto max-w-6xl px-6 py-10">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-gray-500 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" /> Back
        </button>

        {/* Hero: title + image side by side */}
        <header className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-300">{kicker}</p>
            <h1 className="mt-4 text-4xl font-light leading-[1.05] md:text-6xl">{project.title}</h1>
            <p className="mt-5 max-w-xl text-lg font-light leading-relaxed text-gray-400">
              {project.shortDescription || project.description}
            </p>
            {(project.demoUrl || project.codeUrl) && (
              <div className="mt-7 flex flex-wrap gap-x-8 gap-y-4">
                {project.demoUrl && (
                  <ActionLink href={project.demoUrl} icon={ExternalLink}>
                    Live demo
                  </ActionLink>
                )}
                {project.codeUrl && (
                  <ActionLink href={project.codeUrl} icon={Github}>
                    View source
                  </ActionLink>
                )}
              </div>
            )}
          </div>

          {/* Framed screenshot */}
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]">
            <div className="relative aspect-[16/10] w-full">
              <FrameBackdrop />
              <div className="absolute inset-0 p-5 md:p-8">
                <div className="relative h-full w-full">
                  <ImageWithFallback id={project.id} image={project.image} alt={project.title} />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Callouts */}
        {hasCallout && (
          <div className="mt-10 space-y-6">
            {project.highlight && (
              <Callout icon={Award} label="Award">
                {project.highlight}
              </Callout>
            )}
            {project.aiNote && (
              <Callout icon={Sparkles} label="Note">
                {project.aiNote}
              </Callout>
            )}
          </div>
        )}

        {/* Body: narrative (left) + sticky spec rail (right) */}
        <div className="mt-14 grid gap-x-12 gap-y-12 border-t border-white/10 pt-12 lg:grid-cols-[1fr_280px]">
          {/* Narrative */}
          <div>
            <Label>Overview</Label>
            <p className="mt-4 max-w-2xl text-lg font-light leading-relaxed text-gray-300">{project.description}</p>

            {project.features?.length > 0 && (
              <div className="mt-12">
                <Label>Features</Label>
                <div className="mt-4 border-t border-white/10">
                  {project.features.map((f, i) => {
                    const { lead, body } = splitFeature(f);
                    return (
                      <div key={i} className="grid grid-cols-[auto_1fr] gap-5 border-b border-white/10 py-5">
                        <span className="font-mono text-sm tabular-nums text-amber-300/70">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div>
                          {lead && <h3 className="text-white">{lead}</h3>}
                          <p className={`leading-relaxed text-gray-400 ${lead ? 'mt-1 text-sm' : ''}`}>{body}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sticky spec rail */}
          <aside className="space-y-10 lg:sticky lg:top-8 lg:self-start">
            {project.techStack && (
              <div>
                <Label>Stack</Label>
                <dl className="mt-4 space-y-4">
                  {Object.entries(project.techStack).map(([cat, techs]) => (
                    <div key={cat}>
                      <dt className="font-mono text-[11px] uppercase tracking-wider text-gray-500">{prettify(cat)}</dt>
                      <dd className="mt-1 font-mono text-sm leading-relaxed text-gray-300">{techs.join('  ·  ')}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {project.prerequisites?.length > 0 && (
              <div>
                <Label>Requirements</Label>
                <ul className="mt-4 space-y-2">
                  {project.prerequisites.map((p, i) => (
                    <li key={i} className="font-mono text-xs leading-relaxed text-gray-400">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>

        {/* More projects */}
        {more.length > 0 && (
          <section className="mt-16 border-t border-white/10 pt-12">
            <Label>More projects</Label>
            <div className="mt-6 border-t border-white/10">
              {more.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/projects/${rp.id}`}
                  className="group flex items-center justify-between gap-4 border-b border-white/10 py-5 transition-colors hover:bg-white/[0.02]"
                >
                  <div className="min-w-0">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-gray-500">
                      {rp.category}
                      {rp.year ? `  ·  ${rp.year}` : ''}
                    </span>
                    <h3 className="truncate text-xl font-light text-white transition-transform group-hover:translate-x-1">
                      {rp.title}
                    </h3>
                  </div>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-gray-600 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-amber-300" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
