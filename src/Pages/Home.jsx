import React from 'react';
import { Link } from 'react-router-dom';
import VideoNewsSection from './VideoNewsSection';
import WhatsNewSection from './WhatsNewSection';

const Home = () => {
  return (
    <div>
      {/* Marquee Section */}
      <div className="bg-gradient-to-r from-red-600 to-black text-white py-2 overflow-hidden group">
        <div className="whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
          <h1 className="hover:underline inline-block hover:text-green-500 font-bold whitespace-nowrap">
            नवीनतम अपडेट के लिए हमें फॉलो करें!
          </h1>

          <a
            href="https://www.youtube.com/@educationspaces"
            target="_blank"
            className="hover:underline inline-block hover:text-red-500 font-bold whitespace-nowrap px-1"
          >
            <i className="fa-brands fa-youtube"></i>
          </a>

          <a
            href="https://www.instagram.com/educationspaces/"
            target="_blank"
            className="hover:underline inline-block hover:text-pink-500 font-bold whitespace-nowrap px-1"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>

          <a
            href="https://www.facebook.com/sunildoraya1/"
            target="_blank"
            className="hover:underline inline-block hover:text-blue-500 font-bold whitespace-nowrap px-1"
          >
            <i className="fa-brands fa-facebook"></i>
          </a>

          <a
            href="https://x.com/SpacesEducation"
            target="_blank"
            className="hover:underline inline-block hover:text-white font-bold whitespace-nowrap px-1"
          >
            <i className="fa-brands fa-x-twitter"></i>
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-4 bg-gradient-to-r from-red-600 to-black h-auto md:h-screen flex items-center justify-center">
        <div className="max-w-6xl mx-auto py-10 flex flex-col lg:flex-row text-white gap-8">
          {/* Text */}
          <div className="flex-1 text-white p-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5">Education Spaces</h1>
            <p className="text-sm sm:text-base md:text-base leading-relaxed mb-2">
              जहाँ शिक्षा से जुड़ी हर सच्ची और जरूरी खबर आपको मिलती है बिना किसी दिखावे, बिना किसी भ्रम के। 🎓
            </p>
            <p className="text-sm sm:text-base md:text-base">
              भर्ती, परीक्षा और शिक्षा से जुड़ी हर जानकारी साफ़, सरल और सटीक रूप में पहुँचाना।
              यहाँ ना कोई शोर है, ना पक्षपात — बस सच्चाई, तैयारी और जागरूकता की बात।
            </p>
          </div>

          {/* What is New Section */}
          {/* <div className="flex-1 flex flex-col h-auto lg:h-80 p-0 text-white">
            <h1 className="text-white-400 bg-green-500 m-0 p-2">What is New</h1>
            <div className="overflow-hidden border-4 border-blue-500 flex-1">
              <ul className="animate-scroll-up space-y-3 overflow-hidden group-hover:[animation-play-state:paused] text-sm sm:text-base">
                <li>
                  <Link to="#" className="hover:text-green-500 hover:underline">
                    Exam Notification 1 Hurry up last date is coming up
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline hover:text-green-500">
                    Exam Notification 2
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline hover:text-green-500">
                    Exam Notification 3
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline hover:text-green-500">
                    Interview Schedule
                  </Link>
                </li>
              </ul>
            </div>
          </div> */}
          <WhatsNewSection />
          
        </div>
      </section>

      {/* Statistics Section */}
      <section className="flex flex-wrap justify-around items-center p-5 gap-5">
        {[
          { icon: 'video', title: '1000+', subtitle: 'Videos' },
          { icon: 'news', title: '1000+', subtitle: 'NewsArticle' },
          { icon: 'followers', title: '50K+', subtitle: 'Followers' },
          { icon: 'employment', title: '100+', subtitle: 'Employment News' },
        ].map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2 w-36">
            <button className="w-12.5 p-2 border-2 border-blue-600 bg-blue-300 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-blue-600"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4-4m0 0v11m-4-7h-9a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h9" />
              </svg>
            </button>
            <h3 className="font-bold text-3xl">{stat.title}</h3>
            <p className="text-gray-600">{stat.subtitle}</p>
          </div>
        ))}
      </section>

      <VideoNewsSection />

      
      
    </div>
  );
};

export default Home;
