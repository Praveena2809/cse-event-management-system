import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    registerNumber: "",
    year: "",
    department: "CSE",
    phone: "",
    email: "",
    password: "",
    collegeName: "",
  });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form);
      toast.success("Account created. Please verify email if prompted.");
      navigate("/dashboard/participant");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Participant Registration</h2>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
        Fill your details. External participants can add college name.
      </p>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
        {[
          ["name", "Name"],
          ["registerNumber", "Register Number"],
          ["year", "Year"],
          ["department", "Department"],
          ["phone", "Phone"],
          ["email", "Email"],
        ].map(([name, label]) => (
          <div key={name} className={name === "name" ? "md:col-span-2" : ""}>
            <label className="text-sm font-medium">{label}</label>
            <input
              name={name}
              value={form[name]}
              onChange={onChange}
              className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-950"
              required={["name", "email", "phone"].includes(name)}
            />
          </div>
        ))}

        <div className="md:col-span-2">
          <label className="text-sm font-medium">College Name (if external)</label>
          <input
            name="collegeName"
            value={form.collegeName}
            onChange={onChange}
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-950"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm font-medium">Password</label>
          <input
            name="password"
            value={form.password}
            onChange={onChange}
            type="password"
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-950"
            required
            minLength={6}
          />
        </div>

        <button
          disabled={loading}
          className="md:col-span-2 w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>

      <div className="mt-4 text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-600 hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
}

