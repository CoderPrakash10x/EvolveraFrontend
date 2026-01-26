import API from "../utils/api";

export const getAdminTeam = async () => {
  const res = await API.get("/team");
  return res.data;
};

export const createAdminMember = async (formData) => {
  const res = await API.post("/team", formData);
  return res.data;
};

export const deleteAdminMember = async (id) => {
  const res = await API.delete(`/team/${id}`);
  return res.data;
};
