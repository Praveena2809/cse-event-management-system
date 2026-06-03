import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../services/api";

export default function ApplyCoordinator() {
  const [application, setApplication] = useState(null);
  const [form, setForm] = useState({ cgpa: "", achievements: "", visionForEvent: "" });
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const { data } = await api.get("/coordinator-applications/me");
    setApplication(data.application);
  };

  useEffect(() => {
    load();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/coordinator-applications", form);
      setApplication(data.application);
      toast.success("Application submitted");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Coordinator Application</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">Apply to become an Event Coordinator.</p>
      </div>

      {application && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm">
            Status:{" "}
            <span className="font-semibold">
              {application.status.toUpperCase()}
            </span>
          </p>
          {application.rejectionReason && (
            <p className="mt-2 text-sm text-red-600">Reason: {application.rejectionReason}</p>
          )}
        </div>
      )}

      <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium">CGPA</label>
          <input
            value={form.cgpa}
            onChange={(e) => setForm((f) => ({ ...f, cgpa: e.target.value }))}
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-950"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm font-medium">Achievements</label>
          <textarea
            value={form.achievements}
            onChange={(e) => setForm((f) => ({ ...f, achievements: e.target.value }))}
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-950"
            rows={3}
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm font-medium">Vision for event</label>
          <textarea
            value={form.visionForEvent}
            onChange={(e) => setForm((f) => ({ ...f, visionForEvent: e.target.value }))}
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-950"
            rows={3}
            required
          />
        </div>

        <button
          disabled={loading}
          className="md:col-span-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}

