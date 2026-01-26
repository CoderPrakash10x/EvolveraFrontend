import API from "../utils/api";

export const getAdminGalleries = async () => {
  const res = await API.get("/gallery");
  return res.data;
};

export const createAdminGallery = async (formData) => {
  const res = await API.post("/gallery", formData);
  return res.data;
};

export const deleteAdminGallery = async (id) => {
  const res = await API.delete(`/gallery/${id}`);
  return res.data;
};
