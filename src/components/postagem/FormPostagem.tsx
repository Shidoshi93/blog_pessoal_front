import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Tema from "../../models/tema/Tema";
import { AuthContext } from "../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../service/Service";
import { ClipLoader } from "react-spinners";
import CriarPostagem from "../../models/postagem/CriarPostagem";
import { ToastAlerta } from "../../utils/ToastAlerta";

function FormPostagem() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [temas, setTemas] = useState<Tema[]>([])
    const [tema, setTema] = useState<Tema>({} as Tema)
    const [postagem, setPostagem] = useState<CriarPostagem>({} as CriarPostagem)
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token
    const { id } = useParams<{ id: string }>()

    function handleSessaoExpirada() {
        ToastAlerta("Sua sessão expirou. Por favor, faça login novamente.", "info");
        handleLogout();
        navigate("/");
    }

    async function buscarPostagemPorId(id: string) {
        try {
            await buscar(`/post/${id}`, setPostagem, token)
        } catch (error: any) {
            if (error.toString().includes('401')) {
                    handleSessaoExpirada();
            }
        }
    }

    async function buscarTemaPorId(id: string) {
        try {
            await buscar(`/theme/${id}`, setTema, token)
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleSessaoExpirada();
            }
        }
    }

    async function buscarTemas() {
        try {
            await buscar('/theme', setTemas, token)
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleSessaoExpirada();
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta("Você precisa estar logado!", "info");
            navigate('/');
        }
    }, [token])

    useEffect(() => {
        buscarTemas()

        if (id !== undefined) {
            buscarPostagemPorId(id)
        }
    }, [id])

    useEffect(() => {
        setPostagem({
            ...postagem,
            themeId: tema.id,
        })
    }, [tema])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            themeId: tema.id,
            userId: usuario.id,
        });
    }

    function retornar() {
        navigate('/postagens');
    }

    async function gerarNovaPostagem(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar(`/post/${id}`, postagem, setPostagem, token);

                ToastAlerta("Postagem atualizada com sucesso", "sucesso");

            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleSessaoExpirada();
                } else {
                    ToastAlerta("Erro ao atualizar a Postagem", "erro");
                }
            }

        } else {
            try {
                await cadastrar(`/post`, postagem, setPostagem, token);

                ToastAlerta("Postagem cadastrada com sucesso", "sucesso");

            } catch (error: any) {
                if (error.toString().includes('401')) {
                    handleSessaoExpirada();
                } else {
                    ToastAlerta("Erro ao cadastrar a Postagem", "erro");
                }
            }
        }

        setIsLoading(false)
        retornar()
    }

    const carregandoTema = tema.description === '';
    return (
        <div className="flex flex-col mx-auto items-center h-full justify-center">
            <h1 className="text-4xl text-center my-8">
                {id !== undefined ? "Editar Postagem" : "Cadastrar Postagem"}
            </h1>

            <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovaPostagem}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="title">Título da Postagem</label>
                    <input
                        type="text"
                        placeholder="Titulo"
                        name="title"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={postagem.title}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            atualizarEstado(e)
                        }
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="text">Texto da Postagem</label>
                    <input
                        type="text"
                        placeholder="Texto"
                        name="text"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={postagem.text}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            atualizarEstado(e)
                        }
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <p>Tema da Postagem</p>
                    <select
                        name="theme"
                        id="theme"
                        className='border p-2 border-slate-800 rounded'
                        onChange={(e) => buscarTemaPorId(e.target.value)}
                    >
                        <option value="" selected disabled>Selecione um Tema</option>
                        {temas.map((tema) => (
                            <option key={tema.id} value={tema.id}>
                                {tema.description}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type='submit'
                    className='rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800 cursor-pointer
                               text-white font-bold w-full mx-auto py-2 flex justify-center' disabled={carregandoTema}
                >
                    {
                        isLoading ?
                            <ClipLoader
                                color="#ffffff"
                                size={24}
                            />
                            :
                            <span>{id !== undefined ? "Atualizar" : "Cadastrar"}</span>
                    }
                </button>
            </form>
        </div>
    );
}

export default FormPostagem;