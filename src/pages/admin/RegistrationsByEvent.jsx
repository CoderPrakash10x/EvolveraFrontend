import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getRegistrationsByEvent } from "../../services/event.admin.service";
import {
  exportRegistrationsExcel,
  deleteRegistration,
  toggleApproval
} from "../../services/registration.admin.service";

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
        setData(res.registrations || []);
        setTotalPages(res.totalPages || 1);
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
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.map((r) => {
                const leader = r.leader || {};
                const members = r.members || [];

                return (
                  <tr
                    key={r._id}
                    className="border-t border-white/5 hover:bg-zinc-900/40"
                  >
                    <td className="p-4">{leader.name || "—"}</td>
                    <td className="p-4 text-gray-400">
                      {leader.email || "—"}
                    </td>
                    <td className="p-4 capitalize">
                      {r.registrationType}
                    </td>
                    <td className="p-4">
                      {r.teamName || "Individual"}
                    </td>

                    {/* MEMBERS – ONE LINE */}
                    <td className="p-4 text-xs text-gray-300">
                      {members.length > 0
                        ? members
                            .map((m) => `${m.name} (${m.email})`)
                            .join(", ")
                        : "—"}
                    </td>

                    {/* STATUS */}
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-bold ${
                          r.isApproved
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {r.isApproved ? "Approved" : "Pending"}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="p-4 flex gap-3">
                      {!r.isApproved && (
                        <button
                          onClick={() => {
                            toggleApproval(r._id)
                              .then((res) => {
                                setData((prev) =>
                                  prev.map((x) =>
                                    x._id === r._id
                                      ? { ...x, isApproved: true }
                                      : x
                                  )
                                );
                                toast.success("Approved");
                              })
                              .catch(() =>
                                toast.error("Approval failed")
                              );
                          }}
                          className="text-xs text-green-400"
                        >
                          Approve
                        </button>
                      )}

                      <button
                        onClick={() => {
                          if (!confirm("Delete this registration?"))
                            return;

                          deleteRegistration(r._id)
                            .then(() => {
                              setData((prev) =>
                                prev.filter((x) => x._id !== r._id)
                              );
                              toast.success("Deleted");
                            })
                            .catch(() =>
                              toast.error("Delete failed")
                            );
                        }}
                        className="text-xs text-red-400"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}

              {data.length === 0 && (
                <tr>
                  <td colSpan="7" className="p-10 text-center text-gray-500">
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
