"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GraduationCap, CalendarDays, MapPin, CheckCircle2, Award } from "lucide-react";
import { education } from "@/lib/data";
import FadeIn from "@/components/ui/FadeIn";

// ─── Single stacking education card ──────────────────────────────────────────
function EducationCard({
  education: edu,
  index,
  progress,
  range,
  targetScale,
  total,
}: {
  education: (typeof education)[number];
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
  targetScale: number;
  total: number;
}) {
  const scale = useTransform(progress, range, [1, targetScale]);

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
                  {edu.type}
                </span>
                <h3
                  className="font-bold uppercase text-black leading-tight truncate"
                  style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.85rem)" }}
                >
                  {edu.degree}
                </h3>
                <p className="text-xs text-black/50 mt-0.5 font-medium flex items-center gap-1.5">
                  <GraduationCap size={13} className="shrink-0 text-black/40" />
                  <span>{edu.institution}</span>
                </p>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/10 bg-black/[0.03] text-black/65 text-xs font-semibold">
                <CalendarDays size={12} className="text-black/40" />
                <span>{edu.period}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/10 bg-black/[0.03] text-black/65 text-xs font-semibold">
                <MapPin size={12} className="text-black/40" />
                <span>{edu.location}</span>
              </div>
            </div>
          </div>

          {/* Card body — two-column layout */}
          <div
            className="flex flex-col lg:flex-row gap-3 sm:gap-4 p-4 sm:p-5 md:p-6"
            style={{ minHeight: "clamp(280px, 38vh, 480px)" }}
          >
            {/* Left column: description + highlights + subjects */}
            <div className="w-full lg:w-[48%] flex flex-col gap-3 overflow-hidden shrink-0">
              <div className="flex-1 rounded-[24px] sm:rounded-[32px] border border-black/6 bg-black/[0.02] p-4 sm:p-5 overflow-hidden flex flex-col justify-between">
                <div>
                  <p className="text-black/70 text-xs sm:text-sm leading-relaxed mb-4">
                    {edu.description}
                  </p>
                  <ul className="space-y-2.5">
                    {edu.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2.5 text-[11px] sm:text-xs text-black/55 leading-snug"
                      >
                        <CheckCircle2
                          size={13}
                          className="mt-0.5 shrink-0 text-black/40"
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stream / Subjects */}
                <div className="mt-4 pt-3 border-t border-black/6">
                  <p className="text-[9px] uppercase tracking-widest text-black/35 mb-2 font-semibold">
                    Core Focus &amp; Disciplines
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {edu.subjects.map((s) => (
                      <span
                        key={s}
                        className="text-[9px] sm:text-[10px] px-2.5 py-0.5 rounded-md border border-black/8 text-black/60 bg-black/[0.02] font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right column: Credential presentation card */}
            <div className="flex-1 rounded-[24px] sm:rounded-[32px] border border-black/6 bg-black/[0.015] p-5 sm:p-7 md:p-8 flex flex-col justify-between relative overflow-hidden">
              {/* Corner accents */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-black/15 rounded-tl-sm pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-black/15 rounded-br-sm pointer-events-none" />

              {/* Watermark badge backdrop */}
              <div
                className="absolute right-4 bottom-2 text-[10rem] font-black text-black/[0.03] select-none pointer-events-none leading-none tracking-tighter"
                aria-hidden="true"
              >
                {edu.shortTitle}
              </div>

              {/* Top status & program */}
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white border border-black/10 flex items-center justify-center text-black/75 shadow-xs">
                    <Award size={20} strokeWidth={2} />
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-[0.2em] text-black/40 font-semibold">
                      Stream
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-black/80">
                      {edu.stream}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-black/10 text-black/70 text-[10px] sm:text-xs font-semibold shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {edu.grade}
                </div>
              </div>

              {/* Middle credential hero */}
              <div className="my-auto py-6 relative z-10">
                <div className="font-black text-4xl sm:text-5xl md:text-6xl tracking-tight text-black/90 mb-1.5">
                  {edu.shortTitle}
                </div>
                <h4 className="text-base sm:text-lg font-bold text-black/80">
                  {edu.degree}
                </h4>
                <p className="text-xs sm:text-sm text-black/55 mt-1 font-medium">
                  {edu.institution}
                </p>
              </div>

              {/* Bottom metadata bar */}
              <div className="pt-3 border-t border-black/6 flex items-center justify-between text-[10px] text-black/40 font-mono relative z-10">
                <span>EDUCATION PROFILE</span>
                <span className="uppercase tracking-wider">
                  {edu.period} · {edu.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Education Section ───────────────────────────────────────────────────
export default function EducationSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="education"
      ref={containerRef}
      className="relative z-10"
      style={{
        // Each card takes 100vh of scroll space, plus header room
        minHeight: `calc(${education.length * 100}vh + 200px)`,
      }}
    >
      {/* ── Section header — sits above the sticky scroll ─────── */}
      <div className="sticky top-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="divider absolute top-0 left-0 right-0" />
      </div>

      <div className="container-wide pt-24 sm:pt-28 md:pt-32 pb-10">
        <FadeIn delay={0} y={30} viewport>
          <span className="section-label">Academic Background</span>
          <h2 className="section-heading">
            Edu<span className="text-black/25">cation</span>
          </h2>
          <p className="mt-4 text-black/50 max-w-lg text-base">
            Academic foundation in science, computer applications, and analytical
            problem-solving, completed with excellence.
          </p>
        </FadeIn>
      </div>

      {/* ── Stacking scroll cards ─────────────────────────────── */}
      <div className="relative">
        {education.map((edu, index) => {
          // Each card scales down slightly as the next one slides in
          const targetScale = 1 - (education.length - 1 - index) * 0.04;
          const rangeStart = index / education.length;
          const rangeEnd = 1;
          return (
            <EducationCard
              key={edu.id}
              education={edu}
              index={index}
              progress={scrollYProgress}
              range={[rangeStart, rangeEnd]}
              targetScale={targetScale}
              total={education.length}
            />
          );
        })}
      </div>
    </section>
  );
}
