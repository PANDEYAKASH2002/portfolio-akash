"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { projects } from "@/lib/data";
import { HarappamockUp, LanternMockup } from "./ProjectMockup";
import FadeIn from "@/components/ui/FadeIn";

const mockupComponents: Record<string, React.FC> = {
  harappa: HarappamockUp,
  lantern: LanternMockup,
};

// ─── Live / GitHub button ─────────────────────────────────────────────────
function LiveButton({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-black/12 bg-black/[0.03] backdrop-blur-md text-black/70 hover:text-black hover:border-black/25 hover:bg-black/[0.06] transition-all duration-300 shadow-sm"
      aria-label={label}
    >
      {icon}
      <span className="text-xs font-semibold uppercase tracking-widest">
        {label}
      </span>
      <ArrowUpRight
        size={12}
        className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
      />
    </motion.a>
  );
}

// ─── Single stacking card ─────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
  progress,
  range,
  targetScale,
  total,
}: {
  project: (typeof projects)[number];
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
  targetScale: number;
  total: number;
}) {
  const scale = useTransform(progress, range, [1, targetScale]);
  const MockupComponent = mockupComponents[project.id];

  return (
    <div
      className="sticky flex items-start justify-center"
      style={{ top: 0, height: "100vh" }}
    >
      <motion.div
        style={{
          scale,
          top: `calc(${index * 30}px)`,
        }}
        className="relative w-full max-w-6xl mx-auto pt-20 sm:pt-24 md:pt-28 px-3 sm:px-0"
      >
        {/* Card */}
        <div className="relative rounded-[36px] sm:rounded-[48px] md:rounded-[56px] border border-black/10 bg-white/85 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] overflow-hidden">
          {/* Card header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 sm:px-8 md:px-10 pt-6 sm:pt-8 pb-5 border-b border-black/6">
            <div className="flex items-center gap-5 sm:gap-8 min-w-0">
              {/* Big number */}
              <span
                className="font-black leading-none text-black/10 shrink-0 select-none"
                style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 1 }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <span className="block text-[10px] uppercase tracking-[0.22em] text-black/40 font-semibold mb-1">
                  {project.type}
                </span>
                <h3
                  className="font-bold uppercase text-black leading-tight truncate"
                  style={{ fontSize: "clamp(1.1rem, 2.8vw, 2rem)" }}
                >
                  {project.name}
                </h3>
                <p className="text-xs text-black/45 mt-0.5 uppercase tracking-wide">
                  {project.tagline}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 shrink-0">
              {project.liveUrl && (
                <LiveButton
                  href={project.liveUrl}
                  label="Live"
                  icon={<ExternalLink size={13} />}
                />
              )}
              {project.githubUrl && (
                <LiveButton
                  href={project.githubUrl}
                  label="GitHub"
                  icon={<GithubIcon size={13} />}
                />
              )}
            </div>
          </div>

          {/* Card body — two-column layout */}
          <div className="flex gap-3 sm:gap-4 p-4 sm:p-5 md:p-6" style={{ height: "clamp(280px, 40vh, 520px)" }}>
            {/* Left column: description + highlights */}
            <div className="w-[38%] flex flex-col gap-3 overflow-hidden shrink-0">
              <div className="flex-1 rounded-[24px] sm:rounded-[32px] border border-black/6 bg-black/[0.02] p-4 sm:p-5 overflow-hidden">
                <p className="text-black/70 text-xs sm:text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <ul className="space-y-2">
                  {project.highlights.slice(0, 4).map((h) => (
                    <li key={h} className="flex items-start gap-2 text-[11px] text-black/50 leading-snug">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-black/25 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech stack chips */}
              <div className="rounded-[20px] sm:rounded-[28px] border border-black/6 bg-black/[0.015] p-3 sm:p-4">
                <p className="text-[9px] uppercase tracking-widest text-black/35 mb-2 font-semibold">
                  Stack
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 6).map((t) => (
                    <span
                      key={t}
                      className="text-[9px] sm:text-[10px] px-2 py-0.5 rounded-md border border-black/8 text-black/60 bg-black/[0.02]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column: mockup */}
            <div className="flex-1 rounded-[24px] sm:rounded-[32px] border border-black/6 bg-black/[0.015] overflow-hidden relative">
              <div className="absolute inset-0">
                {MockupComponent && <MockupComponent />}
              </div>

              {/* Corner accents */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-black/15 rounded-tl-sm pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-black/15 rounded-br-sm pointer-events-none" />

              {/* Live link overlay */}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-3 right-3 flex items-center gap-1 text-[10px] text-black/70 hover:text-black bg-white/80 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-black/10 hover:border-black/25 shadow-sm transition-all"
                  aria-label={`Visit ${project.name}`}
                >
                  <ArrowUpRight size={10} />
                  {project.liveUrl.replace("https://", "")}
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────
export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative z-10"
      style={{
        // Each card takes 100vh of scroll space, plus header
        minHeight: `calc(${projects.length * 100}vh + 200px)`,
      }}
    >
      {/* ── Section header — sits above the sticky scroll ─────── */}
      <div className="sticky top-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="divider absolute top-0 left-0 right-0" />
      </div>

      <div className="container-wide pt-24 sm:pt-28 md:pt-32 pb-10">
        <FadeIn delay={0} y={30} viewport>
          <span className="section-label">Work</span>
          <h2 className="section-heading">
            Selected{" "}
            <span className="text-black/25">Projects</span>
          </h2>
          <p className="mt-4 text-black/50 max-w-lg text-base">
            Production-ready applications built and deployed independently,
            serving real users.
          </p>
        </FadeIn>
      </div>

      {/* ── Stacking scroll cards ─────────────────────────────── */}
      <div className="relative">
        {projects.map((project, index) => {
          // Each card shrinks slightly as the next one slides in
          const targetScale = 1 - (projects.length - 1 - index) * 0.04;
          const rangeStart = index / projects.length;
          const rangeEnd = 1;
          return (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              progress={scrollYProgress}
              range={[rangeStart, rangeEnd]}
              targetScale={targetScale}
              total={projects.length}
            />
          );
        })}
      </div>
    </section>
  );
}
