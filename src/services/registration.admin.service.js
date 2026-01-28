export const exportRegistrationsExcel = (eventId) => {
  const token = localStorage.getItem("token");

  if (!token || !eventId) {
    console.error("Token or Event ID missing");
    return;
  }

  const url = `https://evolverabackend.onrender.com/api/admin/export/registrations/${eventId}?token=${token}`;

  window.open(url, "_blank");
};
