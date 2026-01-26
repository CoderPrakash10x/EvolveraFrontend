export const exportRegistrationsExcel = (eventId) => {
  const token = localStorage.getItem("token");

  if (!token || !eventId) {
    console.error("Token or Event ID missing");
    return;
  }

  const url = `http://localhost:5000/api/admin/export/registrations/${eventId}?token=${token}`;

  window.open(url, "_blank");
};
