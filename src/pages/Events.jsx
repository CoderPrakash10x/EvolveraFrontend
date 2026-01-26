import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  ArrowUpRight,
  FileText,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getEvents } from "../services/event.service";

export default function Events() {
  /* =========================
     🔥 UPCOMING EVENTS (API)
     ========================= */
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then(setEvents);
  }, []);

  const now = new Date();

  const upcomingEvents = events.filter(
    (e) => e.eventDate && new Date(e.eventDate) >= now
  );

  /* =========================
     🧊 PAST EVENTS (STATIC)
     ========================= */
  const pastEvents = [
    {
      id: "gen-ai",
      title: "Gen AI Workshop",
      date: "3rd May 2025",
      mode: "Online",
      organiser: "10X Club KIPM",
      img: "/genai.png",
      report: "/public/gallery/GenAI.pdf",
      category: "Workshop",
      highlights: [
        "ML & Transformers",
        "Text & Image Demos",
        "Ethics",
        "Certificates",
      ],
    },
    {
      id: "code-crafter",
      title: "Code Crafter Grand Challenge",
      date: "2nd Feb 2025",
      mode: "Online",
      organiser: "10X Club KIPM",
      img: "/codecraft.png",
      report: "/public/gallery/Evolvera.pdf",
      category: "Hackathon",
      highlights: ["900+ Participants", "National Level", "Prizes"],
    },
  ];

  /* =========================
     🕒 FORMATTERS
     ========================= */
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  return (
    <section className="bg-black text-white min-h-screen py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* ================= UPCOMING EVENTS ================= */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-10">
            <span className="w-12 h-[2px] bg-orange-500"></span>
            <h3 className="text-orange-500 font-bold uppercase tracking-[0.4em] text-xs">
              Live & Upcoming
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <Link
                to={`/events/${event._id}`}
                key={event._id}
                className="block group"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-zinc-900/30 border border-white/5 rounded-3xl
                             overflow-hidden hover:border-orange-500/50 transition-all"
                >
                  {/* 🔥 IMAGE */}
                  <div className="h-56 w-full overflow-hidden">
                    <img
                      src={event.coverImage || "/placeholder.jpg"}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-8 flex justify-between items-start gap-6">
                    <div>
                      <span className="text-[10px] bg-orange-500 text-black px-3 py-1 rounded-full font-bold uppercase mb-3 inline-block">
                        Upcoming
                      </span>

                      <h4 className="text-2xl font-bold uppercase group-hover:text-orange-500 transition-colors">
                        {event.title}
                      </h4>

                      <div className="flex flex-wrap gap-4 mt-3 text-gray-400 text-sm">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {formatDate(event.eventDate)}
                        </span>

                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {formatTime(event.eventDate)}
                        </span>

                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {event.location || "TBA"}
                        </span>
                      </div>
                    </div>

                    <div className="bg-orange-500 p-4 rounded-2xl text-black shrink-0">
                      <ArrowUpRight size={24} strokeWidth={3} />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* ================= PAST EVENTS ================= */}
        <div className="space-y-12">
          {pastEvents.map((event) => (
            <motion.div
              key={event.id}
              className="grid lg:grid-cols-12 border border-white/5 rounded-[2.5rem] overflow-hidden bg-[#0d0d0d]"
            >
              <Link to={`/events/${event.id}`} className="lg:col-span-4">
                <img
                  src={event.img}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </Link>

              <div className="lg:col-span-8 p-10">
                <span className="text-orange-500 uppercase text-xs">
                  {event.category} • {event.organiser}
                </span>

                <h3 className="text-4xl font-black mt-4">
                  {event.title}
                </h3>

                <div className="flex gap-6 text-gray-400 mt-4 text-sm">
                  <span>
                    <Calendar size={14} /> {event.date}
                  </span>
                  <span>
                    <MapPin size={14} /> {event.mode}
                  </span>
                </div>

                <div className="flex gap-2 mt-6 flex-wrap">
                  {event.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="px-3 py-2 bg-white/5 rounded-xl text-xs"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                <a
                  href={event.report}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 mt-8
                             bg-orange-500 text-black px-8 py-4 rounded-2xl font-black text-xs"
                >
                  <FileText size={16} /> Read Report
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
