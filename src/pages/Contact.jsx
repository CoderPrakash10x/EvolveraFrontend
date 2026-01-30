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
  <section className="bg-black min-h-screen text-white py-32 px-6">
  <div className="max-w-3xl mx-auto">
    
    {/* Heading */}
    <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
      Contact <span className="text-orange-500">Us</span>
    </h1>

    <p className="text-gray-400 mb-14 max-w-xl">
      Have an idea, question, or collaboration in mind?  
      Drop us a message — we’d love to hear from you.
    </p>

    {/* Form */}
    <form onSubmit={submit} className="space-y-6">

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Your Name"
        required
        className="w-full p-5 rounded-2xl bg-zinc-900/80
                   border border-white/10
                   focus:border-orange-500/50
                   focus:outline-none focus:ring-2 focus:ring-orange-500/20
                   transition"
      />

      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email Address"
        required
        className="w-full p-5 rounded-2xl bg-zinc-900/80
                   border border-white/10
                   focus:border-orange-500/50
                   focus:outline-none focus:ring-2 focus:ring-orange-500/20
                   transition"
      />

      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Your Message"
        rows={6}
        required
        className="w-full p-5 rounded-2xl bg-zinc-900/80
                   border border-white/10
                   focus:border-orange-500/50
                   focus:outline-none focus:ring-2 focus:ring-orange-500/20
                   transition resize-none"
      />

      <button
        disabled={loading}
        className="group bg-orange-500 text-black
                   px-12 py-4 rounded-2xl
                   font-black tracking-wide
                   hover:scale-[1.03]
                   hover:shadow-[0_0_40px_rgba(249,115,22,0.35)]
                   transition disabled:opacity-50 disabled:hover:scale-100"
      >
        {loading ? "Sending..." : "Send Message ↗"}
      </button>
    </form>
  </div>
</section>

  );
}
