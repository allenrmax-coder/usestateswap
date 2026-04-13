"use client";

import { motion } from "framer-motion";
import { ExternalLink, Mail, ArrowRight, AlertCircle } from "lucide-react";
import type { SiteContent } from "@/lib/content";

interface Props {
  content: SiteContent;
  onJoinClick: () => void;
}

export default function Footer({ content, onJoinClick }: Props) {
  const { footer, site } = content;

  return (
    <footer className="relative border-t border-white/[0.05] bg-[#04091a] overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-blue-700/5 blur-[80px] rounded-full pointer-events-none" />

      {/* Pre-footer CTA */}
      <div className="relative border-b border-white/[0.05] py-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-25" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/8 blur-[100px] rounded-full pointer-events-none" />

        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <div className="text-xs font-bold uppercase tracking-[0.15em] text-blue-400 mb-4">Limited Founding Spots</div>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-4">
              Ready to claim<br />your spot?
            </h3>
            <p className="text-slate-400 mb-8 text-lg max-w-md mx-auto">
              Lock in founding member status before we go live. Zero cost, maximum upside.
            </p>
            <button
              onClick={onJoinClick}
              className="shimmer-btn group inline-flex items-center gap-2.5 rounded-full bg-blue-600 px-8 py-4 text-base font-bold text-white glow-button transition-all duration-200 hover:bg-blue-500 hover:scale-[1.03] active:scale-[0.97]"
            >
              Get Early Access
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="relative border-b border-white/[0.04] bg-amber-500/[0.04]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-start gap-2.5 text-xs text-amber-400/80">
            <AlertCircle className="size-3.5 flex-shrink-0 mt-0.5" />
            <p>
              <strong className="font-semibold">Disclaimer:</strong> StateSwap is an independent student-run platform
              and is <strong>not affiliated with, endorsed by, or connected to The Pennsylvania State University</strong> in
              any way. &ldquo;Penn State&rdquo; references are used solely to identify the geographic and student community
              we serve. All trademarks belong to their respective owners.
            </p>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-lg bg-blue-600/15 border border-blue-500/20 flex items-center justify-center">
              <span className="font-black text-xs text-blue-400">SS</span>
            </div>
            <span className="font-black text-white">
              State<span className="text-blue-400">Swap</span>
            </span>
          </div>

          <p className="text-slate-600 text-xs text-center">{footer.tagline}</p>

          <div className="flex items-center gap-3">
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="size-9 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all"
              aria-label="Instagram"
            >
              <ExternalLink className="size-3.5" />
            </a>
            <a
              href={`mailto:${site.email}`}
              className="size-9 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all"
              aria-label="Email us"
            >
              <Mail className="size-3.5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-700">
          <span>{footer.copyright} · Independent student project · Not affiliated with Penn State</span>
          <div className="flex items-center gap-4">
            <a href={`mailto:${site.email}`} className="hover:text-slate-500 transition-colors">Contact</a>
            <a href="/admin" className="hover:text-slate-500 transition-colors">Admin</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
