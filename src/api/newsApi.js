import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// 🔥 GET ALL NEWS
export const getAllNews = () => API.get("/news");

// 🔥 GET SINGLE NEWS
export const getNewsById = (id) => API.get(`/news/${id}`);

// 🔥 CREATE NEWS (Admin)
export const createNews = (data) => {
  return API.post("/news", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// 🔥 UPDATE NEWS (Admin)
export const updateNews = (id, data) => {
  return API.put(`/news/${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// 🔥 DELETE NEWS (Admin)
export const deleteNews = (id) => {
  return API.delete(`/news/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
