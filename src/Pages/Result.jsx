import React, { useEffect, useState } from "react";
import { getAllResults, createResult, updateResult, deleteResult } from "../api/resultApi";

// Some bright colors for link buttons
const linkColors = ["bg-blue-500", "bg-purple-500", "bg-green-500", "bg-pink-500", "bg-yellow-500", "bg-indigo-500"];

const Results = () => {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const role = localStorage.getItem("role")?.toLowerCase();
  const token = localStorage.getItem("token");
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    vacancyTitle: "",
    department: "",
    resultDate: "",
    status: "upcoming",
    links: [{ title: "", url: "" }],
  };
  const [formData, setFormData] = useState(emptyForm);

  // Fetch results
  const fetchResults = async () => {
    try {
      const res = await getAllResults();
      setResults(res.data);
    } catch (error) {
      console.error("Failed to load results:", error.response || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLinkChange = (i, field, value) => {
    const links = [...formData.links];
    links[i][field] = value;
    setFormData({ ...formData, links });
  };

  const addLink = () =>
    setFormData({ ...formData, links: [...formData.links, { title: "", url: "" }] });

  const removeLink = (i) =>
    setFormData({ ...formData, links: formData.links.filter((_, idx) => idx !== i) });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert("You are not authorized!");

    try {
      // Remove empty links to avoid backend 500
      const filteredLinks = formData.links.filter(link => link.title && link.url);
      const payload = { ...formData, links: filteredLinks };

      if (editingId) {
        await updateResult(editingId, payload);
        alert("Result Updated ✅");
      } else {
        await createResult(payload);
        alert("Result Added ✅");
      }

      setFormData(emptyForm);
      setEditingId(null);
      fetchResults();
    } catch (error) {
      console.error("Error adding/updating result:", error.response || error);
      alert("Operation failed ❌ Check console");
    }
  };

  const handleEdit = (res) => {
    setFormData(res);
    setEditingId(res._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!token) return alert("You are not authorized!");
    if (!window.confirm("Are you sure?")) return;

    try {
      await deleteResult(id);
      setResults(results.filter((r) => r._id !== id));
    } catch (error) {
      console.error("Delete Error:", error.response || error);
      alert("Delete failed ❌");
    }
  };

  const filteredResults = results.filter(
    (r) =>
      r.vacancyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="text-center mt-10 text-lg">Loading results...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Admin Form */}
      {role === "admin" && (
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-4">
            {editingId ? "Edit Result" : "Add Result"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="vacancyTitle"
              placeholder="Vacancy Title"
              value={formData.vacancyTitle}
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
              required
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="date"
              name="resultDate"
              value={formData.resultDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="upcoming">Upcoming</option>
              <option value="declared">Declared</option>
            </select>

            {formData.links.map((link, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Link Title"
                  value={link.title}
                  onChange={(e) => handleLinkChange(i, "title", e.target.value)}
                  className="flex-1 px-3 py-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Link URL"
                  value={link.url}
                  onChange={(e) => handleLinkChange(i, "url", e.target.value)}
                  className="flex-1 px-3 py-2 border rounded"
                />
                <button
                  type="button"
                  onClick={() => removeLink(i)}
                  className="bg-red-500 text-white px-3 rounded"
                >
                  X
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addLink}
              className="bg-gray-800 text-white px-4 py-2 rounded"
            >
              + Add Link
            </button>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded"
            >
              {editingId ? "Update Result" : "Add Result"}
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

      {/* Results List */}
      <div className="flex flex-col gap-5">
        {filteredResults.length ? (
          filteredResults.map((res) => (
            <div
              key={res._id}
              className={`p-4 rounded shadow-md transition-colors duration-300 ${
                res.status === "declared" ? "bg-green-100" : "bg-pink-100"
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{res.vacancyTitle}</h3>
                <span
                  className={`px-2 py-1 rounded text-white text-sm ${
                    res.status === "declared" ? "bg-green-500" : "bg-pink-500"
                  }`}
                >
                  {res.status === "declared" ? "Declared" : "Upcoming"}
                </span>
              </div>
              <p>Department: {res.department}</p>
              <p>Result Date: {res.resultDate}</p>

              {res.links?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {res.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`px-3 py-1 rounded text-white text-sm ${
                        linkColors[i % linkColors.length]
                      }`}
                    >
                      {link.title}
                    </a>
                  ))}
                </div>
              )}

              {role === "admin" && (
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleEdit(res)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(res._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No results found</p>
        )}
      </div>
    </div>
  );
};

export default Results;
