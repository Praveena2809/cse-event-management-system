import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../services/api";

export default function CoordinatorApplications() {
  const [apps, setApps] = useState([]);
  const [reason, setReason] = useState({});

  const load = async () => {
    const { data } = await api.get("/coordinator-applications");
    setApps(data.applications || []);
  };

  useEffect(() => {
    load();
  }, []);

  const approve = async (id) => {
    await api.post(`/coordinator-applications/${id}/approve`);
    toast.success("Approved");
    load();
  };
  const reject = async (id) => {
    await api.post(`/coordinator-applications/${id}/reject`, { reason: reason[id] || "Not specified" });
    toast.success("Rejected");
    load();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Coordinator Applications</h3>
        <button
          onClick={load}
          className="rounded-md border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
        >
          Refresh
        </button>
      </div>

      <div className="space-y-3">
        {apps.map((a) => (
          <div key={a._id} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">{a.name}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Reg No: {a.registerNumber} • CGPA: {a.cgpa} • {a.department} {a.year}
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Achievements: {a.achievements}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Vision: {a.visionForEvent}</p>
                <p className="mt-2 text-xs text-slate-500">Status: {a.status}</p>
                {a.rejectionReason && <p className="mt-1 text-xs text-rose-600">Reason: {a.rejectionReason}</p>}
              </div>
              <div className="w-full md:w-80">
                <input
                  placeholder="Rejection reason"
                  value={reason[a._id] || ""}
                  onChange={(e) => setReason((r) => ({ ...r, [a._id]: e.target.value }))}
                  className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950"
                />
                <div className="mt-2 flex gap-2">
                  <button onClick={() => approve(a._id)} className="flex-1 rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white">
                    Approve
                  </button>
                  <button onClick={() => reject(a._id)} className="flex-1 rounded-md bg-rose-600 px-3 py-2 text-sm font-medium text-white">
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {!apps.length && <p className="text-sm text-slate-600 dark:text-slate-300">No applications.</p>}
      </div>
    </div>
  );
}

