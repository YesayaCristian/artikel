type Props = {
  pageTitle: string;
  onOpenSidebar: () => void;
  onLogout?: () => void;
  onSearch?: (value: string) => void;
};

export default function AdminNavbar({ pageTitle, onOpenSidebar, onLogout, onSearch }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSidebar}
              className="inline-flex items-center justify-center rounded-2xl border bg-white px-3 py-2 text-sm shadow-sm hover:bg-slate-50 md:hidden"
              aria-label="Open sidebar"
            >
              ☰
            </button>

            <div className="flex items-center gap-3">
              <div className="hidden h-10 w-10 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-soft md:flex">
                A
              </div>
              <div>
                <div className="text-xs text-slate-500">Admin Panel</div>
                <h1 className="text-lg font-semibold text-slate-900 leading-tight">
                  {pageTitle}
                </h1>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 rounded-2xl border bg-white px-3 py-2 shadow-sm">
              <span className="text-slate-400">⌕</span>
              <input
                className="w-56 bg-transparent text-sm outline-none placeholder:text-slate-400"
                placeholder="Search"
                onChange={(e) => onSearch?.(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
