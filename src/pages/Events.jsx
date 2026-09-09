import { useEffect, useState, memo, useCallback } from "react";
import { Calendar, MapPin, ArrowUpRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { getEvents } from "../services/event.service";
import { EVENT_BADGE } from "../utils/eventBadge";
import { asArray } from "../utils/normalize";
import PageHeader from "../components/ui/PageHeader";
import Container from "../components/ui/Container";

const UpcomingCard = memo(({ event, formatDate, formatTime }) => {
  const badge =
    event.status === "live"
      ? EVENT_BADGE.live
      : EVENT_BADGE[event.registrationStatus] ?? EVENT_BADGE.upcoming;

  return (
    <Link to={`/events/${event._id}`} className="group block border-b border-white/10 py-8 md:py-10">
      <div className="grid gap-8 md:grid-cols-12">
        <div className="overflow-hidden bg-neutral-950 md:col-span-5">
          <img
            src={event.coverImage || "/placeholder.jpg"}
            alt={event.title}
            loading="lazy"
            decoding="async"
            className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-col justify-between md:col-span-7">
          <div>
            <span className={`inline-block px-2 py-1 text-[10px] font-semibold uppercase ${badge.class}`}>
              {badge.text}
            </span>
            <h3 className="mt-4 font-display text-3xl tracking-tight group-hover:text-orange-500 md:text-4xl">
              {event.title}
            </h3>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-neutral-500">
              <span className="flex items-center gap-1">
                <Calendar size={14} /> {formatDate(event.eventStartAt)}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} /> {formatTime(event.eventStartAt)}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={14} /> {event.location || "TBA"}
              </span>
            </div>
          </div>
          <span className="mt-6 inline-flex items-center gap-2 text-sm text-orange-500">
            View details <ArrowUpRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
});

const PastCard = memo(({ event, formatDate }) => (
  <Link to={`/events/${event._id}`} className="group grid gap-6 border-b border-white/10 py-8 md:grid-cols-12">
    <div className="md:col-span-4">
      <img
        src={event.coverImage || "/placeholder.jpg"}
        alt={event.title}
        loading="lazy"
        decoding="async"
        className="aspect-video w-full object-cover opacity-70 transition group-hover:opacity-100"
      />
    </div>
    <div className="md:col-span-8">
      <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">Past</p>
      <h3 className="mt-2 font-display text-2xl md:text-3xl">{event.title}</h3>
      <p className="mt-3 text-sm text-neutral-500">
        {formatDate(event.eventStartAt)} · {event.location || "—"}
      </p>
    </div>
  </Link>
));

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getEvents()
      .then((data) => setEvents(asArray(data)))
      .catch(() => {
        setEvents([]);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

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

  const list = Array.isArray(events) ? events : [];
  const upcomingEvents = list.filter((e) => e.status !== "past");
  const pastEvents = list
  .filter((e) => e.status === "past")
  .sort(
    (a, b) =>
      new Date(b.eventStartAt).getTime() -
      new Date(a.eventStartAt).getTime()
  );

  return (
    <section className="min-h-screen bg-ink text-[#F5F5F5]">
      <PageHeader eyebrow="Events" title="The calendar.">
        Live sessions, workshops, and competitions — registered through the same systems you already use.
      </PageHeader>

      <Container className="py-16 md:py-24">
        {error && (
          <p className="mb-10 text-sm text-red-400">Events could not be loaded. Try again shortly.</p>
        )}

        <p className="mb-6 text-[11px] uppercase tracking-[0.28em] text-orange-500">Live & upcoming</p>

        {loading && (
          <div className="space-y-8">
            {[1, 2].map((i) => (
              <div key={i} className="h-48 animate-pulse bg-white/5" />
            ))}
          </div>
        )}

        {!loading && upcomingEvents.length === 0 && (
          <p className="text-neutral-500">No upcoming events right now.</p>
        )}

        {!loading && upcomingEvents.map((event) => (
          <UpcomingCard
            key={event._id}
            event={event}
            formatDate={formatDate}
            formatTime={formatTime}
          />
        ))}

        <p className="mb-6 mt-24 text-[11px] uppercase tracking-[0.28em] text-neutral-500">Past events</p>

        {loading && (
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="h-32 animate-pulse bg-white/5" />
            ))}
          </div>
        )}

        {!loading && pastEvents.length === 0 && (
          <p className="text-neutral-500">No past events yet.</p>
        )}

        {!loading && pastEvents.map((event) => (
          <PastCard key={event._id} event={event} formatDate={formatDate} />
        ))}
      </Container>
    </section>
  );
}
