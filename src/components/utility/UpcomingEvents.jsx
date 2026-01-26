import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEvents } from "../../services/event.service";

/* ================= COUNTDOWN ================= */
function Countdown({ targetDate }) {
  const calculateTimeLeft = () => {
    const diff = new Date(targetDate).getTime() - new Date().getTime();
    if (diff <= 0) return null;

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return (
      <span className="text-xs text-orange-400 font-medium">
        Event Started
      </span>
    );
  }

  return (
    <div className="flex gap-2 text-xs mt-3 flex-wrap">
      {Object.entries(timeLeft).map(([k, v]) => (
        <div
          key={k}
          className="px-2 py-1 rounded-md bg-orange-500/10 text-orange-400 font-semibold"
        >
          {v} {k[0]}
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

  const now = new Date();

  const upcomingEvents = events
    .filter(
      (e) => e.eventDate && new Date(e.eventDate) >= now
    )
    .slice(0, 3); // 👈 sirf top 3 home page pe

  return (
    <section className="bg-black text-white py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Upcoming <span className="text-orange-500">Events</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {upcomingEvents.map((e, i) => (
            <Link
              to={`/events/${e._id}`}
              key={e._id}
              className="block group"
            >
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="bg-zinc-900/70 border border-zinc-800 rounded-3xl p-8
                           hover:border-orange-500 transition-all duration-500 h-full
                           group-hover:-translate-y-2"
              >
                <span className="inline-block mb-4 px-4 py-1 text-xs font-medium
                                 bg-orange-500/10 text-orange-400 rounded-full">
                  Upcoming
                </span>

                <h3 className="text-2xl font-semibold mb-2 group-hover:text-orange-500 transition-colors">
                  {e.title}
                </h3>

                <p className="text-gray-400 text-sm">
                  📍 {e.location || "TBA"}
                </p>

                {/* COUNTDOWN */}
                {e.eventDate ? (
                  <Countdown targetDate={e.eventDate} />
                ) : (
                  <span className="inline-block mt-3 text-xs text-gray-500">
                    Date coming soon
                  </span>
                )}

                <div className="mt-6 text-xs font-bold text-orange-500 uppercase tracking-widest
                                opacity-0 group-hover:opacity-100 transition-opacity">
                  View Details →
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
