import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  getEventRegistrationCounts
} from "../../services/event.admin.service";
import {
  Users,
  ArrowRight,
  CalendarDays,
  BarChart3,
  ClipboardList,
  Sparkles,
  TrendingUp,
  UserRoundCheck
} from "lucide-react";

const RegistrationsHome = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getEventRegistrationCounts()
      .then(setEvents)
      .catch(() => toast.error("Failed to load registration stats"))
      .finally(() => setLoading(false));
  }, []);

  const totalRegistrations = events.reduce(
    (sum, event) => sum + (event.registrations || 0),
    0
  );

  return (
    <div className="min-h-full pb-10">

      {/* =====================================================
          HEADER
      ===================================================== */}
      <div className="relative mb-10 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-900 to-orange-950/20 p-7 md:p-9">

        {/* Background Glow */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 h-52 w-52 rounded-full bg-orange-500/5 blur-3xl" />

        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 border border-orange-500/20">
                <ClipboardList
                  size={16}
                  className="text-orange-400"
                />
              </div>

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange-400">
                Admin Dashboard
              </span>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-white md:text-5xl">
              Event{" "}
              <span className="text-orange-500">
                Registrations
              </span>
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 md:text-base">
              Monitor registrations, track participation and
              manage attendees across all your events.
            </p>
          </div>

          <div className="hidden md:flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-black/20">
            <BarChart3
              size={34}
              strokeWidth={1.5}
              className="text-orange-400"
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          STATS
      ===================================================== */}
      {!loading && events.length > 0 && (
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {/* Total Events */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/30">

            <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-orange-500/5 blur-2xl transition group-hover:bg-orange-500/10" />

            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Total Events
                </p>

                <h2 className="mt-2 text-3xl font-black text-white">
                  {events.length}
                </h2>

                <p className="mt-1 text-xs text-zinc-500">
                  Active event records
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20">
                <CalendarDays
                  size={20}
                  className="text-orange-400"
                />
              </div>
            </div>
          </div>

          {/* Total Registrations */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/30">

            <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-orange-500/5 blur-2xl transition group-hover:bg-orange-500/10" />

            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Total Registrations
                </p>

                <h2 className="mt-2 text-3xl font-black text-orange-400">
                  {totalRegistrations}
                </h2>

                <div className="mt-1 flex items-center gap-1 text-xs text-zinc-500">
                  <TrendingUp size={12} />
                  Across all events
                </div>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20">
                <Users
                  size={20}
                  className="text-orange-400"
                />
              </div>
            </div>
          </div>

          {/* Average */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/30">

            <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-orange-500/5 blur-2xl transition group-hover:bg-orange-500/10" />

            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Average Per Event
                </p>

                <h2 className="mt-2 text-3xl font-black text-white">
                  {events.length
                    ? Math.round(totalRegistrations / events.length)
                    : 0}
                </h2>

                <p className="mt-1 text-xs text-zinc-500">
                  Registrations / event
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20">
                <UserRoundCheck
                  size={20}
                  className="text-orange-400"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          SECTION HEADER
      ===================================================== */}
      <div className="mb-5 flex items-center justify-between">

        <div>
          <h2 className="text-xl font-bold text-white">
            Your Events
          </h2>

          <p className="mt-1 text-xs text-zinc-500">
            Select an event to view complete registrations
          </p>
        </div>

        {!loading && events.length > 0 && (
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-zinc-900 px-3 py-1.5 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
            <span className="text-xs font-medium text-zinc-400">
              {events.length} Events
            </span>
          </div>
        )}
      </div>

      {/* =====================================================
          LOADING
      ===================================================== */}
      {loading && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-56 animate-pulse rounded-2xl border border-white/10 bg-zinc-900/70"
            />
          ))}

        </div>
      )}

      {/* =====================================================
          EVENT CARDS
      ===================================================== */}
      {!loading && events.length > 0 && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

          {events.map((e, index) => (
            <div
              key={e.eventId}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:shadow-2xl hover:shadow-orange-500/5"
            >

              {/* Top Glow */}
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-orange-500/5 blur-3xl transition-all duration-500 group-hover:bg-orange-500/15" />

              {/* Number */}
              <div className="absolute right-5 top-5 text-5xl font-black text-white/[0.025]">
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* Card Top */}
              <div className="relative flex items-start justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10 transition-transform duration-300 group-hover:scale-110">
                  <Sparkles
                    size={20}
                    className="text-orange-400"
                  />
                </div>

                <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/20 px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Active
                  </span>
                </div>
              </div>

              {/* Event Info */}
              <div className="relative mt-6">

                <h3 className="line-clamp-2 min-h-[56px] text-xl font-bold leading-7 text-white transition-colors group-hover:text-orange-400">
                  {e.title}
                </h3>

                <div className="mt-5 flex items-end justify-between">

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500">
                      Registrations
                    </p>

                    <div className="mt-1 flex items-center gap-2">
                      <Users
                        size={16}
                        className="text-orange-500"
                      />

                      <span className="text-2xl font-black text-white">
                        {e.registrations || 0}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-600">
                      Event ID
                    </p>

                    <p className="mt-1 max-w-[100px] truncate font-mono text-[10px] text-zinc-500">
                      {e.eventId}
                    </p>
                  </div>

                </div>
              </div>

              {/* Divider */}
              <div className="my-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Button */}
              <button
                onClick={() =>
                  navigate(`/admin/registrations/${e.eventId}`)
                }
                className="group/btn relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl border border-orange-500/20 bg-orange-500/10 px-4 py-3 text-sm font-bold text-orange-400 transition-all duration-300 hover:border-orange-500 hover:bg-orange-500 hover:text-black"
              >
                <span>View Registrations</span>

                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </button>

            </div>
          ))}

        </div>
      )}

      {/* =====================================================
          EMPTY STATE
      ===================================================== */}
      {!loading && events.length === 0 && (
        <div className="relative overflow-hidden rounded-3xl border border-dashed border-white/10 bg-zinc-900/40 px-6 py-20 text-center">

          <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-orange-500/5 blur-3xl" />

          <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-zinc-900">
            <ClipboardList
              size={28}
              className="text-zinc-600"
            />
          </div>

          <h3 className="relative mt-6 text-lg font-bold text-zinc-300">
            No registrations yet
          </h3>

          <p className="relative mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-600">
            Once users register for your events, their
            registration statistics will appear here.
          </p>

        </div>
      )}

    </div>
  );
};

export default RegistrationsHome;