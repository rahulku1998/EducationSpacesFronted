import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL + "/videos";

// 🔥 Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// 🔥 Automatically attach token in every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ GET ALL VIDEOS
export const getVideos = () => api.get("/");

// ✅ GET SINGLE VIDEO
export const getVideoById = (id) => api.get(`/${id}`);

// ✅ CREATE VIDEO (Admin Only)
export const createVideo = (data) => api.post("/", data);

// ✅ UPDATE VIDEO (Admin Only)
export const updateVideo = (id, data) => api.put(`/${id}`, data);

// ✅ DELETE VIDEO (Admin Only)
export const deleteVideo = (id) => api.delete(`/${id}`);
