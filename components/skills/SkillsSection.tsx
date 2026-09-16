"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillCategories } from "@/lib/data";

/* ------------------------------- Types ---------------------------------- */
type CategoryId = string;

interface Node {
  id: string;
  label: string;
  category: CategoryId;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
}

interface Edge {
  a: string;
  b: string;
}

type ViewMode = "constellation" | "grid";

/* --------------------------- Category palette --------------------------- */
const categoryColors: Record<string, string> = {
  languages: "rgba(0,0,0,0.90)",
  frontend: "rgba(0,0,0,0.85)",
  state: "rgba(0,0,0,0.75)",
  backend: "rgba(0,0,0,0.80)",
  database: "rgba(0,0,0,0.70)",
  maps: "rgba(0,0,0,0.65)",
  tools: "rgba(0,0,0,0.60)",
  deployment: "rgba(0,0,0,0.65)",
};

const categoryBg: Record<string, string> = {
  languages: "rgba(0,0,0,0.06)",
  frontend: "rgba(0,0,0,0.05)",
  state: "rgba(0,0,0,0.04)",
  backend: "rgba(0,0,0,0.05)",
  database: "rgba(0,0,0,0.04)",
  maps: "rgba(0,0,0,0.03)",
  tools: "rgba(0,0,0,0.03)",
  deployment: "rgba(0,0,0,0.04)",
};

const EASE = [0.22, 1, 0.36, 1] as const;

/* ---------------------- Build constellation layout ---------------------- */
function buildConstellation(
  categories: typeof skillCategories,
  width: number,
  height: number,
): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const cx = width / 2;
  const cy = height / 2;

  const angleStep = (Math.PI * 2) / Math.max(categories.length, 1);
  const clusterRadius = Math.min(width, height) * 0.32;
  const nodeRadius = Math.min(width, height) * 0.09;
  const pad = 48;

  categories.forEach((cat, catIndex) => {
    const catAngle = angleStep * catIndex - Math.PI / 2;
    const clusterX = cx + Math.cos(catAngle) * clusterRadius;
    const clusterY = cy + Math.sin(catAngle) * clusterRadius;

    const n = Math.max(cat.skills.length, 1);
    const catAngleStep = (Math.PI * 2) / n;

    cat.skills.forEach((skill, skillIndex) => {
      const nodeAngle = catAngleStep * skillIndex - Math.PI / 2;
      const nx =
        n === 1 ? clusterX : clusterX + Math.cos(nodeAngle) * nodeRadius;
      const ny =
        n === 1 ? clusterY : clusterY + Math.sin(nodeAngle) * nodeRadius;

      const x = Math.max(pad, Math.min(width - pad, nx));
      const y = Math.max(pad, Math.min(height - pad, ny));

      nodes.push({
        id: `${cat.id}-${skill}`,
        label: skill,
        category: cat.id,
        x,
        y,
        baseX: x,
        baseY: y,
        radius: 4.5,
      });

      if (skillIndex > 0) {
        edges.push({
          a: `${cat.id}-${cat.skills[skillIndex - 1]}`,
          b: `${cat.id}-${skill}`,
        });
      }
      if (skillIndex === cat.skills.length - 1 && cat.skills.length > 2) {
        edges.push({
          a: `${cat.id}-${skill}`,
          b: `${cat.id}-${cat.skills[0]}`,
        });
      }
    });

    const nextCat = categories[(catIndex + 1) % categories.length];
    if (nextCat && cat.skills[0] && nextCat.skills[0]) {
      edges.push({
        a: `${cat.id}-${cat.skills[0]}`,
        b: `${nextCat.id}-${nextCat.skills[0]}`,
      });
    }
  });

  return { nodes, edges };
}

/* --------------------------- Constellation Canvas ----------------------- */
function ConstellationCanvas({
  nodes,
  edges,
  hoveredNode,
  mousePos,
  width,
  height,
}: {
  nodes: Node[];
  edges: Edge[];
  hoveredNode: string | null;
  mousePos: { x: number; y: number } | null;
  width: number;
  height: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    // Set actual pixel buffer
    canvas.width = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(height * dpr));
    // CSS size (so drawing coords match layout coords after scale)
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const nodeMap = new Map(nodes.map((n) => [n.id, n]));

    /* --- Edges --- */
    edges.forEach(({ a, b }) => {
      const A = nodeMap.get(a);
      const B = nodeMap.get(b);
      if (!A || !B) return;

      const highlighted = hoveredNode === a || hoveredNode === b;

      ctx.beginPath();
      ctx.moveTo(A.x, A.y);
      ctx.lineTo(B.x, B.y);
      ctx.strokeStyle = highlighted
        ? "rgba(0,0,0,0.35)"
        : "rgba(0,0,0,0.07)";
      ctx.lineWidth = highlighted ? 1.2 : 0.7;
      ctx.stroke();
    });

    /* --- Mouse proximity lines --- */
    if (mousePos) {
      nodes.forEach((node) => {
        const dx = mousePos.x - node.x;
        const dy = mousePos.y - node.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          const alpha = (1 - dist / 120) * 0.2;
          ctx.beginPath();
          ctx.moveTo(mousePos.x, mousePos.y);
          ctx.lineTo(node.x, node.y);
          ctx.strokeStyle = `rgba(0,0,0,${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });
    }

    /* --- Nodes --- */
    nodes.forEach((node) => {
      const isHovered = hoveredNode === node.id;
      const r = isHovered ? 6.5 : node.radius;

      if (isHovered) {
        const grad = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          24,
        );
        grad.addColorStop(0, "rgba(0,0,0,0.10)");
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(node.x, node.y, 24, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
      ctx.fillStyle = isHovered
        ? "rgba(0,0,0,0.95)"
        : "rgba(0,0,0,0.30)";
      ctx.fill();
    });
  }, [nodes, edges, hoveredNode, mousePos, width, height]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden
    />
  );
}

/* ------------------------------- Main ----------------------------------- */
export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ width: 0, height: 0 });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("constellation");
  const [isMobile, setIsMobile] = useState(false);

  /* --- Mobile detection --- */
  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setViewMode("grid");
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* --- Measure container (attached whenever constellation is visible) --- */
  useEffect(() => {
    if (viewMode !== "constellation" || isMobile) return;
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const w = el.clientWidth;
      const h = Math.max(380, Math.min(520, w * 0.55));
      setDims({ width: w, height: h });
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [viewMode, isMobile]);

  /* --- Rebuild constellation whenever dims change --- */
  const { nodes, edges } = useMemo(() => {
    if (dims.width < 100) return { nodes: [] as Node[], edges: [] as Edge[] };
    return buildConstellation(skillCategories, dims.width, dims.height);
  }, [dims]);

  /* --- Clear hover when nodes change so stale ids don't linger --- */
  useEffect(() => {
    setHoveredNode(null);
    setMousePos(null);
  }, [nodes]);

  /* --- Mouse tracking --- */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      setMousePos({ x: mx, y: my });

      let nearest: string | null = null;
      let nearestDist = 28;
      for (const n of nodes) {
        const d = Math.hypot(mx - n.x, my - n.y);
        if (d < nearestDist) {
          nearestDist = d;
          nearest = n.id;
        }
      }
      setHoveredNode(nearest);
    },
    [nodes],
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredNode(null);
    setMousePos(null);
  }, []);

  const hoveredNodeData = hoveredNode
    ? nodes.find((n) => n.id === hoveredNode)
    : undefined;

  const filteredCategories = activeCategory
    ? skillCategories.filter((c) => c.id === activeCategory)
    : skillCategories;

  const showConstellation = viewMode === "constellation" && !isMobile;

  return (
    <section id="skills" className="section-base relative z-10">
      <div className="divider absolute top-0 left-0 right-0" />
      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-12"
        >
          <span className="section-label">Expertise</span>
          <h2 className="section-heading">
            Skills &amp; <span className="text-black/25">Technologies</span>
          </h2>
          <p className="mt-4 text-black/55 max-w-lg text-base">
            A curated set of tools and technologies I work with daily to build
            scalable full-stack web applications.
          </p>
        </motion.div>

        {/* View toggle (desktop only) */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-1 mb-8 p-1 rounded-lg border border-black/[0.08] bg-black/[0.02] w-fit shadow-sm"
          >
            {(["constellation", "grid"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                className={`px-4 py-1.5 rounded-md text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
                  viewMode === mode
                    ? "bg-black text-white shadow-sm"
                    : "text-black/45 hover:text-black"
                }`}
              >
                {mode}
              </button>
            ))}
          </motion.div>
        )}

        {/* Views */}
        <AnimatePresence mode="wait" initial={false}>
          {/* ── Constellation ── */}
          {showConstellation && (
            <motion.div
              key="constellation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="relative rounded-2xl overflow-hidden border border-black/[0.08] bg-white/60 shadow-sm"
              style={{ height: dims.height || 420 }}
            >
              <div
                ref={containerRef}
                className="absolute inset-0"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {nodes.length > 0 && dims.width > 0 && (
                  <ConstellationCanvas
                    nodes={nodes}
                    edges={edges}
                    hoveredNode={hoveredNode}
                    mousePos={mousePos}
                    width={dims.width}
                    height={dims.height}
                  />
                )}

                {/* Node labels (positioned in the same coordinate space as canvas) */}
                {nodes.map((node) => {
                  const isHovered = hoveredNode === node.id;
                  return (
                    <div
                      key={node.id}
                      className="absolute pointer-events-none"
                      style={{
                        left: node.x,
                        top: node.y,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <div
                        className={`absolute left-1/2 whitespace-nowrap text-[10px] font-medium px-2 py-1 rounded-md border transition-all duration-200 ${
                          isHovered
                            ? "opacity-100 -translate-y-8"
                            : "opacity-0 -translate-y-6"
                        }`}
                        style={{
                          transform: "translateX(-50%)",
                          background: categoryBg[node.category],
                          borderColor:
                            categoryColors[node.category]?.replace(
                              /0\.\d+/,
                              "0.2",
                            ) ?? "rgba(0,0,0,0.1)",
                          color:
                            categoryColors[node.category] ??
                            "rgba(0,0,0,0.8)",
                          backdropFilter: "blur(8px)",
                          WebkitBackdropFilter: "blur(8px)",
                        }}
                      >
                        {node.label}
                      </div>
                    </div>
                  );
                })}

                {/* Tooltip */}
                <AnimatePresence>
                  {hoveredNodeData && (
                    <motion.div
                      key={hoveredNodeData.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.18 }}
                      className="absolute bottom-4 left-4 glass-card rounded-xl px-4 py-3 pointer-events-none shadow-md"
                    >
                      <p className="text-[10px] text-black/45 uppercase tracking-widest mb-0.5">
                        {skillCategories.find(
                          (c) => c.id === hoveredNodeData.category,
                        )?.label ?? hoveredNodeData.category}
                      </p>
                      <p className="text-sm font-semibold text-black">
                        {hoveredNodeData.label}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Instruction hint */}
                <div className="absolute top-4 right-4 text-[10px] text-black/25 font-mono tracking-wider select-none">
                  HOVER TO EXPLORE
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Grid ── */}
          {(!showConstellation || isMobile) && (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.35 }}
            >
              {/* Category filter chips */}
              <div className="flex flex-wrap gap-2 mb-8">
                <button
                  type="button"
                  onClick={() => setActiveCategory(null)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                    activeCategory === null
                      ? "bg-black text-white border-black shadow-sm"
                      : "border-black/10 text-black/50 hover:text-black hover:border-black/20"
                  }`}
                >
                  All
                </button>
                {skillCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() =>
                      setActiveCategory(
                        activeCategory === cat.id ? null : cat.id,
                      )
                    }
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                      activeCategory === cat.id
                        ? "bg-black text-white border-black shadow-sm"
                        : "border-black/10 text-black/50 hover:text-black hover:border-black/20"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <motion.div
                layout
                className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                <AnimatePresence mode="popLayout">
                  {filteredCategories.map((category, catIndex) => (
                    <motion.div
                      key={category.id}
                      layout
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12, scale: 0.98 }}
                      transition={{
                        duration: 0.45,
                        delay: catIndex * 0.04,
                        ease: EASE,
                      }}
                      whileHover={{ y: -3 }}
                      className="glass-card rounded-2xl p-5 flex flex-col gap-4 hover:border-black/[0.18] transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold uppercase tracking-widest text-black/45">
                          {category.label}
                        </p>
                        <span className="text-xs text-black/25 font-mono">
                          {String(category.skills.length).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill, i) => (
                          <motion.span
                            key={skill}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              delay: i * 0.03,
                              duration: 0.3,
                              ease: EASE,
                            }}
                            whileHover={{ y: -2 }}
                            className="skill-tag cursor-default"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
