import { useState } from 'react'
import Home from './pages/home/Home.jsx'
import NavBar from './components/navbar/NavBar.jsx'
import Footer from './components/footer/Footer.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <div className='flex flex-col h-screen'>
      <BrowserRouter>
        <NavBar />
        <div className='flex-1 overflow-auto'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
