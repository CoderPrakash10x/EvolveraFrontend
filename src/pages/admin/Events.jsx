import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAdminEvents,
  deleteAdminEvent,
} from "../../services/event.admin.service";
import toast from "react-hot-toast";
import {
  Plus,
  CalendarDays,
  Clock3,
  Edit3,
  ClipboardList,
  Trash2,
  Image as ImageIcon,
  MoreHorizontal,
  ExternalLink,
  Sparkles,
} from "lucide-react";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [now, setNow] = useState(new Date());

  const navigate = useNavigate();

  // Keep registration status updated without page refresh
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchEvents = async () => {
  try {
    const data = await getAdminEvents();

    console.log("ADMIN EVENTS RESPONSE:", data);
    console.log("FIRST EVENT:", data?.[0]);

    const normalizedEvents = Array.isArray(data)
      ? data
          .map((event) => ({
            ...(event?._doc || {}),
            ...event,
          }))
          .sort((a, b) => {
            return (
              new Date(b.createdAt || b.eventStartAt || 0) -
              new Date(a.createdAt || a.eventStartAt || 0)
            );
          })
      : [];

    console.log("SORTED EVENTS:", normalizedEvents);

    setEvents(normalizedEvents);
  } catch (err) {
    console.error("FETCH EVENTS ERROR:", err);
    toast.error("Failed to load events");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    const ok = window.confirm(
      "Are you sure you want to delete this event permanently?"
    );

    if (!ok) return;

    setDeletingId(id);

    try {
      await deleteAdminEvent(id);

      toast.success("Event deleted");

      setEvents((prev) => prev.filter((event) => event._id !== id));
    } catch (err) {
      console.error("DELETE EVENT ERROR:", err);
      toast.error("Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  /*
   * IMPORTANT:
   * Registration status is calculated from registrationStartDate
   * and registrationEndDate instead of blindly trusting
   * isRegistrationOpen from backend.
   */
  const getRegistrationStatus = (event) => {
    const start =
      event?.registrationStartDate ||
      event?.registrationStartAt ||
      event?.registrationStart;

    const end =
      event?.registrationEndDate ||
      event?.registrationEndAt ||
      event?.registrationEnd;

    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);

      if (
        !Number.isNaN(startDate.getTime()) &&
        !Number.isNaN(endDate.getTime())
      ) {
        if (now < startDate) {
          return {
            label: "Upcoming",
            className:
              "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
            dot: "bg-yellow-400",
          };
        }

        if (now > endDate) {
          return {
            label: "Closed",
            className: "bg-red-500/10 text-red-400 border-red-500/20",
            dot: "bg-red-400",
          };
        }

        return {
          label: "Open",
          className: "bg-green-500/10 text-green-400 border-green-500/20",
          dot: "bg-green-400",
        };
      }
    }

    // Fallback if registration dates are not returned
    if (event?.isRegistrationOpen === true) {
      return {
        label: "Open",
        className: "bg-green-500/10 text-green-400 border-green-500/20",
        dot: "bg-green-400",
      };
    }

    return {
      label: "Closed",
      className: "bg-red-500/10 text-red-400 border-red-500/20",
      dot: "bg-red-400",
    };
  };

  const formatDate = (date) => {
    if (!date) return "—";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) return "—";

    return parsed.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (date) => {
    if (!date) return "—";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) return "—";

    return parsed.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-full text-white">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-10">
          <div className="space-y-3">
            <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse" />
            <div className="h-10 w-72 bg-zinc-800 rounded-xl animate-pulse" />
            <div className="h-4 w-96 bg-zinc-800 rounded animate-pulse" />
          </div>

          <div className="h-12 w-40 bg-zinc-800 rounded-xl animate-pulse" />
        </div>

        {/* Table Skeleton */}
        <div className="rounded-2xl border border-white/[0.08] bg-zinc-900/50 overflow-hidden">
          <div className="h-14 bg-white/[0.02] border-b border-white/[0.06]" />

          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="flex items-center gap-6 p-5 border-b border-white/[0.04]"
            >
              <div className="w-16 h-12 rounded-xl bg-zinc-800 animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-48 bg-zinc-800 rounded animate-pulse" />
                <div className="h-3 w-28 bg-zinc-800 rounded animate-pulse" />
              </div>
              <div className="h-8 w-20 bg-zinc-800 rounded-full animate-pulse" />
              <div className="h-9 w-48 bg-zinc-800 rounded-xl animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full text-white pb-10">
      {/* =====================================================
          HEADER
      ===================================================== */}
      <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-1 rounded-full bg-orange-500" />

            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-orange-400">
              Admin Panel
            </span>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
              Events{" "}
              <span className="text-orange-500">Management</span>
            </h1>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.07] text-xs text-zinc-500">
              <Sparkles size={12} className="text-orange-400" />
              {events.length} total
            </div>
          </div>

          <p className="text-sm text-zinc-500 mt-3 max-w-xl">
            Create, manage, edit and monitor all your Evolvera events from one
            place.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/events/create")}
          className="
            group
            flex items-center justify-center gap-2
            px-5 py-3.5
            rounded-xl
            bg-orange-500
            text-black
            font-black
            text-sm
            shadow-lg shadow-orange-500/10
            hover:bg-orange-400
            hover:-translate-y-0.5
            active:translate-y-0
            transition-all duration-200
          "
        >
          <Plus
            size={18}
            className="group-hover:rotate-90 transition-transform duration-300"
          />

          Create Event
        </button>
      </div>

      {/* =====================================================
          QUICK STATS
      ===================================================== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        <div className="rounded-2xl border border-white/[0.08] bg-zinc-900/50 p-5">
          <p className="text-[10px] uppercase tracking-widest font-black text-zinc-600">
            Total Events
          </p>

          <p className="text-3xl font-black mt-2">{events.length}</p>

          <div className="mt-3 flex items-center gap-2 text-xs text-zinc-600">
            <CalendarDays size={13} />
            All events
          </div>
        </div>

        <div className="rounded-2xl border border-green-500/10 bg-green-500/[0.03] p-5">
          <p className="text-[10px] uppercase tracking-widest font-black text-zinc-600">
            Registration Open
          </p>

          <p className="text-3xl font-black mt-2 text-green-400">
            {
              events.filter(
                (event) => getRegistrationStatus(event).label === "Open"
              ).length
            }
          </p>

          <div className="mt-3 flex items-center gap-2 text-xs text-green-500/60">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            Currently accepting
          </div>
        </div>

        <div className="rounded-2xl border border-yellow-500/10 bg-yellow-500/[0.03] p-5">
          <p className="text-[10px] uppercase tracking-widest font-black text-zinc-600">
            Upcoming
          </p>

          <p className="text-3xl font-black mt-2 text-yellow-400">
            {
              events.filter(
                (event) => getRegistrationStatus(event).label === "Upcoming"
              ).length
            }
          </p>

          <div className="mt-3 flex items-center gap-2 text-xs text-yellow-500/60">
            <Clock3 size={13} />
            Not started
          </div>
        </div>

        <div className="rounded-2xl border border-red-500/10 bg-red-500/[0.03] p-5">
          <p className="text-[10px] uppercase tracking-widest font-black text-zinc-600">
            Closed
          </p>

          <p className="text-3xl font-black mt-2 text-red-400">
            {
              events.filter(
                (event) => getRegistrationStatus(event).label === "Closed"
              ).length
            }
          </p>

          <div className="mt-3 flex items-center gap-2 text-xs text-red-500/60">
            Registration ended
          </div>
        </div>
      </div>

      {/* =====================================================
          EMPTY STATE
      ===================================================== */}
      {events.length === 0 ? (
        <div
          className="
            min-h-[420px]
            rounded-2xl
            border border-dashed border-white/10
            bg-zinc-900/30
            flex flex-col items-center justify-center
            text-center
            px-6
          "
        >
          <div className="w-20 h-20 rounded-3xl bg-orange-500/10 border border-orange-500/10 flex items-center justify-center mb-6">
            <CalendarDays size={34} className="text-orange-400" />
          </div>

          <h2 className="text-xl font-black text-zinc-300">
            No events created yet
          </h2>

          <p className="text-sm text-zinc-600 max-w-sm mt-2 mb-7">
            Create your first event and start managing registrations,
            schedules and submissions.
          </p>

          <button
            onClick={() => navigate("/admin/events/create")}
            className="
              flex items-center gap-2
              px-5 py-3
              rounded-xl
              bg-orange-500
              text-black
              font-black
              text-sm
              hover:bg-orange-400
              hover:-translate-y-0.5
              transition-all
            "
          >
            <Plus size={17} />
            Create First Event
          </button>
        </div>
      ) : (
        /* =====================================================
           EVENTS TABLE
        ===================================================== */
        <div className="rounded-2xl border border-white/[0.08] bg-zinc-900/50 overflow-hidden shadow-2xl shadow-black/20">
          {/* Table Header */}
          <div className="px-5 md:px-6 py-5 border-b border-white/[0.06] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="font-black text-zinc-200">
                All Events
              </h2>

              <p className="text-xs text-zinc-600 mt-1">
                Manage your event details, forms and registrations.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-zinc-600">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Live registration status
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-sm">
              <thead>
                <tr className="bg-black/30 border-b border-white/[0.06]">
                  <th className="px-6 py-4 text-left text-[10px] uppercase tracking-[0.15em] font-black text-zinc-600">
                    Event
                  </th>

                  <th className="px-5 py-4 text-left text-[10px] uppercase tracking-[0.15em] font-black text-zinc-600">
                    Event Date
                  </th>

                  <th className="px-5 py-4 text-left text-[10px] uppercase tracking-[0.15em] font-black text-zinc-600">
                    Registration
                  </th>

                  <th className="px-5 py-4 text-left text-[10px] uppercase tracking-[0.15em] font-black text-zinc-600">
                    Registration Window
                  </th>

                  <th className="px-5 py-4 text-right text-[10px] uppercase tracking-[0.15em] font-black text-zinc-600">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {events.map((event) => {
                  const status = getRegistrationStatus(event);

                  const eventDate =
                    event.eventStartAt ||
                    event.eventDate ||
                    event.startDate;

                  const registrationStart =
                    event.registrationStartDate ||
                    event.registrationStartAt ||
                    event.registrationStart;

                  const registrationEnd =
                    event.registrationEndDate ||
                    event.registrationEndAt ||
                    event.registrationEnd;

                  return (
                    <tr
                      key={event._id}
                      className="
                        group
                        border-b border-white/[0.04]
                        last:border-b-0
                        hover:bg-white/[0.025]
                        transition-colors
                      "
                    >
                      {/* EVENT */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4 min-w-[280px]">
                          <div className="relative w-20 h-14 shrink-0 rounded-xl overflow-hidden bg-black border border-white/[0.08]">
                            {event.coverImage ? (
                              <img
                                src={event.coverImage}
                                alt={event.title || "Event"}
                                loading="lazy"
                                decoding="async"
                                className="
                                  w-full h-full object-cover
                                  group-hover:scale-105
                                  transition-transform duration-500
                                "
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <ImageIcon
                                  size={19}
                                  className="text-zinc-700"
                                />
                              </div>
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          </div>

                          <div className="min-w-0">
                            <p className="font-bold text-zinc-200 truncate max-w-[260px]">
                              {event.title || "Untitled Event"}
                            </p>

                            <p className="text-[11px] text-zinc-600 mt-1">
                              ID: {String(event._id).slice(-8)}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* EVENT DATE */}
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center">
                            <CalendarDays
                              size={14}
                              className="text-zinc-500"
                            />
                          </div>

                          <div>
                            <p className="text-zinc-300 font-medium">
                              {formatDate(eventDate)}
                            </p>

                            {eventDate && (
                              <p className="text-[10px] text-zinc-600 mt-0.5">
                                {new Date(eventDate).toLocaleTimeString(
                                  "en-IN",
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* REGISTRATION STATUS */}
                      <td className="px-5 py-5">
                        <span
                          className={`
                            inline-flex items-center gap-2
                            px-3 py-1.5
                            rounded-full
                            border
                            text-[11px]
                            font-black
                            ${status.className}
                          `}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${status.dot} ${
                              status.label === "Open"
                                ? "animate-pulse"
                                : ""
                            }`}
                          />

                          {status.label}
                        </span>
                      </td>

                      {/* REGISTRATION WINDOW */}
                      <td className="px-5 py-5">
                        {registrationStart && registrationEnd ? (
                          <div className="text-xs">
                            <p className="text-zinc-400">
                              {formatDateTime(registrationStart)}
                            </p>

                            <div className="flex items-center gap-1.5 my-1 text-zinc-700">
                              <div className="w-1 h-1 rounded-full bg-zinc-700" />
                              to
                              <div className="w-1 h-1 rounded-full bg-zinc-700" />
                            </div>

                            <p className="text-zinc-500">
                              {formatDateTime(registrationEnd)}
                            </p>
                          </div>
                        ) : (
                          <span className="text-xs text-zinc-700">
                            Registration dates unavailable
                          </span>
                        )}
                      </td>

                      {/* ACTIONS */}
                      <td className="px-5 py-5">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() =>
                              navigate(
                                `/admin/events/create?id=${event._id}`
                              )
                            }
                            title="Edit Event"
                            className="
                              group/edit
                              w-9 h-9
                              rounded-lg
                              bg-white/[0.05]
                              border border-white/[0.06]
                              text-zinc-400
                              hover:text-white
                              hover:bg-white/10
                              transition
                              flex items-center justify-center
                            "
                          >
                            <Edit3
                              size={15}
                              className="group-hover/edit:scale-110 transition-transform"
                            />
                          </button>

                          <button
                            onClick={() =>
                              navigate(
                                `/admin/events/${event._id}/form-builder`
                              )
                            }
                            title="Form Builder"
                            className="
                              w-9 h-9
                              rounded-lg
                              bg-orange-500/10
                              border border-orange-500/10
                              text-orange-400
                              hover:bg-orange-500/20
                              transition
                              flex items-center justify-center
                            "
                          >
                            <ClipboardList size={15} />
                          </button>

                          <button
                            onClick={() =>
                              navigate(
                                `/admin/events/${event._id}/submissions`
                              )
                            }
                            title="Submissions"
                            className="
                              w-9 h-9
                              rounded-lg
                              bg-blue-500/10
                              border border-blue-500/10
                              text-blue-400
                              hover:bg-blue-500/20
                              transition
                              flex items-center justify-center
                            "
                          >
                            <ExternalLink size={15} />
                          </button>

                          <button
                            onClick={() => handleDelete(event._id)}
                            disabled={deletingId === event._id}
                            title="Delete Event"
                            className="
                              w-9 h-9
                              rounded-lg
                              bg-red-500/10
                              border border-red-500/10
                              text-red-400
                              hover:bg-red-500/20
                              transition
                              flex items-center justify-center
                              disabled:opacity-40
                              disabled:cursor-not-allowed
                            "
                          >
                            {deletingId === event._id ? (
                              <span className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                            ) : (
                              <Trash2 size={15} />
                            )}
                          </button>

                          <button
                            className="
                              hidden
                              w-9 h-9
                              rounded-lg
                              bg-white/[0.04]
                              text-zinc-500
                              hover:text-white
                            "
                          >
                            <MoreHorizontal size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* FOOTER */}
          <div className="px-6 py-4 border-t border-white/[0.05] bg-black/20 flex items-center justify-between">
            <p className="text-[11px] text-zinc-600">
              Showing{" "}
              <span className="text-zinc-400 font-bold">
                {events.length}
              </span>{" "}
              {events.length === 1 ? "event" : "events"}
            </p>

            <div className="flex items-center gap-2 text-[11px] text-zinc-600">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              Registration status updates automatically
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;