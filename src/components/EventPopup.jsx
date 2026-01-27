import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const EventPopup = ({ events = [] }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!events.length) return;

    const dismissed = localStorage.getItem("events_popup");

    if (!dismissed) {
      setOpen(true);
    }
  }, [events]);

  if (!events.length) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] flex items-center justify-center px-4"
        >
          {/* BACKDROP */}
          <div
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* POPUP */}
          <motion.div
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-xl rounded-3xl
                       bg-zinc-900 border border-orange-500/30
                       shadow-[0_0_80px_rgba(255,115,0,0.25)]"
          >
            {/* CLOSE */}
            <button
              onClick={() => {
                localStorage.setItem("events_popup", "true");
                setOpen(false);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
            >
              ✕
            </button>

            {/* CONTENT */}
            <div className="p-8 text-white">
              {/* HEADER */}
              <h2 className="text-2xl font-black mb-2">
                Upcoming <span className="text-orange-500">Events</span>
              </h2>
              <p className="text-gray-400 text-sm mb-6">
                Don’t miss what Evolvera is bringing next 🚀
              </p>

              {/* EVENT LIST */}
              <div className="space-y-4 mb-8">
                {events.map((e) => (
                  <div
                    key={e._id}
                    className="flex items-start gap-3 p-4 rounded-2xl
                               bg-black/40 border border-white/10"
                  >
                    <Calendar
                      size={18}
                      className="text-orange-500 mt-1"
                    />
                    <div>
                      <p className="font-semibold">
                        {e.title}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(e.eventDate).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                        {e.location ? ` • ${e.location}` : ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link
                to="/events"
                className="group flex items-center justify-center gap-2
                           w-full rounded-2xl bg-orange-500 py-4
                           font-black text-black uppercase text-sm"
              >
                View All Events
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventPopup;
