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
  // Extra impact texts for 5x effects
  { text: "SMASH!", x: "25%", y: "35%", rotate: -8, color: "var(--cp-red)", size: "1.6rem", delay: 4 },
  { text: "THWACK!", x: "65%", y: "20%", rotate: 10, color: "var(--cp-blue)", size: "1.5rem", delay: 3.5 },
  { text: "CRACK!", x: "40%", y: "75%", rotate: -6, color: "var(--cp-yellow)", size: "1.7rem", delay: 1.8 },
  { text: "SLAM!", x: "75%", y: "70%", rotate: 14, color: "var(--cp-red)", size: "1.4rem", delay: 5 },
];

const explosionBursts = [
  { x: "20%", y: "30%", size: 80, delay: 0 },
  { x: "75%", y: "20%", size: 60, delay: 2 },
  { x: "40%", y: "70%", size: 70, delay: 4 },
  { x: "85%", y: "55%", size: 50, delay: 1 },
  { x: "10%", y: "90%", size: 65, delay: 3 },
  // Extra bursts
  { x: "55%", y: "40%", size: 55, delay: 5 },
  { x: "30%", y: "15%", size: 45, delay: 6 },
  { x: "65%", y: "85%", size: 60, delay: 3.5 },
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
    <motion.div className="absolute pointer-events-none" style={{ left: x, top: y }}
      animate={{ scale: [0, 1.2, 0.9, 1, 0], opacity: [0, 0.18, 0.12, 0.1, 0], rotate: [0, 15, -10, 5, 0] }}
      transition={{ duration: 4, delay, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <polygon points={pts.join(" ")} fill="var(--cp-yellow)" stroke="var(--cp-border)" strokeWidth="1.5" opacity="0.5" />
      </svg>
    </motion.div>
  );
}

export default function MangaEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden">
      {/* Floating onomatopoeia — 12 total */}
      {floatingTexts.map((t, i) => (
        <motion.div key={i} className="absolute font-black italic select-none"
          style={{ left: t.x, top: t.y, fontSize: t.size, color: t.color,
            WebkitTextStroke: "1.5px var(--cp-border)", textShadow: "3px 3px 0 var(--cp-border)", opacity: 0 }}
          animate={{
            opacity: [0, 0.15, 0.08, 0.18, 0],
            scale: [0.5, 1.3, 1, 1.1, 0.5],
            rotate: [t.rotate - 10, t.rotate + 5, t.rotate, t.rotate + 3, t.rotate - 10],
            y: [0, -20, -10, -15, 0],
          }}
          transition={{ duration: 5, delay: t.delay, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}>
          {t.text}
        </motion.div>
      ))}

      {/* Explosion bursts — 8 total */}
      {explosionBursts.map((b, i) => (
        <ExplosionBurst key={i} {...b} />
      ))}

      {/* Floating speed lines — 12 total */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div key={`line-${i}`} className="absolute pointer-events-none"
          style={{ left: `${5 + i * 8}%`, top: `${15 + (i % 4) * 20}%`,
            width: 40 + i * 10, height: 2, backgroundColor: "var(--cp-border)", opacity: 0,
            rotate: `${-30 + i * 6}deg` }}
          animate={{ opacity: [0, 0.18, 0], x: [-20, 50], scaleX: [0.3, 1.5, 0.3] }}
          transition={{ duration: 1.8, delay: i * 0.6, repeat: Infinity, repeatDelay: 4, ease: "easeOut" }} />
      ))}

      {/* Floating diamonds */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div key={`dia-${i}`} className="absolute pointer-events-none"
          style={{ left: `${15 + i * 14}%`, top: `${25 + (i % 3) * 20}%`,
            width: 8 + i * 2, height: 8 + i * 2,
            border: `1.5px solid ${["var(--cp-yellow)", "var(--cp-red)", "var(--cp-blue)"][i % 3]}`,
            transform: "rotate(45deg)", opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0], scale: [0.5, 1.2, 0.5], y: [0, -30, 0] }}
          transition={{ duration: 4, delay: i * 1.2, repeat: Infinity, ease: "easeInOut" }} />
      ))}

      {/* Glowing horizontal lines */}
      {[20, 45, 70].map((top, i) => (
        <motion.div key={`gline-${i}`} className="absolute left-0 right-0 pointer-events-none"
          style={{ top: `${top}%`, height: "1px" }}
          animate={{
            background: [
              "linear-gradient(90deg, transparent 0%, transparent 100%)",
              `linear-gradient(90deg, transparent 20%, ${["var(--cp-red)", "var(--cp-yellow)", "var(--cp-blue)"][i]} 50%, transparent 80%)`,
              "linear-gradient(90deg, transparent 0%, transparent 100%)",
            ],
            opacity: [0, 0.12, 0],
          }}
          transition={{ duration: 6, delay: i * 3, repeat: Infinity, ease: "easeInOut" }} />
      ))}
    </div>
  );
}
