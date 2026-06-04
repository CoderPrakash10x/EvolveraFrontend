import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getSubmissions,
  deleteSubmission,
  toggleSubmissionApproval,
  exportSubmissionsExcel
} from "../../services/form.service";
import toast from "react-hot-toast";

export default function FormSubmissions() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({ fields: [], submissions: [], totalPages: 1, total: 0 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    getSubmissions(eventId, page)
      .then(setData)
      .catch(() => toast.error("Failed to load submissions"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [eventId, page]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this submission?")) return;
    try {
      await deleteSubmission(id);
      toast.success("Deleted");
      setData((prev) => ({
        ...prev,
        submissions: prev.submissions.filter((s) => s._id !== id),
        total: prev.total - 1
      }));
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleApprove = async (id) => {
    try {
      const res = await toggleSubmissionApproval(id);
      setData((prev) => ({
        ...prev,
        submissions: prev.submissions.map((s) =>
          s._id === id ? { ...s, isApproved: res.isApproved } : s
        )
      }));
      toast.success(res.isApproved ? "Approved" : "Unapproved");
    } catch {
      toast.error("Failed");
    }
  };

  const { fields, submissions, totalPages, total } = data;

  return (
    <div>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <button
            onClick={() => navigate("/admin/registrations")}
            className="text-sm text-gray-400 hover:text-white mb-2 block"
          >
            ← Back
          </button>
          <h1 className="text-4xl font-black">
            Submissions{" "}
            <span className="text-orange-500">({total})</span>
          </h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/admin/events/${eventId}/form-builder`)}
            className="px-5 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition text-sm"
          >
            Edit Form
          </button>
          <button
            onClick={() => exportSubmissionsExcel(eventId)}
            className="px-5 py-3 bg-green-500 text-black font-black rounded-xl hover:scale-105 transition text-sm"
          >
            Export Excel
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading submissions...</p>
      ) : submissions.length === 0 ? (
        <p className="text-gray-500 text-sm">No submissions yet.</p>
      ) : (
        <div className="overflow-x-auto border border-white/10 rounded-xl">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900 text-gray-400">
              <tr>
                {fields.map((f) => (
                  <th key={f.name} className="p-4 text-left whitespace-nowrap">
                    {f.label}
                  </th>
                ))}
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub) => (
                <tr key={sub._id} className="border-t border-white/5 hover:bg-zinc-900/40">
                  {fields.map((f) => (
                    <td key={f.name} className="p-4 text-gray-300 max-w-[180px] truncate">
                      {Array.isArray(sub.responses?.[f.name])
                        ? sub.responses[f.name].join(", ")
                        : sub.responses?.[f.name] ?? "—"}
                    </td>
                  ))}
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold ${
                        sub.isApproved
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {sub.isApproved ? "Approved" : "Pending"}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400 whitespace-nowrap">
                    {new Date(sub.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 flex gap-3">
                    <button
                      onClick={() => handleApprove(sub._id)}
                      className="text-xs text-green-400 hover:text-green-300"
                    >
                      {sub.isApproved ? "Unapprove" : "Approve"}
                    </button>
                    <button
                      onClick={() => handleDelete(sub._id)}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
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
          <span className="px-4 py-2 text-sm">Page {page} / {totalPages}</span>
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
}