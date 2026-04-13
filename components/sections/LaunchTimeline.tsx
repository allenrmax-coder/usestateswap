"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, Zap, Globe } from "lucide-react";
import type { SiteContent } from "@/lib/content";
import { EASE } from "@/lib/motion";

const MILESTONE_ICONS = [Clock, Zap, Globe];

interface Props {
  content: SiteContent;
  onJoinClick: () => void;
}

export default function LaunchTimeline({ content, onJoinClick }: Props) {
  const { launchTimeline } = content;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="launch" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030f1f] to-[#020b18]" />
      <div className="absolute inset-0 dot-bg opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] rounded-full bg-blue-600/6 blur-[120px] pointer-events-none" />

      <div ref={ref} className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-950/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-300 mb-5">
            {launchTimeline.badge}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">{launchTimeline.headline}</h2>
          <p className="text-lg text-slate-400">{launchTimeline.subheadline}</p>
        </motion.div>

        <div className="space-y-6">
          {launchTimeline.milestones.map((m, i) => {
            const Icon = MILESTONE_ICONS[i] || Clock;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 + 0.2, ease: EASE }}
                className={`flex items-center gap-5 ${i % 2 === 0 ? "" : "flex-row-reverse"}`}
              >
                <div className={`flex-1 rounded-2xl border p-5 ${
                  m.status === "upcoming"
                    ? "border-blue-500/25 bg-blue-950/30 hover:border-blue-500/40"
                    : "border-white/[0.06] bg-white/[0.02]"
                } transition-all duration-300 ${i % 2 === 0 ? "text-left" : "text-right"}`}>
                  <div className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">{m.date}</div>
                  <div className="text-lg font-bold text-white mb-1">{m.label}</div>
                  <div className="text-sm text-slate-400">{m.description}</div>
                </div>

                <div className="relative z-10 size-12 rounded-full border-2 border-blue-500/40 bg-[#030f1f] flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(37,99,235,0.2)]">
                  <Icon className={`size-5 ${m.status === "upcoming" ? "text-blue-400" : "text-slate-500"}`} />
                </div>

                <div className="flex-1 hidden sm:block" />
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-400 mb-6 text-lg">Don&apos;t miss the launch — lock in your spot now.</p>
          <button
            onClick={onJoinClick}
            className="shimmer-btn inline-flex items-center gap-2.5 rounded-full bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-blue-900/40 hover:bg-blue-500 hover:scale-[1.03] transition-all duration-200 active:scale-[0.98]"
          >
            Reserve My Spot
          </button>
        </motion.div>
      </div>
    </section>
  );
}
