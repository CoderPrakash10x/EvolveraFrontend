import API from "../utils/api";

export const getAdminEvents = async () => {
  const res = await API.get("/events");
  return res.data;
};

export const createAdminEvent = async (formData) => {
  const res = await API.post("/events", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return res.data;
};

export const updateAdminEvent = async (id, formData) => {
  const res = await API.put(`/events/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return res.data;
};

export const deleteAdminEvent = async (id) => {
  const res = await API.delete(`/events/${id}`);
  return res.data;
};


export const getRegistrationsByEvent = async (eventId, page = 1, limit = 10) => {
  const res = await API.get(
    `/admin/registrations/${eventId}?page=${page}&limit=${limit}`
  );
  return res.data;
};

export const getEventRegistrationCounts = async () => {
  const res = await API.get("/admin/event-registration-count");
  return res.data;
};

