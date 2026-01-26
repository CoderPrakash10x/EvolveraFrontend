import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";
import { setAdminToken } from "../../utils/auth";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await API.post("/admin/login", form);
      setAdminToken(data.token);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md bg-zinc-900/60 border border-white/10 rounded-3xl p-8"
      >
        <h1 className="text-3xl font-black text-white mb-6 tracking-tight">
          Admin <span className="text-orange-500">Login</span>
        </h1>

        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-2">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={form.email}
            onChange={onChange}
            required
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={onChange}
            required
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full py-3 rounded-xl bg-orange-500 text-black font-black uppercase tracking-widest text-xs hover:bg-white transition disabled:opacity-60"
        >
          {loading ? "Signing In..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
