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
  title: "घर बैठे सरकारी नौकरी की तैयारी शुरू करें – आज ही ऑर्डर करें!",
  description: "ABC कोचिंग से प्राप्त करें सबसे अच्छी नोट्स और किताबें। अपनी तैयारी आज से शुरू करें और सफलता की ओर कदम बढ़ाएं।",
  imageUrl: sunil,
  link: "https://coachingwebsite.com"
};
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <DynamicPromo ad={adData} />
      <Header/>
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
      <Footer/>
    </>
  )
}

export default App
