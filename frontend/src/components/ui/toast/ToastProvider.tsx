import React, { createContext, useContext, useMemo, useState } from "react";
import { cn } from "../../../lib/cn";

type ToastType = "success" | "error" | "info";

type ToastItem = {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
};

type ToastContextValue = {
  toast: (t: Omit<ToastItem, "id">) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

function typeStyles(type: ToastType) {
  if (type === "success") return "border-green-200 bg-green-50 text-green-800";
  if (type === "error") return "border-red-200 bg-red-50 text-red-800";
  return "border-primary-200 bg-primary-50 text-primary-800";
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const value = useMemo<ToastContextValue>(() => {
    return {
      toast: (t) => {
        const id = crypto.randomUUID?.() ?? String(Date.now() + Math.random());
        const toastItem: ToastItem = { id, ...t };
        setItems((prev) => [toastItem, ...prev]);

        window.setTimeout(() => {
          setItems((prev) => prev.filter((x) => x.id !== id));
        }, 2600);
      },
    };
  }, []);

  return (
    <ToastContext.Provider value={value}>
      {children}

      {/* Toast viewport */}
      <div className="fixed right-4 top-4 z-[100] w-[92vw] max-w-sm space-y-2">
        {items.map((t) => (
          <div
            key={t.id}
            className={cn(
              "rounded-2xl border p-4 shadow-soft backdrop-blur transition",
              typeStyles(t.type)
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold">{t.title}</div>
                {t.message && <div className="mt-1 text-sm opacity-90">{t.message}</div>}
              </div>
              <button
                className="rounded-xl border border-black/10 px-2 py-1 text-xs hover:bg-white/40"
                onClick={() => setItems((prev) => prev.filter((x) => x.id !== t.id))}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}
