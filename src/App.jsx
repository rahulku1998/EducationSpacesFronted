import { useState,useEffect } from 'react'
import './App.css'
import Header from './Components/Header.jsx'
import Footer from './Components/Footer.jsx'
import { BrowserRouter } from 'react-router-dom'
import {Routes, Route} from "react-router-dom"
import Home from './Pages/Home.jsx'
import LatestNews from './Pages/LatestNews.jsx'
import Result from './Pages/Result.jsx'
import Vacancy from './Pages/Vacancy.jsx'
import Contact from './Pages/ContactUs.jsx'
import Login from './Pages/Login.jsx'
import NewsPage from './Pages/NewsPage.jsx'
import Register from  './Pages/Register.jsx'
import VacancyDetails from './Pages/VacancyDetails.jsx' 
import DynamicPromo from './Components/DynamicPromo.jsx'
import AddNews from './Pages/AddNews.jsx'
import EditNews from './Pages/EditNews.jsx'

import { sunil } from "./assets/index.jsx";

const adData = {
  title: "Education Spaces – जानकारी में आगे, हर कदम पर।।",
  description: "आज ही हमारे चैनल से जुड़ें! 📢Education Spaces शिक्षा जगत की ताज़ा और ब्रेकिंग खबरे सबसे पहले पहुंचाता है। हमें फॉलो करें और हर अपडेट से आगे रहें!",
  imageUrl: sunil,
  link: "https://www.youtube.com/@educationspaces"
};
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <DynamicPromo ad={adData} />
      <Header/>
      <div className="pb-16 md:pb-0">
                <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/latestNews' element={<LatestNews/>}/>
        <Route path='/result' element={<Result/>}/>
        <Route path='/vacancy' element={<Vacancy/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/news/:id" element={<NewsPage />}/>
        <Route path='/register' element={<Register/>}/>
        <Route path="/add-news" element={<AddNews />} />
        <Route path="/edit-news/:id" element={<EditNews />} />
        <Route path='/vacancy/:slug' element={<VacancyDetails/>}/>
      </Routes>
        </div>
      <Footer className="pb-16 md:pb-0"/>
    </>
  )
}

export default App
