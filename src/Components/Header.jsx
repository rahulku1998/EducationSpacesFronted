import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { flag, logo, arrow } from "../assets/index.jsx";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token"); // check if logged in

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    alert("Logged out successfully ✅");
    navigate("/login"); // redirect to login page
  };

  return (
    <nav className="bg-gradient-to-r from-red-600 to-black sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center cursor-pointer border-2 border-transparent hover:border-blue-500 rounded-full"
        >
          <img src={logo} alt="logo" className="h-10 w-10 sm:h-12 sm:w-12 rounded-full" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-4">
          {[{ name: "Home", link: "/" },
            { name: "Latest News", link: "/latestNews" },
            { name: "Result", link: "/result" },
            { name: "Vacancy", link: "/vacancy" },
            { name: "Contact", link: "/contact" }].map((item, idx) => (
            <li key={idx} className="text-white py-3 hover:text-blue-400 cursor-pointer transition-all duration-200 relative group">
              <Link to={item.link}>{item.name}</Link>
              <div className="absolute bottom-0 w-full h-1 bg-blue-400 hidden group-hover:block transition-all duration-200"></div>
            </li>
          ))}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden md:flex space-x-4 items-center">
          <img src={flag} alt="india-flag" className="h-6 w-auto" />

          {token ? (
            <button
              onClick={handleLogout}
              className="text-white px-4 py-2 rounded border border-red-500 font-bold text-sm hover:bg-red-500 hover:text-white transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-white px-4 py-2 rounded border-blue-400 border font-bold text-sm"
            >
              Log in
            </Link>
          )}

          {!token && (
            <Link
              to="/register"
              className="text-blue-350 hover:text-blue-700 bg-green-200 px-4 py-2 rounded border-blue-700 border transition-all duration-200 font-bold text-sm flex items-center gap-1"
            >
              Sign up
              <img src={arrow} className="h-4 w-auto" alt="arrow" />
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gradient-to-r from-red-600 to-black px-2 pt-2 pb-4 space-y-1">
          {[{ name: "Home", link: "/" },
            { name: "Latest News", link: "/latestNews" },
            { name: "Result", link: "/result" },
            { name: "Vacancy", link: "/vacancy" },
            { name: "Contact", link: "/contact" }].map((item, idx) => (
            <Link
              key={idx}
              to={item.link}
              onClick={() => setMenuOpen(false)}
              className="block text-white py-2 px-3 rounded hover:bg-blue-500 hover:text-white transition-all duration-200"
            >
              {item.name}
            </Link>
          ))}

          <div className="flex items-center space-x-2 mt-2">
            <img src={flag} alt="india-flag" className="h-6 w-auto" />

            {token ? (
              <button
                onClick={() => { handleLogout(); setMenuOpen(false); }}
                className="text-white px-4 py-2 rounded border border-red-500 font-bold text-sm hover:bg-red-500 hover:text-white transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white px-4 py-2 rounded border-blue-400 border font-bold text-sm"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="text-blue-350 hover:text-blue-700 bg-green-200 px-4 py-2 rounded border-blue-700 border transition-all duration-200 font-bold text-sm flex items-center gap-1"
                >
                  Sign up
                  <img src={arrow} className="h-4 w-auto" alt="arrow" />
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
