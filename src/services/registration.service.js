import API from "../utils/api";
export const registerForEvent = async (data) => {
  const res = await API.post("/registrations", data);
  return res.data;
};
