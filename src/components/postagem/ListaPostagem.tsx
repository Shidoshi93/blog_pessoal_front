import { useNavigate } from "react-router-dom";
import CardPostagem from "./CardPostagem";
import { useContext, useEffect, useState } from "react";
import Postagem from "../../models/postagem/Postagem";
import { AuthContext } from "../../contexts/AuthContext";
import { buscar } from "../../service/Service";
import { SyncLoader } from "react-spinners";
import { ToastAlerta } from "../../utils/ToastAlerta";

function ListaPostagens() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [postagens, setPostagens] = useState<Postagem[]>([]);
    const { usuario, handleLogout } = useContext(AuthContext);

    useEffect(() => {
        if (usuario.token === "" || usuario.token === undefined) {
            navigate("/");
        }
    }, [usuario.token]);

    useEffect(() => {
        buscarPostagens();
    }, []);

    function handleSessaoExpirada() {
        ToastAlerta("Sua sessão expirou. Por favor, faça login novamente.", "info");
        handleLogout();
        navigate("/");
    }

    async function buscarPostagens() {
        if (!usuario.token) {
            handleSessaoExpirada();
            return;
        }

        try {
            setIsLoading(true)
            await buscar('/post', setPostagens, usuario.token)
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleSessaoExpirada();
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>{usuario.token &&
            <div className="flex justify-center w-full my-4 pt-6">
                <div className="container flex flex-col mx-2">
                    {isLoading && (
                        <div className="container flex justify-center items-center">
                            <SyncLoader
                                color="#312e81"
                                size={32}
                            />
                        </div>
                    )}
                    {(!isLoading && postagens.length === 0) && (
                        <span className="text-3xl text-center my-8">
                            Nenhuma Postagem foi encontrada!
                        </span>
                    )}
                    <div className='container mx-auto my-4 
                        grid grid-cols-1 md:grid-cols-2 
                        lg:grid-cols-3 gap-4'>
                        {postagens.map(postagem => (
                            <CardPostagem key={postagem.id} postagem={postagem} />
                        ))}
                    </div>
                </div>
            </div>
        }
        </>
    );
}

export default ListaPostagens;