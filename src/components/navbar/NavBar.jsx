import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
        <nav className="w-full flex justify-center py-4 bg-indigo-900 text-white">
            <div className="container flex justify-between text-lg mx-8">
                <Link to="/" className="text-2xl font-bold">Blog Pessoal</Link>

                <div>
                    <ul className="flex gap-4">
                        <li className="cursor-pointer hover:underline">Postagens</li>
                        <li className="cursor-pointer hover:underline">Temas</li>
                        <li className="cursor-pointer hover:underline">Cadastrar Tema</li>
                        <li className="cursor-pointer hover:underline">Perfil</li>
                        <li className="cursor-pointer hover:underline">Sair</li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
  );
}

export default NavBar;