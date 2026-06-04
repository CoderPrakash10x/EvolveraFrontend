import { useEffect, useState, memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

/* ─── Skeleton loader for upcoming event cards ─── */
const UpcomingSkeleton = memo(() => (
  <div className="bg-zinc-900/40 border border-white/5 rounded-3xl overflow-hidden animate-pulse">
    <div className="w-full aspect-[16/9] bg-zinc-800/60" />
    <div className="p-8 flex justify-between items-start gap-6">
      <div className="flex-1 space-y-3">
        <div className="h-4 w-24 bg-zinc-700/60 rounded-full" />
        <div className="h-6 w-3/4 bg-zinc-700/60 rounded-lg" />
        <div className="flex gap-4 mt-2">
          <div className="h-3 w-20 bg-zinc-800/80 rounded" />
          <div className="h-3 w-16 bg-zinc-800/80 rounded" />
          <div className="h-3 w-24 bg-zinc-800/80 rounded" />
        </div>
      </div>
      <div className="h-14 w-14 bg-zinc-700/40 rounded-2xl shrink-0" />
    </div>
  </div>
));

/* ─── Skeleton loader for past event rows ─── */
const PastSkeleton = memo(() => (
  <div className="grid lg:grid-cols-12 border border-white/5 rounded-[2.5rem] overflow-hidden bg-[#0d0d0d] animate-pulse">
    <div className="lg:col-span-4 w-full aspect-video bg-zinc-800/60" />
    <div className="lg:col-span-8 p-10 space-y-4">
      <div className="h-4 w-20 bg-zinc-700/60 rounded-full" />
      <div className="h-8 w-2/3 bg-zinc-700/60 rounded-lg" />
      <div className="flex gap-6">
        <div className="h-3 w-24 bg-zinc-800/80 rounded" />
        <div className="h-3 w-28 bg-zinc-800/80 rounded" />
      </div>
      <div className="h-10 w-36 bg-zinc-700/30 rounded-2xl mt-4" />
    </div>
  </div>
));

/* ─── Upcoming event card (memoised to prevent re-renders) ─── */
const UpcomingCard = memo(({ event, formatDate, formatTime }) => {
  const badge =
    event.status === "live"
      ? EVENT_BADGE.live
      : EVENT_BADGE[event.registrationStatus] ?? EVENT_BADGE.upcoming;

  return (
    <Link to={`/events/${event._id}`} className="block group">
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`bg-zinc-900/40 border border-white/5 rounded-3xl
                    overflow-hidden transition-all duration-300
                    ${event.status === "live"
                      ? "border-red-500/50 shadow-[0_0_40px_rgba(239,68,68,0.35)]"
                      : "hover:border-orange-500/50 hover:shadow-[0_0_30px_rgba(249,115,22,0.12)]"
                    }`}
      >
        {/* Cover image */}
        <div className="w-full bg-black rounded-t-3xl overflow-hidden">
          <img
            src={event.coverImage || "/placeholder.jpg"}
            alt={event.title}
            loading="lazy"
            decoding="async"
            className="w-full aspect-[16/9] object-contain bg-black
                       transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>

        <div className="p-8 flex justify-between items-start gap-6">
          <div>
            {/* Status badge */}
            <span
              className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase mb-3
                          inline-flex items-center gap-2 ${badge.class}`}
            >
              {event.status === "live" && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                </span>
              )}
              {badge.text}
            </span>

            <h4 className="text-2xl font-bold uppercase group-hover:text-orange-500 transition-colors duration-200">
              {event.title}
            </h4>

            <div className="flex flex-wrap gap-4 mt-3 text-gray-400 text-sm">
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {formatDate(event.eventStartAt)}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {formatTime(event.eventStartAt)}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={14} />
                {event.location || "TBA"}
              </span>
            </div>
          </div>

          <div className="bg-orange-500 group-hover:bg-orange-400 transition-colors duration-200
                          p-4 rounded-2xl text-black shrink-0">
            <ArrowUpRight size={24} strokeWidth={3} />
          </div>
        </div>
      </motion.div>
    </Link>
  );
});

/* ─── Past event row (memoised) ─── */
const PastCard = memo(({ event, formatDate }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="grid lg:grid-cols-12 border border-white/5
               rounded-[2.5rem] overflow-hidden
               bg-[#0d0d0d] opacity-80 grayscale"
  >
    <div className="w-full bg-black flex items-center justify-center">
      <img
        src={event.coverImage || "/placeholder.jpg"}
        alt={event.title}
        loading="lazy"
        decoding="async"
        className="w-full h-auto max-h-56 object-contain
                   transition-transform duration-700 group-hover:scale-105"
      />
    </div>

    <div className="lg:col-span-8 p-10">
      <span className="inline-block mb-3 px-3 py-1 text-xs font-bold uppercase
                       bg-zinc-700/50 text-gray-300 rounded-full">
        Past Event
      </span>

      <h3 className="text-4xl font-black mt-2">{event.title}</h3>

      <div className="flex gap-6 text-gray-400 mt-4 text-sm">
        <span className="flex items-center gap-1">
          <Calendar size={14} /> {formatDate(event.eventStartAt)}
        </span>
        <span className="flex items-center gap-1">
          <MapPin size={14} /> {event.location || "—"}
        </span>
      </div>

      <Link
        to={`/events/${event._id}`}
        className="inline-flex items-center gap-3 mt-8
                   bg-white/10 hover:bg-white/20 transition-colors duration-200
                   text-white px-8 py-4 rounded-2xl font-black text-xs"
      >
        <FileText size={16} /> View Details
      </Link>
    </div>
  </motion.div>
));

/* ─── Section header ─── */
const SectionHeader = memo(({ color, label }) => (
  <div className="flex items-center gap-4 mb-10">
    <span className={`w-12 h-[2px] ${color === "orange" ? "bg-orange-500" : "bg-gray-500"}`} />
    <h3
      className={`font-bold uppercase tracking-[0.4em] text-xs
                  ${color === "orange" ? "text-orange-500" : "text-gray-300"}`}
    >
      {label}
    </h3>
  </div>
));

/* ════════════════════════════════════════════════
   Main component — zero logic changes from original
   ════════════════════════════════════════════════ */
export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents().then((data) => {
      setEvents(data);
      setLoading(false);
    });
  }, []);

  /* stable formatter refs — won't cause child re-renders */
  const formatDate = useCallback(
    (date) =>
      new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    []
  );

  const formatTime = useCallback(
    (date) =>
      new Date(date).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    []
  );

  const upcomingEvents = events.filter((e) => e.status !== "past");
  const pastEvents = events.filter((e) => e.status === "past");

  return (
    <section className="bg-black text-white min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Upcoming Events ── */}
        <div className="mb-32">
          <SectionHeader color="orange" label="Live & Upcoming" />

          {/* Loading skeletons */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UpcomingSkeleton />
              <UpcomingSkeleton />
            </div>
          )}

          {/* Empty state */}
          {!loading && upcomingEvents.length === 0 && (
            <p className="text-gray-500 text-sm">No upcoming events right now.</p>
          )}

          {/* Cards with staggered entrance */}
          {!loading && upcomingEvents.length > 0 && (
            <AnimatePresence>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.1 } },
                }}
              >
                {upcomingEvents.map((event) => (
                  <motion.div
                    key={event._id}
                    variants={{
                      hidden: { opacity: 0, y: 24 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
                    }}
                  >
                    <UpcomingCard
                      event={event}
                      formatDate={formatDate}
                      formatTime={formatTime}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* ── Past Events ── */}
        <div>
          <SectionHeader color="gray" label="Past Events" />

          {/* Loading skeletons */}
          {loading && (
            <div className="space-y-12">
              <PastSkeleton />
              <PastSkeleton />
            </div>
          )}

          {/* Empty state */}
          {!loading && pastEvents.length === 0 && (
            <p className="text-gray-500 text-sm">No past events yet.</p>
          )}

          {/* Past event rows */}
          {!loading && pastEvents.length > 0 && (
            <div className="space-y-12">
              {pastEvents.map((event) => (
                <PastCard key={event._id} event={event} formatDate={formatDate} />
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}