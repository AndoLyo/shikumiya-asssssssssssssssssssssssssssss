"use client";

import { motion } from "framer-motion";
import { useSiteData } from "./SiteDataContext";

function DataWorkCard({ work, index }: { work: { src: string; title: string }; index: number }) {
  return (
    <motion.div
      className="relative overflow-hidden group"
      style={{ border: "3px solid var(--cp-border)", backgroundColor: "var(--cp-surface)" }}
      initial={{ opacity: 0, scale: 0.9, rotate: -1 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ scale: 1.05, zIndex: 10, boxShadow: "10px 10px 0 var(--cp-border)", rotate: 1, transition: { duration: 0.15 } }}
    >
      <motion.div className="absolute top-2 left-2 z-10 px-1.5 py-0.5 text-[10px] font-black"
        style={{ backgroundColor: "rgba(255,255,255,0.9)", border: "1.5px solid var(--cp-border)", color: "var(--cp-text)", lineHeight: 1.2 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, delay: index * 0.3, repeat: Infinity, ease: "easeInOut" }}>
        P.{String(index + 1).padStart(2, "0")}
      </motion.div>

      <img src={work.src} alt={work.title}
        className="w-full h-auto block transition-transform duration-500 group-hover:scale-110"
        style={{ objectFit: "contain" }} />

      {/* Halftone overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10"
        style={{ backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)`, backgroundSize: "10px 10px" }} />

      {/* Shimmer sweep effect on hover */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)", backgroundSize: "200% 100%", animation: "shimmerSweep 1.5s ease-in-out" }} />

      {/* Hover overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ background: "linear-gradient(to top, rgba(26,26,26,0.9) 0%, rgba(26,26,26,0.4) 40%, transparent 100%)" }}>
        <p className="text-sm font-black text-white leading-tight">{work.title}</p>
      </div>

      {/* Corner flash */}
      <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        style={{ background: "linear-gradient(225deg, rgba(255,255,255,0.4) 0%, transparent 60%)" }} />

      {/* Bottom glow on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: "linear-gradient(90deg, var(--cp-red), var(--cp-yellow), var(--cp-blue))" }} />
    </motion.div>
  );
}

export default function WorksSection() {
  const data = useSiteData();
  const hasDataWorks = data?.works && data.works.length > 0;

  // Floating onomatopoeia for Works section
  const worksOno = [
    { text: "ドン!", x: "3%", y: "15%", rotate: -10, size: "1.3rem" },
    { text: "バーン", x: "92%", y: "30%", rotate: 8, size: "1.2rem" },
    { text: "ザザザ", x: "4%", y: "60%", rotate: -6, size: "1rem" },
    { text: "ゴォォ", x: "90%", y: "75%", rotate: 12, size: "1.1rem" },
  ];

  return (
    <section id="works" className="relative py-16 px-5 sm:px-8 overflow-hidden" style={{ backgroundColor: "var(--cp-bg)" }}>
      {/* Animated background gradient */}
      <motion.div className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(230,57,70,0.05) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 70%, rgba(37,99,235,0.05) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, rgba(255,193,7,0.05) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 30%, rgba(230,57,70,0.05) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />

      {/* Halftone dots */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: `radial-gradient(circle, rgba(26,26,26,0.04) 1px, transparent 1px)`, backgroundSize: "24px 24px" }} />

      {/* Diagonal speed lines */}
      <motion.div className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.02, 0.06, 0.02] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ backgroundImage: `repeating-linear-gradient(135deg, transparent, transparent 10px, rgba(26,26,26,0.04) 10px, rgba(26,26,26,0.04) 11px)` }} />

      {/* Floating sparks — 16 */}
      {Array.from({ length: 16 }).map((_, i) => (
        <motion.div key={`wspark-${i}`} className="absolute pointer-events-none rounded-full"
          style={{ left: `${5 + i * 6}%`, top: `${10 + (i % 5) * 18}%`,
            width: 2 + (i % 4) * 1.5, height: 2 + (i % 4) * 1.5,
            backgroundColor: ["var(--cp-yellow)", "var(--cp-red)", "var(--cp-blue)", "var(--cp-yellow)"][i % 4] }}
          animate={{ y: [0, -25, 10, -15, 0], opacity: [0.1, 0.5, 0.1], scale: [0.8, 1.4, 0.8] }}
          transition={{ duration: 3 + i * 0.4, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }} />
      ))}

      {/* Pulsing energy rings */}
      {[
        { x: "25%", y: "20%", delay: 0, color: "var(--cp-red)" },
        { x: "75%", y: "50%", delay: 2, color: "var(--cp-blue)" },
        { x: "50%", y: "80%", delay: 4, color: "var(--cp-yellow)" },
      ].map((ring, i) => (
        <motion.div key={`wring-${i}`} className="absolute w-24 h-24 rounded-full pointer-events-none"
          style={{ left: ring.x, top: ring.y, border: `1px solid ${ring.color}`, opacity: 0 }}
          animate={{ scale: [0.5, 2.5, 4], opacity: [0.25, 0.08, 0] }}
          transition={{ duration: 5, delay: ring.delay, repeat: Infinity, ease: "easeOut" }} />
      ))}

      {/* Onomatopoeia */}
      {worksOno.map((o, i) => (
        <motion.div key={`wono-${i}`} className="absolute pointer-events-none font-black select-none"
          style={{ left: o.x, top: o.y, fontSize: o.size, color: "var(--cp-border)",
            WebkitTextStroke: "0.5px var(--cp-border)", writingMode: "vertical-rl", opacity: 0.2,
            transform: `rotate(${o.rotate}deg)` }}
          animate={{ opacity: [0.1, 0.3, 0.1], y: [0, -6, 0] }}
          transition={{ duration: 3.5 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}>
          {o.text}
        </motion.div>
      ))}

      <div className="mx-auto max-w-6xl">
        {/* Section header with glow */}
        <motion.div className="mb-10 flex items-center gap-4"
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <motion.div className="px-4 py-2"
            style={{ backgroundColor: "var(--cp-red)", border: "3px solid var(--cp-border)" }}
            animate={{ boxShadow: ["4px 4px 0 var(--cp-border)", "4px 4px 12px rgba(230,57,70,0.4)", "4px 4px 0 var(--cp-border)"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.05, rotate: -2 }}>
            <span className="text-xs font-black uppercase tracking-widest text-white">Chapter 01</span>
          </motion.div>
          <motion.h2 className="text-3xl font-black uppercase md:text-4xl"
            style={{ color: "var(--cp-text)", WebkitTextStroke: "1px var(--cp-border)" }}
            animate={{ textShadow: ["3px 3px 0 rgba(26,26,26,0.12)", "3px 3px 12px rgba(230,57,70,0.3)", "3px 3px 0 rgba(26,26,26,0.12)"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
            WORKS
          </motion.h2>
          <motion.div className="flex-1 h-[3px]" style={{ backgroundColor: "var(--cp-border)" }}
            animate={{ background: ["var(--cp-border)", "linear-gradient(90deg, var(--cp-border), var(--cp-red), var(--cp-border))", "var(--cp-border)"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
        </motion.div>

        {/* Works grid with animated glow */}
        {hasDataWorks && (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-[4px]"
            style={{ border: "3px solid var(--cp-border)", backgroundColor: "var(--cp-border)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            animate={{ boxShadow: ["8px 8px 0 var(--cp-border)", "8px 8px 20px rgba(255,193,7,0.15)", "8px 8px 0 var(--cp-border)"] }}
          >
            {data!.works.map((work, i) => (
              <DataWorkCard key={i} work={work} index={i} />
            ))}
          </motion.div>
        )}

        {/* View more button */}
        <motion.div className="mt-8 flex justify-center"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
          <motion.a href="#contact"
            className="px-8 py-3 text-sm font-black uppercase tracking-wider"
            style={{ backgroundColor: "var(--cp-surface)", border: "3px solid var(--cp-border)", color: "var(--cp-text)" }}
            whileHover={{ scale: 1.05, x: -3, y: -3 }}
            whileTap={{ scale: 0.95 }}
            animate={{ boxShadow: ["5px 5px 0 var(--cp-border)", "5px 5px 12px rgba(255,193,7,0.3)", "5px 5px 0 var(--cp-border)"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
            MORE WORKS →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
