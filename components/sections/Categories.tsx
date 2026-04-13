"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, ShoppingBag, Briefcase, ArrowRight } from "lucide-react";
import type { SiteContent } from "@/lib/content";
import { EASE } from "@/lib/motion";

interface Props { content: SiteContent; onJoinClick: () => void }

export default function Categories({ content, onJoinClick }: Props) {
  const { categories } = content;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="categories" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#04091a] via-[#060e25] to-[#04091a]" />
      <div className="absolute inset-0 dot-bg opacity-60" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/15 to-transparent" />

      {/* Side glows */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[350px] h-[500px] bg-blue-600/6 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[350px] h-[500px] bg-indigo-600/6 blur-[100px] rounded-full pointer-events-none" />

      <div ref={ref} className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-950/40 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-blue-300 mb-5">
            {categories.badge}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-[1.1]">
            {categories.headline}
          </h2>
          <p className="mt-4 mx-auto max-w-lg text-lg text-slate-400">{categories.subheadline}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Items card */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15, ease: EASE }}
            className="group relative rounded-2xl overflow-hidden border border-white/[0.07] hover:border-blue-500/25 transition-all duration-300 hover:shadow-[0_0_60px_rgba(37,99,235,0.09)]"
          >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#08152e] to-[#060d22]" />
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/8 rounded-full blur-3xl group-hover:bg-blue-600/14 transition-colors duration-500" />
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600/0 via-blue-500/60 to-blue-600/0" />

            <div className="relative p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="inline-flex size-13 items-center justify-center rounded-2xl bg-blue-600/15 border border-blue-500/25 mb-4">
                    <ShoppingBag className="size-6 text-blue-400" strokeWidth={1.8} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">{categories.items.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-xs">{categories.items.description}</p>
                </div>
              </div>

              <ul className="space-y-2.5 mb-6">
                {categories.items.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                    <div className="size-5 rounded-full bg-blue-600/15 border border-blue-500/25 flex items-center justify-center flex-shrink-0">
                      <Check className="size-3 text-blue-400" strokeWidth={2.5} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={onJoinClick}
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors group/btn"
              >
                Start selling items
                <ArrowRight className="size-3.5 transition-transform duration-150 group-hover/btn:translate-x-1" />
              </button>
            </div>
          </motion.div>

          {/* Services card */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.25, ease: EASE }}
            className="group relative rounded-2xl overflow-hidden border border-white/[0.07] hover:border-indigo-500/30 transition-all duration-300 hover:shadow-[0_0_60px_rgba(99,102,241,0.09)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#0c1230] to-[#080d24]" />
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600/8 rounded-full blur-3xl group-hover:bg-indigo-600/14 transition-colors duration-500" />
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600/0 via-indigo-500/60 to-indigo-600/0" />

            <div className="relative p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="inline-flex size-13 items-center justify-center rounded-2xl bg-indigo-600/15 border border-indigo-500/25 mb-4">
                    <Briefcase className="size-6 text-indigo-400" strokeWidth={1.8} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">{categories.services.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-xs">{categories.services.description}</p>
                </div>
              </div>

              <ul className="space-y-2.5 mb-6">
                {categories.services.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                    <div className="size-5 rounded-full bg-indigo-600/15 border border-indigo-500/25 flex items-center justify-center flex-shrink-0">
                      <Check className="size-3 text-indigo-400" strokeWidth={2.5} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={onJoinClick}
                className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors group/btn"
              >
                Offer your services
                <ArrowRight className="size-3.5 transition-transform duration-150 group-hover/btn:translate-x-1" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
