import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEvents } from "../../services/event.service";
import { EVENT_BADGE } from "../../utils/eventBadge";
import { Calendar, MapPin, Clock } from "lucide-react";

/* ================= COUNTDOWN ================= */
function Countdown({ targetDate }) {
  const calculateTimeLeft = () => {
    const diff = new Date(targetDate).getTime() - new Date().getTime();
    if (diff <= 0) return null;
    return {
      days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) return (
    <span className="text-xs text-red-400 font-bold animate-pulse">● Live Now</span>
  );

  return (
    <div className="flex gap-2 mt-3 flex-wrap">
      {Object.entries(timeLeft).map(([k, v]) => (
        <div key={k} className="flex flex-col items-center px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20">
          <span className="text-orange-400 font-black text-sm">{String(v).padStart(2, "0")}</span>
          <span className="text-gray-600 text-[9px] uppercase tracking-wider">{k}</span>
        </div>
      ))}
    </div>
  );
}

/* ================= UPCOMING EVENTS ================= */
export default function UpcomingEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then(setEvents);
  }, []);

  const upcomingEvents = events
    .filter((e) => e.status !== "past")
    .slice(0, 4);

  if (upcomingEvents.length === 0) return null;

  return (
    <section className="bg-black text-white py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">

        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="w-12 h-[2px] bg-orange-500" />
            <span className="text-orange-500 font-bold uppercase tracking-[0.4em] text-xs">
              Don't Miss Out
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight">
            Upcoming <span className="text-orange-500">Events</span>
          </h2>
        </motion.div>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((e, i) => {
            const badge =
              e.status === "live"
                ? EVENT_BADGE.live
                : EVENT_BADGE[e.registrationStatus] ?? EVENT_BADGE.upcoming;

            return (
              <Link to={`/events/${e._id}`} key={e._id} className="block group">
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  viewport={{ once: true }}
                  className={`relative rounded-3xl overflow-hidden border transition-all duration-500
                    group-hover:-translate-y-2 h-full flex flex-col
                    ${e.status === "live"
                      ? "border-red-500/50 shadow-[0_0_40px_rgba(239,68,68,0.2)]"
                      : "border-white/5 hover:border-orange-500/40 bg-zinc-900/70"
                    }`}
                >
                  {/* COVER IMAGE */}
                  {e.coverImage && (
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={e.coverImage}
                        alt={e.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                    </div>
                  )}

                  {/* CONTENT */}
                  <div className="p-6 flex flex-col flex-1">
                    {/* BADGES */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase ${badge.class}`}>
                        {e.status === "live" && (
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
                          </span>
                        )}
                        {badge.text}
                      </span>
                      {e.registrationMode && (
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${EVENT_BADGE[e.registrationMode]?.class || ""}`}>
                          {EVENT_BADGE[e.registrationMode]?.text}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-black mb-3 group-hover:text-orange-500 transition-colors line-clamp-2">
                      {e.title}
                    </h3>

                    {/* META */}
                    <div className="space-y-1.5 mb-4">
                      <p className="text-gray-500 text-xs flex items-center gap-2">
                        <Calendar size={12} className="text-orange-500" />
                        {new Date(e.eventStartAt).toLocaleDateString("en-IN", {
                          day: "numeric", month: "short", year: "numeric"
                        })}
                      </p>
                      <p className="text-gray-500 text-xs flex items-center gap-2">
                        <Clock size={12} className="text-orange-500" />
                        {new Date(e.eventStartAt).toLocaleTimeString("en-IN", {
                          hour: "2-digit", minute: "2-digit", hour12: true
                        })}
                      </p>
                      {e.location && (
                        <p className="text-gray-500 text-xs flex items-center gap-2">
                          <MapPin size={12} className="text-orange-500" />
                          {e.location}
                        </p>
                      )}
                    </div>

                    {/* COUNTDOWN */}
                    {e.status !== "live" && (
                      <Countdown targetDate={e.eventStartAt} />
                    )}

                    <div className="mt-auto pt-4 text-xs font-black text-orange-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      View Details →
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}