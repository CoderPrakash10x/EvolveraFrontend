import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAdminEvents,
  deleteAdminEvent,
} from "../../services/event.admin.service";
import toast from "react-hot-toast";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const data = await getAdminEvents();
      setEvents(data);
    } catch (err) {
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    const ok = confirm("Are you sure you want to delete this event?");
    if (!ok) return;

    try {
      await deleteAdminEvent(id);
      toast.success("Event deleted");
      setEvents((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return <p className="text-gray-400">Loading events...</p>;
  }

  return (
    <div>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-black">
          Events <span className="text-orange-500">Management</span>
        </h1>

        <button
          onClick={() => navigate("/admin/events/create")}
          className="px-6 py-3 bg-orange-500 text-black font-black rounded-xl hover:scale-105 transition"
        >
          + Create Event
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900 text-gray-400">
            <tr>
              <th className="p-4 text-left">Cover</th>
              <th className="p-4 text-left">Title</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {events.map((e) => (
              <tr
                key={e._id}
                className="border-t border-white/5 hover:bg-zinc-900/40 transition"
              >
                {/* IMAGE */}
                <td className="p-4">
                  {e.coverImage ? (
                    <img
                      src={e.coverImage}
                      alt={e.title}
                      className="w-16 h-12 object-cover rounded-md"
                    />
                  ) : (
                    <span className="text-xs text-gray-500">No Image</span>
                  )}
                </td>

                {/* TITLE */}
                <td className="p-4 font-semibold">{e.title}</td>

                {/* DATE */}
                <td className="p-4 text-gray-400">
                  {e.eventDate
                    ? new Date(e.eventDate).toLocaleDateString()
                    : "—"}
                </td>

                {/* STATUS */}
                <td className="p-4">
                  {e.isRegistrationOpen ? (
                    <span className="px-3 py-1 text-xs bg-green-500/20 text-green-400 rounded-full">
                      Open
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-xs bg-red-500/20 text-red-400 rounded-full">
                      Closed
                    </span>
                  )}
                </td>

                {/* ACTIONS */}
                <td className="p-4 flex gap-3 justify-center">
                  <button
                    onClick={() =>
                      navigate(`/admin/events/create?id=${e._id}`)
                    }
                    className="px-4 py-2 text-xs rounded-lg bg-white/10 hover:bg-white/20"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(e._id)}
                    className="px-4 py-2 text-xs rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {events.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="p-10 text-center text-gray-500"
                >
                  No events found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Events;
