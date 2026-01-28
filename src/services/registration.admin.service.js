import API from "../utils/api";

export const exportRegistrationsExcel = async (eventId) => {
  try {
    const res = await API.get(
      `/admin/registrations/${eventId}/export`,
      { responseType: "blob" }
    );

    // 🧠 create downloadable file
    const blob = new Blob([res.data], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "registrations.xlsx"; // filename
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteRegistration = (id) =>
  API.delete(`/admin/registrations/${id}`);

export const toggleApproval = (id) =>
  API.patch(`/admin/registrations/${id}/approve`);
