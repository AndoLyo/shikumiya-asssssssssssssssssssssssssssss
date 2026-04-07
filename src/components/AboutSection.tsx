"use client";

import { motion } from "framer-motion";
import { useSiteData } from "./SiteDataContext";

const defaultSkills = [
  { label: "キャラクターデザイン", value: 95, color: "var(--cp-red)" },
  { label: "背景・パース", value: 82, color: "var(--cp-blue)" },
  { label: "デジタルペイント", value: 90, color: "var(--cp-yellow)" },
  { label: "AI画像生成", value: 88, color: "var(--cp-red)" },
  { label: "ストーリー構成", value: 78, color: "var(--cp-blue)" },
];

const onomatopoeia = [
  { text: "ドドド", top: "8%", left: "2%", rotate: -15, color: "var(--cp-red)", size: "1.6rem" },
  { text: "ゴゴゴ", bottom: "12%", right: "3%", rotate: 12, color: "var(--cp-border)", size: "1.4rem" },
  { text: "ビリビリ", top: "55%", left: "1%", rotate: -8, color: "var(--cp-blue)", size: "1.1rem" },
  { text: "ズキュン", top: "20%", right: "2%", rotate: 10, color: "var(--cp-yellow)", size: "1.2rem" },
  { text: "ワクワク", top: "35%", left: "3%", rotate: -12, color: "var(--cp-red)", size: "1.3rem" },
  { text: "キラキラ", bottom: "25%", right: "2%", rotate: 15, color: "var(--cp-yellow)", size: "1.5rem" },
  { text: "メラメラ", top: "70%", left: "1%", rotate: -5, color: "var(--cp-red)", size: "1.2rem" },
  { text: "バチバチ", bottom: "40%", right: "4%", rotate: 8, color: "var(--cp-blue)", size: "1.1rem" },
];

function SkillBar({ label, value, color, delay }: { label: string; value: number; color: string; delay: number }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-black uppercase tracking-wide" style={{ color: "var(--cp-text)" }}>{label}</span>
        <motion.span className="text-sm font-black"
          style={{ color: "#ffffff", backgroundColor: color, padding: "0 6px", border: "1.5px solid var(--cp-border)", borderRadius: "2px" }}
          animate={{ boxShadow: [`0 0 0 ${color}`, `0 0 8px ${color}`, `0 0 0 ${color}`] }}
          transition={{ duration: 2, repeat: Infinity, delay: delay + 1 }}>
          {value}
        </motion.span>
      </div>
      <div className="relative h-5 overflow-hidden" style={{ border: "2.5px solid var(--cp-border)", backgroundColor: "#f0f0f0" }}>
        <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle, rgba(26,26,26,0.1) 1px, transparent 1px)`, backgroundSize: "8px 8px" }} />
        <motion.div className="absolute top-0 left-0 h-full" style={{ backgroundColor: color }}
          initial={{ width: "0%" }} whileInView={{ width: `${value}%` }} viewport={{ once: true }}
          transition={{ duration: 1, delay, ease: "easeOut" }}>
          <div className="absolute inset-0 opacity-30"
            style={{ backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.5) 4px, rgba(255,255,255,0.5) 8px)` }} />
          <motion.div className="absolute top-0 right-0 w-2 h-full"
            style={{ background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.8))` }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} />
        </motion.div>
      </div>
    </div>
  );
}

export default function AboutSection() {
  const data = useSiteData();
  const profileImage = data?.profileImage;
  const bioText = data?.bio || "";
  const artistName = data?.artistName || "Sora";

  return (
    <section id="about" className="relative overflow-hidden py-20 px-5 sm:px-8"
      style={{ backgroundColor: "var(--cp-surface)", borderTop: "4px solid var(--cp-border)", borderBottom: "4px solid var(--cp-border)" }}>

      {/* Animated gradient background */}
      <motion.div className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "radial-gradient(ellipse at 20% 30%, rgba(230,57,70,0.04) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(37,99,235,0.04) 0%, transparent 50%)" }} />

      {/* Background halftone */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: `radial-gradient(circle, rgba(26,26,26,0.05) 1px, transparent 1px)`, backgroundSize: "20px 20px" }} />

      {/* Diagonal screen tone */}
      <motion.div className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.02, 0.06, 0.02] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 6px, rgba(26,26,26,0.05) 6px, rgba(26,26,26,0.05) 7px)` }} />

      {/* Onomatopoeia */}
      {onomatopoeia.map((o, i) => (
        <motion.div key={i} className="absolute pointer-events-none font-black select-none"
          style={{ top: o.top, left: (o as { left?: string }).left, right: (o as { right?: string }).right,
            bottom: (o as { bottom?: string }).bottom, rotate: `${o.rotate}deg`, color: o.color, fontSize: o.size,
            WebkitTextStroke: "1px var(--cp-border)", opacity: 0.4, letterSpacing: "0.05em", writingMode: "vertical-rl" }}
          animate={{ opacity: [0.2, 0.5, 0.2], y: [0, -8, 0] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}>
          {o.text}
        </motion.div>
      ))}

      {/* Pulsing energy circles */}
      {[
        { x: "15%", y: "25%", size: 120, color: "var(--cp-red)", delay: 0 },
        { x: "80%", y: "60%", size: 100, color: "var(--cp-blue)", delay: 1.5 },
        { x: "50%", y: "80%", size: 80, color: "var(--cp-yellow)", delay: 3 },
      ].map((ring, i) => (
        <motion.div key={`ring-${i}`} className="absolute rounded-full pointer-events-none"
          style={{ left: ring.x, top: ring.y, width: ring.size, height: ring.size, border: `1px solid ${ring.color}`, opacity: 0 }}
          animate={{ scale: [0.5, 2, 3], opacity: [0.3, 0.1, 0] }}
          transition={{ duration: 4, delay: ring.delay, repeat: Infinity, ease: "easeOut" }} />
      ))}

      {/* Floating sparkle dots */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div key={`sparkle-${i}`} className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
          style={{ left: `${8 + i * 8}%`, top: `${15 + (i % 4) * 20}%`, backgroundColor: ["var(--cp-yellow)", "var(--cp-red)", "var(--cp-blue)"][i % 3] }}
          animate={{ opacity: [0, 0.6, 0], scale: [0.5, 1.5, 0.5], y: [0, -20, 0] }}
          transition={{ duration: 2 + i * 0.3, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }} />
      ))}

      <div className="relative mx-auto max-w-6xl">
        {/* Section header with glow */}
        <motion.div className="mb-12 flex items-center gap-4"
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <motion.div className="px-4 py-2"
            style={{ backgroundColor: "var(--cp-blue)", border: "3px solid var(--cp-border)" }}
            animate={{ boxShadow: ["4px 4px 0 var(--cp-border)", "4px 4px 12px rgba(37,99,235,0.4)", "4px 4px 0 var(--cp-border)"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
            <span className="text-xs font-black uppercase tracking-widest text-white">Chapter 02</span>
          </motion.div>
          <motion.h2 className="text-3xl font-black uppercase md:text-4xl"
            style={{ color: "var(--cp-text)", WebkitTextStroke: "1px var(--cp-border)" }}
            animate={{ textShadow: ["3px 3px 0 rgba(26,26,26,0.12)", "3px 3px 10px rgba(37,99,235,0.3)", "3px 3px 0 rgba(26,26,26,0.12)"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
            ABOUT
          </motion.h2>
          <div className="flex-1 h-[3px]" style={{ backgroundColor: "var(--cp-border)" }} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14">
          {/* Left: Profile panel */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }}>
            {/* Profile image with glow rings */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <motion.div className="absolute -inset-3 rounded-full pointer-events-none"
                  style={{ border: "2px solid var(--cp-yellow)", opacity: 0 }}
                  animate={{ scale: [1, 1.2, 1], opacity: [0, 0.4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
                <motion.div className="absolute -inset-5 rounded-full pointer-events-none"
                  style={{ border: "1px solid var(--cp-red)", opacity: 0 }}
                  animate={{ scale: [1, 1.3, 1], opacity: [0, 0.3, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} />

                <motion.div className="w-36 h-36 rounded-full overflow-hidden flex items-center justify-center"
                  style={{ border: "4px solid var(--cp-border)", background: profileImage ? "var(--cp-surface)" : "linear-gradient(135deg, #FFC107 0%, #E63946 100%)" }}
                  animate={{ boxShadow: ["6px 6px 0 var(--cp-border)", "6px 6px 15px rgba(255,193,7,0.4)", "6px 6px 0 var(--cp-border)"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                  {profileImage ? (
                    <img src={profileImage} alt={artistName} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-6xl" role="img" aria-label="作者">🎨</span>
                  )}
                </motion.div>
                <motion.div className="absolute -bottom-2 -right-2 px-3 py-1 text-xs font-black text-white"
                  style={{ backgroundColor: "var(--cp-red)", border: "2px solid var(--cp-border)", borderRadius: "2px", transform: "rotate(3deg)" }}
                  animate={{ boxShadow: ["2px 2px 0 var(--cp-border)", "2px 2px 8px rgba(230,57,70,0.5)", "2px 2px 0 var(--cp-border)"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                  Artist
                </motion.div>
              </div>
            </div>

            {/* Bio speech bubble with glow */}
            <div className="relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2"
                style={{ width: 0, height: 0, borderLeft: "14px solid transparent", borderRight: "14px solid transparent", borderBottom: "16px solid var(--cp-border)" }} />
              <div className="absolute -top-[13px] left-1/2 -translate-x-1/2"
                style={{ width: 0, height: 0, borderLeft: "12px solid transparent", borderRight: "12px solid transparent", borderBottom: "14px solid var(--cp-surface)", zIndex: 1 }} />
              <motion.div className="relative px-6 py-5"
                style={{ backgroundColor: "var(--cp-surface)", border: "3px solid var(--cp-border)", borderRadius: "8px" }}
                animate={{ boxShadow: ["5px 5px 0 var(--cp-border)", "5px 5px 12px rgba(255,193,7,0.2)", "5px 5px 0 var(--cp-border)"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                <p className="text-sm font-bold leading-relaxed whitespace-pre-wrap" style={{ color: "var(--cp-text)" }}>
                  {bioText || "xdscvSDVsvszdvsdvszvs"}
                </p>

                {data?.motto && (
                  <motion.div className="mt-4 px-4 py-3"
                    style={{ borderLeft: "4px solid var(--cp-yellow)", backgroundColor: "rgba(255,193,7,0.05)" }}
                    animate={{ borderLeftColor: ["var(--cp-yellow)", "var(--cp-red)", "var(--cp-yellow)"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                    <p className="text-xs font-black italic" style={{ color: "var(--cp-text-muted)" }}>
                      &ldquo;{data.motto}&rdquo;
                    </p>
                  </motion.div>
                )}

                {(() => {
                  const items = data ? [
                    ...(data.location ? [{ label: "拠点", value: data.location }] : []),
                    ...(data.artStyle ? [{ label: "スタイル", value: data.artStyle }] : []),
                    ...(data.tools && data.tools.length > 0 ? [{ label: "ツール", value: data.tools.join(", ") }] : []),
                    ...(data.stats && data.stats.length > 0 ? [{ label: "実績", value: data.stats.join(", ") }] : []),
                  ] : [];
                  if (items.length === 0) return null;
                  return (
                    <div className="mt-4 grid grid-cols-2 gap-[2px]" style={{ border: "2px solid var(--cp-border)" }}>
                      {items.map((item, i) => (
                        <div key={i} className="px-3 py-2"
                          style={{ backgroundColor: i % 2 === 0 ? "#f8f8f0" : "var(--cp-surface)",
                            borderRight: i % 2 === 0 ? "2px solid var(--cp-border)" : "none",
                            borderBottom: i < items.length - 2 ? "2px solid var(--cp-border)" : "none" }}>
                          <p className="text-[10px] font-black uppercase tracking-wider" style={{ color: "var(--cp-text-muted)" }}>{item.label}</p>
                          <p className="text-xs font-black mt-0.5" style={{ color: "var(--cp-text)" }}>{item.value}</p>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Skills panel */}
          {(!data || (data.skills && data.skills.length > 0)) && (
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay: 0.1 }}>
              <motion.div className="mb-5 px-4 py-2 inline-flex items-center gap-2"
                style={{ backgroundColor: "var(--cp-yellow)", border: "2.5px solid var(--cp-border)" }}
                animate={{ boxShadow: ["3px 3px 0 var(--cp-border)", "3px 3px 10px rgba(255,193,7,0.4)", "3px 3px 0 var(--cp-border)"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                <span className="text-sm font-black uppercase tracking-wider" style={{ color: "var(--cp-text)" }}>⚡ POWER STATS</span>
              </motion.div>

              <motion.div className="p-5"
                style={{ border: "3px solid var(--cp-border)", backgroundColor: "var(--cp-surface)" }}
                animate={{ boxShadow: ["6px 6px 0 var(--cp-border)", "6px 6px 15px rgba(37,99,235,0.2)", "6px 6px 0 var(--cp-border)"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                {(data?.skills
                  ? data.skills.map((s, i) => ({
                      label: s,
                      value: 80 + Math.floor(Math.random() * 15),
                      color: ["var(--cp-red)", "var(--cp-blue)", "var(--cp-yellow)"][i % 3],
                    }))
                  : defaultSkills
                ).map((skill, i) => (
                  <SkillBar key={skill.label} label={skill.label} value={skill.value} color={skill.color} delay={0.3 + i * 0.12} />
                ))}
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
