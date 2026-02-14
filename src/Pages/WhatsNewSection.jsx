import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getWhatsNew,
  deleteWhatsNew,
  createWhatsNew,
  updateWhatsNew,
} from "../api/whatsNewApi";
import "../index.css";

const TWO_DAYS = 2 * 24 * 60 * 60 * 1000;

const WhatsNewSection = () => {
  const [items, setItems] = useState([]);
  const [paused, setPaused] = useState(false);

  // 🔥 ADMIN
  const role = localStorage.getItem("role");
  const isAdmin = role === "ADMIN";

  // 🔥 MODAL + FORM STATE
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await getWhatsNew();
    setItems(res.data);
  };

  const isNew = (createdAt) => {
    return Date.now() - new Date(createdAt).getTime() <= TWO_DAYS;
  };

  // ✅ CREATE / UPDATE
  const handleSubmit = async () => {
    try {
      if (editingItem) {
        await updateWhatsNew(editingItem._id, { title, link });
      } else {
        await createWhatsNew({ title, link });
      }

      setShowModal(false);
      setEditingItem(null);
      setTitle("");
      setLink("");
      fetchItems();
    } catch (err) {
      alert("Unauthorized or error");
    }
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    await deleteWhatsNew(id);
    setItems(items.filter((i) => i._id !== id));
  };

  // ✅ EDIT
  const openEdit = (item) => {
    setEditingItem(item);
    setTitle(item.title);
    setLink(item.link);
    setShowModal(true);
  };

  return (
    <div className="flex-1 flex flex-col h-auto lg:h-80 p-0 text-white">
      {/* HEADER */}
      <div className="bg-green-500 p-2 font-bold flex justify-between">
        <span>What is New</span>

        {isAdmin && (
          <button
            onClick={() => setShowModal(true)}
            className="bg-black px-3 py-1 rounded text-sm"
          >
            + Add
          </button>
        )}
      </div>

      {/* LIST */}
      <div
        className="overflow-hidden border-4 border-blue-500 flex-1"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <ul className={`space-y-3 animate-scroll-up ${paused ? "paused" : ""}`}>
          {items.map((item) => (
            <li key={item._id} className="flex justify-between">
              <div className="flex gap-2 items-center">
                {item.link.startsWith("http") ? (
                  <a href={item.link} target="_blank" rel="noreferrer">
                    {item.title}
                  </a>
                ) : (
                  <Link to={item.link}>{item.title}</Link>
                )}

                {isNew(item.createdAt) && (
                  <span className="bg-red-600 text-xs px-2 rounded">NEW</span>
                )}
              </div>

              {isAdmin && (
                <div className="flex gap-2 text-sm">
                  <button
                    onClick={() => openEdit(item)}
                    className="text-yellow-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* 🔥 MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-white text-black p-4 rounded w-80">
            <h2 className="font-bold mb-2">
              {editingItem ? "Edit Item" : "Add Item"}
            </h2>

            <input
              className="border w-full p-1 mb-2"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              className="border w-full p-1 mb-2"
              placeholder="Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
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
    </div>
  );
};

export default WhatsNewSection;
