import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";

export default function Profile() {
  const { user, reload } = useAuth();
  const [form, setForm] = useState({ name: "", phone: "", year: "", department: "", collegeName: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        phone: user.phone || "",
        year: user.year || "",
        department: user.department || "",
        collegeName: user.collegeName || "",
      });
    }
  }, [user]);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put("/auth/me", form);
      await reload();
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Profile</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">Update your details.</p>
      </div>

      <form onSubmit={onSave} className="grid gap-4 md:grid-cols-2">
        {[
          ["name", "Name"],
          ["phone", "Phone"],
          ["year", "Year"],
          ["department", "Department"],
          ["collegeName", "College Name (if external)"],
        ].map(([name, label]) => (
          <div key={name} className={name === "collegeName" ? "md:col-span-2" : ""}>
            <label className="text-sm font-medium">{label}</label>
            <input
              name={name}
              value={form[name]}
              onChange={onChange}
              className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-950"
            />
          </div>
        ))}

        <button
          disabled={saving}
          className="md:col-span-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

