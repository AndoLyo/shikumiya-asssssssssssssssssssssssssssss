"use client";

import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteData } from "./SiteDataContext";

const navItems = [
  { label: "WORKS", href: "#works" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
];

export default function Header() {
  const data = useSiteData();
  const artistName = data?.artistName || "Sora";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
      style={{
        backgroundColor: "var(--cp-bg)",
        borderBottom: "3px solid var(--cp-border)",
        boxShadow: scrolled ? "0 4px 0 var(--cp-border)" : "none",
        backgroundImage: `radial-gradient(circle, var(--cp-border) 1px, transparent 1px)`,
        backgroundSize: "16px 16px",
      }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: "rgba(255,254,245,0.88)" }} />

      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8 py-3">
        {/* Logo with glow pulse */}
        <a href="#" className="flex items-center gap-3 group">
          <motion.div
            className="relative flex items-center justify-center px-4 py-2 transition-transform duration-200 group-hover:scale-105 group-hover:-rotate-2"
            style={{
              backgroundColor: "var(--cp-yellow)",
              border: "2.5px solid var(--cp-border)",
              borderRadius: "8px 8px 8px 0px",
            }}
            animate={{
              boxShadow: [
                "3px 3px 0 var(--cp-border)",
                "3px 3px 10px rgba(255,193,7,0.4)",
                "3px 3px 0 var(--cp-border)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Zap className="h-4 w-4 mr-1" style={{ color: "var(--cp-border)" }} />
            </motion.div>
            <span
              className="text-lg font-black tracking-tight uppercase"
              style={{ color: "var(--cp-text)", letterSpacing: "-0.02em" }}
            >
              {artistName}
            </span>
            <span
              className="absolute -bottom-[11px] left-3"
              style={{ width: 0, height: 0, borderLeft: "10px solid transparent", borderTop: "10px solid var(--cp-border)" }}
            />
            <span
              className="absolute -bottom-[8px] left-[13px]"
              style={{ width: 0, height: 0, borderLeft: "8px solid transparent", borderTop: "8px solid var(--cp-yellow)" }}
            />
          </motion.div>
        </a>

        {/* Desktop nav with enhanced hover */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item, i) => (
            <motion.a
              key={item.href}
              href={item.href}
              className="relative px-4 py-2 text-sm font-black uppercase tracking-wider"
              style={{ color: "var(--cp-text)" }}
              whileHover={{
                scale: 1.08,
                rotate: -2,
                backgroundColor: "var(--cp-yellow)",
                borderRadius: "4px",
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              {item.label}
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            className="ml-4 px-6 py-2 text-sm font-black uppercase tracking-wider text-white"
            style={{
              backgroundColor: "var(--cp-red)",
              border: "2.5px solid var(--cp-border)",
              borderRadius: "4px",
            }}
            whileHover={{ scale: 1.05, rotate: -1, x: -2, y: -2 }}
            animate={{
              boxShadow: [
                "3px 3px 0 var(--cp-border)",
                "3px 3px 10px rgba(230,57,70,0.4)",
                "3px 3px 0 var(--cp-border)",
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            お問い合わせ！
          </motion.a>
        </nav>

        {/* Mobile hamburger */}
        <motion.button
          className="flex md:hidden items-center justify-center h-10 w-10"
          style={{
            backgroundColor: "var(--cp-yellow)",
            border: "2.5px solid var(--cp-border)",
            borderRadius: "4px",
            boxShadow: "2px 2px 0 var(--cp-border)",
            color: "var(--cp-text)",
          }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="メニュー"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            className="fixed inset-0 top-[63px] z-40 flex flex-col px-8 py-10 md:hidden"
            style={{
              backgroundColor: "var(--cp-bg)",
              borderTop: "3px solid var(--cp-border)",
              backgroundImage: `radial-gradient(circle, rgba(26,26,26,0.08) 1px, transparent 1px)`,
              backgroundSize: "16px 16px",
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {navItems.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="block py-5 text-2xl font-black uppercase tracking-wider"
                style={{ color: "var(--cp-text)", borderBottom: "2px solid var(--cp-border)" }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setMobileOpen(false)}
              >
                <span className="inline-block px-2" style={{ backgroundColor: i % 2 === 0 ? "var(--cp-yellow)" : "transparent" }}>
                  {item.label}
                </span>
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              className="mt-8 px-6 py-4 text-center text-lg font-black uppercase tracking-wider text-white"
              style={{
                backgroundColor: "var(--cp-red)",
                border: "2.5px solid var(--cp-border)",
                borderRadius: "4px",
                boxShadow: "4px 4px 0 var(--cp-border)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              onClick={() => setMobileOpen(false)}
            >
              CONTACT！
            </motion.a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
