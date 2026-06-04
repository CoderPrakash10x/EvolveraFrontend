import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, MapPin, Clock, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { EVENT_BADGE } from "../utils/eventBadge";

const EventPopup = ({ events = [] }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!events.length) return;
    const dismissed = localStorage.getItem("events_popup_v2");
    if (!dismissed) {
      const timer = setTimeout(() => setOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [events]);

  const handleClose = () => {
    localStorage.setItem("events_popup_v2", "true");
    setOpen(false);
  };

  // Sirf upcoming/live events dikhao
  const activeEvents = events.filter((e) => e.status !== "past").slice(0, 3);

  if (!activeEvents.length) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0"
        >
          {/* BACKDROP */}
          <div
            onClick={handleClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* POPUP */}
          <motion.div
            initial={{ scale: 0.95, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ duration: 0.3, type: "spring", damping: 25 }}
            className="relative w-full max-w-md rounded-3xl bg-zinc-900
                       border border-orange-500/30
                       shadow-[0_0_80px_rgba(249,115,22,0.2)]
                       overflow-hidden"
          >
            {/* TOP BAR */}
            <div className="bg-orange-500 px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-black text-[10px] font-black uppercase tracking-widest">
                  Evolvera Club
                </p>
                <h2 className="text-black text-lg font-black">
                  🚀 Upcoming Events
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-full bg-black/20 hover:bg-black/40 transition text-black"
              >
                <X size={16} />
              </button>
            </div>

            {/* EVENTS LIST */}
            <div className="p-5 space-y-3">
              {activeEvents.map((e) => {
                const badge =
                  e.status === "live"
                    ? EVENT_BADGE.live
                    : EVENT_BADGE[e.registrationStatus] ?? EVENT_BADGE.upcoming;

                return (
                  <Link
                    to={`/events/${e._id}`}
                    key={e._id}
                    onClick={handleClose}
                    className="flex gap-3 p-4 rounded-2xl bg-black/40 border border-white/5
                               hover:border-orange-500/30 transition group"
                  >
                    {/* COVER THUMBNAIL */}
                    {e.coverImage ? (
                      <img
                        src={e.coverImage}
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-zinc-800 shrink-0 flex items-center justify-center">
                        <Calendar size={20} className="text-orange-500" />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      {/* BADGE */}
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase mb-1.5 ${badge.class}`}>
                        {e.status === "live" && (
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        )}
                        {badge.text}
                      </span>

                      <p className="font-bold text-sm truncate group-hover:text-orange-500 transition-colors">
                        {e.title}
                      </p>

                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] text-gray-500 flex items-center gap-1">
                          <Calendar size={9} />
                          {new Date(e.eventStartAt).toLocaleDateString("en-IN", {
                            day: "numeric", month: "short"
                          })}
                        </span>
                        <span className="text-[10px] text-gray-500 flex items-center gap-1">
                          <Clock size={9} />
                          {new Date(e.eventStartAt).toLocaleTimeString("en-IN", {
                            hour: "2-digit", minute: "2-digit", hour12: true
                          })}
                        </span>
                        {e.location && (
                          <span className="text-[10px] text-gray-500 flex items-center gap-1 truncate">
                            <MapPin size={9} />
                            {e.location}
                          </span>
                        )}
                      </div>
                    </div>

                    <ArrowRight size={14} className="text-gray-600 group-hover:text-orange-500 transition shrink-0 mt-1" />
                  </Link>
                );
              })}
            </div>

            {/* FOOTER */}
            <div className="px-5 pb-5">
              <Link
                to="/events"
                onClick={handleClose}
                className="flex items-center justify-center gap-2 w-full py-3
                           rounded-2xl bg-orange-500 text-black font-black
                           uppercase text-xs tracking-wider
                           hover:scale-[1.02] transition"
              >
                View All Events
                <ArrowRight size={14} />
              </Link>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventPopup;