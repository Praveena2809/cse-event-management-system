import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../services/api";

export default function PendingApprovals() {
  const [data, setData] = useState({ events: [], subevents: [] });
  const [reason, setReason] = useState({});

  const load = async () => {
    const { data } = await api.get("/events/hod/pending");
    setData({ events: data.events || [], subevents: data.subevents || [] });
  };

  useEffect(() => {
    load();
  }, []);

  const approveEvent = async (id) => {
    await api.post(`/events/hod/events/${id}/approve`);
    toast.success("Event approved");
    load();
  };
  const rejectEvent = async (id) => {
    await api.post(`/events/hod/events/${id}/reject`, { reason: reason[id] || "Not specified" });
    toast.success("Event rejected");
    load();
  };
  const approveSubevent = async (id) => {
    await api.post(`/events/hod/subevents/${id}/approve`);
    toast.success("Subevent approved");
    load();
  };
  const rejectSubevent = async (id) => {
    await api.post(`/events/hod/subevents/${id}/reject`, { reason: reason[id] || "Not specified" });
    toast.success("Subevent rejected");
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Pending Approvals</h3>
        <button
          onClick={load}
          className="rounded-md border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
        >
          Refresh
        </button>
      </div>

      <div className="space-y-3">
        <p className="font-semibold text-slate-900 dark:text-white">Main Events</p>
        {data.events.map((e) => (
          <div key={e._id} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
            <p className="font-semibold">{e.name}</p>
            <p className="text-sm text-slate-600 dark:text-slate-300">{e.description}</p>
            <p className="mt-1 text-xs text-slate-500">Created by: {e.createdBy?.name} ({e.createdBy?.email})</p>
            <div className="mt-3 grid gap-2 md:grid-cols-[1fr_auto_auto]">
              <input
                placeholder="Rejection reason (if any)"
                value={reason[e._id] || ""}
                onChange={(ev) => setReason((r) => ({ ...r, [e._id]: ev.target.value }))}
                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950"
              />
              <button onClick={() => approveEvent(e._id)} className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white">
                Approve
              </button>
              <button onClick={() => rejectEvent(e._id)} className="rounded-md bg-rose-600 px-3 py-2 text-sm font-medium text-white">
                Reject
              </button>
            </div>
          </div>
        ))}
        {!data.events.length && <p className="text-sm text-slate-600 dark:text-slate-300">No pending main events.</p>}
      </div>

      <div className="space-y-3">
        <p className="font-semibold text-slate-900 dark:text-white">Subevents</p>
        {data.subevents.map((s) => (
          <div key={s._id} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
            <p className="font-semibold">
              {s.name} <span className="text-xs text-slate-500">({s.type})</span>
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300">Main event: {s.event?.name}</p>
            <p className="text-sm text-slate-600 dark:text-slate-300">{s.description}</p>
            <div className="mt-3 grid gap-2 md:grid-cols-[1fr_auto_auto]">
              <input
                placeholder="Rejection reason (if any)"
                value={reason[s._id] || ""}
                onChange={(ev) => setReason((r) => ({ ...r, [s._id]: ev.target.value }))}
                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950"
              />
              <button onClick={() => approveSubevent(s._id)} className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white">
                Approve
              </button>
              <button onClick={() => rejectSubevent(s._id)} className="rounded-md bg-rose-600 px-3 py-2 text-sm font-medium text-white">
                Reject
              </button>
            </div>
          </div>
        ))}
        {!data.subevents.length && <p className="text-sm text-slate-600 dark:text-slate-300">No pending subevents.</p>}
      </div>
    </div>
  );
}

