import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";
import { setAdminToken } from "../../utils/auth";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    if (error) setError("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await API.post("/admin/login", form);

      setAdminToken(data.token);

      navigate("/admin", {
        replace: true,
      });
    } catch (err) {
      setError(
        err?.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden flex items-center justify-center px-4 sm:px-6">

      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-180px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-orange-500/10 blur-[130px] rounded-full" />
        <div className="absolute bottom-[-200px] right-[-100px] w-[400px] h-[400px] bg-orange-600/5 blur-[120px] rounded-full" />
      </div>

      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "45px 45px",
        }}
      />

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-[430px]">

        {/* Brand */}
        <div className="text-center mb-8">

          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 mb-5 shadow-[0_0_35px_rgba(249,115,22,0.12)]">
            <ShieldCheck
              size={28}
              className="text-orange-500"
              strokeWidth={2}
            />
          </div>

          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles
              size={14}
              className="text-orange-500"
            />

            <span className="text-[11px] uppercase tracking-[0.3em] text-orange-400 font-bold">
              Secure Access
            </span>

            <Sparkles
              size={14}
              className="text-orange-500"
            />
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Admin{" "}
            <span className="text-orange-500">
              Login
            </span>
          </h1>

          <p className="text-sm text-zinc-500 mt-2">
            Sign in to access your administration panel
          </p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={onSubmit}
          className="relative bg-zinc-950/80 backdrop-blur-xl border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-2xl"
        >

          {/* Top Accent */}
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-orange-500/70 to-transparent" />

          {/* Error */}
          {error && (
            <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/[0.07] px-4 py-3">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />

              <p className="text-sm text-red-400 leading-relaxed">
                {error}
              </p>
            </div>
          )}

          <div className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-zinc-500 mb-2">
                Email Address
              </label>

              <div className="relative group">

                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-orange-500 transition-colors"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="admin@example.com"
                  value={form.email}
                  onChange={onChange}
                  required
                  autoComplete="email"
                  className="
                    w-full
                    h-13
                    bg-black/50
                    border border-white/[0.08]
                    rounded-xl
                    pl-11 pr-4
                    text-sm text-white
                    placeholder:text-zinc-700
                    outline-none
                    transition-all
                    focus:border-orange-500/50
                    focus:ring-4
                    focus:ring-orange-500/[0.07]
                    hover:border-white/[0.14]
                  "
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-zinc-500 mb-2">
                Password
              </label>

              <div className="relative group">

                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-orange-500 transition-colors"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={onChange}
                  required
                  autoComplete="current-password"
                  className="
                    w-full
                    h-13
                    bg-black/50
                    border border-white/[0.08]
                    rounded-xl
                    pl-11 pr-12
                    text-sm text-white
                    placeholder:text-zinc-700
                    outline-none
                    transition-all
                    focus:border-orange-500/50
                    focus:ring-4
                    focus:ring-orange-500/[0.07]
                    hover:border-white/[0.14]
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    p-2
                    rounded-lg
                    text-zinc-600
                    hover:text-white
                    hover:bg-white/5
                    transition
                  "
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="
              group
              mt-7
              w-full
              h-13
              rounded-xl
              bg-orange-500
              text-black
              font-black
              text-sm
              tracking-wide
              flex
              items-center
              justify-center
              gap-2
              transition-all
              hover:bg-orange-400
              hover:shadow-[0_0_30px_rgba(249,115,22,0.2)]
              active:scale-[0.98]
              disabled:opacity-50
              disabled:cursor-not-allowed
              disabled:hover:shadow-none
            "
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                Sign in
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </>
            )}
          </button>

          {/* Security Note */}
          <div className="mt-6 pt-5 border-t border-white/[0.06]">
            <div className="flex items-center justify-center gap-2 text-zinc-600">
              <ShieldCheck size={14} />

              <span className="text-[10px] uppercase tracking-wider font-semibold">
                Protected Admin Area
              </span>
            </div>
          </div>
        </form>

        {/* Footer */}
        <p className="text-center text-[11px] text-zinc-700 mt-6">
          Authorized personnel only
        </p>
      </div>
    </div>
  );
};

export default Login;