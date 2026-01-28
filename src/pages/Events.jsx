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
import { EVENT_BADGE } from "../utils/eventBadge";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then(setEvents);
  }, []);

  const upcomingEvents = events.filter(
    (e) => e.status !== "past"
  );

  const pastEvents = events.filter(
    (e) => e.status === "past"
  );

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
    <section className="bg-black text-white min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-10">
            <span className="w-12 h-[2px] bg-orange-500"></span>
            <h3 className="text-orange-500 font-bold uppercase tracking-[0.4em] text-xs">
              Live & Upcoming
            </h3>
          </div>

          {upcomingEvents.length === 0 && (
            <p className="text-gray-500 text-sm">
              No upcoming events right now.
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <Link
                to={`/events/${event._id}`}
                key={event._id}
                className="block group"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`bg-zinc-900/40 border border-white/5 rounded-3xl
                              overflow-hidden transition-all
                              ${
                                event.status === "live"
                                  ? "border-red-500/50 shadow-[0_0_40px_rgba(239,68,68,0.35)]"
                                  : "hover:border-orange-500/50"
                              }`}
                >
                  <div className="h-56 w-full overflow-hidden">
                    <img
                      src={event.coverImage || "/placeholder.jpg"}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  <div className="p-8 flex justify-between items-start gap-6">
                    <div>
                      {/* STATUS BADGE */}
                      <span
                        className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase mb-3 
                                    inline-flex items-center gap-2
                                    ${EVENT_BADGE[event.status].class}`}
                      >

                        {event.status === "live" && (
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                          </span>
                        )}

                        {EVENT_BADGE[event.status].text}
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

        {/* ================= PAST EVENTS hoga jab upcomming event khatam ho jayega wah past me chala jayega woooo ================= */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <span className="w-12 h-[2px] bg-gray-500"></span>
            <h3 className="text-gray-300 font-bold uppercase tracking-[0.4em] text-xs">
              Past Events
            </h3>
          </div>

          {pastEvents.length === 0 && (
            <p className="text-gray-500 text-sm">
              No past events yet.
            </p>
          )}

          <div className="space-y-12">
            {pastEvents.map((event) => (
              <motion.div
                key={event._id}
                className="grid lg:grid-cols-12 border border-white/5
                           rounded-[2.5rem] overflow-hidden
                           bg-[#0d0d0d] opacity-80 grayscale"
              >
                <div className="lg:col-span-4">
                  <img
                    src={event.coverImage || "/placeholder.jpg"}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="lg:col-span-8 p-10">
                  <span className="inline-block mb-3 px-3 py-1 text-xs font-bold uppercase
                                   bg-zinc-700/50 text-gray-300 rounded-full">
                    Past Event
                  </span>

                  <h3 className="text-4xl font-black mt-2">
                    {event.title}
                  </h3>

                  <div className="flex gap-6 text-gray-400 mt-4 text-sm">
                    <span>
                      <Calendar size={14} />{" "}
                      {formatDate(event.eventDate)}
                    </span>
                    <span>
                      <MapPin size={14} />{" "}
                      {event.location || "—"}
                    </span>
                  </div>

                  <Link
                    to={`/events/${event._id}`}
                    className="inline-flex items-center gap-3 mt-8
                               bg-white/10 text-white px-8 py-4
                               rounded-2xl font-black text-xs"
                  >
                    <FileText size={16} /> View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
