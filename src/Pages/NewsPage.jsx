import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getNewsById, deleteNews } from "../api/newsApi";

const NewsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const role = localStorage.getItem("role");
  const isAdmin = role?.toLowerCase() === "admin";

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await getNewsById(id);
        setNews(res.data.data);
      } catch (error) {
        console.error("News not found", error);
      }
    };

    fetchNews();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteNews(id);
      navigate("/latestNews");
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleLike = () => {
    if (liked) setLikeCount(likeCount - 1);
    else setLikeCount(likeCount + 1);
    setLiked(!liked);
  };

  const handleShare = async () => {
  const shareUrl = `https://educationspaces.in/news/${news._id}`;

  try {
    if (navigator.share) {
      await navigator.share({
        title: news.title,
        text: news.summary,
        url: shareUrl,
      });
    } else {
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    }
  } catch (error) {
    console.error("Share failed:", error);
  }
};

  if (!news) return <p className="p-6">Loading...</p>;

  // Function to convert YouTube/Instagram URL to embed URL if needed
  const getEmbedUrl = (url) => {
  if (!url) return null;

  // YouTube embed
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    let videoId = null;

    if (url.includes("youtu.be")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else if (url.includes("v=")) {
      videoId = url.split("v=")[1]?.split("&")[0];
    }

    if (videoId) return `https://www.youtube.com/embed/${videoId}`;
  }

  // Instagram/TikTok fallback
  return url;
};


  const videoEmbedUrl = getEmbedUrl(news.video);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link to="/latestNews" className="text-blue-600">
        ← Back
      </Link>

      <h1 className="text-3xl font-bold my-4">{news.title}</h1>

      {isAdmin && (
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => navigate(`/edit-news/${news._id}`)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      )}

      <img
        src={news.photo}
        alt={news.title}
        className="w-full h-80 object-cover mb-6 rounded-lg"
      />

      <p className="font-semibold mb-4">{news.summary}</p>

      <div className="space-y-4 mb-8">
        {news.fullContent.split("\n\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      
      

      {/* Video Section */}
      {news.video && (
  <div className="mb-6">
    <h3 className="text-xl font-semibold mb-2">Video</h3>

    {(() => {
      // YouTube embed
      if (videoEmbedUrl?.includes("youtube.com/embed")) {
        return (
          <iframe
            width="100%"
            height="400"
            src={videoEmbedUrl}
            title="News Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          />
        );
      }

      // Instagram/TikTok or fallback
      return (
        <a
          href={news.video}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Watch Video
        </a>
      );
    })()}

  </div>
)}
      {/* ❤️ Like & 🔗 Share Section */}
     <div className="flex items-center gap-6 border-t pt-4 mb-6">
        <button
          onClick={handleLike}
          className={`px-5 py-2 rounded-full transition ${
            liked
              ? "bg-red-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          ❤️ Like ({likeCount})
        </button>

        <button
          onClick={handleShare}
          className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
        >
          🔗 Share
        </button>
      </div>

    </div>
  );
};

export default NewsPage;
