import React, { useEffect, useState } from "react";
import {
  getAllVacancies,
  createVacancy,
  updateVacancy,
  deleteVacancy,
} from "../api/vacancyApi";

// Link colors (optional, for buttons)
const linkColors = ["bg-blue-500", "bg-purple-500", "bg-green-500", "bg-pink-500"];

const Vacancies = () => {
  const [vacancies, setVacancies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const role = localStorage.getItem("role")?.toLowerCase();
  const token = localStorage.getItem("token");
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    title: "",
    department: "",
    slug: "",
    status: "upcoming",
    startDate: "",
    lastDate: "",
    ageLimit: "",
    eligibility: "",
    howToApply: "",
    TotalPost: "",
    description: { hi: "", en: "" },
    syllabusLink: "",
    previousYearPaperLink: "",
    TopperTalkLink: "",
    detailsLink: "",
  };
  const [formData, setFormData] = useState(emptyForm);

  // Fetch vacancies
  const fetchVacancies = async () => {
    try {
      const res = await getAllVacancies();
      setVacancies(res.data);
    } catch (error) {
      console.error("Failed to load vacancies:", error.response || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVacancies();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("description.")) {
      const key = name.split(".")[1];
      setFormData({ ...formData, description: { ...formData.description, [key]: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert("You are not authorized!");

    try {
      if (editingId) {
        await updateVacancy(editingId, formData);
        alert("Vacancy Updated ✅");
      } else {
        await createVacancy(formData);
        alert("Vacancy Added ✅");
      }

      setFormData(emptyForm);
      setEditingId(null);
      fetchVacancies();
    } catch (error) {
      console.error("Error adding/updating vacancy:", error.response || error);
      alert("Operation failed ❌ Check console");
    }
  };

  const handleEdit = (vacancy) => {
    setFormData(vacancy);
    setEditingId(vacancy._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!token) return alert("You are not authorized!");
    if (!window.confirm("Are you sure?")) return;

    try {
      await deleteVacancy(id);
      setVacancies(vacancies.filter((v) => v._id !== id));
    } catch (error) {
      console.error("Delete Error:", error.response || error);
      alert("Delete failed ❌");
    }
  };

  const filteredVacancies = vacancies.filter(
    (v) =>
      v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (v.department && v.department.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) return <p className="text-center mt-10 text-lg">Loading vacancies...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Admin Form */}
      {role === "admin" && (
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-4">
            {editingId ? "Edit Vacancy" : "Add Vacancy"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="text"
              name="slug"
              placeholder="Slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded"
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="upcoming">Upcoming</option>
              <option value="active">Active</option>
            </select>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="date"
              name="lastDate"
              value={formData.lastDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="text"
              name="ageLimit"
              placeholder="Age Limit"
              value={formData.ageLimit}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="text"
              name="eligibility"
              placeholder="Eligibility"
              value={formData.eligibility}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="text"
              name="howToApply"
              placeholder="How to Apply"
              value={formData.howToApply}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="number"
              name="TotalPost"
              placeholder="Total Posts"
              value={formData.TotalPost}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="text"
              name="syllabusLink"
              placeholder="Syllabus Link"
              value={formData.syllabusLink}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="text"
              name="previousYearPaperLink"
              placeholder="Previous Year Paper Link"
              value={formData.previousYearPaperLink}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="text"
              name="TopperTalkLink"
              placeholder="Topper Talk Link"
              value={formData.TopperTalkLink}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="text"
              name="detailsLink"
              placeholder="Details Link"
              value={formData.detailsLink}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />

            {/* Description in Hindi & English */}
            <input
              type="text"
              name="description.hi"
              placeholder="Description (Hindi)"
              value={formData.description.hi}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="text"
              name="description.en"
              placeholder="Description (English)"
              value={formData.description.en}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded"
            >
              {editingId ? "Update Vacancy" : "Add Vacancy"}
            </button>
          </form>
        </div>
      )}

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border rounded"
        />
      </div>

      {/* Vacancies List */}
      <div className="flex flex-col gap-5">
        {filteredVacancies.length ? (
          filteredVacancies.map((v) => (
            <div
              key={v._id}
              className={`p-4 rounded shadow-md transition-colors duration-300 ${
                v.status === "active" ? "bg-green-100" : "bg-pink-100"
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{v.title}</h3>
                <span
                  className={`px-2 py-1 rounded text-white text-sm ${
                    v.status === "active" ? "bg-green-500" : "bg-pink-500"
                  }`}
                >
                  {v.status === "active" ? "Active" : "Upcoming"}
                </span>
              </div>
              <p>Department: {v.department}</p>
              <p>Start Date: {v.startDate}</p>
              <p>Last Date: {v.lastDate}</p>
              <p>Total Posts: {v.TotalPost}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {v.detailsLink && (
                  <a
                    href={v.detailsLink}
                    target="_blank"
                    rel="noreferrer"
                    className={`px-3 py-1 rounded text-white text-sm ${linkColors[0]}`}
                  >
                    Details
                  </a>
                )}
                {v.syllabusLink && (
                  <a
                    href={v.syllabusLink}
                    target="_blank"
                    rel="noreferrer"
                    className={`px-3 py-1 rounded text-white text-sm ${linkColors[1]}`}
                  >
                    Syllabus
                  </a>
                )}
                {v.previousYearPaperLink && (
                  <a
                    href={v.previousYearPaperLink}
                    target="_blank"
                    rel="noreferrer"
                    className={`px-3 py-1 rounded text-white text-sm ${linkColors[2]}`}
                  >
                    Previous Paper
                  </a>
                )}
                {v.TopperTalkLink && (
                  <a
                    href={v.TopperTalkLink}
                    target="_blank"
                    rel="noreferrer"
                    className={`px-3 py-1 rounded text-white text-sm ${linkColors[3]}`}
                  >
                    Topper Talk
                  </a>
                )}
              </div>

              {role === "admin" && (
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleEdit(v)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(v._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No vacancies found</p>
        )}
      </div>
    </div>
  );
};

export default Vacancies;
