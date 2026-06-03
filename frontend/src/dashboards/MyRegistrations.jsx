import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../services/api";

function downloadBlob(blob, filename) {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}

export default function MyRegistrations() {
  const [items, setItems] = useState([]);

  const load = async () => {
    const { data } = await api.get("/registrations/me");
    setItems(data.registrations || []);
  };

  useEffect(() => {
    load();
  }, []);

  const downloadCertificate = async (registrationId) => {
    try {
      const res = await api.get(`/registrations/certificate/${registrationId}`, { responseType: "blob" });
      downloadBlob(res.data, `certificate-${registrationId}.pdf`);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Certificate not available yet");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">My Registered Events</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">QR code is generated after registration.</p>
        </div>
        <button
          onClick={load}
          className="rounded-md border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
        >
          Refresh
        </button>
      </div>

      <div className="space-y-3">
        {items.map((r) => (
          <div key={r._id} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
            <div className="grid gap-4 md:grid-cols-[1fr_140px]">
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">{r.subevent?.name}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">{r.subevent?.event?.name}</p>
                <p className="mt-2 text-xs text-slate-500">Status: {r.status}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => downloadCertificate(r._id)}
                    className="rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700"
                  >
                    Download Certificate
                  </button>
                </div>
              </div>
              <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-900">
                {r.qrPngDataUrl ? (
                  <img src={r.qrPngDataUrl} alt="QR" className="mx-auto h-28 w-28" />
                ) : (
                  <div className="flex h-28 items-center justify-center text-xs text-slate-500">No QR</div>
                )}
              </div>
            </div>
          </div>
        ))}

        {!items.length && <p className="text-sm text-slate-600 dark:text-slate-300">No registrations yet.</p>}
      </div>
    </div>
  );
}

