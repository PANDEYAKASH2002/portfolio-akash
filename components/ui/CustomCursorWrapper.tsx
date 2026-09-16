"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CustomCursor = dynamic(() => import("./CustomCursor"), { ssr: false });

export default function CustomCursorWrapper() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Only show custom cursor on desktop (non-touch) devices
    const check = () => setIsDesktop(window.matchMedia("(pointer: fine)").matches);
    check();
    const mq = window.matchMedia("(pointer: fine)");
    mq.addEventListener("change", check);
    return () => mq.removeEventListener("change", check);
  }, []);

  if (!isDesktop) return null;
  return <CustomCursor />;
}
