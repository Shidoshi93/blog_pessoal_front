import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Usuario from "../../models/usuario/Usuario";
import { login } from "../../service/Service";
import { ClipLoader } from "react-spinners";

function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [usuario, setUsuario] = useState<Usuario>({
        id: 0,
        username: "",
        email: "",
        photo: "",
        password: "",
    });

    function redirecionar() {
        alert("Usuario logado com sucesso, redirecionando para posts!");
    }

    useEffect(() => {
        if (usuario.id !== 0) {
            redirecionar();
        }
    }, [usuario]);

    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        try {
            await login(usuario, setUsuario);
        } catch (error) {
            alert("Erro ao logar usuário");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-full
            place-items-center font-bold">
                <form onSubmit={handleLogin} className="flex justify-center items-center flex-col w-1/2 gap-4">
                    <h2 className="text-slate-900 text-5xl">Entrar</h2>
                    <div className="flex flex-col w-full">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={usuario.email}
                            placeholder="Email"
                            className="border-2 border-slate-700 rounded p-2"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsuario({ ...usuario, email: e.target.value })}
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
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsuario({ ...usuario, password: e.target.value })}
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
