import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  getRegistrationsByEvent,
} from "../../services/event.admin.service";
import { exportRegistrationsExcel } from "../../services/registration.admin.service";

const RegistrationsByEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getRegistrationsByEvent(eventId, page, 10)
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
        <button
          onClick={() => navigate("/admin/registrations")}
          className="text-sm text-gray-400 hover:text-white"
        >
          ← Back to Events
        </button>

      <button
  onClick={() => exportRegistrationsExcel(eventId)}

  className="px-4 py-2 bg-green-600 text-black font-bold rounded-lg"
>
  Export Excel
</button>

      </div>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
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
                  <td className="p-4">{r.teamName || "Individual"}</td>
                  <td className="p-4 text-center">{r.members.length}</td>
                  <td className="p-4 text-gray-400">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}

              {data.length === 0 && (
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
        <div className="flex justify-center gap-4 mt-10">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 bg-white/10 rounded disabled:opacity-40"
          >
            Prev
          </button>

          <span className="px-4 py-2">
            Page {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 bg-white/10 rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default RegistrationsByEvent;
