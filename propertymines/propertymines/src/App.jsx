import React from 'react'
import Home from './pages/Home'
import About from './pages/About'
import Properties from './pages/Properties'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Projects from './pages/Projects'
import Navbar from './components/Navbar'
import { Routes, BrowserRouter, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="pt-16 md:pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/properties" element={<Properties />} />
          {/* <Route path="/projects" element={<Projects />} /> */}
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
