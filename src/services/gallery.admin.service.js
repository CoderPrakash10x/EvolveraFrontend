import API from "../utils/api";

/* ======================
   ADMIN GALLERY SERVICES
====================== */

// ✅ GET ALL GALLERIES (ADMIN)
export const getAdminGalleries = async () => {
  const res = await API.get("/gallery/admin");
  return res.data;
};

// ✅ CREATE GALLERY (ADMIN)
export const createAdminGallery = async (formData, config = {}) => {
  const res = await API.post("/gallery/admin", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    ...config, // onUploadProgress yahin se pass hota hai
  });
  return res.data;
};

// ✅ DELETE GALLERY (ADMIN)
export const deleteAdminGallery = async (id) => {
  const res = await API.delete(`/gallery/admin/${id}`);
  return res.data;
};
