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
        {/* <div className="md:hidden flex items-center">
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
        </div> */}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-black text-white flex justify-between items-center px-4 py-2 border-t border-gray-600 z-50">

  {/* LEFT: Tabs */}
  <div className="flex gap-4 text-sm">
    <Link to="/">Home</Link>
    <Link to="/latestNews">News</Link>
    <Link to="/result">Result</Link>
    <Link to="/vacancy">Jobs</Link>
    <Link to="/contact">Contact</Link>
  </div>

  {/* RIGHT: Auth Button */}
  <div className="relative">
    <button
      onClick={() => setMenuOpen(!menuOpen)}
      className="border-l border-gray-500 pl-3"
    >
      {token ? "Account" : "Login"}
    </button>

    {/* DROPDOWN */}
    {menuOpen && (
      <div className="absolute right-0 bottom-full mb-2 bg-white text-black rounded shadow-md p-2 flex flex-col gap-2 min-w-[120px]">
        {token ? (
          <button onClick={()=>{handleLogout(); setMenuOpen(false);}} className="text-red-500">Logout</button>
        ) : (
          <>
            <Link to="/login" onClick={()=>setMenuOpen(false)}>Login</Link>
            <Link to="/register" onClick={()=>setMenuOpen(false)}>Register</Link>
          </>
        )}
      </div>
    )}
  </div>
</div>
    </nav>
  );
};

export default Header;
