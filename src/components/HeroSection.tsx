"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useSiteData } from "./SiteDataContext";

function SpeedLines({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {Array.from({ length: 48 }).map((_, i) => {
        const angle = (i / 48) * 360;
        const rad = (angle * Math.PI) / 180;
        const x1 = 200 + Math.cos(rad) * 40;
        const y1 = 200 + Math.sin(rad) * 40;
        const x2 = 200 + Math.cos(rad) * 250;
        const y2 = 200 + Math.sin(rad) * 250;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="var(--cp-border)"
            strokeWidth={i % 4 === 0 ? "3" : i % 2 === 0 ? "1.5" : "0.8"}
            strokeOpacity={i % 3 === 0 ? "0.5" : "0.2"}
          />
        );
      })}
    </svg>
  );
}

function StarBurst({
  size,
  color,
  points = 8,
}: {
  size: number;
  color: string;
  points?: number;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2;
  const innerR = size / 4;
  const pts: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = (i * Math.PI) / points - Math.PI / 2;
    pts.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <polygon points={pts.join(" ")} fill={color} stroke="var(--cp-border)" strokeWidth="2" />
    </svg>
  );
}

function EnergyRing({ size, delay, color }: { size: number; delay: number; color: string }) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full"
      style={{
        width: size,
        height: size,
        border: `2px solid ${color}`,
        opacity: 0,
      }}
      animate={{
        scale: [0.2, 2.5],
        opacity: [0.5, 0],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
}

export default function HeroSection() {
  const data = useSiteData();
  const artistName = data?.artistName || "Sora";
  const subtitleText = data?.subtitle || "Art Portfolio";
  const catchcopyText = data?.catchcopy || "sdasdsadasdas";

  return (
    <section
      className="relative overflow-hidden pt-28 pb-0 md:pt-36"
      style={{ backgroundColor: "var(--cp-bg)", minHeight: "90vh" }}
    >
      {/* Animated gradient background pulse */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle at 30% 40%, rgba(230,57,70,0.08) 0%, transparent 50%)",
            "radial-gradient(circle at 70% 60%, rgba(37,99,235,0.08) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 30%, rgba(255,193,7,0.08) 0%, transparent 50%)",
            "radial-gradient(circle at 30% 40%, rgba(230,57,70,0.08) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Halftone background - denser */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(26,26,26,0.1) 1.5px, transparent 1.5px)`,
          backgroundSize: "14px 14px",
        }}
      />

      {/* Double speed lines - main + rotating */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <SpeedLines className="w-[700px] h-[700px] md:w-[1100px] md:h-[1100px] opacity-70" />
      </div>
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <SpeedLines className="w-[500px] h-[500px] md:w-[800px] md:h-[800px] opacity-30" />
      </motion.div>

      {/* Energy rings pulsing from center */}
      <EnergyRing size={300} delay={0} color="var(--cp-red)" />
      <EnergyRing size={300} delay={1} color="var(--cp-yellow)" />
      <EnergyRing size={300} delay={2} color="var(--cp-blue)" />
      <EnergyRing size={400} delay={0.5} color="var(--cp-red)" />
      <EnergyRing size={400} delay={1.5} color="var(--cp-yellow)" />

      {/* 10 star bursts */}
      <motion.div className="absolute top-20 left-4 md:left-12 pointer-events-none"
        animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
        <StarBurst size={72} color="var(--cp-yellow)" />
      </motion.div>
      <motion.div className="absolute top-28 right-4 md:right-16 pointer-events-none"
        animate={{ rotate: [0, -25, 25, 0], scale: [1, 1.2, 0.85, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}>
        <StarBurst size={56} color="var(--cp-red)" points={6} />
      </motion.div>
      <motion.div className="absolute bottom-32 left-8 md:left-28 pointer-events-none"
        animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}>
        <StarBurst size={48} color="var(--cp-blue)" points={6} />
      </motion.div>
      <motion.div className="absolute bottom-36 right-6 md:right-24 pointer-events-none"
        animate={{ rotate: [0, -18, 18, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
        <StarBurst size={64} color="var(--cp-yellow)" />
      </motion.div>
      <motion.div className="absolute top-1/2 left-2 md:left-8 pointer-events-none"
        animate={{ rotate: [0, 30, -30, 0], scale: [0.8, 1.3, 0.8] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}>
        <StarBurst size={36} color="var(--cp-red)" points={10} />
      </motion.div>
      <motion.div className="absolute top-1/3 right-2 md:right-10 pointer-events-none"
        animate={{ rotate: [0, -20, 20, 0], scale: [1, 1.25, 0.9, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 2 }}>
        <StarBurst size={44} color="var(--cp-blue)" />
      </motion.div>
      <motion.div className="absolute top-16 left-1/4 pointer-events-none"
        animate={{ rotate: [0, 15, -10, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}>
        <StarBurst size={32} color="var(--cp-yellow)" points={5} />
      </motion.div>
      <motion.div className="absolute bottom-48 left-1/3 pointer-events-none"
        animate={{ rotate: [0, -12, 12, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}>
        <StarBurst size={28} color="var(--cp-red)" points={12} />
      </motion.div>
      <motion.div className="absolute top-40 left-[60%] pointer-events-none"
        animate={{ rotate: [0, 25, -15, 0], scale: [0.9, 1.2, 0.9] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}>
        <StarBurst size={24} color="var(--cp-blue)" points={5} />
      </motion.div>
      <motion.div className="absolute bottom-52 right-[35%] pointer-events-none"
        animate={{ rotate: [0, -15, 15, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}>
        <StarBurst size={38} color="var(--cp-yellow)" points={7} />
      </motion.div>

      {/* Floating onomatopoeia */}
      {[
        { text: "ドドド", x: "5%", y: "20%", rotate: -15, color: "var(--cp-red)", size: "1.8rem" },
        { text: "ゴゴゴ", x: "88%", y: "35%", rotate: 10, color: "var(--cp-border)", size: "1.6rem" },
        { text: "バキ!", x: "8%", y: "70%", rotate: -8, color: "var(--cp-blue)", size: "1.4rem" },
        { text: "ズドン", x: "92%", y: "75%", rotate: 12, color: "var(--cp-yellow)", size: "1.5rem" },
        { text: "ドーン", x: "15%", y: "45%", rotate: -20, color: "var(--cp-red)", size: "1.2rem" },
        { text: "ガガガ", x: "82%", y: "55%", rotate: 8, color: "var(--cp-blue)", size: "1.3rem" },
      ].map((o, i) => (
        <motion.div
          key={`ono-${i}`}
          className="absolute pointer-events-none font-black select-none"
          style={{
            left: o.x, top: o.y, rotate: `${o.rotate}deg`,
            color: o.color, fontSize: o.size,
            WebkitTextStroke: "1px var(--cp-border)",
            writingMode: "vertical-rl",
          }}
          animate={{ opacity: [0.15, 0.45, 0.15], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
        >
          {o.text}
        </motion.div>
      ))}

      {/* BANG impact text with glitch effect */}
      <motion.div
        className="absolute top-24 md:top-28 left-1/2 -translate-x-1/2 pointer-events-none select-none"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.3, 1], opacity: 1 }}
        transition={{ duration: 0.5, ease: "backOut" }}
      >
        <motion.span
          className="text-6xl md:text-8xl font-black uppercase italic"
          style={{
            color: "var(--cp-yellow)",
            WebkitTextStroke: "3px var(--cp-border)",
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
          animate={{
            textShadow: [
              "5px 5px 0 var(--cp-border), -2px -2px 0 var(--cp-red)",
              "7px 3px 0 var(--cp-border), -3px 2px 0 var(--cp-blue)",
              "4px 6px 0 var(--cp-border), 2px -3px 0 var(--cp-red)",
              "5px 5px 0 var(--cp-border), -2px -2px 0 var(--cp-red)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          BANG!
        </motion.span>
      </motion.div>

      {/* Secondary impact texts */}
      <motion.div
        className="absolute top-40 md:top-44 left-[15%] pointer-events-none select-none"
        animate={{ opacity: [0, 0.3, 0], scale: [0.5, 1.2, 0.5], rotate: [-10, 5, -10] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1, ease: "easeInOut" }}
      >
        <span className="text-3xl md:text-4xl font-black uppercase italic"
          style={{ color: "var(--cp-red)", WebkitTextStroke: "2px var(--cp-border)", textShadow: "3px 3px 0 var(--cp-border)" }}>
          POW!
        </span>
      </motion.div>
      <motion.div
        className="absolute top-36 md:top-40 right-[12%] pointer-events-none select-none"
        animate={{ opacity: [0, 0.25, 0], scale: [0.5, 1.1, 0.5], rotate: [8, -5, 8] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 2, ease: "easeInOut" }}
      >
        <span className="text-2xl md:text-3xl font-black uppercase italic"
          style={{ color: "var(--cp-blue)", WebkitTextStroke: "2px var(--cp-border)", textShadow: "3px 3px 0 var(--cp-border)" }}>
          ZAP!
        </span>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center pt-16 md:pt-20">
        {/* Genre badge with hover effect */}
        <motion.div
          className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 text-xs font-black uppercase tracking-widest"
          style={{
            backgroundColor: "var(--cp-blue)",
            color: "#ffffff",
            border: "2.5px solid var(--cp-border)",
            borderRadius: "2px",
            boxShadow: "3px 3px 0 var(--cp-border)",
          }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          whileHover={{ scale: 1.1, rotate: -2 }}
        >
          ★ {subtitleText} ★
        </motion.div>

        {/* Title with glow cycle */}
        <motion.h1
          className="mb-6 text-5xl font-black uppercase leading-none md:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
        >
          <motion.span
            style={{
              color: "var(--cp-bg)",
              WebkitTextStroke: "3px var(--cp-border)",
              display: "block",
              letterSpacing: "-0.02em",
            }}
            animate={{
              textShadow: [
                "4px 4px 0 var(--cp-border), 0 0 30px rgba(255,193,7,0.3)",
                "4px 4px 0 var(--cp-border), 0 0 60px rgba(230,57,70,0.4)",
                "4px 4px 0 var(--cp-border), 0 0 40px rgba(37,99,235,0.3)",
                "4px 4px 0 var(--cp-border), 0 0 30px rgba(255,193,7,0.3)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {artistName}
          </motion.span>
        </motion.h1>

        {/* Description panel */}
        <motion.div
          className="mx-auto mb-8 max-w-lg px-6 py-4"
          style={{
            backgroundColor: "var(--cp-surface)",
            border: "3px solid var(--cp-border)",
            boxShadow: "6px 6px 0 var(--cp-border)",
            position: "relative",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ boxShadow: "8px 8px 0 var(--cp-border)", scale: 1.02 }}
        >
          <span
            className="absolute -top-3 -left-3 text-xs font-black px-1.5 py-0.5"
            style={{
              backgroundColor: "var(--cp-yellow)",
              border: "2px solid var(--cp-border)",
              color: "var(--cp-text)",
            }}
          >
            P.1
          </span>
          <p className="text-base font-bold leading-relaxed" style={{ color: "var(--cp-text)" }}>
            {catchcopyText}
          </p>
        </motion.div>

        {/* CTA buttons with pulse glow */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          <motion.a
            href="#works"
            className="relative px-8 py-3.5 text-sm font-black uppercase tracking-wider text-white"
            style={{
              backgroundColor: "var(--cp-red)",
              border: "3px solid var(--cp-border)",
              borderRadius: "4px",
            }}
            whileHover={{ scale: 1.08, x: -3, y: -3 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "5px 5px 0 var(--cp-border)",
                "5px 5px 15px rgba(230,57,70,0.5)",
                "5px 5px 0 var(--cp-border)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            作品を見る ▶
          </motion.a>
          <motion.a
            href="#about"
            className="relative px-8 py-3.5 text-sm font-black uppercase tracking-wider"
            style={{
              backgroundColor: "var(--cp-yellow)",
              border: "3px solid var(--cp-border)",
              borderRadius: "4px",
              boxShadow: "5px 5px 0 var(--cp-border)",
              color: "var(--cp-text)",
            }}
            whileHover={{ scale: 1.08, x: -3, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            ABOUT ME
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator enhanced */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-1 mt-16 pb-8"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.span
          className="text-xs font-black uppercase tracking-widest"
          style={{ color: "var(--cp-text-muted)" }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          SCROLL DOWN
        </motion.span>
        <ChevronDown size={24} style={{ color: "var(--cp-border)" }} />
        <ChevronDown size={20} style={{ color: "var(--cp-border)", marginTop: -12, opacity: 0.5 }} />
      </motion.div>

      {/* Bottom border with glow cycle */}
      <motion.div
        className="w-full mt-4"
        style={{ height: "6px", backgroundColor: "var(--cp-border)" }}
        animate={{
          boxShadow: [
            "0 0 10px rgba(255,193,7,0.3)",
            "0 0 25px rgba(230,57,70,0.4)",
            "0 0 10px rgba(37,99,235,0.3)",
            "0 0 10px rgba(255,193,7,0.3)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
}
