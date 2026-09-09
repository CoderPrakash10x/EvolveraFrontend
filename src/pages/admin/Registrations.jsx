import { useEffect, useState } from "react";
import {
  getAdminEvents,
  getRegistrationsByEvent,
  exportRegistrationsExcel,
} from "../../services/event.admin.service";
import toast from "react-hot-toast";
import {
  Download,
  Users,
  CalendarDays,
  UserRound,
  Mail,
  UsersRound,
  ChevronLeft,
  ChevronRight,
  FileSpreadsheet,
  ClipboardList,
} from "lucide-react";

const Registrations = () => {
  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const limit = 10;

  useEffect(() => {
    getAdminEvents()
      .then(setEvents)
      .catch(() => toast.error("Failed to load events"));
  }, []);

  useEffect(() => {
    if (!eventId) {
      setData([]);
      return;
    }

    setLoading(true);

    getRegistrationsByEvent(eventId, page, limit)
      .then((res) => {
        setData(res.registrations);
        setTotalPages(res.totalPages);
      })
      .catch(() => toast.error("Failed to load registrations"))
      .finally(() => setLoading(false));
  }, [eventId, page]);

  const selectedEvent = events.find(
    (event) => String(event._id) === String(eventId)
  );

  return (
    <div className="min-h-full text-white">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-8 w-1 rounded-full bg-orange-500" />

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange-400">
              Admin Panel
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight">
            Event{" "}
            <span className="text-orange-500">Registrations</span>
          </h1>

          <p className="text-sm text-zinc-500 mt-2">
            Manage participants and export event registration data.
          </p>
        </div>

        {eventId && (
          <button
            onClick={() => exportRegistrationsExcel(eventId)}
            className="
              group flex items-center justify-center gap-2
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
            <Download
              size={17}
              className="group-hover:translate-y-0.5 transition-transform"
            />

            Export Excel
          </button>
        )}
      </div>

      {/* ================= EVENT SELECTOR ================= */}
      <div
        className="
          rounded-2xl
          border border-white/[0.08]
          bg-zinc-900/60
          backdrop-blur-xl
          p-5 md:p-6
          mb-6
        "
      >
        <div className="flex flex-col lg:flex-row lg:items-end gap-5">
          <div className="flex-1 max-w-2xl">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2.5">
              <CalendarDays size={14} className="text-orange-500" />
              Select Event
            </label>

            <select
              value={eventId}
              onChange={(e) => {
                setEventId(e.target.value);
                setPage(1);
              }}
              className="
                w-full
                px-4 py-3.5
                rounded-xl
                bg-black/60
                border border-white/10
                text-sm text-white
                outline-none
                cursor-pointer
                transition
                focus:border-orange-500/60
                focus:ring-2
                focus:ring-orange-500/10
              "
            >
              <option value="">Choose an event...</option>

              {events.map((event) => (
                <option key={event._id} value={event._id}>
                  {event.title}
                </option>
              ))}
            </select>
          </div>

          {selectedEvent && (
            <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-orange-500/5 border border-orange-500/10">
              <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <ClipboardList size={17} className="text-orange-400" />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wider text-zinc-600 font-bold">
                  Selected
                </p>

                <p className="text-sm font-bold text-zinc-300 max-w-[220px] truncate">
                  {selectedEvent.title}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= STATS ================= */}
      {eventId && !loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="rounded-2xl border border-white/[0.08] bg-zinc-900/50 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider font-bold text-zinc-500">
                  Current Page
                </p>

                <p className="text-2xl font-black mt-1">
                  {data.length}
                </p>

                <p className="text-xs text-zinc-600 mt-1">
                  registrations shown
                </p>
              </div>

              <div className="w-11 h-11 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <Users size={20} className="text-orange-400" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-zinc-900/50 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider font-bold text-zinc-500">
                  Page
                </p>

                <p className="text-2xl font-black mt-1">
                  {page}
                  <span className="text-zinc-600 text-base">
                    {" "}
                    / {totalPages}
                  </span>
                </p>

                <p className="text-xs text-zinc-600 mt-1">
                  registration pages
                </p>
              </div>

              <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center">
                <FileSpreadsheet
                  size={20}
                  className="text-zinc-400"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= EMPTY INITIAL STATE ================= */}
      {!eventId && (
        <div
          className="
            min-h-[360px]
            rounded-2xl
            border border-dashed border-white/10
            bg-zinc-900/30
            flex flex-col items-center justify-center
            text-center
            px-6
          "
        >
          <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/10 flex items-center justify-center mb-5">
            <ClipboardList
              size={28}
              className="text-orange-400"
            />
          </div>

          <h2 className="text-lg font-bold text-zinc-300">
            Select an event
          </h2>

          <p className="text-sm text-zinc-600 max-w-sm mt-2">
            Choose an event from the selector above to view all
            participant registrations.
          </p>
        </div>
      )}

      {/* ================= LOADING ================= */}
      {eventId && loading && (
        <div
          className="
            rounded-2xl
            border border-white/[0.08]
            bg-zinc-900/50
            min-h-[360px]
            flex flex-col items-center justify-center
          "
        >
          <div className="w-10 h-10 border-2 border-white/10 border-t-orange-500 rounded-full animate-spin mb-4" />

          <p className="text-sm text-zinc-500">
            Loading registrations...
          </p>
        </div>
      )}

      {/* ================= TABLE ================= */}
      {eventId && !loading && (
        <>
          <div className="rounded-2xl border border-white/[0.08] bg-zinc-900/50 overflow-hidden">
            {/* TABLE HEADER */}
            <div className="px-5 md:px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
              <div>
                <h2 className="font-bold text-zinc-200">
                  Participant List
                </h2>

                <p className="text-xs text-zinc-600 mt-1">
                  Registration details for the selected event
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-500">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                Live data
              </div>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-sm">
                <thead>
                  <tr className="bg-black/30 border-b border-white/[0.06]">
                    <th className="px-5 py-4 text-left text-[11px] uppercase tracking-wider font-bold text-zinc-500">
                      Participant
                    </th>

                    <th className="px-5 py-4 text-left text-[11px] uppercase tracking-wider font-bold text-zinc-500">
                      Email
                    </th>

                    <th className="px-5 py-4 text-left text-[11px] uppercase tracking-wider font-bold text-zinc-500">
                      Type
                    </th>

                    <th className="px-5 py-4 text-left text-[11px] uppercase tracking-wider font-bold text-zinc-500">
                      Team
                    </th>

                    <th className="px-5 py-4 text-center text-[11px] uppercase tracking-wider font-bold text-zinc-500">
                      Members
                    </th>

                    <th className="px-5 py-4 text-left text-[11px] uppercase tracking-wider font-bold text-zinc-500">
                      Registered
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((r) => (
                    <tr
                      key={r._id}
                      className="
                        border-b border-white/[0.04]
                        last:border-b-0
                        hover:bg-white/[0.025]
                        transition-colors
                      "
                    >
                      {/* PARTICIPANT */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 shrink-0 rounded-xl bg-orange-500/10 border border-orange-500/10 flex items-center justify-center">
                            <UserRound
                              size={16}
                              className="text-orange-400"
                            />
                          </div>

                          <div className="min-w-0">
                            <p className="font-semibold text-zinc-200 truncate">
                              {r.teamLeader?.name || "Unknown"}
                            </p>

                            <p className="text-xs text-zinc-600 mt-0.5">
                              Team Leader
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* EMAIL */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-zinc-400">
                          <Mail
                            size={14}
                            className="text-zinc-600 shrink-0"
                          />

                          <span className="truncate max-w-[230px]">
                            {r.teamLeader?.email || "—"}
                          </span>
                        </div>
                      </td>

                      {/* TYPE */}
                      <td className="px-5 py-4">
                        <span
                          className={`
                            inline-flex items-center
                            px-2.5 py-1
                            rounded-lg
                            text-[11px]
                            font-bold
                            capitalize
                            ${
                              r.registrationType === "team"
                                ? "bg-blue-500/10 text-blue-400 border border-blue-500/10"
                                : "bg-orange-500/10 text-orange-400 border border-orange-500/10"
                            }
                          `}
                        >
                          {r.registrationType}
                        </span>
                      </td>

                      {/* TEAM */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <UsersRound
                            size={15}
                            className="text-zinc-600"
                          />

                          <span className="text-zinc-300">
                            {r.teamName || "Individual"}
                          </span>
                        </div>
                      </td>

                      {/* MEMBERS */}
                      <td className="px-5 py-4 text-center">
                        <span className="inline-flex min-w-8 justify-center px-2 py-1 rounded-lg bg-white/5 text-zinc-300 font-semibold">
                          {r.members?.length ?? 0}
                        </span>
                      </td>

                      {/* DATE */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-zinc-500">
                          <CalendarDays size={14} />

                          <span>
                            {new Date(
                              r.createdAt
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {/* EMPTY */}
                  {data.length === 0 && (
                    <tr>
                      <td colSpan="6">
                        <div className="py-16 flex flex-col items-center justify-center text-center">
                          <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                            <Users
                              size={24}
                              className="text-zinc-600"
                            />
                          </div>

                          <p className="font-semibold text-zinc-400">
                            No registrations found
                          </p>

                          <p className="text-xs text-zinc-600 mt-1">
                            This event doesn't have any registrations yet.
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ================= PAGINATION ================= */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 px-1">
              <p className="text-xs text-zinc-600">
                Showing page{" "}
                <span className="text-zinc-400 font-semibold">
                  {page}
                </span>{" "}
                of{" "}
                <span className="text-zinc-400 font-semibold">
                  {totalPages}
                </span>
              </p>

              <div className="flex items-center gap-2">
                <button
                  disabled={page === 1}
                  onClick={() =>
                    setPage((p) => p - 1)
                  }
                  className="
                    flex items-center gap-1.5
                    px-4 py-2.5
                    rounded-xl
                    border border-white/10
                    bg-zinc-900
                    text-sm text-zinc-400
                    hover:text-white
                    hover:border-white/20
                    disabled:opacity-30
                    disabled:cursor-not-allowed
                    transition
                  "
                >
                  <ChevronLeft size={16} />
                  Prev
                </button>

                <div className="px-4 py-2.5 rounded-xl bg-orange-500 text-black text-sm font-black min-w-[45px] text-center">
                  {page}
                </div>

                <button
                  disabled={page === totalPages}
                  onClick={() =>
                    setPage((p) => p + 1)
                  }
                  className="
                    flex items-center gap-1.5
                    px-4 py-2.5
                    rounded-xl
                    border border-white/10
                    bg-zinc-900
                    text-sm text-zinc-400
                    hover:text-white
                    hover:border-white/20
                    disabled:opacity-30
                    disabled:cursor-not-allowed
                    transition
                  "
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Registrations;