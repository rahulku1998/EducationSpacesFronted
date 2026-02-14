import { useState } from "react";
import { createNews } from "../api/newsApi";

const AddNews = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [fullContent, setFullContent] = useState("");
  const [photo, setPhoto] = useState("");
  const[video,setVideo]=useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createNews({
        title,
        summary,
        fullContent,
        photo,
        video
      });

      alert("News Added Successfully ✅");

      setTitle("");
      setSummary("");
      setFullContent("");
      setPhoto("");
      setVideo("");
    } catch (error) {
      alert("Error adding news ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Add News
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              placeholder="Enter news title"
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          {/* Summary */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Summary
            </label>
            <input
              type="text"
              value={summary}
              placeholder="Enter short summary"
              onChange={(e) => setSummary(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          {/* Full Content */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Full Content
            </label>
           <textarea
  value={fullContent}
  placeholder="Write full news article here..."
  onChange={(e) => setFullContent(e.target.value)}
  required
  className="w-full h-64 px-4 py-3 border border-gray-300 
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
              value={photo}
              placeholder="Paste image URL"
              onChange={(e) => setPhoto(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Video URL
            </label>
            <input
              type="text"
              value={video}
              placeholder="Paste video URL"
              onChange={(e) => setVideo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-300 shadow-md"
          >
            Add News
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNews;
