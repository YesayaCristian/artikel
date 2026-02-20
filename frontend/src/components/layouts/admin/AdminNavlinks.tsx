import { NavLink } from "react-router-dom";
import { cn } from "../../../lib/cn";
import { BookOpen, LayoutDashboard, Users, FileText } from "lucide-react";

type Props = {
  onNavigate?: () => void;
};

export default function AdminNavLinks({ onNavigate }: Props) {
  const base =
    "group flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-semibold transition";

  const getClass = (isActive: boolean) =>
    cn(
      base,
      isActive
        ? "bg-primary-50 text-primary-700 ring-1 ring-primary-100"
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
    );


  return (
    <nav className="space-y-1">
      <NavLink to="/admin" end className={({ isActive }) => getClass(isActive)}onClick={onNavigate}
      ><LayoutDashboard />
        Dashboard
      </NavLink>
      <NavLink to="/admin/course" className={({ isActive }) => getClass(isActive)} onClick={onNavigate}><BookOpen />
            Mata Kuliah
      </NavLink>
      <NavLink to="/admin/professors" className={({ isActive }) => getClass(isActive)} onClick={onNavigate}><Users />
        Dosen
      </NavLink>
      <NavLink to="/admin/articles"className={({ isActive }) => getClass(isActive)} onClick={onNavigate}><FileText />
            Articles
      </NavLink>
    </nav>  
  );
}