
import { useState } from "react";
import toast from "react-hot-toast";
import API from "../utils/api";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/contact", form);
      toast.success("Message sent successfully 🚀");
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative bg-black min-h-screen text-white py-32 px-6 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-500/10 blur-[140px] rounded-full" />

      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <div>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/20 bg-orange-500/10 text-orange-400 text-sm mb-6">
            ✦ Get In Touch
          </span>

          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            Let's Build
            <span className="block text-orange-500">
              Something Amazing
            </span>
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
            Whether you have a question, an innovative idea,
            sponsorship proposal, or collaboration opportunity,
            our team is always ready to connect.
          </p>

          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center">
                📩
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">evolveraclub@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center">
                🚀
              </div>
              <div>
                <p className="text-sm text-gray-500">Response Time</p>
                <p className="font-medium">Within 24 Hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div
          className="relative p-8 md:p-10 rounded-[32px]
                     bg-white/5 backdrop-blur-xl
                     border border-white/10
                     shadow-[0_0_50px_rgba(249,115,22,0.08)]"
        >
          <div className="absolute inset-0 rounded-[32px] border border-orange-500/10 pointer-events-none" />

          <h2 className="text-3xl font-bold mb-2">
            Send a Message
          </h2>

          <p className="text-gray-400 mb-8">
            Fill out the form below and we'll get back to you soon.
          </p>

          <form onSubmit={submit} className="space-y-5">

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full p-5 rounded-2xl
                         bg-zinc-900/80
                         border border-white/10
                         focus:border-orange-500/50
                         focus:outline-none
                         focus:ring-4 focus:ring-orange-500/10
                         transition"
            />

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full p-5 rounded-2xl
                         bg-zinc-900/80
                         border border-white/10
                         focus:border-orange-500/50
                         focus:outline-none
                         focus:ring-4 focus:ring-orange-500/10
                         transition"
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your idea..."
              rows={6}
              required
              className="w-full p-5 rounded-2xl
                         bg-zinc-900/80
                         border border-white/10
                         focus:border-orange-500/50
                         focus:outline-none
                         focus:ring-4 focus:ring-orange-500/10
                         transition resize-none"
            />

            <button
              disabled={loading}
              className="w-full group
                         bg-orange-500
                         text-black
                         py-4 rounded-2xl
                         font-black tracking-wide
                         hover:scale-[1.02]
                         hover:shadow-[0_0_40px_rgba(249,115,22,0.45)]
                         transition-all
                         disabled:opacity-50
                         disabled:hover:scale-100"
            >
              {loading ? (
                "Sending..."
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Send Message
                  <span className="group-hover:translate-x-1 transition">
                    ↗
                  </span>
                </span>
              )}
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}
