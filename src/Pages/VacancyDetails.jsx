import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVacancyBySlug } from "../api/vacancyApi";
import { Link } from "react-router-dom";

const VacancyDetails = () => {
  const { slug } = useParams();

  const [vacancy, setVacancy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVacancy = async () => {
      try {
        const res = await getVacancyBySlug(slug);
        setVacancy(res.data);
      } catch (err) {
        setError("Vacancy not found");
      } finally {
        setLoading(false);
      }
    };

    fetchVacancy();
  }, [slug]);

  if (loading)
    return <p className="text-center mt-10 text-lg font-medium">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500 mt-10 font-medium">{error}</p>;
  if (!vacancy) return null;

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
      <Link to="/vacancy" className="text-blue-600 font-bold">
              ← Back
            </Link>
      
      {/* Centered Heading */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8">
        {vacancy.title}
      </h1>

      {/* Card with List Style */}
      <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
        <ul className="space-y-3">
          <li className="flex justify-between border-b pb-2">
            <span className="font-semibold">Department:</span>
            <span>{vacancy.department}</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span className="font-semibold">Status:</span>
            <span>{vacancy.status}</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span className="font-semibold">Total Post:</span>
            <span>{vacancy.TotalPost}</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span className="font-semibold">फॉर्म भरने की शुरुआत:</span>
            <span>{vacancy.startDate}</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span className="font-semibold">फॉर्म भरने की अंतिम तिथि:</span>
            <span>{vacancy.lastDate}</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span className="font-semibold">आयु सीमा:</span>
            <span>{vacancy.ageLimit}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-semibold">योग्यता:</span>
            <span>{vacancy.eligibility}</span>
          </li>
        </ul>
      </div>

      {/* Description & Apply */}
      <div className="mt-8 space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-2">📌 विवरण (Hindi)</h2>
          <p className="text-gray-700">{vacancy.description?.hi}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-2">📝 आवेदन कैसे करें</h2>
          <a
            href={vacancy.howToApply}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition"
          >
            Apply Here
          </a>
        </div>
      </div>
    </div>
  );
};

export default VacancyDetails;
