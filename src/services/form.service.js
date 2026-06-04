import API from "../utils/api";

// Public
export const getFormSchema = (eventId) =>
  API.get(`/forms/${eventId}/schema`).then((r) => r.data);

export const submitForm = (eventId, responses) =>
  API.post(`/forms/${eventId}/submit`, { responses }).then((r) => r.data);

// Admin
export const saveFormSchema = (eventId, fields) =>
  API.post(`/forms/${eventId}/schema`, { fields }).then((r) => r.data);

export const getSubmissions = (eventId, page = 1, limit = 10) =>
  API.get(`/forms/${eventId}/submissions?page=${page}&limit=${limit}`).then((r) => r.data);

export const deleteSubmission = (id) =>
  API.delete(`/forms/submissions/${id}`).then((r) => r.data);

export const toggleSubmissionApproval = (id) =>
  API.patch(`/forms/submissions/${id}/approve`).then((r) => r.data);

export const exportSubmissionsExcel = async (eventId) => {
  const res = await API.get(`/forms/${eventId}/submissions/export`, {
    responseType: "blob"
  });
  const blob = new Blob([res.data], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "registrations.xlsx";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
};