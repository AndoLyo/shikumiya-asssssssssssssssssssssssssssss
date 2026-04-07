"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, AtSign, Camera } from "lucide-react";
import { useSiteData } from "./SiteDataContext";

function SpeedLinesH({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 600 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {Array.from({ length: 14 }).map((_, i) => {
        const y = 5 + i * 5.5;
        return (
          <line key={i} x1="0" y1={y} x2="600" y2={y}
            stroke="var(--cp-border)"
            strokeWidth={i % 3 === 0 ? "2" : "0.8"}
            strokeOpacity={i % 3 === 0 ? "0.25" : "0.1"} />
        );
      })}
    </svg>
  );
}

export default function ContactSection() {
  const data = useSiteData();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const socialLinks = [
    { icon: AtSign, label: "X (Twitter)", handle: data?.snsX || "https://x.com/sora_manga_test", color: "var(--cp-blue)", href: data?.snsX || "https://x.com/sora_manga_test" },
    { icon: Camera, label: "Instagram", handle: data?.snsInstagram || "https://instagram.com/sora_manga_test", color: "var(--cp-red)", href: data?.snsInstagram || "https://instagram.com/sora_manga_test" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-20 px-5 sm:px-8"
      style={{ backgroundColor: "var(--cp-bg)" }}
    >
      {/* Animated gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle at 40% 40%, rgba(255,193,7,0.05) 0%, transparent 50%)",
            "radial-gradient(circle at 60% 60%, rgba(230,57,70,0.05) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 40%, rgba(255,193,7,0.05) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Halftone fade at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(26,26,26,0.1) 1px, transparent 1px)`,
          backgroundSize: "14px 14px",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
        }}
      />

      {/* Floating sparks */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={`cspark-${i}`}
          className="absolute pointer-events-none rounded-full"
          style={{
            left: `${5 + i * 10}%`,
            top: `${10 + (i % 4) * 22}%`,
            width: 3 + (i % 3) * 2,
            height: 3 + (i % 3) * 2,
            backgroundColor: ["var(--cp-yellow)", "var(--cp-red)", "var(--cp-blue)"][i % 3],
          }}
          animate={{
            y: [0, -20, 10, -15, 0],
            opacity: [0.1, 0.4, 0.1],
            scale: [0.8, 1.3, 0.8],
          }}
          transition={{
            duration: 4 + i * 0.5,
            delay: i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative mx-auto max-w-6xl">
        {/* Section header with speed lines */}
        <motion.div
          className="mb-12 relative"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              className="px-4 py-2"
              style={{
                backgroundColor: "var(--cp-yellow)",
                border: "3px solid var(--cp-border)",
                boxShadow: "4px 4px 0 var(--cp-border)",
              }}
              whileHover={{ scale: 1.05, rotate: -2 }}
            >
              <span className="text-xs font-black uppercase tracking-widest" style={{ color: "var(--cp-text)" }}>
                Chapter 03
              </span>
            </motion.div>
            <div className="flex-1 h-[3px]" style={{ backgroundColor: "var(--cp-border)" }} />
          </div>

          {/* Large CONTACT! title with glitch */}
          <div className="relative text-center py-6 overflow-hidden">
            <SpeedLinesH className="absolute inset-0 w-full h-full" />
            <motion.h2
              className="relative text-5xl font-black uppercase italic md:text-7xl"
              style={{
                color: "var(--cp-bg)",
                WebkitTextStroke: "3px var(--cp-border)",
                letterSpacing: "-0.03em",
              }}
              animate={{
                textShadow: [
                  "5px 5px 0 var(--cp-border)",
                  "5px 5px 15px rgba(255,193,7,0.3)",
                  "5px 5px 0 var(--cp-border)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              CONTACT!
            </motion.h2>
            <p className="mt-3 text-sm font-black uppercase tracking-widest" style={{ color: "var(--cp-text-muted)" }}>
              お仕事・コラボ・ファンメール、何でもどうぞ！
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {submitted ? (
              <motion.div
                className="flex flex-col items-center justify-center py-20 px-8 text-center"
                style={{
                  border: "3px solid var(--cp-border)",
                  backgroundColor: "var(--cp-surface)",
                  boxShadow: "7px 7px 0 var(--cp-border)",
                }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "backOut" }}
              >
                <motion.span
                  className="text-6xl mb-4"
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  ✅
                </motion.span>
                <p className="text-xl font-black" style={{ color: "var(--cp-text)" }}>送信完了！</p>
                <p className="mt-2 text-sm font-bold" style={{ color: "var(--cp-text-muted)" }}>
                  2〜3営業日以内にご返信します。
                </p>
                <div className="mt-4 px-3 py-1 text-xs font-black"
                  style={{ backgroundColor: "var(--cp-yellow)", border: "2px solid var(--cp-border)", color: "var(--cp-text)" }}>
                  TO BE CONTINUED...
                </div>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                className="p-6"
                style={{
                  border: "3px solid var(--cp-border)",
                  backgroundColor: "var(--cp-surface)",
                  boxShadow: "7px 7px 0 var(--cp-border)",
                }}
                whileHover={{ boxShadow: "9px 9px 0 var(--cp-border)" }}
              >
                <div className="mb-5 px-3 py-1.5 inline-block text-xs font-black uppercase tracking-widest text-white"
                  style={{ backgroundColor: "var(--cp-border)", borderRadius: "2px" }}>
                  ✉ MESSAGE FORM
                </div>

                {/* Name */}
                <div className="mb-4">
                  <label className="block mb-1.5 text-xs font-black uppercase tracking-wider" style={{ color: "var(--cp-text)" }} htmlFor="cp-name">
                    お名前 *
                  </label>
                  <input id="cp-name" type="text" required value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="田中 太郎"
                    className="w-full px-4 py-3 text-sm font-bold outline-none transition-all duration-150"
                    style={{
                      border: "2.5px solid var(--cp-border)",
                      backgroundColor: "#f8f8f0",
                      color: "var(--cp-text)",
                      boxShadow: "inset 2px 2px 0 rgba(26,26,26,0.06)",
                    }}
                    onFocus={(e) => { e.currentTarget.style.boxShadow = "3px 3px 0 var(--cp-border)"; e.currentTarget.style.backgroundColor = "var(--cp-surface)"; }}
                    onBlur={(e) => { e.currentTarget.style.boxShadow = "inset 2px 2px 0 rgba(26,26,26,0.06)"; e.currentTarget.style.backgroundColor = "#f8f8f0"; }}
                  />
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="block mb-1.5 text-xs font-black uppercase tracking-wider" style={{ color: "var(--cp-text)" }} htmlFor="cp-email">
                    メールアドレス *
                  </label>
                  <input id="cp-email" type="email" required value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="taro@example.com"
                    className="w-full px-4 py-3 text-sm font-bold outline-none transition-all duration-150"
                    style={{
                      border: "2.5px solid var(--cp-border)",
                      backgroundColor: "#f8f8f0",
                      color: "var(--cp-text)",
                      boxShadow: "inset 2px 2px 0 rgba(26,26,26,0.06)",
                    }}
                    onFocus={(e) => { e.currentTarget.style.boxShadow = "3px 3px 0 var(--cp-border)"; e.currentTarget.style.backgroundColor = "var(--cp-surface)"; }}
                    onBlur={(e) => { e.currentTarget.style.boxShadow = "inset 2px 2px 0 rgba(26,26,26,0.06)"; e.currentTarget.style.backgroundColor = "#f8f8f0"; }}
                  />
                </div>

                {/* Message */}
                <div className="mb-6">
                  <label className="block mb-1.5 text-xs font-black uppercase tracking-wider" style={{ color: "var(--cp-text)" }} htmlFor="cp-message">
                    メッセージ *
                  </label>
                  <textarea id="cp-message" required rows={5} value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="お仕事の内容、コラボのご提案、ファンメールなど、お気軽にどうぞ！"
                    className="w-full px-4 py-3 text-sm font-bold outline-none resize-none transition-all duration-150"
                    style={{
                      border: "2.5px solid var(--cp-border)",
                      backgroundColor: "#f8f8f0",
                      color: "var(--cp-text)",
                      boxShadow: "inset 2px 2px 0 rgba(26,26,26,0.06)",
                    }}
                    onFocus={(e) => { e.currentTarget.style.boxShadow = "3px 3px 0 var(--cp-border)"; e.currentTarget.style.backgroundColor = "var(--cp-surface)"; }}
                    onBlur={(e) => { e.currentTarget.style.boxShadow = "inset 2px 2px 0 rgba(26,26,26,0.06)"; e.currentTarget.style.backgroundColor = "#f8f8f0"; }}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-black uppercase tracking-wider text-white"
                  style={{
                    backgroundColor: "var(--cp-red)",
                    border: "3px solid var(--cp-border)",
                  }}
                  whileHover={{ scale: 1.03, x: -2, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  animate={{
                    boxShadow: [
                      "5px 5px 0 var(--cp-border)",
                      "5px 5px 15px rgba(230,57,70,0.4)",
                      "5px 5px 0 var(--cp-border)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Send size={16} />
                  SEND MESSAGE！
                </motion.button>
              </motion.form>
            )}
          </motion.div>

          {/* Right: Social links + info */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Info panel */}
            <motion.div
              className="p-5"
              style={{
                border: "3px solid var(--cp-border)",
                backgroundColor: "var(--cp-surface)",
                boxShadow: "5px 5px 0 var(--cp-border)",
              }}
              whileHover={{ boxShadow: "7px 7px 0 var(--cp-border)" }}
            >
              <div className="mb-3 inline-block px-3 py-1 text-xs font-black uppercase tracking-wider text-white"
                style={{ backgroundColor: "var(--cp-blue)", borderRadius: "2px" }}>
                ℹ INFO
              </div>
              <div className="space-y-3">
                {[
                  { icon: "⚡", label: "返信速度", value: "通常2〜3営業日" },
                  { icon: "📧", label: "メール", value: "ryoya112@outlook.com" },
                  { icon: "🤝", label: "コラボ", value: "歓迎！まずはDMで" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="flex items-center gap-3 px-3 py-2"
                    style={{ borderLeft: "3px solid var(--cp-yellow)", backgroundColor: "#f8f8f0" }}
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  >
                    <motion.span
                      className="text-xl"
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 2, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {item.icon}
                    </motion.span>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider" style={{ color: "var(--cp-text-muted)" }}>
                        {item.label}
                      </p>
                      <p className="text-sm font-bold" style={{ color: "var(--cp-text)" }}>
                        {item.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Social links */}
            <div>
              <div className="mb-3 inline-block px-3 py-1 text-xs font-black uppercase tracking-wider"
                style={{ backgroundColor: "var(--cp-yellow)", border: "2px solid var(--cp-border)", color: "var(--cp-text)" }}>
                SNS LINKS
              </div>
              <div className="flex flex-col gap-3">
                {socialLinks.map((link, i) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 px-4 py-3"
                      style={{
                        border: "3px solid var(--cp-border)",
                        backgroundColor: "var(--cp-surface)",
                        boxShadow: "4px 4px 0 var(--cp-border)",
                      }}
                      whileHover={{ x: -3, y: -3, boxShadow: "7px 7px 0 var(--cp-border)" }}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    >
                      <motion.div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: link.color,
                          border: "2.5px solid var(--cp-border)",
                          boxShadow: "2px 2px 0 var(--cp-border)",
                        }}
                        animate={{
                          boxShadow: [
                            "2px 2px 0 var(--cp-border)",
                            "2px 2px 8px " + link.color.replace("var(--cp-", "rgba(").replace("blue)", "37,99,235,0.4)").replace("red)", "230,57,70,0.4)"),
                            "2px 2px 0 var(--cp-border)",
                          ],
                        }}
                        transition={{ duration: 2.5, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Icon size={18} color="#ffffff" />
                      </motion.div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-wider" style={{ color: "var(--cp-text-muted)" }}>
                          {link.label}
                        </p>
                        <p className="text-sm font-black" style={{ color: "var(--cp-text)" }}>
                          {link.handle}
                        </p>
                      </div>
                      <span className="ml-auto text-sm font-black" style={{ color: "var(--cp-text-muted)" }}>→</span>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
