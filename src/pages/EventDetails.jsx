import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  ArrowLeft,
  Trophy,
  CheckCircle,
} from "lucide-react";
import { getEventById } from "../services/event.service";
import EventRegistrationForm from "../components/EventRegistrationForm";
import { EVENT_BADGE } from "../utils/eventBadge";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getEventById(id)
      .then(setEvent)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="text-white pt-40 text-center">
        Loading event...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-white pt-40 text-center">
        Event not found
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-black text-white pt-32 pb-20 px-6"
      >
        <div className="max-w-6xl mx-auto">

          {/* BACK */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-orange-500 mb-8 font-bold uppercase text-xs tracking-widest"
          >
            <ArrowLeft size={16} /> Back
          </button>

          <div className="grid lg:grid-cols-2 gap-12">

            {/* LEFT */}
            <div>
              {/* STATUS BADGE */}
              <span
                className={`uppercase text-sm font-black ${EVENT_BADGE[event.status].class}`}
              >
                {EVENT_BADGE[event.status].text}
              </span>

              <h1 className="text-5xl md:text-7xl font-black uppercase my-6">
                {event.title}
              </h1>

              <p className="text-gray-400 mb-8">
                {event.description}
              </p>

              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-4">
                  <Calendar className="text-orange-500" />
                  {new Date(event.eventDate).toDateString()}
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="text-orange-500" />
                  {event.location || "TBA"}
                </div>
              </div>

              {/* 🔥 EXTRA DETAILS */}
              {event.skills?.length > 0 && (
                <DetailBlock title="Skills Required" items={event.skills} />
              )}

              {event.perks?.length > 0 && (
                <DetailBlock title="Perks & Benefits" items={event.perks} />
              )}

              {event.rules?.length > 0 && (
                <DetailBlock title="Rules" items={event.rules} />
              )}
            </div>

            {/* RIGHT */}
            <div className="sticky top-32">
              <div className="bg-zinc-900 border border-orange-500/20 p-8 rounded-3xl">
                <h4 className="text-2xl font-bold mb-4">
                  Ready to Join?
                </h4>

                <button
                  onClick={() =>
                    event.isRegistrationOpen && setShowForm(true)
                  }
                  disabled={!event.isRegistrationOpen}
                  className={`w-full py-4 rounded-2xl font-black uppercase transition
                    ${
                      event.isRegistrationOpen
                        ? "bg-orange-500 text-black hover:bg-white"
                        : "bg-zinc-700 text-gray-400 cursor-not-allowed"
                    }`}
                >
                  {event.isRegistrationOpen
                    ? "Register Now"
                    : "Registration Closed"}
                </button>

                <div className="mt-8 pt-8 border-t border-white/10 flex gap-4">
                  <Trophy className="text-orange-500" size={32} />
                  <div>
                    <p className="text-xs text-gray-500 uppercase">
                      Organized by
                    </p>
                    <p className="font-bold">
                      Evolvera Club
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </motion.div>

      {/* ================= REGISTRATION MODAL ================= */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4 text-white">
          <div className="bg-[#0d0d0d] p-8 rounded-3xl w-full max-w-md relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
            >
              ✕
            </button>

            <h3 className="text-2xl font-black mb-6">
              Register for{" "}
              <span className="text-orange-500">
                {event.title}
              </span>
            </h3>

            <EventRegistrationForm
              event={event}
              onClose={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}

/* ================= SMALL COMPONENT ================= */

const DetailBlock = ({ title, items }) => (
  <div className="mb-10">
    <h4 className="text-xl font-bold mb-4 text-orange-500">
      {title}
    </h4>
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-gray-300">
          <CheckCircle className="text-orange-500 mt-1" size={18} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);
