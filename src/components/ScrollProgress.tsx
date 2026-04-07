"use client";

import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      {/* Main progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-50 origin-left"
        style={{
          scaleX: scrollYProgress,
          background: "linear-gradient(90deg, var(--cp-red), var(--cp-yellow), var(--cp-blue), var(--cp-red))",
          backgroundSize: "300% 100%",
        }}
      />
      {/* Glow layer */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[6px] z-50 origin-left pointer-events-none"
        style={{
          scaleX: scrollYProgress,
          background: "linear-gradient(90deg, var(--cp-red), var(--cp-yellow), var(--cp-blue))",
          filter: "blur(4px)",
          opacity: 0.6,
        }}
      />
    </>
  );
}
