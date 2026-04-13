"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Sparkles, Briefcase, Users } from "lucide-react";
import type { SiteContent } from "@/lib/content";
import { EASE } from "@/lib/motion";

const ICONS: Record<string, React.ElementType> = { Shield, Sparkles, Briefcase, Users };
const ICON_COLORS = [
  { bg: "bg-blue-600/15", border: "border-blue-500/20", text: "text-blue-400", hover: "group-hover:bg-blue-600/25 group-hover:border-blue-500/35" },
  { bg: "bg-indigo-600/15", border: "border-indigo-500/20", text: "text-indigo-400", hover: "group-hover:bg-indigo-600/25 group-hover:border-indigo-500/35" },
  { bg: "bg-violet-600/15", border: "border-violet-500/20", text: "text-violet-400", hover: "group-hover:bg-violet-600/25 group-hover:border-violet-500/35" },
  { bg: "bg-cyan-600/15", border: "border-cyan-500/20", text: "text-cyan-400", hover: "group-hover:bg-cyan-600/25 group-hover:border-cyan-500/35" },
];

interface Props { content: SiteContent }

export default function WhyStateSwap({ content }: Props) {
  const { whyStateSwap } = content;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="why-stateswap" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[#04091a]" />
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[700px] rounded-full bg-blue-700/5 blur-[140px] pointer-events-none pulse-glow" />

      <div ref={ref} className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-950/40 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-blue-300 mb-5">
            {whyStateSwap.badge}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-[1.1]">
            {whyStateSwap.headline}
          </h2>
          <p className="mt-4 mx-auto max-w-lg text-lg text-slate-400">{whyStateSwap.subheadline}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {whyStateSwap.cards.map((card, i) => {
            const Icon = ICONS[card.icon] || Shield;
            const colors = ICON_COLORS[i % ICON_COLORS.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.09 + 0.15, ease: EASE }}
                className="group relative rounded-2xl border border-white/[0.06] bg-gradient-to-br from-[#080f24]/70 to-[#060d22]/50 p-7 overflow-hidden transition-all duration-300 hover:border-white/[0.1] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
              >
                {/* Hover corner accent */}
                <div className="absolute top-0 right-0 size-24 bg-blue-600/0 group-hover:bg-blue-600/5 rounded-bl-[80px] transition-all duration-500" />
                {/* Top line */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-blue-400/0 to-transparent group-hover:via-blue-400/30 transition-all duration-300" />

                <div className={`mb-5 inline-flex size-12 items-center justify-center rounded-2xl border ${colors.bg} ${colors.border} ${colors.hover} transition-all duration-300`}>
                  <Icon className={`size-5.5 ${colors.text}`} strokeWidth={1.8} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-50 transition-colors">{card.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{card.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
