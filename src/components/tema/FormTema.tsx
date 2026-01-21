import { useNavigate, useParams } from "react-router-dom";
import Tema from "../../models/tema/Tema";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../service/Service";
import { ClipLoader } from "react-spinners";

function FormTema() {
    const navigate = useNavigate();
    const [tema, setTema] = useState<Tema>({} as Tema);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { usuario, handleLogout } = useContext(AuthContext);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (usuario.token === "" || usuario.token === undefined) {
            alert("Você precisa estar logado!");
            navigate("/");
        }
    }, [usuario.token]);

    useEffect(() => {
        if (id !== undefined) {
            buscaPorId(id);
        }
    }, [id]);

    function atulizarEstadoTema(e: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [e.target.name]: e.target.value,
        });
    }

    function retornar() {
        navigate("/temas");
    }

    async function gerarNovoTema(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        if (id !== undefined) {
            try {
                await atualizar(`/theme`, tema, setTema, usuario.token);
                alert("Tema atualizado com sucesso!");
                retornar();
            } catch (error) {
                if (error instanceof Error && (error.message.includes("403") || error.message.includes("401"))) {
                    alert("Sua sessão expirou, faça o login novamente.");
                    handleLogout();
                    return;
                }

                console.error("Erro ao atualizar tema:", error);
                alert("Erro ao atualizar tema. Por favor, tente novamente.");
            } finally {
                setIsLoading(false);
            }
        } else {
            try {
                await cadastrar(`/theme`, tema, setTema, usuario.token);
                alert("Tema cadastrado com sucesso!");
                retornar();
            } catch (error) {
                if (error instanceof Error && (error.message.includes("403") || error.message.includes("401"))) {
                    alert("Sua sessão expirou, faça o login novamente.");
                    handleLogout();
                    return;
                }

                console.error("Erro ao cadastrar tema:", error);
                alert("Erro ao cadastrar tema. Por favor, tente novamente.");
            } finally {
                setIsLoading(false);
            }
        }
    }

    async function buscaPorId(id: string) {
        try {
            await buscar(`/theme/${id}`, setTema, usuario.token);
        } catch (error: any) {
            if (error.message.includes("403") || error.message.includes("401")) {
                alert("Sua sessão expirou, faça o login novamente.");
                handleLogout();
                navigate("/");
            } else {
                console.error("Erro ao buscar tema:", error);
                alert("Erro ao buscar tema. Por favor, tente novamente.");
            }
        }
    }

    return (
        <div className="container flex flex-col items-center justify-center mx-auto">
            <h1 className="text-4xl text-center my-8">{id === undefined ? "Cadastrar Tema" : "Editar Tema"}</h1>
            <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovoTema}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="name">Nome do Tema</label>
                    <input
                        type="text"
                        name="name"
                        className="border-2 border-slate-700 rounded p-2"
                        placeholder="Nome do seu tema"
                        value={tema.name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atulizarEstadoTema(e)}
                    />
                </div>
                
                <div className="flex flex-col gap-2">
                    <label htmlFor="description">Descrição do Tema</label>
                    <input
                        type="text"
                        name="description"
                        className="border-2 border-slate-700 rounded p-2"
                        placeholder="Descreva aqui seu tema"
                        value={tema.description}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atulizarEstadoTema(e)}
                    />
                </div>
                <button
                    type="submit"
                    className="rounded text-slate-100 bg-indigo-400
                        hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center"
                >{isLoading ?
                    <ClipLoader
                        color="#ffffff"
                        size={24}
                    /> :
                    <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
                    }
                </button>
            </form>
        </div>
    );
}

export default FormTema;