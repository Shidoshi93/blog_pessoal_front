import { useState } from 'react'
import Home from './pages/home/Home.jsx'
import NavBar from './components/navbar/NavBar.jsx'
import Footer from './components/footer/Footer.jsx'

function App() {

  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      <Home />
      <Footer />
    </div>
  )
}

export default App
