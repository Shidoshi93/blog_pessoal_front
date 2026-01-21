import Home from './pages/home/Home.jsx'
import NavBar from './components/navbar/NavBar.jsx'
import Footer from './components/footer/Footer.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Cadastro from './pages/cadastro/Cadastro.jsx'
import Login from './pages/login/Login.js'
import { AuthProvider } from './contexts/AuthContext.js'
import ListaTema from './components/tema/ListaTema.js'
import FormTema from './components/tema/FormTema.js'
import DeletarTema from './components/tema/DeletarTema.js'

function App() {

  return (
    <div className='flex flex-col h-screen'>
      <AuthProvider>
        <BrowserRouter>
          <NavBar />
          <div className='flex-1 overflow-auto'>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/home" element={<Home />} />
              <Route path="/temas" element={<ListaTema />} />
              <Route path="/cadastrar-tema" element={<FormTema />} />
              <Route path="/editar-tema/:id" element={<FormTema />} />
              <Route path="/deletar-tema/:id" element={<DeletarTema />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
