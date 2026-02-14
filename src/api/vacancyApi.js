import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getAllVacancies = () => API.get("/vacancies");


export const getVacancyBySlug = (slug) => {
  return API.get(`/vacancies/${slug}`);
};
export const createVacancy = (data) => {
  return API.post("/vacancies", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const updateVacancy = (id, data) => {
  return API.put(`/vacancies/${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const deleteVacancy = (id) => {
  return API.delete(`/vacancies/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};