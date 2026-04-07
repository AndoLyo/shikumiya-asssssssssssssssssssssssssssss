"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { siteConfig } from "@/site.config";

export default function GallerySection() {
  const { gallery } = siteConfig;
  const [selected, setSelected] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayed = showAll
    ? gallery.works
    : gallery.works.slice(0, gallery.initialDisplay);

  return (
    <section
      id="works"
      className="relative overflow-hidden py-16 px-5 sm:px-8"
      style={{ backgroundColor: "var(--cp-bg)" }}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(ellipse at 20% 30%, rgba(230,57,70,0.05) 0%, transparent 50%)",
            "radial-gradient(ellipse at 80% 70%, rgba(37,99,235,0.05) 0%, transparent 50%)",
            "radial-gradient(ellipse at 50% 50%, rgba(255,193,7,0.05) 0%, transparent 50%)",
            "radial-gradient(ellipse at 20% 30%, rgba(230,57,70,0.05) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Halftone background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(26,26,26,0.06) 1px, transparent 1px)`,
          backgroundSize: "16px 16px",
        }}
      />

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`gal-particle-${i}`}
          className="absolute pointer-events-none rounded-full"
          style={{
            left: `${(i * 9) % 100}%`,
            top: `${(i * 13 + 5) % 100}%`,
            width: 3 + (i % 4) * 2,
            height: 3 + (i % 4) * 2,
            backgroundColor: ["var(--cp-yellow)", "var(--cp-red)", "var(--cp-blue)"][i % 3],
            filter: "blur(1px)",
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.15, 0.5, 0.15],
            scale: [0.7, 1.3, 0.7],
          }}
          transition={{
            duration: 3 + (i % 4),
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Onomatopoeia decorations */}
      {[
        { text: "ドドド", x: "3%", y: "15%", rotate: -12, color: "var(--cp-red)", size: "1.4rem" },
        { text: "ザザザ", x: "92%", y: "25%", rotate: 8, color: "var(--cp-border)", size: "1.2rem" },
        { text: "キラッ", x: "5%", y: "75%", rotate: -6, color: "var(--cp-yellow)", size: "1.3rem" },
        { text: "パッ!", x: "90%", y: "80%", rotate: 10, color: "var(--cp-blue)", size: "1.1rem" },
      ].map((o, i) => (
        <motion.div
          key={`gal-ono-${i}`}
          className="absolute pointer-events-none font-black select-none"
          style={{
            left: o.x,
            top: o.y,
            color: o.color,
            fontSize: o.size,
            WebkitTextStroke: "1px var(--cp-border)",
            writingMode: "vertical-rl",
          }}
          animate={{ opacity: [0.15, 0.4, 0.15], rotate: [o.rotate - 3, o.rotate + 3, o.rotate - 3] }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
        >
          {o.text}
        </motion.div>
      ))}

      <div className="relative mx-auto max-w-6xl">
        {/* Section header - comic panel style */}
        <motion.div
          className="mb-10 flex items-center gap-4"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="px-4 py-2"
            style={{
              backgroundColor: "var(--cp-red)",
              border: "3px solid var(--cp-border)",
              boxShadow: "4px 4px 0 var(--cp-border)",
            }}
            whileHover={{ scale: 1.05, rotate: -2 }}
          >
            <span className="text-xs font-black uppercase tracking-widest text-white">
              Chapter 01
            </span>
          </motion.div>
          <motion.h2
            className="text-3xl font-black uppercase md:text-4xl"
            style={{ color: "var(--cp-text)", WebkitTextStroke: "1px var(--cp-border)" }}
            animate={{
              textShadow: [
                "3px 3px 0 rgba(26,26,26,0.12)",
                "3px 3px 12px rgba(230,57,70,0.25)",
                "3px 3px 0 rgba(26,26,26,0.12)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            GALLERY
          </motion.h2>
          <div className="flex-1 h-[3px]" style={{ backgroundColor: "var(--cp-border)" }} />
        </motion.div>

        {/* Grid with comic panel styling */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[4px]"
          style={{
            border: "3px solid var(--cp-border)",
            boxShadow: "8px 8px 0 var(--cp-border)",
            backgroundColor: "var(--cp-border)",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          {displayed.map((work, i) => (
            <motion.div
              key={work.src}
              className="relative aspect-[3/4] cursor-pointer overflow-hidden group"
              style={{ backgroundColor: "var(--cp-surface)" }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              onClick={() => setSelected(i)}
              whileHover={{ scale: 1.03, zIndex: 10, boxShadow: "0 0 20px rgba(255,193,7,0.3)" }}
            >
              {/* Panel number label */}
              <div
                className="absolute top-2 left-2 z-10 px-1.5 py-0.5 text-[10px] font-black"
                style={{
                  backgroundColor: "rgba(255,255,255,0.9)",
                  border: "1.5px solid var(--cp-border)",
                  color: "var(--cp-text)",
                  lineHeight: 1.2,
                }}
              >
                P.{String(i + 1).padStart(2, "0")}
              </div>

              <Image
                src={work.src}
                alt={work.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />

              {/* Halftone overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)`,
                  backgroundSize: "10px 10px",
                }}
              />

              {/* Hover overlay with glow */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end justify-start p-4">
                <span className="text-white text-sm font-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                  {work.title}
                </span>
              </div>

              {/* Corner flash on hover */}
              <div
                className="absolute top-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                style={{
                  background: "linear-gradient(225deg, rgba(255,193,7,0.4) 0%, transparent 60%)",
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Show more */}
        {gallery.works.length > gallery.initialDisplay && (
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 text-sm font-black uppercase tracking-wider cursor-pointer"
              style={{
                backgroundColor: "var(--cp-surface)",
                border: "3px solid var(--cp-border)",
                boxShadow: "5px 5px 0 var(--cp-border)",
                color: "var(--cp-text)",
              }}
              whileHover={{ scale: 1.05, x: -2, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {showAll ? "SHOW LESS" : `ALL ${gallery.works.length} WORKS →`}
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative max-w-[90vw] max-h-[90vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ border: "4px solid rgba(255,255,255,0.2)", boxShadow: "0 0 40px rgba(255,193,7,0.2)" }}
            >
              <Image
                src={gallery.works[selected].src}
                alt={gallery.works[selected].title}
                width={1200}
                height={1200}
                className="object-contain max-h-[85vh] w-auto"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white font-black text-sm">
                  {gallery.works[selected].title}
                </p>
              </div>
              {selected > 0 && (
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/60 text-white hover:bg-yellow-500/30 transition-colors cursor-pointer border-2 border-white/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected(selected - 1);
                  }}
                >
                  &#8249;
                </button>
              )}
              {selected < gallery.works.length - 1 && (
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/60 text-white hover:bg-yellow-500/30 transition-colors cursor-pointer border-2 border-white/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected(selected + 1);
                  }}
                >
                  &#8250;
                </button>
              )}
            </motion.div>
            <button
              className="absolute top-6 right-6 text-white/60 hover:text-white text-2xl font-black cursor-pointer"
              onClick={() => setSelected(null)}
            >
              &#10005;
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
