import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Link import kiya gaya hai

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
  }, [targetDate]); // dependency added for safety

  if (!timeLeft) {
    return (
      <span className="text-xs text-orange-400 font-medium">
        Event Started
      </span>
    );
  }

  return (
    <div className="flex gap-2 text-xs mt-3">
      {["days", "hours", "minutes", "seconds"].map((unit) => (
        <div
          key={unit}
          className="px-2 py-1 rounded-md bg-orange-500/10 text-orange-400 font-semibold"
        >
          {timeLeft[unit]} {unit[0]}
        </div>
      ))}
    </div>
  );
}

export default function UpcomingEvents() {
  const upcoming = [
    {
      title: "Tech Minds Summit 2025",
      date: "2026-08-15T10:00:00",
      mode: "Offline",
      tag: "Flagship Event",
      path: "/events/tech-minds", // Custom path
    },
    {
      title: "Innovation Carnival",
      date: "2026-09-10T09:30:00",
      mode: "Offline",
      tag: "Inter-College",
      path: "/events/innovation-carnival",
    },
    {
      title: "AI Bootcamp",
      date: null,
      mode: "Hybrid",
      tag: "Workshop",
      path: "/events/ai-bootcamp",
    },
  ];

  return (
    <section className="bg-black text-white py-24 px-6 md:px-16 font-['Poppins']">
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

        {/* Cards Wrapper with Links */}
        <div className="grid md:grid-cols-3 gap-8">
          {upcoming.map((e, i) => (
            <Link to={e.path} key={i} className="block group"> {/* Pure card ko link banaya */}
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="bg-zinc-900/70 border border-zinc-800 rounded-3xl p-8
                           hover:border-orange-500 transition-all duration-500 h-full
                           group-hover:bg-zinc-900 group-hover:-translate-y-2"
              >
                <span className="inline-block mb-4 px-4 py-1 text-xs font-medium
                                 bg-orange-500/10 text-orange-400 rounded-full">
                  {e.tag}
                </span>

                <h3 className="text-2xl font-semibold mb-2 group-hover:text-orange-500 transition-colors">
                  {e.title}
                </h3>

                <p className="text-gray-400 text-sm">
                  📍 {e.mode}
                </p>

                {/* COUNTDOWN */}
                {e.date ? (
                  <Countdown targetDate={e.date} />
                ) : (
                  <span className="inline-block mt-3 text-xs text-gray-500">
                    Countdown coming soon
                  </span>
                )}

                {/* Explicit "View Details" hint */}
                <div className="mt-6 flex items-center text-xs font-bold text-orange-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
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