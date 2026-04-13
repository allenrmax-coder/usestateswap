"use client";

import { useState, useEffect } from "react";
import { Save, Lock, Eye, EyeOff, CheckCircle, AlertCircle, Edit3, RefreshCw } from "lucide-react";

type ContentData = Record<string, unknown>;

const EDITABLE_SECTIONS = [
  { key: "site", label: "Site Info" },
  { key: "hero", label: "Hero Section" },
  { key: "howItWorks", label: "How It Works" },
  { key: "whyStateSwap", label: "Why StateSwap" },
  { key: "forEntrepreneurs", label: "For Entrepreneurs" },
  { key: "launchTimeline", label: "Launch Timeline" },
  { key: "joinEarly", label: "Join Early Form" },
  { key: "footer", label: "Footer" },
];

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [authError, setAuthError] = useState("");

  const [content, setContent] = useState<ContentData | null>(null);
  const [activeSection, setActiveSection] = useState("site");
  const [editValue, setEditValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const expected = "stateswap2025";
    if (password === expected) {
      setAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Incorrect password");
    }
  }

  async function loadContent() {
    try {
      const res = await fetch("/api/content", { method: "GET" });
      if (res.ok) {
        const data = await res.json();
        setContent(data);
      }
    } catch {
      // fallback — load from window
    }
  }

  useEffect(() => {
    if (authenticated) {
      fetch("/content.json")
        .then((r) => r.json())
        .then((data) => {
          setContent(data);
          const section = data[EDITABLE_SECTIONS[0].key];
          setEditValue(JSON.stringify(section, null, 2));
        })
        .catch(() => {});
    }
  }, [authenticated]);

  useEffect(() => {
    if (content && activeSection) {
      const section = (content as Record<string, unknown>)[activeSection];
      setEditValue(JSON.stringify(section, null, 2));
    }
  }, [activeSection, content]);

  async function handleSave() {
    if (!content) return;
    setSaving(true);
    setSaveStatus("idle");

    try {
      const parsed = JSON.parse(editValue);
      const updated = { ...content, [activeSection]: parsed };

      const res = await fetch("/api/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": "stateswap2025",
        },
        body: JSON.stringify(updated),
      });

      if (res.ok) {
        setContent(updated);
        setSaveStatus("success");
      } else {
        setSaveStatus("error");
      }
    } catch {
      setSaveStatus("error");
    } finally {
      setSaving(false);
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020b18] px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-blue-600/15 border border-blue-500/20 mb-4">
              <Lock className="size-7 text-blue-400" />
            </div>
            <h1 className="text-2xl font-black text-white">Admin Panel</h1>
            <p className="text-slate-500 mt-1 text-sm">StateSwap CMS</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                placeholder="Admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/[0.08] bg-[#030f1f] px-4 py-3 pr-12 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all"
                autoFocus
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                onClick={() => setShowPw(!showPw)}
              >
                {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {authError && <p className="text-xs text-red-400">{authError}</p>}
            <button
              type="submit"
              className="w-full rounded-full bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020b18] flex flex-col">
      {/* Header */}
      <header className="border-b border-white/[0.06] bg-[#030f1f]/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-lg bg-blue-600/15 border border-blue-500/20 flex items-center justify-center">
            <Edit3 className="size-4 text-blue-400" />
          </div>
          <div>
            <h1 className="font-bold text-white text-sm">StateSwap Admin</h1>
            <p className="text-xs text-slate-500">Content Management</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.open("/", "_blank")}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Eye className="size-3.5" />
            Preview Site
          </button>
          <button
            onClick={loadContent}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <RefreshCw className="size-3.5" />
            Reload
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <nav className="w-52 flex-shrink-0 border-r border-white/[0.06] bg-[#030f1f]/40 py-4 px-3 space-y-1">
          {EDITABLE_SECTIONS.map((s) => (
            <button
              key={s.key}
              onClick={() => setActiveSection(s.key)}
              className={`w-full text-left rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                activeSection === s.key
                  ? "bg-blue-600/20 text-blue-300 border border-blue-500/20"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>

        {/* Editor */}
        <div className="flex-1 flex flex-col p-6 overflow-auto">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">
                {EDITABLE_SECTIONS.find((s) => s.key === activeSection)?.label}
              </h2>
              <p className="text-xs text-slate-500">Edit JSON below and save. Changes go live immediately.</p>
            </div>
            <div className="flex items-center gap-3">
              {saveStatus === "success" && (
                <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                  <CheckCircle className="size-3.5" /> Saved!
                </span>
              )}
              {saveStatus === "error" && (
                <span className="flex items-center gap-1.5 text-xs text-red-400">
                  <AlertCircle className="size-3.5" /> Save failed
                </span>
              )}
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 disabled:opacity-60 transition-colors"
              >
                <Save className="size-3.5" />
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>

          {/* JSON Editor */}
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            spellCheck={false}
            className="flex-1 min-h-[500px] w-full rounded-xl border border-white/[0.08] bg-[#030f1f] p-5 font-mono text-sm text-slate-200 leading-relaxed outline-none focus:border-blue-500/40 focus:ring-2 focus:ring-blue-500/10 resize-none transition-all"
          />

          <p className="mt-3 text-xs text-slate-600">
            Tip: Valid JSON only. Arrays use <code className="text-slate-500">[]</code>, objects use <code className="text-slate-500">{"{}"}</code>.
            Reload the page after saving to see changes reflected in the editor.
          </p>
        </div>
      </div>
    </div>
  );
}
