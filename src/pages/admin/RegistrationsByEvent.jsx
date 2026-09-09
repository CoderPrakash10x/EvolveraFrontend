import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getSubmissions,
  deleteSubmission,
  toggleSubmissionApproval,
  exportSubmissionsExcel,
} from "../../services/form.service";

const RegistrationsByEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    fields: [],
    submissions: [],
    totalPages: 1,
    total: 0,
  });

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!eventId) {
      toast.error("Event ID missing");
      return;
    }

    try {
      setLoading(true);

      const res = await getSubmissions(eventId, page, 10);

      setData({
        fields: res?.fields || [],
        submissions: res?.submissions || [],
        totalPages: res?.totalPages || 1,
        total: res?.total || 0,
      });
    } catch (error) {
      console.error("Failed to load registrations:", error);
      toast.error("Failed to load registrations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [eventId, page]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this registration?")) return;

    try {
      await deleteSubmission(id);

      toast.success("Registration deleted");

      setData((prev) => ({
        ...prev,
        submissions: prev.submissions.filter((s) => s._id !== id),
        total: Math.max(0, prev.total - 1),
      }));
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  const handleApproval = async (id) => {
    try {
      const res = await toggleSubmissionApproval(id);

      setData((prev) => ({
        ...prev,
        submissions: prev.submissions.map((s) =>
          s._id === id
            ? {
                ...s,
                isApproved: res.isApproved,
              }
            : s
        ),
      }));

      toast.success(
        res.isApproved ? "Registration approved" : "Registration unapproved"
      );
    } catch (error) {
      console.error(error);
      toast.error("Approval failed");
    }
  };

  const handleExport = async () => {
    try {
      await exportSubmissionsExcel(eventId);
      toast.success("Excel exported");
    } catch (error) {
      console.error(error);
      toast.error("Export failed");
    }
  };

  const { fields, submissions, totalPages, total } = data;

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <button
            onClick={() => navigate("/admin/registrations")}
            className="text-sm text-gray-400 hover:text-white mb-2 block"
          >
            ← Back to Registrations
          </button>

          <h1 className="text-4xl font-black">
            Registrations{" "}
            <span className="text-orange-500">({total})</span>
          </h1>
        </div>

        <button
          onClick={handleExport}
          className="px-5 py-3 bg-green-500 text-black font-black rounded-xl hover:scale-105 transition"
        >
          Export Excel
        </button>
      </div>

      {/* LOADING */}
      {loading ? (
        <p className="text-gray-400">Loading registrations...</p>
      ) : submissions.length === 0 ? (
        <div className="border border-white/10 rounded-xl p-10 text-center">
          <p className="text-gray-500">No registrations found</p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-white/10 rounded-xl">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900 text-gray-400">
              <tr>
                {fields.map((field) => (
                  <th
                    key={field.name}
                    className="p-4 text-left whitespace-nowrap"
                  >
                    {field.label}
                  </th>
                ))}

                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {submissions.map((submission) => (
                <tr
                  key={submission._id}
                  className="border-t border-white/5 hover:bg-zinc-900/40"
                >
                  {fields.map((field) => {
                    const value = submission.responses?.[field.name];

                    return (
                      <td
                        key={field.name}
                        className="p-4 text-gray-300 max-w-[220px]"
                      >
                        <div className="truncate">
                          {Array.isArray(value)
                            ? value.join(", ")
                            : value ?? "—"}
                        </div>
                      </td>
                    );
                  })}

                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold ${
                        submission.isApproved
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {submission.isApproved ? "Approved" : "Pending"}
                    </span>
                  </td>

                  <td className="p-4 text-gray-400 whitespace-nowrap">
                    {submission.createdAt
                      ? new Date(
                          submission.createdAt
                        ).toLocaleDateString()
                      : "—"}
                  </td>

                  <td className="p-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() =>
                          handleApproval(submission._id)
                        }
                        className="text-xs text-green-400 hover:text-green-300"
                      >
                        {submission.isApproved
                          ? "Unapprove"
                          : "Approve"}
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(submission._id)
                        }
                        className="text-xs text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
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

export default RegistrationsByEvent;