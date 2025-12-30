"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ModeToggle } from "@/components/theme-toggle";
export default function Home() {
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [registerAs, setRegisterAs] = useState<"INDIVIDUAL" | "INSTITUTION">(
    "INDIVIDUAL"
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, type: registerAs }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ type: "success", message: "✅ Registration received!" });
        form.reset();
      } else {
        setStatus({ type: "error", message: `❌ ${data.error}` });
      }

      // Clear the message after 5 seconds
      setTimeout(() => setStatus(null), 5000);
    } catch (err) {
      console.log(err);
      setStatus({
        type: "error",
        message: "❌ Something went wrong. Please try again.",
      });
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 dark:bg-[#0a0a0a] dark:text-[#ededed] font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Header/Nav */}
      <header className="w-full max-w-6xl mx-auto p-6 flex justify-between items-center">
        <div className="font-bold text-xl tracking-tighter flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Rewyoo Logo"
            width={32}
            height={32}
            className="rounded-lg dark:brightness-0 dark:invert"
          />
          Rewyoo
        </div>
        <nav className="flex items-center gap-4">
          <a
            href="mailto:contact@rewyoo.com"
            className="text-sm font-medium hover:text-blue-600 transition-colors"
          >
            Contact Us
          </a>
          <ModeToggle />
        </nav>
      </header>

      {/* Main Content */}
      <main className="grow flex flex-col items-center justify-center px-6 py-12 sm:py-20 text-center max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm sm:text-base font-semibold tracking-tight mb-10 border border-blue-100 dark:border-blue-800 shadow-sm shadow-blue-500/10">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
          </span>
          Rewyoo.com is coming soon.
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-5xl font-semibold tracking-tight mb-6 text-balance w-full">
          An AI powered student networking platform connecting individuals with
          <br />
          trusted institutes, schools, and colleges.
        </h1>

        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-3xl leading-relaxed text-balance">
          Something truly exciting is taking shape, where intelligent discovery
          and credible insights transform how students explore and engage with
          institutions.
        </p>

        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-10 max-w-3xl leading-relaxed text-balance font-medium">
          Register below now as an Individual or an Institute to get early
          access and be among the first to experience what is next.
        </p>

        {/* Waitlist Form */}
        <div className="w-full max-w-md mx-auto">
          <form
            className="flex flex-col sm:flex-row gap-3"
            onSubmit={handleSubmit}
          >
            <div className="w-full flex rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-1">
              <button
                type="button"
                onClick={() => setRegisterAs("INDIVIDUAL")}
                aria-pressed={registerAs === "INDIVIDUAL"}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  registerAs === "INDIVIDUAL"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                Individual
              </button>
              <button
                type="button"
                onClick={() => setRegisterAs("INSTITUTION")}
                aria-pressed={registerAs === "INSTITUTION"}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  registerAs === "INSTITUTION"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                Institute
              </button>
            </div>
            <input
              name="email"
              type="email"
              placeholder="Enter your email address"
              className="grow px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
            >
              Register
            </button>
          </form>
          <p className="text-xs text-gray-400 mt-3">
            Early access updates only. No spam.
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
      </main>

      <footer className="w-full py-8 text-center text-gray-500 dark:text-gray-500 text-sm border-t border-gray-100 dark:border-gray-900">
        <p>© {new Date().getFullYear()} Rewyoo. All rights reserved.</p>
      </footer>
    </div>
  );
}
