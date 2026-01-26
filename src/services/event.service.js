import API from "../utils/api";

export const getEvents = async () => {
  const res = await API.get("/events");
  return res.data;
};

export const getEventById = async (id) => {
  const res = await API.get(`/events/${id}`);
  return res.data;
};
