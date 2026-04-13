"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { UserPlus, Package, Zap } from "lucide-react";
import type { SiteContent } from "@/lib/content";
import { EASE } from "@/lib/motion";

const ICONS: Record<string, React.ElementType> = { UserPlus, Package, Zap };

interface Props { content: SiteContent }

export default function HowItWorks({ content }: Props) {
  const { howItWorks } = content;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="how-it-works" className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#04091a] via-[#05102a] to-[#04091a]" />
      <div className="absolute inset-0 dot-bg opacity-80" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      <div ref={ref} className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-950/40 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-blue-300 mb-5">
            {howItWorks.badge}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-[1.1]">
            {howItWorks.headline}
          </h2>
          <p className="mt-4 mx-auto max-w-lg text-lg text-slate-400 leading-relaxed">
            {howItWorks.subheadline}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Desktop connector */}
          <div className="hidden md:block absolute top-[56px] left-[calc(16.66%+40px)] right-[calc(16.66%+40px)] h-px">
            <div className="h-full bg-gradient-to-r from-blue-600/50 via-blue-400/70 to-blue-600/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 via-blue-400/70 to-blue-600/50 blur-sm" />
          </div>

          {howItWorks.steps.map((step, i) => {
            const Icon = ICONS[step.icon] || Package;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.13 + 0.15, ease: EASE }}
                className="group"
              >
                {/* Card */}
                <div className="relative rounded-2xl border border-white/[0.07] bg-gradient-to-b from-[#080f24]/80 to-[#060d22]/60 p-7 text-center card-glass transition-all duration-300 hover:border-blue-500/25 hover:shadow-[0_0_50px_rgba(37,99,235,0.1)]">
                  {/* Top glow on hover */}
                  <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-blue-400/0 to-transparent group-hover:via-blue-400/50 transition-all duration-400" />

                  {/* Icon circle */}
                  <div className="relative mx-auto mb-6 size-[112px] rounded-full">
                    {/* Outer ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-blue-500/15 group-hover:border-blue-500/35 transition-colors duration-300" />
                    {/* Inner fill */}
                    <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-950/80 to-[#060d22] flex items-center justify-center group-hover:from-blue-900/60 transition-all duration-300">
                      <Icon className="size-10 text-blue-400 group-hover:text-blue-300 transition-colors duration-200" strokeWidth={1.5} />
                    </div>
                    {/* Number badge */}
                    <div className="absolute -top-1 -right-1 size-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-black text-white shadow-lg shadow-blue-800/50 ring-2 ring-[#04091a]">
                      {i + 1}
                    </div>
                  </div>

                  <div className="text-[10px] font-black text-blue-500/80 tracking-[0.2em] uppercase mb-2">{step.number}</div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-50 transition-colors">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
