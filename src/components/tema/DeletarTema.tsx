import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { buscar, deletar } from "../../service/Service";
import Tema from "../../models/tema/Tema";
import { ClipLoader, SyncLoader } from "react-spinners";

function DeletarTema() {
    const navigate = useNavigate();
    const [tema, setTema] = useState<Tema>({} as Tema);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { usuario, handleLogout } = useContext(AuthContext);
    const { id } = useParams<{ id: string }>();

    async function buscarPorId(id: string) {
        try {
            await buscar(`/theme/${id}`, setTema, usuario.token);
        } catch (error) {
            if (error instanceof Error && (error.message.includes("403") || error.message.includes("401"))) {
                alert("Sua sessão expirou, faça o login novamente.");
                handleLogout();
                return;
            }
            console.error("Erro ao buscar tema:", error);
            alert("Erro ao buscar tema. Por favor, tente novamente.");
        }
    }

    useEffect(() => {
        if (usuario.token === "" || usuario.token === undefined) {
            alert("Você precisa estar logado!");
            navigate("/");
        }
    }, [usuario.token]);

    useEffect(() => {
        if (id !== undefined) {
            setIsLoading(true);
            buscarPorId(id).finally(() => setIsLoading(false));
        }
    }, [id]);

    async function deletarTema() {
        setIsLoading(true);

        try {
            await deletar(`/theme/${id}`, usuario.token);
            alert("Tema deletado com sucesso!");
        } catch (error) {
            if (error instanceof Error && (error.message.includes("403") || error.message.includes("401"))) {
                alert("Sua sessão expirou, faça o login novamente.");
                handleLogout();
                return;
            }
            console.error("Erro ao deletar tema:", error);
            alert("Erro ao deletar tema. Por favor, tente novamente.");
        } finally {
            setIsLoading(false);
            navigate("/temas");
        }
    }

    return (
        <div className="flex justify-center items-center pt-12">
            {isLoading ? (
                <SyncLoader color="#312e81" size={24} />
            ) : tema.id !== undefined ?
                <div className="container w-1/3 mx-auto">
                    <h1 className="text-4xl text-center my-4">Deletar Tema</h1>
                    <p className="text-center font-semibold mb-4">
                        Tem certeza que deseja apagar o tema a seguir?
                    </p>

                    <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
                        <header className="py-2 px-6 bg-indigo-600 text-white font-bold text-2xl">
                            {tema.name}
                        </header>
                        <p className="p-8 text-3xl bg-slate-200 h-full">
                            {tema.description}
                        </p>
                        <div className="flex">
                            <button className="text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2" onClick={() => navigate("/temas")}>
                                Não
                            </button>
                            <button className="w-full text-slate-100 bg-indigo-400
                    hover:bg-indigo-600 flex justify-center items-center" onClick={deletarTema}>
                                {isLoading ?
                                    <ClipLoader color="#ffffff" size={24} /> :
                                    <span>Sim</span>
                                }
                            </button>
                        </div>
                    </div>
                </div>
            : (
                <div className="text-center text-white">
                    <p>Tema não encontrado</p>
                </div>
            )
            }
        </div>
    )
}

export default DeletarTema;