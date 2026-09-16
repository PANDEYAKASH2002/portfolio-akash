"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ElementType, ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: ElementType;
  once?: boolean;
  viewport?: boolean;
}

export default function FadeIn({
  children,
  delay = 0,
  y = 20,
  x = 0,
  duration = 0.65,
  className = "",
  style,
  as: Tag = "div",
  once = true,
  viewport = false,
}: FadeInProps) {
  const MotionTag = motion[Tag as keyof typeof motion] as React.FC<HTMLMotionProps<"div">>;

  const initial = { opacity: 0, y, x };
  const animate = { opacity: 1, y: 0, x: 0 };
  const transition = { duration, delay, ease: [0.22, 1, 0.36, 1] as const };

  if (viewport) {
    return (
      <MotionTag
        initial={initial}
        whileInView={animate}
        viewport={{ once }}
        transition={transition}
        className={className}
        style={style}
      >
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      initial={initial}
      animate={animate}
      transition={transition}
      className={className}
      style={style}
    >
      {children}
    </MotionTag>
  );
}
