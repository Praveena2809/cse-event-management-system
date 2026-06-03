import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { loadRazorpay } from "../services/razorpay";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [q, setQ] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/events/public");
      setEvents(data.events || []);
    })();
  }, []);

  const filtered = events.filter((e) => e.name.toLowerCase().includes(q.toLowerCase()));

  const register = async (subeventId) => {
    try {
      const { data } = await api.post(`/registrations/${subeventId}/register`);
      toast.success("Registered. QR generated.");

      if (!data.razorpay) return;

      const ok = await loadRazorpay();
      if (!ok) throw new Error("Failed to load Razorpay");

      const options = {
        key: data.razorpay.keyId,
        amount: data.razorpay.amount,
        currency: data.razorpay.currency,
        order_id: data.razorpay.orderId,
        name: "CSE Events",
        description: "Event registration fee",
        handler: async (response) => {
          try {
            await api.post("/registrations/razorpay/verify", response);
            toast.success("Payment successful");
          } catch (e) {
            toast.error(e?.response?.data?.message || "Payment verification failed");
          }
        },
      };

      // eslint-disable-next-line no-undef
      const rz = new Razorpay(options);
      rz.open();
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || "Registration failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Events</h2>
          <p className="text-slate-600 dark:text-slate-300">Browse approved events & subevents.</p>
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search events..."
          className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-950 md:w-80"
        />
      </div>

      <div className="grid gap-5">
        {filtered.map((e) => (
          <div key={e._id} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-xl font-semibold text-slate-900 dark:text-white">{e.name}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{e.description}</p>
                <p className="mt-2 text-xs text-slate-500">
                  Date: {new Date(e.date).toLocaleDateString("en-IN")}
                </p>
              </div>
              <div className="h-20 w-full rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 md:w-48" />
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {(e.subevents || []).map((s) => (
                <div
                  key={s._id}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-900 dark:text-white">{s.name}</p>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{s.description}</p>
                      <p className="mt-2 text-xs text-slate-500">
                        Venue: {s.venue?.name || "TBA"} • {new Date(s.startAt).toLocaleString("en-IN")}
                      </p>
                      <p className="text-xs text-slate-500">
                        Eligibility: {s.eligibility || "Open"} • Fee: ₹{s.entryFee || 0}
                      </p>
                    </div>
                    <span className="rounded-full bg-indigo-600/10 px-2 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-300">
                      {s.type}
                    </span>
                  </div>
                  <div className="mt-3">
                    {!user ? (
                      <Link
                        to="/login"
                        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700"
                      >
                        Register
                      </Link>
                    ) : user.role === "participant" ? (
                      <button
                        type="button"
                        onClick={() => register(s._id)}
                        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700"
                      >
                        Register Now
                      </button>
                    ) : (
                      <span className="text-xs text-slate-500">Login as participant to register</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {!filtered.length && (
          <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center text-slate-600 dark:border-slate-700 dark:text-slate-300">
            No events found.
          </div>
        )}
      </div>
    </div>
  );
}
