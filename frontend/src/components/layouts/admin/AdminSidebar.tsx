import { useState } from "react";
import AdminNavLinks from "../admin/AdminNavlinks";

type Props = {
  open: boolean;
  onToggle: () => void;
};

export default function AdminSidebar({ open, onToggle }: Props) {
  return (
    <aside
      className={`fixed top-0 left-0 h-screen transition-transform duration-300 z-50 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="w-64 h-full rounded-r-3xl border bg-white p-3 shadow-soft flex flex-col">
        {/* Header */}
        <div className="mb-3 flex items-center gap-3 rounded-3xl bg-gradient-to-r from-primary-700 to-primary-500 p-4 text-white">
          <div className="h-11 w-11 rounded-3xl bg-white/15 flex items-center justify-center font-bold">
            A
          </div>
          <div className="leading-tight">
            <div className="text-sm opacity-90">Artikel</div>
            <div className="font-semibold">Admin</div>
          </div>
        </div>

        {/* Nav Links */}
        <AdminNavLinks onNavigate={onToggle} />

        {/* Footer Tip */}
        <div className="mt-auto rounded-3xl bg-slate-50 p-3">
          <div className="text-xs text-slate-500">Tip</div>
          <div className="text-sm font-semibold text-slate-800">
            Draft dulu, publish belakangan.
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute top-4 -right-10 bg-primary-600 text-white p-2 rounded-r-lg shadow-md"
      >
        {open ? "⏴" : "⏵"}
      </button>
    </aside>
  );
}