import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, X } from "lucide-react";
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

  const activeEvents = (Array.isArray(events) ? events : [])
    .filter((e) => e.status !== "past")
    .slice(0, 3);

  if (!activeEvents.length || !open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-end justify-center px-4 pb-4 sm:items-center sm:pb-0">
      <button
        type="button"
        onClick={handleClose}
        className="absolute inset-0 bg-black/70"
        aria-label="Dismiss upcoming events"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="events-popup-title"
        className="relative w-full max-w-md border border-white/10 bg-black"
      >
        <div className="flex items-start justify-between border-b border-white/10 px-6 py-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-orange-500">Evolvera Club</p>
            <h2 id="events-popup-title" className="mt-1 font-display text-xl text-white">
              Upcoming events
            </h2>
          </div>
          <button type="button" onClick={handleClose} className="p-1 text-neutral-400 hover:text-white" aria-label="Close">
            <X size={16} />
          </button>
        </div>
        <div className="divide-y border-white/10">
          {activeEvents.map((e) => {
            const badge =
              e.status === "live"
                ? EVENT_BADGE.live
                : EVENT_BADGE[e.registrationStatus] ?? EVENT_BADGE.upcoming;
            return (
              <Link
                key={e._id}
                to={`/events/${e._id}`}
                onClick={handleClose}
                className="block px-6 py-5 hover:bg-white/[0.03]"
              >
                <span className={`inline-block px-2 py-0.5 text-[10px] uppercase ${badge.class}`}>
                  {badge.text}
                </span>
                <p className="mt-2 font-display text-lg text-white">{e.title}</p>
                <p className="mt-2 flex flex-wrap gap-3 text-xs text-neutral-500">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(e.eventStartAt).toLocaleDateString("en-IN")}
                  </span>
                  {e.location && (
                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> {e.location}
                    </span>
                  )}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EventPopup;
