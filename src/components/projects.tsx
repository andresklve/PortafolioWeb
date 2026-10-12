"use client";

import { projects } from "@/lib/content";
import { trackGlow } from "./background";
import { PiensaYaDiagram, PortfolioDiagram, ReclamaYaDiagram } from "./diagrams";
import { useLanguage } from "./language-provider";
import { ArrowIcon, GithubIcon, Reveal, SectionHeader, Tag } from "./ui";

const diagrams = {
  piensaya: PiensaYaDiagram,
  reclamaya: ReclamaYaDiagram,
  portfolio: PortfolioDiagram,
};

function RepoLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/link inline-flex items-center gap-2 rounded-xl border border-line-strong px-4 py-2.5 text-sm font-medium text-fg transition-all hover:border-accent hover:bg-accent hover:text-bg"
    >
      <GithubIcon />
      {label}
      <ArrowIcon className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
    </a>
  );
}

export function Projects() {
  const { t } = useLanguage();
  const [featured, ...rest] = projects;
  const FeaturedDiagram = diagrams[featured.id];

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-36">
      <SectionHeader index="03" label={t.projects.label} title={t.projects.title} />

      <Reveal>
        <article
          onPointerMove={trackGlow}
          className="glow-card grid gap-10 overflow-hidden rounded-3xl p-6 md:p-10 lg:grid-cols-[1fr_1.15fr]"
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="text-dim">01</span>
              <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-accent">
                ★ {t.projects.featured}
              </span>
            </div>
            <h3 className="mt-5 text-5xl font-semibold tracking-[-0.04em] md:text-6xl">{featured.name}</h3>
            <p className="mt-2 font-mono text-sm text-accent-2">{t.projects.items[featured.id].kicker}</p>
            <p className="mt-6 text-pretty leading-relaxed text-muted">{t.projects.items[featured.id].description}</p>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {featured.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
            <div className="mt-8 lg:mt-auto lg:pt-8">
              <RepoLink href={featured.repo} label={t.projects.repo} />
            </div>
          </div>
          <div className="self-center">
            <FeaturedDiagram />
          </div>
        </article>
      </Reveal>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {rest.map((project, i) => {
          const Diagram = diagrams[project.id];
          const copy = t.projects.items[project.id];
          return (
            <Reveal key={project.id} delay={i * 0.1} className="h-full">
              <article onPointerMove={trackGlow} className="glow-card flex h-full flex-col rounded-3xl p-6 md:p-8">
                <div className="rounded-2xl border border-line bg-bg-2/60 p-4">
                  <Diagram />
                </div>
                <div className="mt-8 flex items-center gap-3 font-mono text-xs text-dim">0{i + 2}</div>
                <h3 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">{project.name}</h3>
                <p className="mt-2 font-mono text-sm text-accent-2">{copy.kicker}</p>
                <p className="mt-5 text-pretty leading-relaxed text-muted">{copy.description}</p>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
                <div className="mt-auto pt-8">
                  <RepoLink href={project.repo} label={t.projects.repo} />
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
