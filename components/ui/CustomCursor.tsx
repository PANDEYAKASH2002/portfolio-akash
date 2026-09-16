"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [cursorText, setCursorText] = useState("");
  const [cursorState, setCursorState] = useState<"default" | "pointer" | "badge">("default");

  const springConfig = { damping: 28, stiffness: 220, mass: 0.6 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleCustomCursor = (e: CustomEvent) => {
      if (e.detail?.text) {
        setCursorText(e.detail.text);
        setCursorState("badge");
      } else if (e.detail?.type === "pointer") {
        setCursorText("");
        setCursorState("pointer");
      } else {
        setCursorText("");
        setCursorState("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("set-custom-cursor" as any, handleCustomCursor as EventListener);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("set-custom-cursor" as any, handleCustomCursor as EventListener);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      {/* Primary tracking cursor */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center pointer-events-none select-none rounded-full"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorState === "badge" ? 84 : cursorState === "pointer" ? 44 : 28,
          height: cursorState === "badge" ? 36 : cursorState === "pointer" ? 44 : 28,
          backgroundColor:
            cursorState === "badge"
              ? "rgba(0, 0, 0, 0.95)"
              : cursorState === "pointer"
              ? "rgba(0, 0, 0, 0.08)"
              : "rgba(0, 0, 0, 0.04)",
          border:
            cursorState === "badge"
              ? "1px solid rgba(0, 0, 0, 1)"
              : "1px solid rgba(0, 0, 0, 0.18)",
          backdropFilter: cursorState === "badge" ? "none" : "blur(4px)",
          boxShadow:
            cursorState === "badge"
              ? "0 8px 32px rgba(0, 0, 0, 0.2)"
              : "0 0 16px rgba(0, 0, 0, 0.04)",
        }}
        transition={{ type: "spring", damping: 20, stiffness: 260 }}
      >
        {cursorState === "badge" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-[10px] font-black tracking-widest text-white uppercase font-mono px-2"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Center pinpoint */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-black pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: cursorState === "badge" ? 0 : 1,
          scale: cursorState === "pointer" ? 1.5 : 1,
        }}
      />
    </div>
  );
}

// Helper to set cursor globally
export function triggerCursor(text?: string, type: "default" | "pointer" | "badge" = "default") {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("set-custom-cursor", {
      detail: { text, type: text ? "badge" : type },
    })
  );
}
