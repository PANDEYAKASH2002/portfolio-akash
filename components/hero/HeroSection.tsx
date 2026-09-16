"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  Mail,
  ArrowUpRight,
  Code2,
  Terminal,
  Braces,
  Database,
  Layers,
  GitBranch,
  Cpu,
  Sparkles,
  Component,
  Boxes,
} from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import { personalInfo } from "@/lib/data";

/* ═══════════════════════════════════════════════════════════════════════
   PARTICLE NAME
   ═══════════════════════════════════════════════════════════════════════ */

type Particle = {
  hx: number;
  hy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  seed: number;
};

const CURSOR_RADIUS = 90;
const PUSH_STRENGTH = 42;
const HOME_SPRING = 0.09;
const DAMPING_HOVER = 0.92;
const DAMPING_REST = 0.76;

function ParticleName({
  text,
  className = "",
  fontSize,
}: {
  text: string;
  className?: string;
  fontSize: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | null>(null);
  const hoveredRef = useRef(false);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const dprRef = useRef(1);
  const dimsRef = useRef({ w: 0, h: 0 });
  const reduceMotion = useReducedMotion();

  const buildParticles = useCallback(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const rect = wrap.getBoundingClientRect();
    const w = Math.max(1, Math.floor(rect.width));
    const h = Math.max(1, Math.floor(rect.height));
    dimsRef.current = { w, h };

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    dprRef.current = dpr;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const off = document.createElement("canvas");
    off.width = w * dpr;
    off.height = h * dpr;
    const octx = off.getContext("2d");
    if (!octx) return;
    octx.scale(dpr, dpr);
    octx.clearRect(0, 0, w, h);
    octx.fillStyle = "#000000";
    octx.textAlign = "center";
    octx.textBaseline = "middle";

    const targetFont = Math.min(fontSize, w / (text.length * 0.62));
    octx.font = `normal 900 ${targetFont}px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif`;
    octx.textBaseline = "alphabetic";

    const metrics = octx.measureText(text);
    const capHeight = metrics.actualBoundingBoxAscent || targetFont * 0.72;
    const baselineY = h / 2 + capHeight / 2;

    octx.fillText(text, w / 2, baselineY);

    const img = octx.getImageData(0, 0, w * dpr, h * dpr);
    const data = img.data;

    const step = dpr > 1 ? 6 : 4;
    const particles: Particle[] = [];

    for (let py = 0; py < h * dpr; py += step) {
      for (let px = 0; px < w * dpr; px += step) {
        const idx = (py * w * dpr + px) * 4;
        const a = data[idx + 3];
        if (a > 128) {
          const hx = px / dpr;
          const hy = py / dpr;
          particles.push({
            hx,
            hy,
            x: hx,
            y: hy,
            vx: 0,
            vy: 0,
            size: Math.random() * 1.2 + 0.7,
            alpha: Math.random() * 0.5 + 0.5,
            seed: Math.random() * Math.PI * 2,
          });
        }
      }
    }

    particlesRef.current = particles;
  }, [text, fontSize]);

  useEffect(() => {
    buildParticles();
    const ro = new ResizeObserver(buildParticles);
    if (wrapRef.current) ro.observe(wrapRef.current);
    const onResize = () => buildParticles();
    window.addEventListener("resize", onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [buildParticles]);

  const handleEnter = () => {
    if (reduceMotion) return;
    hoveredRef.current = true;
  };
  const handleLeave = () => {
    hoveredRef.current = false;
    mouseRef.current = null;
  };
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let t = 0;

    const tick = () => {
      const { w, h } = dimsRef.current;
      const dpr = dprRef.current;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const hovered = hoveredRef.current;
      const mouse = mouseRef.current;
      t += 0.016;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        let dist2 = Infinity;
        let dxm = 0;
        let dym = 0;
        if (hovered && mouse) {
          dxm = p.x - mouse.x;
          dym = p.y - mouse.y;
          dist2 = dxm * dxm + dym * dym;
        }

        const active = hovered && dist2 < CURSOR_RADIUS * CURSOR_RADIUS;

        if (active) {
          const dist = Math.sqrt(dist2) + 0.001;
          const falloff = 1 - dist / CURSOR_RADIUS;
          const push = PUSH_STRENGTH * falloff * falloff;

          p.vx += (dxm / dist) * push * 0.06;
          p.vy += (dym / dist) * push * 0.06;

          p.vx += Math.cos(t * 3.1 + p.seed) * 0.35;
          p.vy += Math.sin(t * 3.7 + p.seed) * 0.35;

          p.vx *= DAMPING_HOVER;
          p.vy *= DAMPING_HOVER;
          p.x += p.vx;
          p.y += p.vy;
        } else {
          const dx = p.hx - p.x;
          const dy = p.hy - p.y;
          p.vx += dx * HOME_SPRING;
          p.vy += dy * HOME_SPRING;
          p.vx *= DAMPING_REST;
          p.vy *= DAMPING_REST;
          p.x += p.vx;
          p.y += p.vy;
        }

        const a = p.alpha * (active ? 0.9 : 1);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,0,0,${a})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduceMotion]);

  return (
    <div
      ref={wrapRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onMouseMove={handleMove}
      className={`relative w-full ${className}`}
      style={{
        height: "1em",
        lineHeight: 0.88,
        fontStyle: "normal",
      }}
      aria-label={text}
      role="img"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ fontStyle: "normal" }}
        aria-hidden
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   FLOATING BACKGROUND ICONS  —  LARGER SIZES
   ═══════════════════════════════════════════════════════════════════════ */

type FloatIconDef = {
  Icon: typeof Code2;
  top: string;
  left: string;
  /** Base size in px — scaled up at render time for responsive growth. */
  size: number;
  depth: number;
  duration: number;
  delay: number;
  hideBelow?: "sm" | "md" | "lg";
};

/**
 * Icon sizes are ~2x the previous values.
 * The `size` here is the *base*; a responsive multiplier is applied
 * at render (see `SCALE_BY_BREAKPOINT` below) so icons grow further
 * on tablet / desktop without overcrowding small phones.
 */
const FLOAT_ICONS: FloatIconDef[] = [
  {
    Icon: Code2,
    top: "14%",
    left: "10%",
    size: 56,
    depth: 18,
    duration: 7,
    delay: 0,
  },
  {
    Icon: Terminal,
    top: "22%",
    left: "88%",
    size: 48,
    depth: -22,
    duration: 8,
    delay: 0.5,
    hideBelow: "sm",
  },
  {
    Icon: Braces,
    top: "68%",
    left: "6%",
    size: 44,
    depth: 26,
    duration: 6.5,
    delay: 1,
  },
  {
    Icon: Database,
    top: "72%",
    left: "90%",
    size: 52,
    depth: -16,
    duration: 9,
    delay: 0.3,
    hideBelow: "sm",
  },
  {
    Icon: Layers,
    top: "40%",
    left: "4%",
    size: 42,
    depth: 14,
    duration: 7.5,
    delay: 1.4,
    hideBelow: "md",
  },
  {
    Icon: GitBranch,
    top: "12%",
    left: "70%",
    size: 46,
    depth: -20,
    duration: 8.5,
    delay: 0.8,
    hideBelow: "md",
  },
  {
    Icon: Cpu,
    top: "82%",
    left: "30%",
    size: 42,
    depth: 20,
    duration: 6.8,
    delay: 0.6,
  },
  {
    Icon: Sparkles,
    top: "30%",
    left: "92%",
    size: 38,
    depth: -24,
    duration: 5.5,
    delay: 1.2,
    hideBelow: "md",
  },
  {
    Icon: Component,
    top: "85%",
    left: "68%",
    size: 50,
    depth: 16,
    duration: 7.2,
    delay: 0.2,
    hideBelow: "sm",
  },
  {
    Icon: Boxes,
    top: "6%",
    left: "42%",
    size: 38,
    depth: -18,
    duration: 8,
    delay: 1.6,
    hideBelow: "md",
  },
];

const hideClass: Record<NonNullable<FloatIconDef["hideBelow"]>, string> = {
  sm: "hidden sm:block",
  md: "hidden md:block",
  lg: "hidden lg:block",
};

function FloatingIcon({
  def,
  mx,
  my,
  reduceMotion,
}: {
  def: FloatIconDef;
  mx: ReturnType<typeof useMotionValue<number>>;
  my: ReturnType<typeof useMotionValue<number>>;
  reduceMotion: boolean;
}) {
  const { Icon, top, left, size, depth, duration, delay, hideBelow } = def;

  const rawX = useTransform(mx, (v) => v * depth);
  const rawY = useTransform(my, (v) => v * (depth * 0.6));
  const springX = useSpring(rawX, { damping: 22, stiffness: 60, mass: 0.6 });
  const springY = useSpring(rawY, { damping: 22, stiffness: 60, mass: 0.6 });

  return (
    <motion.div
      className={`absolute ${hideBelow ? hideClass[hideBelow] : ""}`}
      style={{
        top,
        left,
        x: reduceMotion ? 0 : springX,
        y: reduceMotion ? 0 : springY,
      }}
    >
      <motion.div
        animate={
          reduceMotion ? undefined : { y: [0, -16, 0], rotate: [0, 6, -4, 0] }
        }
        transition={{
          repeat: Infinity,
          duration,
          delay,
          ease: "easeInOut",
        }}
      >
        <Icon
          width={size}
          height={size}
          strokeWidth={1.1}
          className="text-black/15"
        />
      </motion.div>
    </motion.div>
  );
}

function FloatingIcons() {
  const reduceMotion = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  useEffect(() => {
    if (reduceMotion) return;
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mx.set((e.clientX - cx) / cx);
      my.set((e.clientY - cy) / cy);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduceMotion]);

  return (
    <div
      className="absolute inset-0 z-[15] pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {FLOAT_ICONS.map((def, i) => (
        <FloatingIcon
          key={i}
          def={def}
          mx={mx}
          my={my}
          reduceMotion={!!reduceMotion}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   CONTACT BUTTON
   ═══════════════════════════════════════════════════════════════════════ */
function ContactButton() {
  return (
    <motion.a
      href={`mailto:${personalInfo.email}`}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className="group inline-flex items-center gap-2.5 px-5 py-3 sm:px-6 sm:py-3.5 rounded-full border border-black/12 bg-black/[0.03] backdrop-blur-md text-black/80 hover:text-black hover:border-black/25 hover:bg-black/[0.06] transition-all duration-300 shadow-sm"
      aria-label={`Send email to ${personalInfo.name ?? "me"}`}
    >
      <Mail size={15} className="shrink-0" />
      <span
        className="font-semibold uppercase tracking-wider whitespace-nowrap"
        style={{ fontSize: "clamp(0.7rem, 1.2vw, 0.9rem)" }}
      >
        Get in touch
      </span>
      <ArrowUpRight
        size={14}
        className="shrink-0 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
      />
    </motion.a>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   CURSOR GLOW
   ═══════════════════════════════════════════════════════════════════════ */
function CursorGlow() {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { damping: 30, stiffness: 200, mass: 0.5 });
  const sy = useSpring(y, { damping: 30, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-0 hidden md:block"
      style={{
        left: sx,
        top: sy,
        width: 500,
        height: 500,
        x: "-50%",
        y: "-50%",
        background:
          "radial-gradient(circle at center, rgba(0,0,0,0.02) 0%, transparent 65%)",
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   TICKER
   ═══════════════════════════════════════════════════════════════════════ */
const tickerItems = [
  "Available for opportunities",
  "React.js Developer",
  "Full-Stack JavaScript",
  "Node.js Expert",
  "Open to collaborate",
];

function TickerBand() {
  return (
    <div className="overflow-hidden w-full border-t border-b border-black/[0.06] py-2.5">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
        className="flex gap-10 whitespace-nowrap w-max"
      >
        {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map(
          (item, i) => (
            <span
              key={i}
              className="text-[11px] uppercase tracking-[0.22em] text-black/45 font-medium flex items-center gap-10"
            >
              {item}
              <span className="inline-block w-1 h-1 rounded-full bg-black/20" />
            </span>
          ),
        )}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN HERO
   ═══════════════════════════════════════════════════════════════════════ */
export default function HeroSection() {
  const handleScrollDown = () => {
    const about = document.getElementById("about");
    if (about) about.scrollIntoView({ behavior: "smooth" });
  };

  const [nameFontSize, setNameFontSize] = useState(180);
  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth;
      const px = Math.min(15 * 16, Math.max(2.75 * 16, vw * 0.14));
      setNameFontSize(px);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex flex-col overflow-hidden bg-white"
      aria-labelledby="hero-heading"
    >
      <CursorGlow />

      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, black 40%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Floating vector icons — cursor-reactive parallax layer */}
      <FloatingIcons />

      {/* Top spacer for floating navbar */}
      <div className="h-16 sm:h-20 md:h-24 shrink-0" />

      {/* Centered block: name + ticker */}
      <div className="relative z-20 flex-1 min-h-0 flex flex-col justify-center gap-5 sm:gap-8 px-4 sm:px-6">
        <FadeIn delay={0.1} y={50}>
          <h1
            id="hero-heading"
            className="font-black uppercase leading-none text-center select-none"
            style={{
              fontSize: "clamp(2.25rem, 11vw, 13rem)",
              lineHeight: 0.9,
              fontStyle: "normal",
              letterSpacing: "-0.03em",
            }}
          >
            <span className="text-black align-baseline">Hi, I&apos;m </span>
            <span
              className="relative inline-block align-baseline"
              style={{
                width: "min(82vw, 42rem)",
                height: "0.9em",
                verticalAlign: "baseline",
                transform: "translateY(0.06em)",
                fontStyle: "normal",
              }}
            >
              <ParticleName
                text="AKASH"
                fontSize={nameFontSize}
                className="h-full text-black"
              />
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.3} y={15}>
          <TickerBand />
        </FadeIn>
      </div>

      {/* Bottom bar */}
      <div className="relative z-20 w-full shrink-0 flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-end pb-6 sm:pb-10 md:pb-12 px-5 sm:px-8 md:px-12">
        {/* Left: tagline + scroll */}
        <FadeIn
          delay={0.45}
          y={20}
          className="flex flex-col gap-3 max-w-full sm:max-w-[240px] md:max-w-[300px]"
        >
          <p
            className="text-black/60 font-light uppercase tracking-wide leading-snug"
            style={{ fontSize: "clamp(0.7rem, 1.35vw, 1.1rem)" }}
          >
            Full-Stack JavaScript developer building scalable &amp; striking web
            apps
          </p>
          <button
            onClick={handleScrollDown}
            className="group flex items-center gap-2 text-black/40 hover:text-black/80 transition-colors w-fit"
            aria-label="Scroll to about section"
          >
            <span className="text-[10px] uppercase tracking-widest font-semibold">
              Scroll
            </span>
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
              className="text-[10px]"
            >
              ↓
            </motion.span>
          </button>
        </FadeIn>

        {/* Right: contact + social */}
        <FadeIn
          delay={0.6}
          y={20}
          className="flex flex-col items-start sm:items-end gap-3"
        >
          <ContactButton />
          <div className="flex items-center gap-4">
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] uppercase tracking-widest text-black/45 hover:text-black/80 transition-colors font-semibold"
              aria-label="LinkedIn profile"
            >
              LinkedIn
            </a>
            <span className="w-px h-3 bg-black/15" />
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] uppercase tracking-widest text-black/45 hover:text-black/80 transition-colors font-semibold"
              aria-label="GitHub profile"
            >
              GitHub
            </a>
          </div>
        </FadeIn>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-30"
        style={{
          background: "linear-gradient(to top, #ffffff 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
