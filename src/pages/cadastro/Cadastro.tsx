import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { cadastrarUsuario } from "../../service/Service";
import Usuario from "../../models/usuario/Usuario";

function Cadastro() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    username: "",
    email: "",
    photo: "",
    password: "",
  });

  function redirecionar() {
    alert("Usuario cadastrado com sucesso!");
    navigate("/login");
  }

  function handleCancelar() {
    setUsuario({
      id: 0,
      username: "",
      email: "",
      photo: "",
      password: "",
    });
    setConfirmarSenha("");
  }

  useEffect(() => {
    if (usuario.id !== 0) {
      redirecionar();
    }
  }, [usuario]);

  function atualizarEstado(e: React.ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  }

  function handleConfirmarSenha(e: React.ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value);
  }

  async function cadastrarNovoUsuario(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (confirmarSenha === usuario.password && usuario.password.length >= 8) {

      setIsLoading(true)

      try {
        await cadastrarUsuario(usuario, setUsuario)
      } catch (error) {
        alert('Erro ao cadastrar usuario')
      }
    } else {
      alert('As senhas não conferem.')
      setUsuario({ ...usuario, password: '' })
      setConfirmarSenha('')

    }
    setIsLoading(false)
  }

  return (
    <>
      <div
        className="grid grid-cols-1 lg:grid-cols-2 min-h-full
            place-items-center font-bold"
      >
        <div
          className="bg-[url('https://i.imgur.com/ZZFAmzo.jpg')] lg:block hidden bg-no-repeat
                    w-full min-h-full bg-cover bg-center"
        ></div>
        <form onSubmit={cadastrarNovoUsuario} className="flex justify-center items-center flex-col w-2/3 gap-3">
          <h2 className="text-slate-900 text-5xl">Cadastrar</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="username">Nome</label>
            <input
              type="text"
              id="username"
              name="username"
              value={usuario.username}
              placeholder="Nome"
              className="border-2 border-slate-700 rounded p-2"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={usuario.email}
              placeholder="Email"
              className="border-2 border-slate-700 rounded p-2"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="photo">Foto</label>
            <input
              type="text"
              id="photo"
              name="photo"
              value={usuario.photo}
              placeholder="Foto"
              className="border-2 border-slate-700 rounded p-2"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              value={usuario.password}
              placeholder="Senha"
              className="border-2 border-slate-700 rounded p-2"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              value={confirmarSenha}
              placeholder="Confirmar Senha"
              className="border-2 border-slate-700 rounded p-2"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}

            />
          </div>
          <div className="flex justify-around w-full gap-8">
            <button
              type='button'
              className='rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2
                cursor-pointer'
              onClick={handleCancelar}
            >
              Cancelar
            </button>
            <button
              type='submit'
              className='rounded text-white bg-indigo-400
                           hover:bg-indigo-900 w-1/2 py-2
                           flex justify-center cursor-pointer'
            >
              {isLoading ?
                <ClipLoader
                  color="#ffffff"
                  size={24}
                /> :
                <span>Cadastrar</span>
              }
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Cadastro;
