import { useState, useEffect } from "react";

export default function DynamicPromo({ ad }) {
  const [show, setShow] = useState(true); // testing ke liye hamesha show

  const handleClose = () => setShow(false);

  if (!show || !ad) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl md:max-w-3xl lg:max-w-4xl p-6 md:p-10">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-red-600 text-3xl font-bold hover:text-red-800"
        >
          ✕
        </button>

        {/* Content Flex */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          
          {/* Ad Image */}
          {ad.imageUrl && (
            <img
              src={ad.imageUrl}
              alt={ad.title}
              className="w-full md:w-1/2 h-64 md:h-72 object-cover  rounded-2xl"
            />
          )}

          {/* Text Content */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{ad.title}</h2>
            <p className="text-gray-700 mb-6 text-lg md:text-xl">{ad.description}</p>

            {ad.link && (
              <a
                href={ad.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition text-lg md:text-xl"
              >
                Learn More
              </a>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
