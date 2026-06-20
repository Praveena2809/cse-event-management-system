import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { api } from "../services/api";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function VerifyEmail() {
  const q = useQuery();
  const token = q.get("token");
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/auth/verify-email?token=${token}`);
        setStatus("success");
        setMessage(data.message || "Verified");
      } catch (err) {
        setStatus("error");
        setMessage(err?.response?.data?.message || "Verification failed");
      }
    })();
  }, [token]);

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Email Verification</h2>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
        {status === "verifying" ? "Verifying..." : message}
      </p>
      <div className="mt-5">
      <Link
  to="/login/participant"
  className="text-indigo-600 hover:underline"
>
  Go to Login
</Link>
      </div>
    </div>
  );
}

