import { useState } from "react";
import toast from "react-hot-toast";
import API from "../utils/api";
import PageHeader from "../components/ui/PageHeader";
import Container from "../components/ui/Container";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/contact", form);
      toast.success("Message sent successfully");
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-ink text-[#F5F5F5]">
      <PageHeader eyebrow="Contact" title={<>Let&apos;s build<br />together.</>}>
        Whether you have a question, an idea, a sponsorship proposal, or a collaboration — write to us.
      </PageHeader>

      <Container className="grid gap-16 py-16 lg:grid-cols-12 lg:py-24">
        <div className="space-y-8 lg:col-span-5">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">Email</p>
            <a href="mailto:evolveraclub@gmail.com" className="mt-2 block text-lg hover:text-orange-500">
              evolveraclub@gmail.com
            </a>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">Phone</p>
            <a href="tel:+919335818279" className="mt-2 block text-lg hover:text-orange-500">
              +91 9335818279
            </a>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">Location</p>
            <p className="mt-2 text-lg">KIPM College, GIDA, Gorakhpur</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">Social</p>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <a href="https://www.instagram.com/evolveraclub._?utm_source=qr&igsh=MWhibmM0MzVicnhxbw==" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500">
                Instagram
              </a>
              <a href="https://www.linkedin.com/company/evolvera-club/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-6 lg:col-span-7">
          <div>
            <label htmlFor="name" className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-neutral-500">
              Name
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="input"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-neutral-500">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="input"
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-2 block text-[11px] uppercase tracking-[0.16em] text-neutral-500">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={7}
              required
              className="input resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 py-4 text-sm font-semibold text-black transition hover:bg-white disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send message"}
          </button>
        </form>
      </Container>
    </section>
  );
}
