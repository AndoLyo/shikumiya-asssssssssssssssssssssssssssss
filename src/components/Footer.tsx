"use client";

import { AtSign, Camera } from "lucide-react";
import { useSiteData } from "./SiteDataContext";

export default function Footer() {
  const data = useSiteData();
  const artistName = data?.artistName || "Sora";

  const socialLinks = [
    { icon: AtSign, href: data?.snsX || "https://x.com/sora_manga_test", label: "X (Twitter)" },
    { icon: Camera, href: data?.snsInstagram || "https://instagram.com/sora_manga_test", label: "Instagram" },
  ];

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        backgroundColor: "var(--cp-border)",
        borderTop: "4px solid var(--cp-border)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)`,
          backgroundSize: "16px 16px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 py-14">
        <div className="flex flex-col items-center mb-10">
          <div
            className="relative px-10 py-5 text-center"
            style={{
              border: "4px solid rgba(255,255,255,0.15)",
              borderRadius: "2px",
            }}
          >
            <span
              className="absolute top-1 left-1 w-4 h-4"
              style={{
                borderTop: "2px solid var(--cp-yellow)",
                borderLeft: "2px solid var(--cp-yellow)",
              }}
            />
            <span
              className="absolute top-1 right-1 w-4 h-4"
              style={{
                borderTop: "2px solid var(--cp-yellow)",
                borderRight: "2px solid var(--cp-yellow)",
              }}
            />
            <span
              className="absolute bottom-1 left-1 w-4 h-4"
              style={{
                borderBottom: "2px solid var(--cp-yellow)",
                borderLeft: "2px solid var(--cp-yellow)",
              }}
            />
            <span
              className="absolute bottom-1 right-1 w-4 h-4"
              style={{
                borderBottom: "2px solid var(--cp-yellow)",
                borderRight: "2px solid var(--cp-yellow)",
              }}
            />

            <p
              className="text-4xl font-black uppercase italic md:text-5xl tracking-tight"
              style={{
                color: "#ffffff",
                WebkitTextStroke: "2px rgba(255,255,255,0.3)",
                textShadow: "3px 3px 0 rgba(255,193,7,0.4)",
                letterSpacing: "-0.02em",
              }}
            >
              THE END
            </p>
            <div
              className="mt-2 h-[2px] w-full"
              style={{
                background: "linear-gradient(90deg, transparent, var(--cp-yellow), transparent)",
              }}
            />
            <p
              className="mt-2 text-xs font-black uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              — {artistName} PORTFOLIO —
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-10">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="group flex w-12 h-12 items-center justify-center transition-all duration-150 hover:translate-x-[-2px] hover:translate-y-[-2px]"
                style={{
                  border: "2.5px solid rgba(255,255,255,0.3)",
                  backgroundColor: "rgba(255,255,255,0.07)",
                  boxShadow: "3px 3px 0 rgba(255,255,255,0.1)",
                  borderRadius: "0px",
                }}
              >
                <Icon
                  size={18}
                  className="transition-colors duration-150 group-hover:text-yellow-400"
                  color="rgba(255,255,255,0.7)"
                />
              </a>
            );
          })}
        </div>

        <div
          className="w-full mb-6"
          style={{ height: "2px", backgroundColor: "rgba(255,255,255,0.1)" }}
        />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <span
            className="text-sm font-black uppercase tracking-wider"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            {artistName}
          </span>

          <nav className="flex gap-6">
            {["Works", "About", "Contact"].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                className="text-xs font-black uppercase tracking-wider transition-colors duration-150 hover:text-white"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                {label}
              </a>
            ))}
          </nav>

          <p
            className="text-xs font-bold"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            &copy; 2026 Sora. All rights reserved.
          </p>
        </div>

        <div className="absolute bottom-3 right-6 flex items-center gap-2">
          <div
            className="w-6 h-[2px]"
            style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
          />
          <span
            className="text-xs font-black"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            END
          </span>
          <div
            className="w-6 h-[2px]"
            style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
          />
        </div>
      </div>
    </footer>
  );
}
