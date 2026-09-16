"use client";

import { useEffect, useState } from "react";
import { useMotionValue, useSpring } from "framer-motion";

export type CursorVariant = "default" | "pointer" | "view" | "flip" | "explore" | "drag";

export function useGlobalMouse() {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>("default");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return { mouseX, mouseY, cursorText, setCursorText, cursorVariant, setCursorVariant };
}
