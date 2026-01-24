import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative bg-[#0b0b0b] text-gray-400 px-6 md:px-16 pt-20 pb-10">

      {/* subtle top divider glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-14">

        {/* BRAND */}
        <div className="space-y-4">
          <Link
            to="/"
            className="text-2xl font-bold text-white tracking-tight"
          >
            Evolvera <span className="text-orange-500">Club</span>
          </Link>

          <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
            Empowering students to innovate, collaborate, and build the future
            with AI and modern technologies.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-white font-semibold mb-5 tracking-wide">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm">
            {[
              { name: "Home", to: "/" },
              { name: "About", to: "/about" },
              { name: "Events", to: "/events" },
              { name: "Team", to: "/team" },
              { name: "Contact", to: "/contact" },
            ].map((link, i) => (
              <li key={i}>
                <Link
                  to={link.to}
                  className="hover:text-orange-500 transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-white font-semibold mb-5 tracking-wide">
            Contact
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <span className="text-gray-500">Email:</span>{" "}
              <a
                href="mailto:evolveraclub@gmail.com"
                className="hover:text-orange-500 transition"
              >
                evolveraclub@gmail.com
              </a>
            </li>
            <li>
              <span className="text-gray-500">Phone:</span>{" "}
              <a
                href="tel:+911234567890"
                className="hover:text-orange-500 transition"
              >
                +91 1234567890
              </a>
            </li>
            <li className="text-gray-500">
              KIPM College, GIDA, Gorakhpur
            </li>
          </ul>

          {/* MAP */}
          <div className="mt-5 rounded-xl overflow-hidden border border-white/10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3563.102321633455!2d83.26767097521807!3d26.74111067674993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399147484fce688b%3A0x81196201753b1789!2sKIPM-College%20of%20Engineering%20and%20Technology!5e0!3m2!1sen!2sin!4v1758893891741!5m2!1sen!2sin"
              width="100%"
              height="160"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* SOCIALS */}
        <div>
          <h3 className="text-white font-semibold mb-5 tracking-wide">
            Follow Us
          </h3>
          <div className="flex flex-col gap-3 text-sm">
            <a
              href="https://www.instagram.com/evolveraclub._?utm_source=qr&igsh=MWhibmM0MzVicnhxbw=="
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-500 transition"
            >
              Instagram →
            </a>
            <a
              href="https://www.linkedin.com/company/evolvera-club/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-500 transition"
            >
              LinkedIn →
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="mt-16 pt-6 border-t border-white/10 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Evolvera Club. All rights reserved.
      </div>
    </footer>
  );
}
