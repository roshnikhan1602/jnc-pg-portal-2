import api from "./axios";

export const getRecruiters = async () => {
  const res = await api.get("/recruiters");
  return res.data;
};

export const addRecruiter = async (formData) => {
  const res = await api.post("/recruiters", formData);
  return res.data;
};

export const updateRecruiter = async (id, formData) => {
  const res = await api.put(`/recruiters/${id}`, formData);
  return res.data;
};

export const deleteRecruiter = async (id) => {
  const res = await api.delete(`/recruiters/${id}`);
  return res.data;
};
