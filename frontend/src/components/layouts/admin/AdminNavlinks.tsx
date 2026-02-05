import { NavLink } from "react-router-dom";
import { cn } from "../../../lib/cn";
import { useState } from "react";

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

  // state dropdown
  const [openArticles, setOpenArticles] = useState(false);
  const [openFaculties, setOpenFaculties] = useState(false);

  return (
    <nav className="space-y-1">
      <NavLink
        to="/admin"
        end
        className={({ isActive }) => getClass(isActive)}
        onClick={onNavigate}
      >
        <span className="text-lg">🏠</span>
        Dashboard
      </NavLink>

      {/* Articles dropdown */}
      <button
        onClick={() => setOpenArticles(!openArticles)}
        className={cn(base, "w-full text-left")}
      >
        <span className="text-lg">📝</span>
        Articles {openArticles ? "▼" : "▶"}
      </button>
      {openArticles && (
        <div className="ml-6 space-y-1">
          <NavLink
            to="/admin/articles"
            className={({ isActive }) => getClass(isActive)}
            onClick={onNavigate}
          >
            All Articles
          </NavLink>
          <NavLink
            to="/admin/categories"
            className={({ isActive }) => getClass(isActive)}
            onClick={onNavigate}
          >
            Categories
          </NavLink>
          <NavLink
            to="/admin/tags"
            className={({ isActive }) => getClass(isActive)}
            onClick={onNavigate}
          >
            Tags
          </NavLink>
        </div>
      )}

      {/* Professors */}
      <NavLink
        to="/admin/professors"
        className={({ isActive }) => getClass(isActive)}
        onClick={onNavigate}
      >
        <span className="text-lg">👨‍🏫</span>
        Dosen
      </NavLink>

      {/* Faculties dropdown */}
      <button
        onClick={() => setOpenFaculties(!openFaculties)}
        className={cn(base, "w-full text-left")}
      >
        <span className="text-lg">🏫</span>
        Fakultas {openFaculties ? "▼" : "▶"}
      </button>
      {openFaculties && (
        <div className="ml-6 space-y-1">
          <NavLink
            to="/admin/faculties"
            className={({ isActive }) => getClass(isActive)}
            onClick={onNavigate}
          >
            Faculties
          </NavLink>
          <NavLink
            to="/admin/course"
            className={({ isActive }) => getClass(isActive)}
            onClick={onNavigate}
          >
            Matkul
          </NavLink>
          <NavLink
            to="/admin/study_program"
            className={({ isActive }) => getClass(isActive)}
            onClick={onNavigate}
          >
            Prodi
          </NavLink>
        </div>
      )}
    </nav>
  );
}