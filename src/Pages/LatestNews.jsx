import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllNews, deleteNews } from "../api/newsApi";

const LatestNews = () => {
  const [newsData, setNewsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ search by title
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const isAdmin = role?.toLowerCase() === "admin";

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await getAllNews();
        setNewsData(res.data.data); // backend returns { success, data }
      } catch (error) {
        console.error("Failed to load news", error);
      }
    };

    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteNews(id);
      setNewsData(newsData.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  // ✅ Filter news based on title
  const filteredNews = newsData.filter((news) =>
    news.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Latest News</h2>

      {/* 🔥 Search & Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-64"
        />

        {isAdmin && (
          <button
            onClick={() => navigate("/add-news")}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add News
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredNews.length ? (
          filteredNews.map((news) => (
            <div
              key={news._id}
              className="border rounded shadow overflow-hidden"
            >
              {/* Clickable Area */}
              <div onClick={() => navigate(`/news/${news._id}`)}>
                <img
                  src={news.photo}
                  alt={news.title}
                  className="w-full h-48 object-cover cursor-pointer"
                />
                <div className="p-4 cursor-pointer">
                  <h3 className="font-semibold text-lg">{news.title}</h3>
                  <p className="text-gray-600 text-sm">{news.summary}</p>
                </div>
              </div>

              {/* 🔥 Admin Buttons */}
              {isAdmin && (
                <div className="flex justify-between p-3 border-t">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/edit-news/${news._id}`);
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(news._id);
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No news found
          </p>
        )}
      </div>
    </div>
  );
};

export default LatestNews;
