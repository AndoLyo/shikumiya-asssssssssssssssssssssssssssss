"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useSiteData } from "./SiteDataContext";

function SpeedLines({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {Array.from({ length: 48 }).map((_, i) => {
        const angle = (i / 48) * 360;
        const rad = (angle * Math.PI) / 180;
        const x1 = 200 + Math.cos(rad) * 40;
        const y1 = 200 + Math.sin(rad) * 40;
        const x2 = 200 + Math.cos(rad) * 240;
        const y2 = 200 + Math.sin(rad) * 240;
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="var(--cp-border)" strokeWidth={i % 4 === 0 ? "3" : i % 2 === 0 ? "1.5" : "0.7"}
            strokeOpacity={i % 3 === 0 ? "0.4" : "0.18"} />
        );
      })}
    </svg>
  );
}

function StarBurst({ size, color, points = 8 }: { size: number; color: string; points?: number }) {
  const cx = size / 2, cy = size / 2, outerR = size / 2, innerR = size / 4;
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
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
      style={{ width: size, height: size, border: `2px solid ${color}`, opacity: 0 }}
      animate={{ scale: [0.3, 1.5, 2.5], opacity: [0.6, 0.2, 0] }}
      transition={{ duration: 3, delay, repeat: Infinity, ease: "easeOut" }}
    />
  );
}

export default function HeroSection() {
  const data = useSiteData();
  const artistName = data?.artistName || "Sora";
  const subtitleText = data?.subtitle || "マンガ作家 ＆ イラストレーター";
  const catchcopyText = data?.catchcopy || "";
  const defaultDescription = "sdasdsadasdas";

  const starBurstsConfig = [
    { top: "6rem", left: "1.5rem", size: 72, color: "var(--cp-yellow)", points: 8, duration: 3, delay: 0 },
    { top: "8rem", right: "1.5rem", size: 56, color: "var(--cp-red)", points: 6, duration: 2.5, delay: 0.5 },
    { bottom: "9rem", left: "2.5rem", size: 44, color: "var(--cp-blue)", points: 6, duration: 4, delay: 1 },
    { bottom: "10rem", right: "2rem", size: 60, color: "var(--cp-yellow)", points: 8, duration: 3.5, delay: 0.8 },
    { top: "14rem", left: "12rem", size: 36, color: "var(--cp-red)", points: 10, duration: 3.2, delay: 1.5 },
    { top: "18rem", right: "14rem", size: 48, color: "var(--cp-blue)", points: 8, duration: 4.5, delay: 2 },
    { top: "10rem", left: "40%", size: 32, color: "var(--cp-yellow)", points: 12, duration: 2.8, delay: 0.3 },
    { bottom: "16rem", right: "35%", size: 28, color: "var(--cp-red)", points: 5, duration: 3.8, delay: 1.2 },
    { top: "50%", left: "3rem", size: 24, color: "var(--cp-blue)", points: 7, duration: 5, delay: 2.5 },
    { top: "45%", right: "4rem", size: 40, color: "var(--cp-yellow)", points: 6, duration: 2.2, delay: 0.7 },
  ];

  const impactTexts = [
    { text: "BANG!", x: "50%", y: "6rem", size: "clamp(3rem, 8vw, 5rem)", color: "var(--cp-yellow)", delay: 0, main: true },
    { text: "POW!", x: "8%", y: "45%", size: "2rem", color: "var(--cp-red)", delay: 1.5, main: false },
    { text: "ZAP!", x: "88%", y: "50%", size: "1.8rem", color: "var(--cp-blue)", delay: 2.2, main: false },
    { text: "BOOM!", x: "12%", y: "70%", size: "1.5rem", color: "var(--cp-yellow)", delay: 3, main: false },
    { text: "CRASH!", x: "82%", y: "35%", size: "1.4rem", color: "var(--cp-red)", delay: 1, main: false },
  ];

  const onomatopoeia = [
    { text: "ドドド", x: "3%", y: "20%", rotate: -15, size: "1.4rem" },
    { text: "ゴゴゴ", x: "93%", y: "60%", rotate: 12, size: "1.3rem" },
    { text: "ビリビリ", x: "5%", y: "65%", rotate: -8, size: "1rem" },
    { text: "ズキュン", x: "90%", y: "25%", rotate: 10, size: "1.1rem" },
    { text: "ガガガ", x: "7%", y: "85%", rotate: -5, size: "1.2rem" },
    { text: "バキバキ", x: "88%", y: "80%", rotate: 7, size: "1rem" },
  ];

  return (
    <section className="relative overflow-hidden pt-28 pb-0 md:pt-36" style={{ backgroundColor: "var(--cp-bg)", minHeight: "90vh" }}>
      {/* Animated gradient overlay */}
      <motion.div className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "radial-gradient(ellipse at 30% 40%, rgba(230,57,70,0.06) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(37,99,235,0.06) 0%, transparent 50%), radial-gradient(ellipse at 50% 20%, rgba(255,193,7,0.05) 0%, transparent 40%)" }}
      />

      {/* Halftone background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: `radial-gradient(circle, rgba(26,26,26,0.07) 1px, transparent 1px)`, backgroundSize: "18px 18px" }} />

      {/* Speed line layers */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <SpeedLines className="w-[600px] h-[600px] md:w-[900px] md:h-[900px] opacity-60" />
      </div>
      <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}>
        <SpeedLines className="w-[500px] h-[500px] md:w-[750px] md:h-[750px] opacity-20" />
      </motion.div>

      {/* Energy rings */}
      <EnergyRing size={200} delay={0} color="var(--cp-yellow)" />
      <EnergyRing size={200} delay={1} color="var(--cp-red)" />
      <EnergyRing size={200} delay={2} color="var(--cp-blue)" />
      <EnergyRing size={300} delay={0.5} color="rgba(255,193,7,0.3)" />
      <EnergyRing size={300} delay={1.5} color="rgba(230,57,70,0.3)" />
      <EnergyRing size={300} delay={2.5} color="rgba(37,99,235,0.3)" />

      {/* Star bursts — 10 total */}
      {starBurstsConfig.map((sb, i) => (
        <motion.div key={`star-${i}`} className="absolute pointer-events-none"
          style={{ top: sb.top, bottom: (sb as Record<string, string | number>).bottom as string | undefined, left: sb.left, right: (sb as Record<string, string | number>).right as string | undefined }}
          animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: sb.duration, repeat: Infinity, ease: "easeInOut", delay: sb.delay }}>
          <StarBurst size={sb.size} color={sb.color} points={sb.points} />
        </motion.div>
      ))}

      {/* Impact texts */}
      {impactTexts.map((t, i) => (
        <motion.div key={`impact-${i}`} className="absolute pointer-events-none select-none"
          style={{ left: t.x, top: t.y, transform: "translateX(-50%)" }}
          initial={{ scale: 0, opacity: 0 }}
          animate={t.main
            ? { scale: [0, 1.2, 1], opacity: [0, 1, 1] }
            : { scale: [0, 1.3, 0.9, 1, 0], opacity: [0, 0.3, 0.2, 0.25, 0] }}
          transition={t.main
            ? { duration: 0.5, ease: "backOut" }
            : { duration: 4, delay: t.delay, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}>
          <span className="font-black uppercase italic"
            style={{ fontSize: t.size, color: t.color, WebkitTextStroke: `${t.main ? 3 : 2}px var(--cp-border)`,
              textShadow: `${t.main ? 5 : 3}px ${t.main ? 5 : 3}px 0 var(--cp-border)`, letterSpacing: "-0.04em", lineHeight: 1 }}>
            {t.text}
          </span>
        </motion.div>
      ))}

      {/* Floating onomatopoeia */}
      {onomatopoeia.map((o, i) => (
        <motion.div key={`ono-${i}`} className="absolute pointer-events-none font-black select-none"
          style={{ left: o.x, top: o.y, fontSize: o.size, color: "var(--cp-border)",
            WebkitTextStroke: "0.5px var(--cp-border)", writingMode: "vertical-rl", opacity: 0.25,
            transform: `rotate(${o.rotate}deg)` }}
          animate={{ opacity: [0.15, 0.35, 0.15], y: [0, -10, 0] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}>
          {o.text}
        </motion.div>
      ))}

      {/* Diagonal screen tone */}
      <motion.div className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.03, 0.08, 0.03] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(26,26,26,0.08) 8px, rgba(26,26,26,0.08) 9px)` }} />

      {/* Corner accents */}
      {[
        { top: "5rem", left: "1rem", bT: "var(--cp-red)", bL: "var(--cp-red)", delay: 0 },
        { top: "5rem", right: "1rem", bT: "var(--cp-blue)", bR: "var(--cp-blue)", delay: 1 },
        { bottom: "5rem", left: "1rem", bB: "var(--cp-yellow)", bL: "var(--cp-yellow)", delay: 0.5 },
        { bottom: "5rem", right: "1rem", bB: "var(--cp-red)", bR: "var(--cp-red)", delay: 1.5 },
      ].map((c, i) => (
        <motion.div key={`corner-${i}`} className="absolute w-16 h-16 pointer-events-none"
          style={{ top: c.top, bottom: c.bottom, left: c.left, right: c.right,
            borderTop: c.bT ? `4px solid ${c.bT}` : "none", borderBottom: c.bB ? `4px solid ${c.bB}` : "none",
            borderLeft: c.bL ? `4px solid ${c.bL}` : "none", borderRight: c.bR ? `4px solid ${c.bR}` : "none" }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: c.delay }} />
      ))}

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center pt-16 md:pt-20">
        <motion.div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 text-xs font-black uppercase tracking-widest"
          style={{ backgroundColor: "var(--cp-blue)", color: "#ffffff", border: "2.5px solid var(--cp-border)",
            borderRadius: "2px", boxShadow: "3px 3px 0 var(--cp-border)" }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0, boxShadow: ["3px 3px 0 var(--cp-border)", "3px 3px 12px var(--cp-blue)", "3px 3px 0 var(--cp-border)"] }}
          transition={{ duration: 0.5, delay: 0.15, boxShadow: { duration: 2, repeat: Infinity, delay: 1 } }}>
          ★ {subtitleText} ★
        </motion.div>

        <motion.h1 className="mb-6 text-5xl font-black uppercase leading-none md:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}>
          <motion.span
            style={{ color: "var(--cp-bg)", WebkitTextStroke: "3px var(--cp-border)", display: "block",
              textShadow: "4px 4px 0 var(--cp-border)", letterSpacing: "-0.02em" }}
            animate={{ textShadow: ["4px 4px 0 var(--cp-border)", "4px 4px 20px rgba(230,57,70,0.5)", "4px 4px 0 var(--cp-border)"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
            {artistName}
          </motion.span>
        </motion.h1>

        <motion.div className="mx-auto mb-8 max-w-lg px-6 py-4"
          style={{ backgroundColor: "var(--cp-surface)", border: "3px solid var(--cp-border)", borderRadius: "0px", position: "relative" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0, boxShadow: ["6px 6px 0 var(--cp-border)", "6px 6px 15px rgba(255,193,7,0.3)", "6px 6px 0 var(--cp-border)"] }}
          transition={{ duration: 0.6, delay: 0.4, boxShadow: { duration: 2.5, repeat: Infinity, delay: 2 } }}>
          <span className="absolute -top-3 -left-3 text-xs font-black px-1.5 py-0.5"
            style={{ backgroundColor: "var(--cp-yellow)", border: "2px solid var(--cp-border)", color: "var(--cp-text)" }}>
            P.1
          </span>
          <p className="text-base font-bold leading-relaxed" style={{ color: "var(--cp-text)" }}>
            {catchcopyText || defaultDescription}
          </p>
        </motion.div>

        <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}>
          <motion.a href="#works"
            className="relative px-8 py-3.5 text-sm font-black uppercase tracking-wider text-white transition-all duration-150 hover:translate-x-[-2px] hover:translate-y-[-2px]"
            style={{ backgroundColor: "var(--cp-red)", border: "3px solid var(--cp-border)", borderRadius: "4px", boxShadow: "5px 5px 0 var(--cp-border)" }}
            animate={{ boxShadow: ["5px 5px 0 var(--cp-border)", "5px 5px 20px rgba(230,57,70,0.4)", "5px 5px 0 var(--cp-border)"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
            作品を読む ▶
          </motion.a>
          <motion.a href="#about"
            className="relative px-8 py-3.5 text-sm font-black uppercase tracking-wider transition-all duration-150 hover:translate-x-[-2px] hover:translate-y-[-2px]"
            style={{ backgroundColor: "var(--cp-yellow)", border: "3px solid var(--cp-border)", borderRadius: "4px",
              boxShadow: "5px 5px 0 var(--cp-border)", color: "var(--cp-text)" }}
            animate={{ boxShadow: ["5px 5px 0 var(--cp-border)", "5px 5px 20px rgba(255,193,7,0.4)", "5px 5px 0 var(--cp-border)"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
            ABOUT ME
          </motion.a>
        </motion.div>

        {data?.stats && data.stats.length > 0 && (
          <motion.div className="mt-14 grid grid-cols-3 gap-0 mx-auto max-w-sm"
            style={{ border: "3px solid var(--cp-border)", boxShadow: "5px 5px 0 var(--cp-border)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}>
            {data.stats.slice(0, 3).map((s, i) => {
              const parts = s.split(":");
              return (
                <div key={i} className="py-4 text-center"
                  style={{ borderRight: i < 2 ? "3px solid var(--cp-border)" : "none",
                    backgroundColor: i === 0 ? "var(--cp-yellow)" : i === 1 ? "var(--cp-surface)" : "var(--cp-red)" }}>
                  <p className="text-xl font-black" style={{ color: i === 2 ? "#ffffff" : "var(--cp-text)" }}>{parts[0] || s}</p>
                  <p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: i === 2 ? "rgba(255,255,255,0.85)" : "var(--cp-text-muted)" }}>{parts[1] || ""}</p>
                </div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      <motion.div className="relative z-10 flex flex-col items-center gap-1 mt-10 pb-8"
        animate={{ y: [0, 8, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
        <span className="text-xs font-black uppercase tracking-widest" style={{ color: "var(--cp-text-muted)" }}>READ MORE</span>
        <ChevronDown size={20} style={{ color: "var(--cp-border)" }} />
      </motion.div>

      {/* Bottom animated gradient bar */}
      <div className="w-full mt-4 hero-gradient-bar" style={{ height: "6px" }} />
    </section>
  );
}
