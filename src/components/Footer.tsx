"use client";

import { motion } from "framer-motion";
import { AtSign, Camera } from "lucide-react";
import { useSiteData } from "./SiteDataContext";

export default function Footer() {
  const data = useSiteData();
  const artistName = data?.artistName || "Sora";

  const socialLinks = [
    ...(data?.snsX ? [{ icon: AtSign, href: data.snsX, label: "X (Twitter)" }] : []),
    ...(data?.snsInstagram ? [{ icon: Camera, href: data.snsInstagram, label: "Instagram" }] : []),
  ];

  return (
    <footer className="relative overflow-hidden"
      style={{ backgroundColor: "var(--cp-border)", borderTop: "4px solid var(--cp-border)" }}>

      {/* Animated halftone dot pattern */}
      <motion.div className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)`, backgroundSize: "16px 16px" }} />

      {/* Glowing accent overlay */}
      <motion.div className="absolute inset-0 pointer-events-none"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(255,193,7,0.05) 0%, transparent 60%)" }} />

      {/* Floating particles in footer */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div key={`fp-${i}`} className="absolute w-1 h-1 rounded-full pointer-events-none"
          style={{ left: `${10 + i * 12}%`, top: `${20 + (i % 3) * 25}%`, backgroundColor: ["var(--cp-yellow)", "var(--cp-red)", "var(--cp-blue)"][i % 3] }}
          animate={{ opacity: [0, 0.5, 0], y: [0, -15, 0] }}
          transition={{ duration: 3 + i * 0.5, delay: i * 0.6, repeat: Infinity, ease: "easeInOut" }} />
      ))}

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 py-14">
        {/* THE END with enhanced effects */}
        <div className="flex flex-col items-center mb-10">
          <motion.div className="relative px-10 py-5 text-center"
            style={{ border: "4px solid rgba(255,255,255,0.15)", borderRadius: "2px" }}
            animate={{ borderColor: ["rgba(255,255,255,0.15)", "rgba(255,193,7,0.3)", "rgba(255,255,255,0.15)"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
            {/* Animated corner marks */}
            {[
              { t: true, l: true }, { t: true, r: true },
              { b: true, l: true }, { b: true, r: true },
            ].map((pos, i) => (
              <motion.span key={i} className={`absolute w-4 h-4 ${pos.t ? "top-1" : "bottom-1"} ${pos.l ? "left-1" : "right-1"}`}
                style={{
                  borderTop: pos.t ? "2px solid var(--cp-yellow)" : "none",
                  borderBottom: pos.b ? "2px solid var(--cp-yellow)" : "none",
                  borderLeft: pos.l ? "2px solid var(--cp-yellow)" : "none",
                  borderRight: pos.r ? "2px solid var(--cp-yellow)" : "none",
                }}
                animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }} />
            ))}

            <motion.p className="text-4xl font-black uppercase italic md:text-5xl tracking-tight"
              style={{ color: "#ffffff", WebkitTextStroke: "2px rgba(255,255,255,0.3)", letterSpacing: "-0.02em" }}
              animate={{ textShadow: ["3px 3px 0 rgba(255,193,7,0.4)", "3px 3px 20px rgba(255,193,7,0.6)", "3px 3px 0 rgba(255,193,7,0.4)"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
              THE END
            </motion.p>
            <motion.div className="mt-2 h-[2px] w-full"
              animate={{ background: ["linear-gradient(90deg, transparent, var(--cp-yellow), transparent)", "linear-gradient(90deg, transparent, var(--cp-red), transparent)", "linear-gradient(90deg, transparent, var(--cp-yellow), transparent)"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
            <p className="mt-2 text-xs font-black uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>
              — {artistName} PORTFOLIO —
            </p>
          </motion.div>
        </div>

        {/* Social links with glow */}
        {socialLinks.length > 0 && (
          <div className="flex justify-center gap-4 mb-10">
            {socialLinks.map((link, i) => {
              const Icon = link.icon;
              return (
                <motion.a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                  aria-label={link.label}
                  className="group flex w-12 h-12 items-center justify-center transition-all duration-150 hover:translate-x-[-2px] hover:translate-y-[-2px]"
                  style={{ border: "2.5px solid rgba(255,255,255,0.3)", backgroundColor: "rgba(255,255,255,0.07)", borderRadius: "0px" }}
                  animate={{ boxShadow: ["3px 3px 0 rgba(255,255,255,0.1)", "3px 3px 10px rgba(255,193,7,0.3)", "3px 3px 0 rgba(255,255,255,0.1)"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}>
                  <Icon size={18} className="transition-colors duration-150 group-hover:text-yellow-400" color="rgba(255,255,255,0.7)" />
                </motion.a>
              );
            })}
          </div>
        )}

        {/* Animated divider */}
        <motion.div className="w-full mb-6" style={{ height: "2px" }}
          animate={{ background: ["rgba(255,255,255,0.1)", "linear-gradient(90deg, transparent, var(--cp-yellow), transparent)", "rgba(255,255,255,0.1)"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm font-black uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.6)" }}>
            {artistName}
          </span>
          <nav className="flex gap-6">
            {["Works", "About", "Contact"].map((label) => (
              <a key={label} href={`#${label.toLowerCase()}`}
                className="text-xs font-black uppercase tracking-wider transition-colors duration-150 hover:text-white"
                style={{ color: "rgba(255,255,255,0.4)" }}>
                {label}
              </a>
            ))}
          </nav>
          <p className="text-xs font-bold" style={{ color: "rgba(255,255,255,0.3)" }}>
            &copy; 2026 {artistName}. All rights reserved.
          </p>
        </div>

        <div className="absolute bottom-3 right-6 flex items-center gap-2">
          <motion.div className="w-6 h-[2px]"
            animate={{ backgroundColor: ["rgba(255,255,255,0.2)", "rgba(255,193,7,0.5)", "rgba(255,255,255,0.2)"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
          <span className="text-xs font-black" style={{ color: "rgba(255,255,255,0.25)" }}>END</span>
          <motion.div className="w-6 h-[2px]"
            animate={{ backgroundColor: ["rgba(255,255,255,0.2)", "rgba(255,193,7,0.5)", "rgba(255,255,255,0.2)"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} />
        </div>
      </div>
    </footer>
  );
}
