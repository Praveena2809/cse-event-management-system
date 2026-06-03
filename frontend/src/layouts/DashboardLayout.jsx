import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const linkClass = ({ isActive }) =>
  `block rounded-md px-3 py-2 text-sm ${
    isActive
      ? "bg-indigo-600 text-white"
      : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
  }`;

export default function DashboardLayout({ title, links }) {
  const { user } = useAuth();
  return (
    <div className="grid gap-6 md:grid-cols-[260px_1fr]">
      <aside className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Dashboard</p>
        <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">{title}</p>
        <div className="mt-4 rounded-lg bg-slate-50 p-3 text-sm dark:bg-slate-900">
          <p className="font-medium">{user?.name}</p>
          <p className="text-xs text-slate-600 dark:text-slate-300">{user?.email}</p>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">Role: {user?.role}</p>
        </div>
        <nav className="mt-4 space-y-1">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass} end={l.end}>
              {l.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <section className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
        <Outlet />
      </section>
    </div>
  );
}

