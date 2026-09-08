import React from "react";
import { Instagram, Linkedin } from "lucide-react";

const AboutUs = () => {
  return (
    <section className="bg-black py-28 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

        {/* LEFT — text leads */}
        <div className="lg:col-span-6">
          <h2 className="display-lg text-white text-4xl md:text-5xl mb-8">
            A club, not a resume line.
          </h2>

          <p className="body-copy text-[var(--gray-300)] text-base md:text-lg mb-5">
            Evolvera started because a handful of students across different
            branches kept ending up in the same conversations about AI and
            wanted a place to actually build things together, not just talk
            about them.
          </p>

          <p className="body-copy text-[var(--gray-300)] text-base md:text-lg">
            No fees, no application. Show up to a workshop, pick a hackathon
            team, and you're in.
          </p>

          {/* fact strip — orange used only as the tiny label accent */}
          <dl className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-[var(--line)]">
            <div>
              <dt className="label-sm text-[var(--orange)] mb-1">Since</dt>
              <dd className="display-lg text-white text-2xl">2025</dd>
            </div>
            <div>
              <dt className="label-sm text-[var(--orange)] mb-1">Branches</dt>
              <dd className="display-lg text-white text-2xl">6</dd>
            </div>
            <div>
              <dt className="label-sm text-[var(--orange)] mb-1">To join</dt>
              <dd className="display-lg text-white text-2xl">Free</dd>
            </div>
          </dl>

          <div className="flex gap-5 mt-10">
            <a
              href="https://www.instagram.com/evolveraclub._?utm_source=qr&igsh=MWhibmM0MzVicnhxbw=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--gray-500)] hover:text-[var(--orange)] transition-colors"
              aria-label="Evolvera on Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://www.linkedin.com/company/evolvera-club/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--gray-500)] hover:text-[var(--orange)] transition-colors"
              aria-label="Evolvera on LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* RIGHT — real club photo, plain frame */}
        <div className="lg:col-span-6">
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-[var(--line)]">
            <img
              src="/showcase/team-1.jpg"
              alt="Evolvera members working together during a session"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 w-2 h-2 rounded-full bg-[var(--orange)]" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;