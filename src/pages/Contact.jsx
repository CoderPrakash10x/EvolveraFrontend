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
        <h1 className="text-5xl font-black mb-12">
          Contact <span className="text-orange-500">Us</span>
        </h1>

        <form onSubmit={submit} className="space-y-6">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full p-4 rounded-xl bg-zinc-900 border border-white/10"
          />

          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="w-full p-4 rounded-xl bg-zinc-900 border border-white/10"
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={6}
            required
            className="w-full p-4 rounded-xl bg-zinc-900 border border-white/10"
          />

          <button
            disabled={loading}
            className="bg-orange-500 text-black px-10 py-4 rounded-xl font-black disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}
