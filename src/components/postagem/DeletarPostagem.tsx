import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClipLoader, SyncLoader } from "react-spinners"
import Postagem from "../../models/postagem/Postagem"
import { AuthContext } from "../../contexts/AuthContext"
import { buscar, deletar } from "../../service/Service"
import { ToastAlerta } from "../../utils/ToastAlerta"

function DeletarPostagem() {

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)
    const { id } = useParams<{ id: string }>()
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPorId(id: string) {
        try {
            await buscar(`/post/${id}`, setPostagem, token)
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
                ToastAlerta("Sua sessão expirou. Por favor, faça login novamente.", "info");
                navigate("/");
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta("Você precisa estar logado!", "info");
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            setIsLoading(true)
            buscarPorId(id).then(() => setIsLoading(false))
        }
    }, [id])

    async function deletarPostagem() {
        setIsLoading(true)

        try {
            await deletar(`/post/${id}`, token)

            ToastAlerta("Postagem deletada com sucesso!", "sucesso");

        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
                ToastAlerta("Sua sessão expirou. Por favor, faça login novamente.", "info");
                navigate("/");
            } else {
                ToastAlerta("Erro ao deletar a postagem.", "erro");
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/postagens")
    }

    return (
        <div className="flex flex-col items-center justify-center pt-8">
            {isLoading ? <SyncLoader color="#312e81" size={24} /> :
                <div className='container w-1/3 mx-auto'>
                    <h1 className='text-4xl text-center my-4'>Deletar Postagem</h1>

                    <p className='text-center font-semibold mb-4'>
                        Você tem certeza de que deseja apagar a postagem a seguir?
                    </p>

                    <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                        <header
                            className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl'>
                            Postagem
                        </header>
                        <div className="p-4">
                            <p className='text-xl h-full'>{postagem.title}</p>
                            <p>{postagem.text}</p>
                        </div>
                        <div className="flex">
                            <button
                                className='text-slate-100 bg-indigo-400 hover:bg-indigo-600 w-full py-2 cursor-pointer'
                                onClick={retornar}>
                                Não
                            </button>
                            <button
                                className='w-full bg-red-400 hover:bg-red-600 text-slate-100  flex items-center justify-center cursor-pointer'
                                onClick={deletarPostagem}>
                                {isLoading ?
                                    <ClipLoader
                                        color="#ffffff"
                                        size={24}
                                    /> :
                                    <span>Sim</span>
                                }
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default DeletarPostagem