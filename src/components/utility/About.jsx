import React from "react";
import { Twitter, Facebook, Instagram } from "lucide-react";

const AboutUs = () => {
  return (
    <section
      className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-black via-[#111] to-[#040404]
      px-6 md:px-14 overflow-hidden font-poppins"
    >
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 relative">

        {/* LEFT */}
        <div className="relative flex justify-center lg:justify-start">

          {/* Rotating Icon */}
          <div className="absolute -left-16 top-24 hidden md:block">
            <svg
              width="70"
              height="70"
              viewBox="0 0 100 100"
              className="fill-orange-500/40 animate-spin-slow"
            >
              {[...Array(12)].map((_, i) => (
                <rect
                  key={i}
                  x="48"
                  y="12"
                  width="4"
                  height="28"
                  transform={`rotate(${i * 30} 50 50)`}
                  className="rounded-full"
                />
              ))}
            </svg>
          </div>

          {/* Image */}
          <div
            className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden
            border border-white/10
            shadow-[0_30px_80px_rgba(255,140,0,0.15)]"
          >
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000"
              alt="About Evolvera"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Socials */}
          <div className="absolute -bottom-10 flex gap-6 text-gray-400">
            <Twitter size={18} className="hover:text-orange-500 transition" />
            <Facebook size={18} className="hover:text-orange-500 transition" />
            <Instagram size={18} className="hover:text-orange-500 transition" />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col justify-center">

          <span className="text-orange-500 text-xs font-medium tracking-[0.35em] uppercase mb-4">
            Who We Are
          </span>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            About <span className="text-orange-500">Evolvera</span>
          </h1>

          <p className="text-gray-400 text-sm md:text-base font-normal leading-relaxed max-w-xl mb-4">
            Evolvera is a student-driven technical club focused on innovation,
            collaboration, and real-world problem solving through modern
            technologies.
          </p>

          <p className="text-gray-500 text-sm md:text-base font-normal leading-relaxed max-w-xl">
            From workshops and hackathons to projects and research, we create
            opportunities that help students grow beyond academics and
            into future-ready professionals.
          </p>

          {/* Accent */}
          <div className="mt-8 w-24 h-[2px] bg-orange-500/70" />
        </div>

      </div>
    </section>
  );
};

export default AboutUs;
