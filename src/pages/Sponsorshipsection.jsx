import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, ExternalLink } from "lucide-react";

const SPONSORS = [
  {
    id: 1,
    name: "BBD Gorakhpur",
    image: "/download.jpg",
    initials: "BBD",
    description: "Technology Partner",
    website: null,
  },
  {
    id: 2,
    name: "Shri Ram Janaki Sewa Trust",
    image: "/srst.png",
    initials: "SRJST",
    description: "Community Welfare",
    website: null,
  },
  {
    id: 3,
    name: "Shri Ram Janki Netralay",
    image: "/srjn.png",
    initials: "SRJN",
    description: "Healthcare Partner",
    website: null,
  },
  {
    id: 4,
    name: "Campusdunia",
    image: "/campusdunia.png",
    initials: "CD",
    description: "Education Platform",
    website: null,
  },
  {
    id: 5,
    name: "OpenSky Resorts",
    image: "/opensky.png",
    initials: "OS",
    description: "Banquet Hall",
    website: null,
  },
];

function SponsorCard({ sponsor, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-3xl"
    >
      {/* Glow Effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100
                   transition duration-500 blur-3xl
                   bg-orange-500/10"
      />

      {/* Card */}
      <div
        className="relative h-full p-8 rounded-3xl
                   border border-white/10
                   bg-gradient-to-b from-zinc-900 via-zinc-950 to-black
                   backdrop-blur-xl
                   group-hover:border-orange-500/40
                   transition-all duration-500"
      >
        {/* Top Accent Line */}
        <div
          className="absolute top-0 left-0 w-full h-[2px]
                     bg-gradient-to-r
                     from-transparent via-orange-500 to-transparent
                     opacity-0 group-hover:opacity-100
                     transition duration-500"
        />

        {/* Logo */}
        <div
          className="w-24 h-24 mx-auto rounded-2xl
                     bg-zinc-800/70
                     border border-white/10
                     flex items-center justify-center
                     group-hover:border-orange-500/30
                     transition-all duration-500"
        >
          {sponsor.image ? (
            <img
              src={sponsor.image}
              alt={sponsor.name}
              className="w-full h-full object-contain p-3"
            />
          ) : (
            <span className="text-orange-500 font-black text-lg">
              {sponsor.initials}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="mt-6 text-center">
          <h3 className="font-bold text-white text-lg leading-tight">
            {sponsor.name}
          </h3>

          <div
            className="inline-flex mt-3 px-3 py-1 rounded-full
                       border border-orange-500/20
                       bg-orange-500/10"
          >
            <span className="text-orange-400 text-xs font-medium">
              {sponsor.description}
            </span>
          </div>
        </div>

        {/* Website */}
        {sponsor.website && (
          <a
            href={sponsor.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex items-center justify-center gap-2
                       text-sm text-zinc-400
                       hover:text-orange-400 transition"
          >
            Visit Website
            <ExternalLink size={14} />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function SponsorsSection() {
  return (
    <section className="relative bg-black text-white py-32 px-6 overflow-hidden">
      {/* Background Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2
                   w-[700px] h-[700px]
                   bg-orange-500/5
                   blur-[180px]
                   rounded-full"
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span
            className="inline-block px-5 py-2 rounded-full
                       border border-orange-500/20
                       bg-orange-500/5
                       text-orange-400 text-xs font-semibold
                       tracking-[0.35em] uppercase"
          >
            Partners & Supporters
          </span>

          <h2 className="mt-8 text-5xl md:text-7xl font-black tracking-tight">
            Trusted By
            <span className="block text-orange-500">
              Our Sponsors
            </span>
          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-zinc-400 text-lg leading-relaxed">
            Collaborating with organizations that believe in innovation,
            technology, creativity and empowering the next generation of
            builders.
          </p>
        </motion.div>

        {/* Sponsors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-24">
          {SPONSORS.map((sponsor, index) => (
            <SponsorCard
              key={sponsor.id}
              sponsor={sponsor}
              index={index}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl
                     border border-orange-500/20
                     bg-gradient-to-r
                     from-zinc-900
                     via-zinc-950
                     to-zinc-900
                     p-10 md:p-14"
        >
          {/* CTA Glow */}
          <div
            className="absolute top-0 right-0
                       w-72 h-72
                       bg-orange-500/10
                       blur-[120px]"
          />

          <div
            className="relative flex flex-col md:flex-row
                       items-center justify-between gap-8"
          >
            <div>
              <h3 className="text-3xl font-black mb-3">
                Become a Sponsor
              </h3>

              <p className="text-zinc-400 max-w-xl">
                Partner with Evolvera Club and connect with talented
                innovators, developers, designers and future founders through
                impactful events, hackathons and community initiatives.
              </p>
            </div>

            <Link
              to="/contact"
              className="group px-8 py-4 rounded-2xl
                         bg-orange-500 text-black
                         font-bold
                         flex items-center gap-3
                         hover:scale-105
                         transition-all duration-300"
            >
              <Mail size={18} />
              Get In Touch
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}