import API from "../utils/api";




export const getAdminGalleries = async () => {
  const res = await API.get("/gallery/admin");
  return res.data;
};


export const createAdminGallery = async (formData, config = {}) => {
  const res = await API.post("/gallery/admin", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    ...config, //upload progress
  });
  return res.data;
};


export const deleteAdminGallery = async (id) => {
  const res = await API.delete(`/gallery/admin/${id}`);
  return res.data;
};
