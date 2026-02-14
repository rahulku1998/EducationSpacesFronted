import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNewsById, updateNews } from "../api/newsApi";

const EditNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    fullContent: "",
    photo: "",
    video: "", // added video field
  });

  useEffect(() => {
    const fetchNews = async () => {
      const res = await getNewsById(id);
      setFormData(res.data);
    };
    fetchNews();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateNews(id, formData);
    alert("News Updated Successfully ✅");
    navigate("/latestNews");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Edit News
        </h2>

        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>

        {/* Summary */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Summary
          </label>
          <input
            type="text"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>

        {/* Full Content */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Full Content
          </label>
          <textarea
            name="fullContent"
            value={formData.fullContent}
            onChange={handleChange}
            className="w-full min-h-[300px] px-4 py-3 border border-gray-300 
                       rounded-lg focus:ring-2 focus:ring-blue-500 
                       focus:outline-none transition resize-y"
          />
        </div>

        {/* Photo URL */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Photo URL
          </label>
          <input
            type="text"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>

        {/* Video URL */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Video URL
          </label>
          <input
            type="text"
            name="video"
            value={formData.video}
            onChange={handleChange}
            placeholder="Paste YouTube, Instagram, etc. link"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>

        {/* Display current video link */}
        {formData.video && (
          <div className="mt-2 text-blue-600 underline">
            Current Video: <a href={formData.video} target="_blank">{formData.video}</a>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg 
                     font-semibold text-lg hover:bg-blue-700 
                     transition duration-300 shadow-md"
        >
          Update News
        </button>
      </form>
    </div>
  );
};

export default EditNews;
