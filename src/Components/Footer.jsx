import React from 'react'
import {Link} from "react-router-dom"

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-900 text-gray-300 ">
  
  
  <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

    <div>
      <h2 className="text-white text-lg font-bold mb-3">Education Spaces</h2>
      <p className="text-sm leading-relaxed relative">
        Latest education news, government jobs updates,
        exams notifications and learning resources.
      </p>
      
    </div>

    
    <div>
      <h2 className="text-white text-lg font-bold mb-3">Quick Links</h2>
      <ul className="space-y-2 text-sm">
        <li><Link to="/" className="hover:text-white">Home</Link></li>
        <li><Link to="/latestNews" className="hover:text-white">Latest News</Link></li>
        <li><Link to="/result" className="hover:text-white">Results</Link></li>
        <li><Link to="/vacancy" className="hover:text-white">Vacancy</Link></li>
        <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
      </ul>
    </div>

    
    <div>
      <h2 className="text-white text-lg font-bold mb-3">Follow Us</h2>

      <div className="flex gap-4 text-xl">
        <a href="https://www.youtube.com/@educationspaces"  target="_blank" className="hover:text-red-500">
          <i className="fa-brands fa-youtube"></i>
        </a>
        <a href="https://www.instagram.com/educationspaces/" target="_blank" className="hover:text-pink-500">
          <i className="fa-brands fa-instagram"></i>
        </a>
        <a href="https://www.facebook.com/sunildoraya1/" target="_blank" className="hover:text-blue-500">
          <i className="fa-brands fa-facebook"></i>
        </a>
        <a href="https://x.com/SpacesEducation" className="hover:text-white" target="_blank">
          <i className="fa-brands fa-x-twitter"></i>
        </a>
        <a href="mailto:Spacesmedia@gmail.com" className="hover:text-white">
  <i className="fa-solid fa-envelope"></i>
</a>
<a href="tel:+917610001234" className="hover:text-white">
  <i className="fa-solid fa-phone"></i>
</a>
<a 
  href="https://wa.me/+917610001234" 
  target="_blank" 
  className="hover:text-white"
>
  <i className="fa-brands fa-whatsapp"></i>
</a>
      </div>
    </div>

  </div>

  
  <div className="border-t border-gray-700 text-center text-sm py-4">
    © 2026 <span className="text-white font-semibold">Education Spaces</span>.
    All rights reserved.
  </div>

</footer>

    </div>
  )
}

export default Footer
