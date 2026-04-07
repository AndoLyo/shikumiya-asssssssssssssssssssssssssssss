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
  type: "circle" | "star" | "line" | "dot" | "ring" | "diamond" | "cross" | "spark";
};

type GlowOrb = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
};

type SpeedLine = {
  id: number;
  x: number;
  width: number;
  rotation: number;
  duration: number;
  delay: number;
  opacity: number;
};

function generateParticles(count: number): Particle[] {
  const colors = [
    "var(--cp-yellow)",
    "var(--cp-red)",
    "var(--cp-blue)",
    "rgba(255,255,255,0.4)",
    "#ff6b6b",
    "#ffd93d",
    "#6bcb77",
    "#4d96ff",
    "#ff9ff3",
    "#feca57",
  ];
  const types: Particle["type"][] = ["circle", "star", "line", "dot", "ring", "diamond", "cross", "spark"];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 10,
    color: colors[Math.floor(Math.random() * colors.length)],
    duration: 4 + Math.random() * 10,
    delay: Math.random() * 6,
    type: types[Math.floor(Math.random() * types.length)],
  }));
}

function generateGlowOrbs(): GlowOrb[] {
  const colors = [
    "rgba(230,57,70,0.1)",
    "rgba(37,99,235,0.1)",
    "rgba(255,193,7,0.08)",
    "rgba(139,92,246,0.08)",
    "rgba(16,185,129,0.06)",
    "rgba(236,72,153,0.07)",
  ];
  return Array.from({ length: 6 }, (_, i) => ({
    id: i,
    x: 10 + Math.random() * 80,
    y: 10 + Math.random() * 80,
    size: 200 + Math.random() * 200,
    color: colors[i % colors.length],
    duration: 12 + Math.random() * 10,
    delay: Math.random() * 8,
  }));
}

function generateSpeedLines(): SpeedLine[] {
  return Array.from({ length: 16 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    width: 30 + Math.random() * 150,
    rotation: -45 + Math.random() * 90,
    duration: 5 + Math.random() * 8,
    delay: Math.random() * 5,
    opacity: 0.03 + Math.random() * 0.08,
  }));
}

export default function FloatingParticles({ count = 80 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [glowOrbs, setGlowOrbs] = useState<GlowOrb[]>([]);
  const [speedLines, setSpeedLines] = useState<SpeedLine[]>([]);

  useEffect(() => {
    setParticles(generateParticles(count));
    setGlowOrbs(generateGlowOrbs());
    setSpeedLines(generateSpeedLines());
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.type === "line" ? p.size * 5 : p.type === "cross" ? p.size * 1.5 : p.size,
            height: p.type === "line" ? 2 : p.type === "cross" ? p.size * 1.5 : p.size,
            backgroundColor:
              p.type === "ring" ? "transparent" :
              p.type === "cross" ? "transparent" :
              p.type === "spark" ? "transparent" :
              p.color,
            borderRadius:
              p.type === "circle" || p.type === "dot" || p.type === "ring" ? "50%" :
              p.type === "diamond" ? "2px" :
              p.type === "star" ? "2px" : "0",
            border:
              p.type === "ring" ? `2px solid ${p.color}` :
              p.type === "diamond" ? `1.5px solid ${p.color}` : "none",
            transform: p.type === "diamond" ? "rotate(45deg)" : "none",
            boxShadow: p.type === "spark" ? `0 0 ${p.size}px ${p.size / 2}px ${p.color}` : "none",
          }}
          animate={{
            y: [0, -60, 20, -40, 0],
            x: [0, 25, -15, 10, 0],
            opacity: [0.15, 0.7, 0.25, 0.6, 0.15],
            scale: [0.8, 1.4, 0.6, 1.2, 0.8],
            rotate: p.type === "star" || p.type === "cross" ? [0, 180, 360] : [0, 0, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Glowing orbs */}
      {glowOrbs.map((orb) => (
        <motion.div
          key={`orb-${orb.id}`}
          className="absolute rounded-full"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
          animate={{
            x: [0, 80, -60, 40, 0],
            y: [0, -40, 60, -30, 0],
            scale: [1, 1.3, 0.8, 1.2, 1],
            opacity: [0.5, 1, 0.6, 0.9, 0.5],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Speed lines */}
      {speedLines.map((l) => (
        <motion.div
          key={`sl-${l.id}`}
          className="absolute"
          style={{
            left: `${l.x}%`,
            top: "50%",
            width: l.width,
            height: "1.5px",
            backgroundColor: "var(--cp-border)",
            transform: `rotate(${l.rotation}deg)`,
          }}
          animate={{
            y: [-300, 500],
            opacity: [0, l.opacity, l.opacity, 0],
          }}
          transition={{
            duration: l.duration,
            delay: l.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Pulsing ring effects */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${20 + i * 20}%`,
            top: `${30 + (i % 2) * 40}%`,
            width: 100,
            height: 100,
            border: "1px solid var(--cp-yellow)",
            opacity: 0,
          }}
          animate={{
            scale: [0, 3, 5],
            opacity: [0.4, 0.15, 0],
          }}
          transition={{
            duration: 4,
            delay: i * 2.5,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Shooting stars */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`shoot-${i}`}
          className="absolute"
          style={{
            width: "80px",
            height: "2px",
            background: `linear-gradient(90deg, transparent, var(--cp-yellow), transparent)`,
            filter: "blur(0.5px)",
            opacity: 0,
          }}
          animate={{
            x: [-100, 1200],
            y: [0, 300],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 2,
            delay: 5 + i * 7,
            repeat: Infinity,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  );
}
