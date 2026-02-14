import { useEffect, useState } from "react";
import {
  getVideos,
  deleteVideo,
  createVideo,
  updateVideo,
} from "../api/videoApi";

const VideoNewsSection = () => {
  const [videos, setVideos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);

  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // search by title

  const role = localStorage.getItem("role");
  const isAdmin = role?.toLowerCase() === "admin";

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await getVideos();
      setVideos(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Extract YouTube ID from URL
  const extractYouTubeId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // CREATE / UPDATE
  const handleSubmit = async () => {
    try {
      if (!title || !videoUrl) {
        alert("All fields required");
        return;
      }

      const payload = { title, videoUrl };

      if (editingVideo) {
        await updateVideo(editingVideo._id, payload);
      } else {
        await createVideo(payload);
      }

      setShowModal(false);
      setEditingVideo(null);
      setTitle("");
      setVideoUrl("");
      fetchVideos();
    } catch (err) {
      alert("Unauthorized or Error");
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this video?")) return;
    await deleteVideo(id);
    fetchVideos();
  };

  // EDIT
  const openEdit = (video) => {
    setEditingVideo(video);
    setTitle(video.title);
    setVideoUrl(video.videoUrl);
    setShowModal(true);
  };

  // Filter videos based on title only
  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="bg-pink-100 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-5 gap-2">
          <h1 className="font-extrabold text-3xl text-green-500">
            Latest Video News
          </h1>

          <div className="flex gap-2 flex-wrap">
            <input
              placeholder="Search by Title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border px-2 py-1 rounded"
            />
            {isAdmin && (
              <button
                onClick={() => setShowModal(true)}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                + Add Video
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {filteredVideos.length ? (
            filteredVideos.map((video) => {
              const youtubeId = extractYouTubeId(video.videoUrl);

              return (
                <div
                  key={video._id}
                  className="w-full sm:w-80 border-2 border-blue-500 p-2"
                >
                  {youtubeId ? (
                    <iframe
                      className="w-full h-56"
                      src={`https://www.youtube.com/embed/${youtubeId}`}
                      title={video.title}
                      allowFullScreen
                    />
                  ) : (
                    <p className="text-red-500">Invalid YouTube Link</p>
                  )}

                  <a
                    href={video.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block mt-2 text-center font-semibold"
                  >
                    {video.title}
                  </a>

                  {isAdmin && (
                    <div className="flex justify-between mt-3">
                      <button
                        onClick={() => openEdit(video)}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(video._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500">No videos found</p>
          )}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-white text-black p-4 rounded w-80">
            <h2 className="font-bold mb-2">
              {editingVideo ? "Edit Video" : "Add Video"}
            </h2>

            <input
              className="border w-full p-1 mb-2"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              className="border w-full p-1 mb-2"
              placeholder="Paste Full YouTube Link"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button
                onClick={handleSubmit}
                className="bg-green-500 px-3 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoNewsSection;
