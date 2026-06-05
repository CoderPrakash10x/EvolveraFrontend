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
import DynamicRegistrationForm from "../components/DynamicRegistrationForm";

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

  const badge =
    event.status === "live"
      ? EVENT_BADGE.live
      : event.status === "past"
        ? EVENT_BADGE.past
        : EVENT_BADGE[event.registrationStatus] ?? EVENT_BADGE.upcoming;

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
                className={`uppercase text-sm font-black ${badge.class}`}
              >
                {badge.text}
              </span>

              <h1 className="text-5xl md:text-7xl font-black uppercase my-6">
                {event.title}
              </h1>

              <StructuredDescription content={event.description} />

              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-4">
                  <Calendar className="text-orange-500" />
                  {new Date(event.eventStartAt).toDateString()}
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="text-orange-500" />
                  {event.location || "TBA"}
                </div>
              </div>

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
            {/* RIGHT */}
            <div className="sticky top-32">
              <div className="bg-zinc-900 border border-orange-500/20 p-8 rounded-3xl">
                <h4 className="text-2xl font-bold mb-4">Ready to Join?</h4>

                {/* REGISTRATION BUTTON LOGIC */}
                {event.isRegistrationOpen ? (
                  <>
                    {/* Google Form wala event */}
                    {event.googleFormUrl ? (
                      <a
                        href={event.googleFormUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-4 rounded-2xl font-black uppercase transition
                       bg-orange-500 text-black hover:bg-white
                       flex items-center justify-center gap-2"
                      >
                        Register via Google Form ↗
                      </a>
                    ) : (
                      /* Dynamic Form wala event */
                      !showForm ? (
                        <button
                          onClick={() => setShowForm(true)}
                          className="w-full py-4 rounded-2xl font-black uppercase transition
                         bg-orange-500 text-black hover:bg-white"
                        >
                          Register Now
                        </button>
                      ) : (
                        <DynamicRegistrationForm
                          eventId={event._id}
                          onClose={() => setShowForm(false)}
                        />
                      )
                    )}
                  </>
                ) : (
                  <button
                    disabled
                    className="w-full py-4 rounded-2xl font-black uppercase
                   bg-zinc-700 text-gray-400 cursor-not-allowed"
                  >
                    {event.status === "past" ? "Event Ended" : "Registration Closed"}
                  </button>
                )}

                <div className="mt-8 pt-8 border-t border-white/10 flex gap-4">
                  <Trophy className="text-orange-500" size={32} />
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Organized by</p>
                    <p className="font-bold">Evolvera Club</p>
                  </div>
                </div>
              </div>
</div>
            </div>
          </div>
      </motion.div>
    </>
  );
}

/* ================= SMALL COMPONENTS ================= */

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

const StructuredDescription = ({ content }) => {
  if (!content) return null;

  const fixed = content
    .replace(/\s*##\s*/g, "\n## ")
    .replace(/\r/g, "")
    .trim();

  const parts = fixed.split("\n## ");

  const summary = parts[0]?.trim();
  const sections = parts.slice(1);

  return (
    <div className="space-y-14 mt-10 max-w-3xl">
      {summary && (
        <p className="text-gray-300 text-lg leading-relaxed">
          {summary}
        </p>
      )}

      {sections.map((block, i) => {
        const lines = block
          .split("\n")
          .map(l => l.trim())
          .filter(Boolean);

        if (!lines.length) return null;

        const title = lines[0];
        const body = lines.slice(1);

        return (
          <div key={i} className="space-y-4">
            <h3 className="text-2xl font-black text-orange-500">
              {title}
            </h3>
            <ul className="space-y-2">
              {body.map((line, idx) => (
                <li key={idx} className="flex gap-3 text-gray-300 leading-relaxed">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>
                    {line.replace(/^[-•–\d.\s👉🔥🎯🏆📊🧠🗣🚫💡]+/, "")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};