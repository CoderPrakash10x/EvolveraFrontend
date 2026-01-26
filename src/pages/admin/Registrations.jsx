import { useEffect, useState } from "react";
import {
  getAdminEvents,
  getRegistrationsByEvent,
  exportRegistrationsExcel
} from "../../services/event.admin.service";
import toast from "react-hot-toast";

const Registrations = () => {
  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const limit = 10;

  useEffect(() => {
    getAdminEvents().then(setEvents);
  }, []);

  useEffect(() => {
    if (!eventId) return;

    setLoading(true);
    getRegistrationsByEvent(eventId, page, limit)
      .then((res) => {
        setData(res.registrations);
        setTotalPages(res.totalPages);
      })
      .catch(() => toast.error("Failed to load registrations"))
      .finally(() => setLoading(false));
  }, [eventId, page]);

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-black">
          Event <span className="text-orange-500">Registrations</span>
        </h1>

        {eventId && (
          <button
            onClick={() => exportRegistrationsExcel(eventId)}
            className="px-6 py-3 bg-green-500 text-black font-black rounded-xl hover:scale-105 transition"
          >
            Export Excel
          </button>
        )}
      </div>

      {/* EVENT SELECT */}
      <select
        value={eventId}
        onChange={(e) => {
          setEventId(e.target.value);
          setPage(1);
        }}
        className="mb-8 p-4 bg-zinc-900 border border-white/10 rounded-xl w-full max-w-md"
      >
        <option value="">Select Event</option>
        {events.map((e) => (
          <option key={e._id} value={e._id}>
            {e.title}
          </option>
        ))}
      </select>

      {/* TABLE */}
      {loading ? (
        <p className="text-gray-400">Loading registrations...</p>
      ) : (
        <div className="overflow-x-auto border border-white/10 rounded-xl">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900 text-gray-400">
              <tr>
                <th className="p-4 text-left">Leader</th>
                <th className="p-4">Email</th>
                <th className="p-4">Type</th>
                <th className="p-4">Team</th>
                <th className="p-4">Members</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>

            <tbody>
              {data.map((r) => (
                <tr
                  key={r._id}
                  className="border-t border-white/5 hover:bg-zinc-900/40"
                >
                  <td className="p-4">{r.teamLeader.name}</td>
                  <td className="p-4 text-gray-400">{r.teamLeader.email}</td>
                  <td className="p-4 capitalize">{r.registrationType}</td>
                  <td className="p-4">
                    {r.teamName || "Individual"}
                  </td>
                  <td className="p-4 text-center">
                    {r.members.length}
                  </td>
                  <td className="p-4 text-gray-400">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}

              {data.length === 0 && eventId && (
                <tr>
                  <td colSpan="6" className="p-10 text-center text-gray-500">
                    No registrations found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex gap-4 justify-center mt-10">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 bg-white/10 rounded-lg disabled:opacity-40"
          >
            Prev
          </button>

          <span className="px-4 py-2 text-sm">
            Page {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 bg-white/10 rounded-lg disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Registrations;
