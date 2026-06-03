import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../services/api";

export default function ManageVenues() {
  const [venues, setVenues] = useState([]);
  const [form, setForm] = useState({ name: "", location: "", capacity: "", notes: "" });

  const load = async () => {
    const { data } = await api.get("/venues");
    setVenues(data.venues || []);
  };

  useEffect(() => {
    load();
  }, []);

  const create = async (e) => {
    e.preventDefault();
    try {
      await api.post("/venues", { ...form, capacity: Number(form.capacity || 0) });
      toast.success("Venue created");
      setForm({ name: "", location: "", capacity: "", notes: "" });
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed");
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white">Manage Venues</h3>

      <form onSubmit={create} className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900 md:grid-cols-4">
        <input
          placeholder="Venue name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950"
          required
        />
        <input
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
          className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950"
        />
        <input
          placeholder="Capacity"
          value={form.capacity}
          onChange={(e) => setForm((f) => ({ ...f, capacity: e.target.value }))}
          className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950"
        />
        <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700">
          Add Venue
        </button>
        <textarea
          placeholder="Notes"
          value={form.notes}
          onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
          rows={2}
          className="md:col-span-4 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950"
        />
      </form>

      <div className="grid gap-3 md:grid-cols-2">
        {venues.map((v) => (
          <div key={v._id} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
            <p className="font-semibold text-slate-900 dark:text-white">{v.name}</p>
            <p className="text-sm text-slate-600 dark:text-slate-300">{v.location}</p>
            <p className="mt-1 text-xs text-slate-500">Capacity: {v.capacity || 0}</p>
            {v.notes ? <p className="mt-2 text-xs text-slate-500">{v.notes}</p> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

