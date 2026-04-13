"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Sparkles, Star, TrendingUp } from "lucide-react";
import type { SiteContent } from "@/lib/content";
import { EASE } from "@/lib/motion";

interface HeroProps {
  content: SiteContent;
  onJoinClick: () => void;
}

export default function Hero({ content, onJoinClick }: HeroProps) {
  const { hero } = content;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Multi-layer background */}
      <div className="absolute inset-0 bg-[#04091a]" />
      <div className="absolute inset-0 grid-bg opacity-70" />

      {/* Radial spotlight */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-blue-600/10 blur-[120px] pulse-glow" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-indigo-600/8 blur-[100px] float-b" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-blue-400/6 blur-[80px] float-a" />
      </div>

      {/* Decorative rings */}
      <div className="absolute top-1/2 left-[20%] -translate-y-1/2 size-[500px] rounded-full border border-blue-500/[0.06] spin-slow pointer-events-none" />
      <div className="absolute top-1/2 left-[20%] -translate-y-1/2 size-[380px] rounded-full border border-indigo-500/[0.05] spin-rev pointer-events-none" />

      {/* Content grid */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left — text */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-950/50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-blue-300 backdrop-blur-sm">
                <Sparkles className="size-3 text-blue-400" />
                {hero.badge}
                <span className="size-1.5 rounded-full bg-blue-400 pulse-glow" />
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
              className="text-[clamp(2.6rem,5.5vw,5rem)] font-black leading-[1.04] tracking-[-0.03em]"
            >
              <span className="text-white">The Marketplace</span>
              <br />
              <span className="gradient-text-hero">Built for Campus</span>
              <br />
              <span className="text-white">Life</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
              className="mt-5 max-w-lg text-lg text-slate-400 leading-relaxed"
            >
              {hero.subheadline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28, ease: EASE }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <button
                onClick={onJoinClick}
                className="shimmer-btn group inline-flex items-center gap-2.5 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-bold text-white glow-button transition-all duration-200 hover:bg-blue-500 hover:scale-[1.03] active:scale-[0.97]"
              >
                {hero.primaryCta}
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <a
                href="#how-it-works"
                className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-7 py-3.5 text-sm font-semibold text-slate-300 backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                {hero.secondaryCta}
                <ChevronRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
              className="mt-10 flex items-center gap-6"
            >
              {/* Avatars */}
              <div className="flex -space-x-2.5">
                {[
                  { l: "S", h: 215 }, { l: "A", h: 228 }, { l: "M", h: 242 },
                  { l: "J", h: 255 }, { l: "K", h: 268 },
                ].map(({ l, h }, i) => (
                  <div
                    key={i}
                    className="size-8 rounded-full border-[2px] border-[#04091a] flex items-center justify-center text-[11px] font-black text-white"
                    style={{ background: `hsl(${h}, 65%, 38%)`, zIndex: 5 - i }}
                  >
                    {l}
                  </div>
                ))}
              </div>
              <div className="h-8 w-px bg-white/10" />
              {hero.stats.map((s, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-xl font-black gradient-text leading-none">{s.value}</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mt-0.5">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — floating app UI mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* Glow behind card */}
            <div className="absolute size-[340px] rounded-full bg-blue-600/15 blur-[60px]" />

            {/* Main app card */}
            <div className="relative w-[340px] float-a">
              <div className="rounded-2xl border border-white/[0.09] bg-gradient-to-br from-[#080f24]/95 to-[#060d22]/90 backdrop-blur-xl shadow-[0_32px_80px_rgba(0,0,0,0.6)] overflow-hidden">
                {/* Card top accent */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

                <div className="p-5">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Listings</div>
                      <div className="text-lg font-black text-white mt-0.5">Your Campus Store</div>
                    </div>
                    <div className="size-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-sm font-black text-white shadow-lg shadow-blue-900/50">
                      JM
                    </div>
                  </div>

                  {/* Listings */}
                  <div className="space-y-2.5 mb-5">
                    {[
                      { title: "Calc Textbook", price: "$45", tag: "Books", color: "blue" },
                      { title: "Logo Design", price: "$60", tag: "Service", color: "indigo" },
                      { title: "Mini Fridge", price: "$80", tag: "Dorm", color: "cyan" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.03] px-3.5 py-2.5 group hover:border-blue-500/20 hover:bg-blue-500/[0.04] transition-all duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`size-2 rounded-full ${item.color === "blue" ? "bg-blue-400" : item.color === "indigo" ? "bg-indigo-400" : "bg-cyan-400"}`} />
                          <div>
                            <div className="text-sm font-semibold text-white">{item.title}</div>
                            <div className="text-[11px] text-slate-500">{item.tag}</div>
                          </div>
                        </div>
                        <span className="text-sm font-black text-blue-300">{item.price}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-2">
                    {[{ v: "12", l: "Views" }, { v: "4", l: "Messages" }, { v: "$185", l: "Earned" }].map((s, i) => (
                      <div key={i} className="rounded-xl bg-blue-600/[0.08] border border-blue-500/10 p-2.5 text-center">
                        <div className="text-base font-black text-white">{s.v}</div>
                        <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating notification chips */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-5 -right-8 flex items-center gap-2 rounded-2xl border border-white/10 bg-[#060d22]/90 backdrop-blur-xl px-3.5 py-2 shadow-2xl"
              >
                <div className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-white whitespace-nowrap">New order! 🎉</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-5 -left-8 flex items-center gap-2 rounded-2xl border border-white/10 bg-[#060d22]/90 backdrop-blur-xl px-3.5 py-2 shadow-2xl"
              >
                <TrendingUp className="size-3.5 text-emerald-400" />
                <span className="text-xs font-bold text-white whitespace-nowrap">+$120 this week</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-1/2 -left-10 flex items-center gap-1.5 rounded-xl border border-amber-400/20 bg-[#060d22]/90 backdrop-blur-xl px-3 py-1.5 shadow-2xl"
              >
                <Star className="size-3 text-amber-400 fill-amber-400" />
                <span className="text-xs font-bold text-white">4.9</span>
                <span className="text-[10px] text-slate-400">rating</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#04091a] to-transparent pointer-events-none" />
    </section>
  );
}
