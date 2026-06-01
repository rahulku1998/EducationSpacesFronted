import React, { useState } from "react";
import { submitContact } from "../api/contactApi";
import { sunil } from "../assets/index.jsx";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    news: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await submitContact(formData);
      alert("Your news has been submitted successfully!");
      setFormData({ name: "", email: "", phone: "", news: "" });
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">

      {/* MESSAGE FROM DIRECTOR */}
      <section className="bg-white shadow-lg rounded-xl p-6 sm:p-8 mb-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 text-center md:text-left">
          Message from Director Kunal Bhatnagar
        </h2>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src={sunil}
            alt="Director"
            className="w-40 h-40 sm:w-48 sm:h-48 rounded-full object-cover border"
          />

          <p className="text-gray-600 text-base sm:text-lg leading-relaxed text-center md:text-left">
            "हमारे प्लेटफ़ॉर्म में आपका स्वागत है! हम मानते हैं कि खबरें पारदर्शी,
            सच्ची और असरदार होनी चाहिए। आपकी राय हमारे लिए बहुत मायने रखती है।"
          </p>
        </div>
      </section>

      {/* FORM */}
      <section className="bg-white shadow-lg rounded-xl p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 text-center">
          Send Us News / Your Questions
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border p-3 sm:p-4 rounded-md text-sm sm:text-base"
          />

          <input
            type="email"
            name="email"
            placeholder="Email ID"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border p-3 sm:p-4 rounded-md text-sm sm:text-base"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border p-3 sm:p-4 rounded-md text-sm sm:text-base"
          />

          <textarea
            name="news"
            placeholder="Write your news or content here..."
            value={formData.news}
            onChange={handleChange}
            rows="7"
            required
            className="w-full border p-3 sm:p-4 rounded-md text-sm sm:text-base"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-md hover:bg-blue-700 transition text-sm sm:text-base"
          >
            {loading ? "Submitting..." : "Submit News"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default ContactUs;
