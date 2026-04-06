import api from "./axios";

export const getGallery = async () => {
  const res = await api.get("/gallery");
  return res.data;
};

export const uploadGalleryImage = async (formData, config = {}) => {
  const res = await api.post("/gallery/upload", formData, config);
  return res.data;
};

export const uploadGalleryImageByUrl = async (urls, company, year, caption) => {
  const res = await api.post("/gallery/upload-url", {
    urls,
    company,
    year,
    caption,
  });
  return res.data;
};

export const deleteGalleryImage = async (id) => {
  const res = await api.delete(`/gallery/${id}`);
  return res.data;
};

export const updateGalleryImage = async (id, data) => {
  const res = await api.put(`/gallery/${id}`, data);
  return res.data;
};
