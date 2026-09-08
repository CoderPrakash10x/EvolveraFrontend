import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, MapPin, ArrowLeft, CheckCircle } from "lucide-react";
import { getEventById } from "../services/event.service";
import { EVENT_BADGE } from "../utils/eventBadge";
import DynamicRegistrationForm from "../components/DynamicRegistrationForm";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getEventById(id)
      .then(setEvent)
      .catch(() => setEvent(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black px-6 pt-40 text-neutral-500">
        Loading event...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-black px-6 pt-40 text-center text-white">
        <p>Event not found</p>
        <Button to="/events" variant="ghost" className="mt-6">
          Back to events
        </Button>
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
    <div className="min-h-screen bg-ink pt-28 pb-24 text-[#F5F5F5]">
      <Container>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-orange-500"
        >
          <ArrowLeft size={14} /> Back
        </button>

        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className={`inline-block px-2 py-1 text-[10px] font-semibold uppercase ${badge.class}`}>
              {badge.text}
            </span>
            <h1 className="mt-6 font-display text-[clamp(2.4rem,6vw,5.5rem)] leading-[0.92] tracking-tight">
              {event.title}
            </h1>

            <div className="mt-8 flex flex-col gap-3 text-neutral-400">
              <div className="flex items-center gap-3">
                <Calendar className="text-orange-500" size={18} />
                {new Date(event.eventStartAt).toDateString()}
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-orange-500" size={18} />
                {event.location || "TBA"}
              </div>
            </div>

            <StructuredDescription content={event.description} />

            {event.skills?.length > 0 && <DetailBlock title="Skills required" items={event.skills} />}
            {event.perks?.length > 0 && <DetailBlock title="Perks & benefits" items={event.perks} />}
            {event.rules?.length > 0 && <DetailBlock title="Rules" items={event.rules} />}
          </div>

          <aside className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
            <div className="border border-white/10 p-8">
              <h2 className="font-display text-2xl">Registration</h2>
              <p className="mt-2 text-sm text-neutral-500">Organized by Evolvera Club</p>

              <div className="mt-8">
                {event.isRegistrationOpen ? (
                  event.googleFormUrl ? (
                    <a
                      href={event.googleFormUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center bg-orange-500 py-4 text-sm font-semibold text-black transition hover:bg-white"
                    >
                      Register via Google Form
                    </a>
                  ) : !showForm ? (
                    <button
                      type="button"
                      onClick={() => setShowForm(true)}
                      className="w-full bg-orange-500 py-4 text-sm font-semibold text-black transition hover:bg-white"
                    >
                      Register now
                    </button>
                  ) : (
                    <DynamicRegistrationForm
                      eventId={event._id}
                      onClose={() => setShowForm(false)}
                    />
                  )
                ) : (
                  <button
                    type="button"
                    disabled
                    className="w-full cursor-not-allowed bg-white/10 py-4 text-sm font-semibold text-neutral-500"
                  >
                    {event.status === "past" ? "Event ended" : "Registration closed"}
                  </button>
                )}
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}

const DetailBlock = ({ title, items }) => (
  <div className="mt-12">
    <h4 className="mb-4 text-[11px] uppercase tracking-[0.2em] text-orange-500">{title}</h4>
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-neutral-300">
          <CheckCircle className="mt-0.5 text-orange-500" size={16} />
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
    <div className="mt-12 max-w-3xl space-y-12">
      {summary && <p className="text-lg leading-relaxed text-neutral-300">{summary}</p>}
      {sections.map((block, i) => {
        const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
        if (!lines.length) return null;
        const title = lines[0];
        const body = lines.slice(1);
        return (
          <div key={i}>
            <h3 className="font-display text-2xl text-white">{title}</h3>
            <ul className="mt-4 space-y-2">
              {body.map((line, idx) => (
                <li key={idx} className="flex gap-3 leading-relaxed text-neutral-400">
                  <span className="text-orange-500">—</span>
                  <span>{line.replace(/^[-•–\d.\s👉🔥🎯🏆📊🧠🗣🚫💡]+/, "")}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};
