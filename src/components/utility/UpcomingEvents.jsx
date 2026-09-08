import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EVENT_BADGE } from "../../utils/eventBadge";
import { Calendar, MapPin, Clock } from "lucide-react";
import { optimizeCloudinaryUrl } from "../../utils/media";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";

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
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return <span className="text-xs text-orange-500">Live now</span>;
  }

  return (
    <div className="mt-4 flex gap-4 text-xs tabular-nums text-neutral-400">
      {Object.entries(timeLeft).map(([k, v]) => (
        <span key={k}>
          <span className="text-white">{String(v).padStart(2, "0")}</span>
          <span className="ml-1 text-neutral-600">{k}</span>
        </span>
      ))}
    </div>
  );
}

export default function UpcomingEvents({ events = [], loading = false }) {
  const upcomingEvents = (Array.isArray(events) ? events : [])
    .filter((e) => e.status !== "past")
    .slice(0, 4);

  if (loading) {
    return (
      <section className="border-t border-white/10 py-24">
        <Container>
          <div className="h-10 w-64 animate-pulse bg-white/5" />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[1, 2].map((i) => (
              <div key={i} className="h-80 animate-pulse bg-white/5" />
            ))}
          </div>
        </Container>
      </section>
    );
  }

  if (upcomingEvents.length === 0) return null;

  return (
      <section className="relative overflow-hidden border-t border-white/10 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 glow-orange opacity-60" />
      <Container className="relative">
        <div className="mb-12 flex items-end justify-between">
          <SectionHeading index="05" eyebrow="Calendar" title="Events on the floor." />
          <Button to="/events" variant="text" className="hidden sm:inline-flex">
            All events
          </Button>
        </div>

        <div className="grid gap-px bg-white/10 md:grid-cols-2">
          {upcomingEvents.map((e) => {
            const badge =
              e.status === "live"
                ? EVENT_BADGE.live
                : EVENT_BADGE[e.registrationStatus] ?? EVENT_BADGE.upcoming;

            return (
              <Link to={`/events/${e._id}`} key={e._id} className="group block bg-ink p-6 md:p-8">
                {e.coverImage && (
                  <div className="mb-6 overflow-hidden">
                    <img
                      src={optimizeCloudinaryUrl(e.coverImage, 900)}
                      alt={e.title}
                      loading="lazy"
                      decoding="async"
                      className="h-48 w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                )}
                <span className={`inline-block px-2 py-1 text-[10px] font-semibold uppercase tracking-wider ${badge.class}`}>
                  {badge.text}
                </span>
                <h3 className="mt-4 font-display text-2xl text-white group-hover:text-orange-500">
                  {e.title}
                </h3>
                <div className="mt-4 space-y-1 text-sm text-neutral-500">
                  <p className="flex items-center gap-2">
                    <Calendar size={14} />
                    {new Date(e.eventStartAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock size={14} />
                    {new Date(e.eventStartAt).toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                  {e.location && (
                    <p className="flex items-center gap-2">
                      <MapPin size={14} />
                      {e.location}
                    </p>
                  )}
                </div>
                {e.status !== "live" && <Countdown targetDate={e.eventStartAt} />}
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
