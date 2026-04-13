"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, ArrowRight, TrendingUp, Star, Rocket } from "lucide-react";
import type { SiteContent } from "@/lib/content";
import { EASE } from "@/lib/motion";

interface Props {
  content: SiteContent;
  onJoinClick: () => void;
}

export default function ForEntrepreneurs({ content, onJoinClick }: Props) {
  const { forEntrepreneurs } = content;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="for-entrepreneurs" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#020b18] via-[#04122a] to-[#020b18]" />
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute top-0 left-1/3 size-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 size-[300px] rounded-full bg-indigo-600/8 blur-[80px] pointer-events-none" />

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-950/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-300 mb-6">
                <Rocket className="size-3" />
                {forEntrepreneurs.badge}
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-[1.1] mb-5">
                {forEntrepreneurs.headline}
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed mb-8">{forEntrepreneurs.subheadline}</p>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-3 mb-10"
            >
              {forEntrepreneurs.benefits.map((benefit, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
                  className="flex items-center gap-3 text-slate-300"
                >
                  <div className="size-5 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                    <Check className="size-3 text-blue-400" />
                  </div>
                  <span className="text-sm font-medium">{benefit}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <button
                onClick={onJoinClick}
                className="shimmer-btn group inline-flex items-center gap-2.5 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/40 transition-all duration-200 hover:bg-blue-500 hover:scale-[1.03] active:scale-[0.98]"
              >
                {forEntrepreneurs.cta}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors py-3.5"
              >
                {forEntrepreneurs.secondaryCta}
                <ArrowRight className="size-3.5" />
              </a>
            </motion.div>
          </div>

          {/* Right: mock card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 24 }}
            animate={inView ? { opacity: 1, scale: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            className="relative"
          >
            <div className="relative rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#06162760] to-[#030f1f80] p-6 backdrop-blur-md overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-lg font-black text-white shadow-lg shadow-blue-900/40">
                    JM
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">Jake M.</div>
                    <div className="text-slate-500 text-xs">Graphic Designer · Penn State</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                  <Star className="size-3.5 fill-current" />
                  4.9
                </div>
              </div>

              <div className="mb-5">
                <div className="text-xs text-slate-500 uppercase tracking-wider mb-3 font-semibold">Active Services</div>
                <div className="space-y-2">
                  {["Logo Design", "Flyer & Poster Design", "Social Media Content"].map((s) => (
                    <div key={s} className="flex items-center justify-between rounded-lg bg-white/[0.04] border border-white/[0.05] px-3 py-2">
                      <span className="text-sm text-slate-300 font-medium">{s}</span>
                      <span className="text-xs text-blue-400 font-semibold">Active</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Orders", value: "28" },
                  { label: "Earnings", value: "$840" },
                  { label: "Rating", value: "4.9★" },
                ].map((stat, i) => (
                  <div key={i} className="rounded-lg bg-blue-600/8 border border-blue-500/10 p-2.5 text-center">
                    <div className="text-base font-black text-white">{stat.value}</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wide font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-2 rounded-lg border border-blue-500/20 bg-blue-600/8 px-3 py-2">
                <div className="size-2 rounded-full bg-blue-400 pulse-glow" />
                <span className="text-xs text-blue-300 font-medium">Founding Seller — Early Access Member</span>
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 flex items-center gap-2.5 rounded-2xl border border-white/10 bg-[#030f1f]/90 backdrop-blur-md px-4 py-2.5 shadow-xl"
            >
              <div className="size-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-semibold text-white">New order received!</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 -left-4 flex items-center gap-2.5 rounded-2xl border border-white/10 bg-[#030f1f]/90 backdrop-blur-md px-4 py-2.5 shadow-xl"
            >
              <TrendingUp className="size-4 text-emerald-400" />
              <span className="text-xs font-semibold text-white">$120 earned this week</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
