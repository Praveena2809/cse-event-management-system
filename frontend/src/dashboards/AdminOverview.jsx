export default function AdminOverview() {
  return (
    <div className="space-y-3">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white">Admin Overview</h3>
      <p className="text-sm text-slate-600 dark:text-slate-300">
        Manage users, roles, and venues. In production you can extend this with backups, server monitoring, and support
        tickets.
      </p>
    </div>
  );
}

