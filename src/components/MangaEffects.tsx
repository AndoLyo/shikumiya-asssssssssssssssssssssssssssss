"use client";

import { motion } from "framer-motion";

const floatingTexts = [
  { text: "BOOM!", x: "5%", y: "15%", rotate: -12, color: "var(--cp-red)", size: "2.5rem", delay: 0 },
  { text: "POW!", x: "85%", y: "25%", rotate: 8, color: "var(--cp-yellow)", size: "2rem", delay: 1.5 },
  { text: "ZAP!", x: "10%", y: "55%", rotate: -5, color: "var(--cp-blue)", size: "1.8rem", delay: 0.8 },
  { text: "WHAM!", x: "90%", y: "65%", rotate: 15, color: "var(--cp-red)", size: "2.2rem", delay: 2 },
  { text: "CRASH!", x: "15%", y: "80%", rotate: -10, color: "var(--cp-yellow)", size: "1.6rem", delay: 3 },
  { text: "BAM!", x: "80%", y: "85%", rotate: 6, color: "var(--cp-blue)", size: "2rem", delay: 1 },
  { text: "KAPOW!", x: "50%", y: "10%", rotate: -3, color: "var(--cp-red)", size: "1.4rem", delay: 2.5 },
  { text: "WHOOSH!", x: "70%", y: "45%", rotate: 12, color: "var(--cp-yellow)", size: "1.3rem", delay: 0.5 },
];

const explosionBursts = [
  { x: "20%", y: "30%", size: 80, delay: 0 },
  { x: "75%", y: "20%", size: 60, delay: 2 },
  { x: "40%", y: "70%", size: 70, delay: 4 },
  { x: "85%", y: "55%", size: 50, delay: 1 },
  { x: "10%", y: "90%", size: 65, delay: 3 },
];

function ExplosionBurst({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) {
  const points = 12;
  const pts: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? size / 2 : size / 5;
    const angle = (i * Math.PI) / points - Math.PI / 2;
    pts.push(`${size / 2 + r * Math.cos(angle)},${size / 2 + r * Math.sin(angle)}`);
  }

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      animate={{
        scale: [0, 1.2, 0.9, 1, 0],
        opacity: [0, 0.15, 0.12, 0.1, 0],
        rotate: [0, 15, -10, 5, 0],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        repeatDelay: 6,
        ease: "easeInOut",
      }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <polygon
          points={pts.join(" ")}
          fill="var(--cp-yellow)"
          stroke="var(--cp-border)"
          strokeWidth="1.5"
          opacity="0.5"
        />
      </svg>
    </motion.div>
  );
}

export default function MangaEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden">
      {/* Floating onomatopoeia */}
      {floatingTexts.map((t, i) => (
        <motion.div
          key={i}
          className="absolute font-black italic select-none"
          style={{
            left: t.x,
            top: t.y,
            fontSize: t.size,
            color: t.color,
            WebkitTextStroke: "1.5px var(--cp-border)",
            textShadow: "3px 3px 0 var(--cp-border)",
            opacity: 0,
          }}
          animate={{
            opacity: [0, 0.12, 0.08, 0.15, 0],
            scale: [0.5, 1.3, 1, 1.1, 0.5],
            rotate: [t.rotate - 10, t.rotate + 5, t.rotate, t.rotate + 3, t.rotate - 10],
            y: [0, -20, -10, -15, 0],
          }}
          transition={{
            duration: 6,
            delay: t.delay,
            repeat: Infinity,
            repeatDelay: 4,
            ease: "easeInOut",
          }}
        >
          {t.text}
        </motion.div>
      ))}

      {/* Explosion bursts */}
      {explosionBursts.map((b, i) => (
        <ExplosionBurst key={i} {...b} />
      ))}

      {/* Floating speed lines */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute pointer-events-none"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
            width: 60 + i * 10,
            height: 2,
            backgroundColor: "var(--cp-border)",
            opacity: 0,
            rotate: `${-30 + i * 8}deg`,
          }}
          animate={{
            opacity: [0, 0.15, 0],
            x: [-20, 40],
            scaleX: [0.3, 1.5, 0.3],
          }}
          transition={{
            duration: 2,
            delay: i * 0.8,
            repeat: Infinity,
            repeatDelay: 5,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
