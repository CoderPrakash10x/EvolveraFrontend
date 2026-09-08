import { Link } from "react-router-dom";
import { NAV_LINKS } from "../data/nav";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink text-zinc-400">
      <div className="pointer-events-none absolute inset-0 glow-orange opacity-70" />
      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-10">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-orange-500">Evolvera Club</p>
            <h2 className="mt-4 font-display text-[clamp(2.4rem,8vw,6rem)] leading-[0.9] tracking-tight text-white">
              Build beyond
              <br />
              the syllabus.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed">
            A student-led engineering and AI community at KIPM College of Engineering and Technology, GIDA, Gorakhpur.
          </p>
        </div>

        <div className="mt-16 grid gap-12 border-t border-white/10 pt-12 md:grid-cols-4">
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-white">Navigate</p>
            <ul className="space-y-3 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="link-underline hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-white">Contact</p>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="mailto:evolveraclub@gmail.com" className="hover:text-orange-500">
                  evolveraclub@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+919335818279" className="hover:text-orange-500">
                  +91 9335818279
                </a>
              </li>
              <li>KIPM College, GIDA, Gorakhpur</li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-white">Follow</p>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href="https://www.instagram.com/evolveraclub._?utm_source=qr&igsh=MWhibmM0MzVicnhxbw=="
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-500"
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/company/evolvera-club/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-500"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div className="overflow-hidden border border-white/10">
            <iframe
              title="KIPM College of Engineering and Technology map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3563.102321633455!2d83.26767097521807!3d26.74111067674993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399147484fce688b%3A0x81196201753b1789!2sKIPM-College%20of%20Engineering%20and%20Technology!5e0!3m2!1sen!2sin!4v1758893891741!5m2!1sen!2sin"
              width="100%"
              height="160"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-neutral-600 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Evolvera Club. All rights reserved.</p>
          <p>KIPM College of Engineering and Technology</p>
        </div>
      </div>
    </footer>
  );
}
