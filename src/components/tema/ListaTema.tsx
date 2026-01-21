import { useNavigate } from "react-router-dom";
import CardTema from "./CardTema";
import { useContext, useEffect, useState, useRef } from "react";
import Tema from "../../models/tema/Tema";
import { AuthContext } from "../../contexts/AuthContext";
import { buscar } from "../../service/Service";
import { SyncLoader } from "react-spinners";

function ListaTema() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [temas, setTemas] = useState<Tema[]>([]);
    const { usuario } = useContext(AuthContext);
    const hasRun = useRef(false);

    async function getTemas() {
        try {
            setIsLoading(true);
            await buscar("/theme", setTemas, usuario.token);
        } catch (error) {
            console.error("Erro ao buscar temas:", error);
            alert("Erro ao buscar temas. Por favor, tente novamente.");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        // refatorar aqui depois de implementar cookies ou localStorage
        if (hasRun.current) return;

        hasRun.current = true;

        if (!usuario.token) {
            alert("Você precisa estar logado!");
            navigate("/");
            return;
        }

        getTemas();
    }, [usuario.token]);

    return (
        <>
            {isLoading && (
                <div className="flex justify-center w-full my-8 py-6">
                    <SyncLoader
                        color="#312e81"
                        size={32}
                    />
                </div>
            )}

            <div className="flex justify-center w-full my-4 py-6">
                <div className="container flex flex-col">

                    {(!isLoading && temas.length === 0) && (
                        <span className="text-3xl text-center my-8">
                            Nenhum Tema foi encontrado!
                        </span>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2
                    lg:grid-cols-3 gap-8">
                        {temas.map((tema) => (
                            <CardTema key={tema.id} tema={tema} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListaTema;