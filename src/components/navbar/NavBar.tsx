import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { Activity, useContext } from "react";

function NavBar() {
    const navigate = useNavigate();

    const { handleLogout, usuario } = useContext(AuthContext);
    const usuarioEstaLogado: boolean = usuario.token !== undefined && usuario.token !== "";

    function logout() {
        handleLogout();
        alert("Usuário deslogado com sucesso!");
        navigate("/");
    }

    return (
        <>
            <nav className="w-full flex justify-center py-4 bg-indigo-900 text-white">
                <div className="container flex justify-between text-lg mx-8">
                    <Link to="/" className="text-2xl font-bold">Blog Pessoal</Link>

                    <div>
                        <ul className="flex gap-4">
                            <Activity mode={usuarioEstaLogado ? "visible" : "hidden"}>
                                <Link to='/postagens' className="cursor-pointer hover:underline">Postagens</Link>
                                <Link to='/temas' className="cursor-pointer hover:underline">Temas</Link>
                                <Link to='/cadastrar-tema' className="cursor-pointer hover:underline">Cadastrar Tema</Link>
                                <Link to='/perfil' className='hover:underline'>Perfil</Link>
                                <Link to=''><li className="cursor-pointer hover:underline" onClick={logout}>Sair</li></Link>
                            </Activity>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavBar;