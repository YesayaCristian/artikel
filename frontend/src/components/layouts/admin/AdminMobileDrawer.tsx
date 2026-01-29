    import { cn } from "../../../lib/cn";
import AdminNavLinks from "./AdminNavlinks";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AdminMobileDrawer({ open, onClose }: Props) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 md:hidden",
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
    >
      {/* Overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-slate-900/40 transition-opacity",
          open ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        className={cn(
          "absolute left-0 top-0 h-full w-[84%] max-w-xs bg-white shadow-soft transition-transform",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-slate-900">Admin Panel</div>
            <button
              onClick={onClose}
              className="rounded-2xl border px-3 py-2 text-sm hover:bg-slate-50"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-3">
          <AdminNavLinks onNavigate={onClose} />
        </div>
      </div>
    </div>
  );
}
