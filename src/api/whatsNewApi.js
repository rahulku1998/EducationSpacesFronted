import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/whats-new",
});

// 🔐 Token automatically attach
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// GET - public
export const getWhatsNew = () => API.get("/");

// POST - admin only
export const createWhatsNew = (data) => API.post("/", data);

// UPDATE - admin only
export const updateWhatsNew = (id, data) =>
  API.put(`/${id}`, data);

// DELETE - admin only
export const deleteWhatsNew = (id) =>
  API.delete(`/${id}`);
