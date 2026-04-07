"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  type: "circle" | "star" | "line" | "dot" | "ring";
};

function generateParticles(count: number): Particle[] {
  const colors = [
    "var(--cp-yellow)",
    "var(--cp-red)",
    "var(--cp-blue)",
    "rgba(255,255,255,0.3)",
    "#ff6b6b",
    "#ffd93d",
    "#6bcb77",
    "#4d96ff",
  ];
  const types: Particle["type"][] = ["circle", "star", "line", "dot", "ring"];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 8,
    color: colors[Math.floor(Math.random() * colors.length)],
    duration: 3 + Math.random() * 7,
    delay: Math.random() * 5,
    type: types[Math.floor(Math.random() * types.length)],
  }));
}

export default function ParticleField({ count = 40 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(generateParticles(count));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.type === "line" ? p.size * 4 : p.size,
            height: p.type === "line" ? 2 : p.size,
            backgroundColor: p.type === "ring" ? "transparent" : p.color,
            borderRadius: p.type === "circle" || p.type === "dot" || p.type === "ring" ? "50%" : p.type === "star" ? "2px" : "0",
            border: p.type === "ring" ? `1.5px solid ${p.color}` : "none",
            opacity: 0.4,
          }}
          animate={{
            y: [0, -30, 10, -20, 0],
            x: [0, 15, -10, 5, 0],
            opacity: [0.2, 0.6, 0.3, 0.5, 0.2],
            scale: [1, 1.3, 0.8, 1.1, 1],
            rotate: p.type === "star" ? [0, 180, 360] : [0, 0, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
