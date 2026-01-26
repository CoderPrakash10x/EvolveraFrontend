import API from "../utils/api";

export const getEventRegistrationStats = async () => {
  const res = await API.get("/admin/event-registration-count");
  return res.data;
};

export const getAllEventsAdmin = async () => {
  const res = await API.get("/events");
  return res.data;
};



export const getDashboardStats = async () => {
  const { data } = await API.get("/admin/event-registration-count");
  return data;
};