"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import type { SiteContent } from "@/lib/content";

interface NavbarProps {
  content: SiteContent;
  onJoinClick: () => void;
  logoSrc?: string;
}

export default function Navbar({ content, onJoinClick, logoSrc }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-white/[0.06] bg-[#04091a]/90 backdrop-blur-2xl shadow-[0_1px_40px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[70px] items-center justify-between">

            {/* Logo */}
            <a href="/" className="flex items-center gap-2.5 group">
              {logoSrc ? (
                <Image
                  src={logoSrc}
                  alt="StateSwap logo"
                  width={36}
                  height={36}
                  className="rounded-xl group-hover:scale-105 transition-transform duration-200"
                  priority
                />
              ) : (
                <div className="relative size-9 rounded-xl overflow-hidden flex items-center justify-center border border-blue-500/25 bg-gradient-to-br from-blue-600/20 to-indigo-600/10 group-hover:border-blue-400/40 transition-colors">
                  <span className="font-black text-xs text-blue-300">SS</span>
                </div>
              )}
              <span className="font-black text-[17px] text-white tracking-tight leading-none">
                State<span className="text-blue-400">Swap</span>
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-7">
              {content.nav.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-150 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-blue-400 group-hover:w-full transition-all duration-200" />
                </a>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={onJoinClick}
                className="shimmer-btn inline-flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 px-5 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:scale-[1.04] active:scale-[0.97] glow-button"
              >
                {content.nav.cta}
                <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>

            {/* Mobile */}
            <button
              className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed top-[70px] left-0 right-0 z-40 border-b border-white/[0.06] bg-[#04091a]/95 backdrop-blur-2xl"
          >
            <div className="mx-auto max-w-7xl px-4 py-4 flex flex-col gap-1.5">
              {content.nav.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.05] transition-all"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { setMobileOpen(false); onJoinClick(); }}
                className="mt-2 w-full rounded-full bg-blue-600 py-3 text-sm font-bold text-white hover:bg-blue-500 transition-colors"
              >
                {content.nav.cta}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
