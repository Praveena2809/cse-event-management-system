// import LoginLanding from "./LoginLanding";

// // Backwards compatibility: /login shows the role selection screen
// export default function Login() {
//   return <LoginLanding />;
// }
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import LoginLanding from "./LoginLanding";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { role } = useParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // If no role selected, show role cards
  if (!role) {
    return <LoginLanding />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const user = await login(email, password);

      toast.success("Login successful");

      // Redirect based on actual user role
      switch (user.role) {
        case "participant":
          navigate("/dashboard/participant");
          break;

        case "coordinator":
          navigate("/dashboard/coordinator");
          break;

        case "hod":
          navigate("/dashboard/hod");
          break;

        case "admin":
          navigate("/dashboard/admin");
          break;

        default:
          navigate("/");
      }
    } catch (err) {
      console.error(err);

      toast.error(
        err?.response?.data?.message ||
          "Invalid credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          {role.charAt(0).toUpperCase() +
            role.slice(1)}{" "}
          Login
        </h2>

        <p className="mt-1 text-slate-600 dark:text-slate-300">
          Login as {role}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full rounded-md border p-3 text-black"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full rounded-md border p-3 text-black"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading
            ? "Logging in..."
            : `Login as ${role}`}
        </button>
      </form>
    </div>
  );
}