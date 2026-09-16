"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { developerSnapshot } from "@/lib/data";

/* ---------------------------------- Types --------------------------------- */
type Ease = [number, number, number, number];

type SnapshotItem = {
  label: string;
  value: string;
};

type ExpertiseItem = {
  area: string;
  detail: string;
  icon: React.ReactNode;
};

/* ------------------------------- Variants -------------------------------- */
const EASE: Ease = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: EASE },
  },
};

const techTagVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE },
  },
};

/* ------------------------------ Tech Stack ------------------------------- */
const TECH = [
  "React.js",
  "TypeScript",
  "JavaScript ES6+",
  "Node.js",
  "Express.js",
  "Prisma",
  "MySQL",
  "Redux Toolkit",
  "REST APIs",
  "Leaflet.js",
  "Linux",
  "Nginx",
] as const;

/* ------------------------------- Icons ----------------------------------- */
const IconFrontend = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="w-4 h-4"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <rect x="2" y="4" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 18v3" strokeLinecap="round" />
  </svg>
);

const IconState = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="w-4 h-4"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <circle cx="12" cy="12" r="3" />
    <path
      d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3"
      strokeLinecap="round"
    />
  </svg>
);

const IconBackend = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="w-4 h-4"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <ellipse cx="12" cy="5" rx="8" ry="3" />
    <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
    <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
  </svg>
);

const IconDatabase = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="w-4 h-4"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <ellipse cx="12" cy="6" rx="8" ry="3" />
    <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
    <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
  </svg>
);

const IconMap = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="w-4 h-4"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path d="M12 21s-7-6.5-7-11a7 7 0 1 1 14 0c0 4.5-7 11-7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

const IconDevOps = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="w-4 h-4"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
    <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />
  </svg>
);

const EXPERTISE: ExpertiseItem[] = [
  {
    area: "Frontend Development",
    detail: "React.js, TypeScript, Tailwind, Responsive UI",
    icon: <IconFrontend />,
  },
  {
    area: "State Management",
    detail: "Redux Toolkit, Context API, React Query",
    icon: <IconState />,
  },
  {
    area: "Backend & APIs",
    detail: "Node.js, Express.js, REST APIs, Auth/RBAC",
    icon: <IconBackend />,
  },
  {
    area: "Database",
    detail: "MySQL, Prisma ORM, Data Modeling",
    icon: <IconDatabase />,
  },
  {
    area: "Maps & Tracking",
    detail: "Leaflet.js, GPS, Polyline, Route Viz",
    icon: <IconMap />,
  },
  {
    area: "DevOps & Deploy",
    detail: "Linux, Nginx, VPS, SSL/TLS, DNS",
    icon: <IconDevOps />,
  },
];

/* ------------------------------ Helpers ---------------------------------- */
function useCountUp(target: number, start: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);
  return value;
}

/* ------------------------------ Subcomponents ---------------------------- */
function SnapshotCard({ item, index }: { item: SnapshotItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), {
    stiffness: 200,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), {
    stiffness: 200,
    damping: 18,
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 800 }}
      className="group relative p-4 rounded-xl border border-black/8 bg-black/[0.02] hover:bg-black/[0.04] hover:border-black/15 transition-colors duration-300 overflow-hidden shadow-sm"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute -inset-px bg-gradient-to-br from-black/[0.04] via-transparent to-transparent rounded-xl" />
      </div>
      <p className="text-xs text-black/45 uppercase tracking-wider mb-1.5 relative z-10">
        {item.label}
      </p>
      <p className="text-sm font-semibold text-black/85 relative z-10">
        {item.value}
      </p>
      <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-gradient-to-r from-black/30 to-transparent transition-all duration-500" />
    </motion.div>
  );
}

function ExpertiseRow({ item, index }: { item: ExpertiseItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -12 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: EASE }}
      className="group flex items-start gap-3 py-2.5 border-b border-black/6 last:border-0 transition-colors hover:border-black/12"
    >
      <div className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-lg border border-black/8 bg-black/[0.03] flex items-center justify-center text-black/45 group-hover:text-black group-hover:border-black/15 group-hover:bg-black/[0.06] transition-all duration-300">
        {item.icon}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-black/80 group-hover:text-black transition-colors duration-300">
          {item.area}
        </p>
        <p className="text-xs text-black/45 mt-0.5">{item.detail}</p>
      </div>
    </motion.div>
  );
}

function TechTag({ label, index }: { label: string; index: number }) {
  return (
    <motion.span
      variants={techTagVariants}
      whileHover={{ y: -2, scale: 1.04 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="skill-tag cursor-default"
      style={{ transitionDelay: `${index * 20}ms` }}
    >
      {label}
    </motion.span>
  );
}

function AnimatedGrid() {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.35 }}
      transition={{ duration: 1.5, ease: EASE }}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at 30% 20%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 30% 20%, black 30%, transparent 75%)",
        }}
      />
    </motion.div>
  );
}

/* ------------------------------- Main ------------------------------------ */
export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  const years = useCountUp(2, statsInView);
  const projects = useCountUp(10, statsInView);
  const langs = useCountUp(22, statsInView);
  const stack = useCountUp(12, statsInView);

  const stats = [
    { value: `${years}+`, label: "Years Experience" },
    { value: `${projects}+`, label: "Projects Shipped" },
    { value: `${langs}`, label: "Indian Languages (i18n)" },
    { value: `${stack}+`, label: "Core Technologies" },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-base relative z-10 overflow-hidden"
    >
      <div className="divider absolute top-0 left-0 right-0" />
      <AnimatedGrid />

      {/* Floating ambient orbs */}
      <motion.div
        aria-hidden
        animate={{ y: [0, -20, 0], opacity: [0.03, 0.08, 0.03] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-20 -left-20 w-80 h-80 rounded-full bg-black/[0.03] blur-[120px]"
      />
      <motion.div
        aria-hidden
        animate={{ y: [0, 24, 0], opacity: [0.03, 0.08, 0.03] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="pointer-events-none absolute -bottom-24 right-0 w-96 h-96 rounded-full bg-black/[0.03] blur-[140px]"
      />

      <div className="container-wide relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start"
        >
          {/* ---------------------------- Left Column ---------------------------- */}
          <div>
            <motion.span
              variants={itemVariants}
              className="section-label inline-flex items-center gap-2"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black/30 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-black/60" />
              </span>
              About Me
            </motion.span>

            <motion.h2 variants={itemVariants} className="section-heading mb-8">
              Building the web,
              <br />
              <motion.span
                className="text-black/35 inline-block"
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.35) 100%)",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                one layer at a time.
              </motion.span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-black/70 text-base md:text-lg leading-relaxed mb-6"
            >
              I&apos;m a Full-Stack JavaScript developer with a strong focus on
              React.js and modern web development. I specialize in building
              end-to-end web applications that are responsive, performant, and
              maintainable.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-black/60 text-base leading-relaxed mb-6"
            >
              My work spans the full stack — from crafting pixel-precise
              interfaces in React.js with Redux Toolkit, Context API, and React
              Query, to designing RESTful APIs with Node.js, Express.js, and
              Prisma ORM backed by MySQL databases.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-black/60 text-base leading-relaxed mb-8"
            >
              I&apos;ve worked with authentication &amp; authorization systems,
              RBAC, real-time GPS tracking using Leaflet.js, i18n for 22 Indian
              languages, and independently deployed production applications to
              Linux VPS with Nginx, GoDaddy DNS, and SSL/TLS.
            </motion.p>

            {/* Tech highlights */}
            <motion.div
              variants={containerVariants}
              className="flex flex-wrap gap-2"
              aria-label="Tech stack"
            >
              {TECH.map((tech, i) => (
                <TechTag key={tech} label={tech} index={i} />
              ))}
            </motion.div>

            {/* Animated stats strip */}
            <motion.div
              ref={statsRef}
              variants={itemVariants}
              className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                  className="relative rounded-xl border border-black/8 bg-black/[0.02] p-4 overflow-hidden group shadow-sm"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/15 to-transparent" />
                  <p className="text-2xl font-bold text-black tabular-nums">
                    {s.value}
                  </p>
                  <p className="text-[11px] text-black/45 uppercase tracking-wider mt-1">
                    {s.label}
                  </p>
                  <motion.div
                    className="absolute bottom-0 left-0 h-px bg-black/25"
                    initial={{ width: 0 }}
                    animate={statsInView ? { width: "100%" } : {}}
                    transition={{
                      duration: 1.2,
                      delay: 0.3 + i * 0.08,
                      ease: EASE,
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* --------------------------- Right Column --------------------------- */}
          <div className="space-y-6">
            {/* Developer Snapshot */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="glass-card rounded-2xl p-6 relative overflow-hidden group"
            >
              <motion.div
                aria-hidden
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(0,0,0,0.03), transparent 40%)",
                }}
              />
              <div className="flex items-center justify-between mb-5 relative z-10">
                <p className="text-xs text-black/45 uppercase tracking-widest font-semibold">
                  Developer Snapshot
                </p>
                <motion.span
                  animate={{ rotate: [0, 90, 180, 270, 360] }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="text-black/25"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <path
                      d="M12 2v4M12 18v4M2 12h4M18 12h4"
                      strokeLinecap="round"
                    />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </motion.span>
              </div>
              <div className="grid grid-cols-2 gap-4 relative z-10">
                {developerSnapshot.map((item, i) => (
                  <SnapshotCard key={item.label} item={item} index={i} />
                ))}
              </div>
            </motion.div>

            {/* Core Expertise */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="glass-card rounded-2xl p-6 relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-5">
                <p className="text-xs text-black/45 uppercase tracking-widest font-semibold">
                  Core Expertise
                </p>
                <motion.div
                  className="h-px flex-1 ml-4 bg-gradient-to-r from-black/10 to-transparent origin-left"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: EASE }}
                />
              </div>
              <div className="space-y-0">
                {EXPERTISE.map((item, i) => (
                  <ExpertiseRow key={item.area} item={item} index={i} />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
