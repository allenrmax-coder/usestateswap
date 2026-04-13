"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Loader2, ArrowRight } from "lucide-react";
import type { SiteContent } from "@/lib/content";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  content: SiteContent;
}

type FormData = {
  name: string;
  email: string;
  role: string;
  services: string;
  studentStatus: string;
};

type FieldError = Partial<Record<keyof FormData, string>>;

export default function JoinModal({ isOpen, onClose, content }: Props) {
  const { joinEarly } = content;
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    role: "",
    services: "",
    studentStatus: "",
  });
  const [errors, setErrors] = useState<FieldError>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  function validate(): boolean {
    const errs: FieldError = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!form.email.includes("@")) errs.email = "Enter a valid email";
    if (!form.role) errs.role = "Please select an option";
    if (!form.studentStatus) errs.studentStatus = "Please select your status";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    try {
      const googleSheetsUrl = content.site.googleSheetsUrl;

      if (googleSheetsUrl && googleSheetsUrl !== "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE") {
        await fetch(googleSheetsUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            ...form,
          }),
        });
      } else {
        // Development fallback — log to console
        console.log("Form submission (no Google Sheets URL set):", form);
        await new Promise((r) => setTimeout(r, 1000));
      }
      setSuccess(true);
    } catch {
      // no-cors mode means we treat any response as success
      setSuccess(true);
    } finally {
      setSubmitting(false);
    }
  }

  function resetAndClose() {
    onClose();
    setTimeout(() => {
      setSuccess(false);
      setForm({ name: "", email: "", role: "", services: "", studentStatus: "" });
      setErrors({});
    }, 300);
  }

  const inputClass = (field: keyof FormData) =>
    `w-full rounded-xl border px-4 py-3 text-sm bg-[#030f1f] text-white placeholder-slate-500 outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-500/40 ${
      errors[field]
        ? "border-red-500/50 focus:border-red-400"
        : "border-white/[0.08] focus:border-blue-500/50 hover:border-white/15"
    }`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
            onClick={resetAndClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-lg rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#06162f] to-[#030d1e] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />

              {/* Close button */}
              <button
                onClick={resetAndClose}
                className="absolute top-4 right-4 size-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all z-10"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>

              <div className="p-7 sm:p-8">
                <AnimatePresence mode="wait">
                  {success ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center text-center py-8"
                    >
                      <div className="size-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-5">
                        <CheckCircle className="size-8 text-emerald-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">You&apos;re in!</h3>
                      <p className="text-slate-400 mb-6 leading-relaxed">{joinEarly.successMessage}</p>
                      <button
                        onClick={resetAndClose}
                        className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
                      >
                        Done
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div key="form" initial={{ opacity: 1 }}>
                      {/* Header */}
                      <div className="mb-6">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/25 bg-blue-950/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-blue-300 mb-3">
                          {joinEarly.badge}
                        </span>
                        <h2 className="text-2xl font-black text-white mb-1">{joinEarly.formTitle}</h2>
                        <p className="text-sm text-slate-400">{joinEarly.subheadline}</p>
                      </div>

                      <form onSubmit={handleSubmit} noValidate className="space-y-4">
                        {/* Name */}
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
                            {joinEarly.fields.name} <span className="text-blue-400">*</span>
                          </label>
                          <input
                            type="text"
                            className={inputClass("name")}
                            placeholder="Your full name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            autoComplete="name"
                          />
                          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
                            {joinEarly.fields.email} <span className="text-blue-400">*</span>
                          </label>
                          <input
                            type="email"
                            className={inputClass("email")}
                            placeholder="you@psu.edu"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            autoComplete="email"
                            inputMode="email"
                          />
                          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                        </div>

                        {/* Role */}
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
                            {joinEarly.fields.role} <span className="text-blue-400">*</span>
                          </label>
                          <select
                            className={`${inputClass("role")} cursor-pointer`}
                            value={form.role}
                            onChange={(e) => setForm({ ...form, role: e.target.value })}
                          >
                            <option value="">Select one...</option>
                            {joinEarly.fields.roleOptions.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                          {errors.role && <p className="mt-1 text-xs text-red-400">{errors.role}</p>}
                        </div>

                        {/* Student Status */}
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
                            {joinEarly.fields.studentStatus} <span className="text-blue-400">*</span>
                          </label>
                          <select
                            className={`${inputClass("studentStatus")} cursor-pointer`}
                            value={form.studentStatus}
                            onChange={(e) => setForm({ ...form, studentStatus: e.target.value })}
                          >
                            <option value="">Select one...</option>
                            {joinEarly.fields.studentStatusOptions.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                          {errors.studentStatus && <p className="mt-1 text-xs text-red-400">{errors.studentStatus}</p>}
                        </div>

                        {/* What they'd sell */}
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
                            {joinEarly.fields.services}
                          </label>
                          <textarea
                            className={`${inputClass("services")} resize-none`}
                            rows={3}
                            placeholder="e.g. Photography, tutoring, used textbooks..."
                            value={form.services}
                            onChange={(e) => setForm({ ...form, services: e.target.value })}
                          />
                        </div>

                        {/* Submit */}
                        <button
                          type="submit"
                          disabled={submitting}
                          className="shimmer-btn w-full rounded-full bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/40 hover:bg-blue-500 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                        >
                          {submitting ? (
                            <>
                              <Loader2 className="size-4 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              {joinEarly.submitText}
                              <ArrowRight className="size-4" />
                            </>
                          )}
                        </button>

                        <p className="text-center text-xs text-slate-500">
                          No spam. Ever. Unsubscribe anytime.
                        </p>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
