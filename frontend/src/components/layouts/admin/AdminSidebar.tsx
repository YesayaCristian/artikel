import AdminNavLinks from "./AdminNavlinks";

export default function AdminSidebar() {
  return (
    <aside className="hidden md:block">
      <div className="sticky top-20 rounded-3xl border bg-white p-3 shadow-soft">
        <div className="mb-3 flex items-center gap-3 rounded-3xl bg-gradient-to-r from-primary-700 to-primary-500 p-4 text-white">
          <div className="h-11 w-11 rounded-3xl bg-white/15 flex items-center justify-center font-bold">
            A
          </div>
          <div className="leading-tight">
            <div className="text-sm opacity-90">Artikel</div>
            <div className="font-semibold">Admin</div>
          </div>
        </div>

        <AdminNavLinks />

        <div className="mt-4 rounded-3xl bg-slate-50 p-3">
          <div className="text-xs text-slate-500">Tip</div>
          <div className="text-sm font-semibold text-slate-800">
            Draft dulu, publish belakangan.
          </div>
        </div>
      </div>
    </aside>
  );
}
