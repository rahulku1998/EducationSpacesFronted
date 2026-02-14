import axios from "axios";

// ✅ Axios instance with base URL
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// 🔥 GET ALL RESULTS (public, no auth needed)
export const getAllResults = () => API.get("/results");

// 🔥 GET SINGLE RESULT (optional, agar chahiye)
export const getResultById = (id) => API.get(`/results/${id}`);

// 🔥 CREATE RESULT (Admin only)
export const createResult = (data) => {
  return API.post("/results", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// 🔥 UPDATE RESULT (Admin only)
export const updateResult = (id, data) => {
  return API.put(`/results/${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// 🔥 DELETE RESULT (Admin only)
export const deleteResult = (id) => {
  return API.delete(`/results/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
