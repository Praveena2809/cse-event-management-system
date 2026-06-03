import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../services/api";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [createForm, setCreateForm] = useState({ name: "", email: "", role: "hod" });

  const load = async () => {
    const { data } = await api.get("/admin/users");
    setUsers(data.users || []);
  };

  useEffect(() => {
    load();
  }, []);

  const create = async (e) => {
    e.preventDefault();
    try {
      await api.post("/admin/users", createForm);
      toast.success("User created (credentials emailed if SMTP configured)");
      setCreateForm({ name: "", email: "", role: "hod" });
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed");
    }
  };

  const updateRole = async (id, role) => {
    try {
      await api.patch(`/admin/users/${id}/role`, { role });
      toast.success("Role updated");
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed");
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete this user?")) return;
    try {
      await api.delete(`/admin/users/${id}`);
      toast.success("Deleted");
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed");
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white">Manage Users</h3>

      <form onSubmit={create} className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900 md:grid-cols-4">
        <input
          placeholder="Name"
          value={createForm.name}
          onChange={(e) => setCreateForm((f) => ({ ...f, name: e.target.value }))}
          className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950"
          required
        />
        <input
          placeholder="Email"
          type="email"
          value={createForm.email}
          onChange={(e) => setCreateForm((f) => ({ ...f, email: e.target.value }))}
          className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950"
          required
        />
        <select
          value={createForm.role}
          onChange={(e) => setCreateForm((f) => ({ ...f, role: e.target.value }))}
          className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950"
        >
          <option value="admin">admin</option>
          <option value="hod">hod</option>
          <option value="coordinator">coordinator</option>
        </select>
        <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700">
          Create
        </button>
      </form>

      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-600 dark:bg-slate-900 dark:text-slate-300">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-950">
            {users.map((u) => (
              <tr key={u._id}>
                <td className="px-4 py-3">{u.name}</td>
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3">
                  <select
                    value={u.role}
                    onChange={(e) => updateRole(u._id, e.target.value)}
                    className="rounded-md border border-slate-200 bg-white px-2 py-1 text-sm dark:border-slate-800 dark:bg-slate-950"
                  >
                    <option value="participant">participant</option>
                    <option value="coordinator">coordinator</option>
                    <option value="hod">hod</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => remove(u._id)} className="rounded-md bg-rose-600 px-3 py-1.5 text-xs font-medium text-white">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

