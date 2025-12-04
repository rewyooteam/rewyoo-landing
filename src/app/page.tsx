"use client";
import React, { useState } from "react";
export default function Home() {
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ type: "success", message: "✅ You're on the waitlist!" });
        form.reset();
      } else {
        setStatus({ type: "error", message: `❌ ${data.error}` });
      }

      // Clear the message after 5 seconds
      setTimeout(() => setStatus(null), 5000);
    } catch (err) {
      setStatus({
        type: "error",
        message: "❌ Something went wrong. Please try again.",
      });
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Header/Nav */}
      <header className="w-full max-w-6xl mx-auto p-6 flex justify-between items-center">
        <div className="font-bold text-xl tracking-tighter flex items-center gap-2">
          <span className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center text-lg font-mono">
            R
          </span>
          Rewyoo
        </div>
        <nav>
          <a
            href="mailto:contact@rewyoo.com"
            className="text-sm font-medium hover:text-blue-600 transition-colors"
          >
            Contact Us
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="grow flex flex-col items-center justify-center px-6 py-12 sm:py-20 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium uppercase tracking-wider mb-8 border border-blue-100 dark:border-blue-800">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Coming Soon
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 text-balance">
          The Social Network for <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
            Education Transparency
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl leading-relaxed text-balance">
          Bridging the gap between students, alumni, and institutes. Make
          informed decisions with verified reviews and data-driven insights.
        </p>

        {/* Waitlist Form */}
        <div className="w-full max-w-md mx-auto mb-20">
          <form
            className="flex flex-col sm:flex-row gap-3"
            onSubmit={handleSubmit}
          >
            <input
              name="email"
              type="email"
              placeholder="Enter your email address"
              className="grow px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
            >
              Join Waitlist
            </button>
          </form>
          <p className="text-xs text-gray-400 mt-3">
            Be the first to know when we launch. No spam, ever.
          </p>
          {status && (
            <div
              className={`mt-4 p-3 rounded-md text-sm ${
                status.type === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {status.message}
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left w-full max-w-5xl border-t border-gray-100 dark:border-gray-800 pt-16">
          <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Transparent Reviews</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Verified feedback on faculty, infrastructure, and placements from
              real students and alumni.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-6 h-6 text-violet-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Alumni Network</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Connect with seniors and alumni to get mentorship and career
              guidance.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-6 h-6 text-emerald-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Institute Analytics</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Data-driven insights for institutes to understand and improve
              their campus reputation.
            </p>
          </div>
        </div>
      </main>

      <footer className="w-full py-8 text-center text-gray-500 dark:text-gray-500 text-sm border-t border-gray-100 dark:border-gray-900">
        <p>© {new Date().getFullYear()} Rewyoo. All rights reserved.</p>
      </footer>
    </div>
  );
}
