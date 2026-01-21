import { Link } from "react-router-dom";
import Tema from "../../models/tema/Tema";

interface CardTemaProps {
    tema: Tema;
}

function CardTema({ tema }: CardTemaProps) {
    return (
        <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
            <header className="py-2 px-6 bg-indigo-800 text-white font-bold text-2xl">
                {tema.name}
            </header>
            <p className="p-8 text-3xl bg-slate-200 h-full">
                {tema.description}
            </p>

            <div className="flex">
                <Link 
                    to={`/editar-tema/${tema.id}`} 
                    className="w-full text-slate-100 bg-indigo-400 hover:bg-indigo-800
                    flex justify-center items-center py-2">
                    <button>
                        Editar
                    </button>
                </Link>

                <Link 
                    to={`/deletar-tema/${tema.id}`} 
                    className="w-full text-slate-100 bg-indigo-400 hover:bg-red-700
                    flex justify-center items-center">
                    <button>
                        Deletar
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default CardTema;