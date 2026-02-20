import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/whats-new",
});

// GET - public
export const getWhatsNew = () => API.get("/");

// POST - admin only
export const createWhatsNew = (data) =>
  API.post("/", data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

// UPDATE - admin only
export const updateWhatsNew = (id, data) =>
  API.put(`/${id}`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

// DELETE - admin only
export const deleteWhatsNew = (id) =>
  API.delete(`/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
