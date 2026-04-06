import api from "./axios";

// GET all placements
export const getPlacements = async () => {
  const res = await api.get("/placements");
  return res.data;
};

// ADD placement
export const addPlacement = async (data) => {
  const res = await api.post("/placements", data);
  return res.data;
};

// UPDATE placement
export const updatePlacement = async (id, data) => {
  const res = await api.put(`/placements/${id}`, data);
  return res.data;
};

// DELETE placement
export const deletePlacement = async (id) => {
  const res = await api.delete(`/placements/${id}`);
  return res.data;
};