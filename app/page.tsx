"use client";
import { useState } from "react";

export default function DemoLogin() {
  const [status, setStatus] = useState<"idle" | "scanning" | "success">("idle");

  const startDemoLogin = () => {
    setStatus("scanning");
    setTimeout(() => {
      setStatus("success");
    }, 3000);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6 text-slate-900">
      <div className="mb-6 rounded-full bg-amber-100 px-4 py-1.5 text-center text-xs font-medium text-amber-800">
        Prototype / Demo Mode — Not affiliated with any real e-ID provider
      </div>

      <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-8 text-center shadow-md">
        <h1 className="mb-2 text-xl font-bold">Demo e-ID Login</h1>

        {status === "idle" && (
          <>
            <p className="mb-6 text-sm text-slate-600">
              Tap below to simulate mobile identity verification.
            </p>
            <button
              onClick={startDemoLogin}
              className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white active:bg-blue-700"
            >
              Simulate Mobile Login
            </button>
          </>
        )}

        {status === "scanning" && (
          <div className="py-4">
            <div className="mx-auto mb-4 flex h-36 w-36 items-center justify-center rounded-lg border-2 border-dashed border-slate-400 bg-slate-50 text-xs text-slate-500">
              [Mock QR Code]
            </div>
            <p className="animate-pulse text-sm font-medium text-slate-700">
              Waiting for simulated app approval...
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="py-4">
            <p className="mb-2 text-lg font-semibold text-green-600">
              ✓ Verified (Demo)
            </p>
            <p className="mb-6 text-sm text-slate-600">
              Welcome, <strong>Test Testsson</strong>
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="text-xs text-slate-500 underline"
            >
              Reset Demo
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
