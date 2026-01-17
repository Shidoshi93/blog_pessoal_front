import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../contexts/AuthContext";

function Login() {
    const navigate = useNavigate();
    const { usuario, handleLogin, isLoading } = useContext(AuthContext);
    const [usuarioLogin, setUsuarioLogin] = useState({
        email: "",
        password: "",
    });

    function login(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        handleLogin(usuarioLogin);
    }

    function atualizarEstado(e: React.ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value,
        });
    }

    useEffect(() => {
        if (usuario.token !== undefined && usuario.token !== "") {
            navigate("/home");
        }
    }, [usuario]);

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-full
            place-items-center font-bold">
                <form onSubmit={login} className="flex justify-center items-center flex-col w-1/2 gap-4">
                    <h2 className="text-slate-900 text-5xl">Entrar</h2>
                    <div className="flex flex-col w-full">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={usuarioLogin.email}
                            placeholder="Email"
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
                            value={usuarioLogin.password}
                            placeholder="Senha"
                            className="border-2 border-slate-700 rounded p-2"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-indigo-400 text-white py-2 rounded flex justify-center items-center
                            hover:bg-indigo-900 transition-colors w-1/2 cursor-pointer"
                    >
                        {isLoading ?
                            <ClipLoader
                                color="#ffffff"
                                size={24}
                            /> :
                            <span>Entrar</span>
                        }
                    </button>

                    <hr className="border-slate-800 w-full"></hr>

                    <p>
                        Ainda não tem uma conta?{' '}
                        <Link to="/cadastro" className="text-indigo-800 hover:underline">
                            Cadastre-se
                        </Link>
                    </p>
                </form>

                <div className="bg-[url('https://i.imgur.com/ZZFAmzo.jpg')] lg:block hidden
                    bg-no-repeat w-full min-h-full bg-cover bg-center">
                </div>
            </div>
        </>
    )
}

export default Login;
