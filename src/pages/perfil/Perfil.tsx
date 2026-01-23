import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import { ToastAlerta } from "../../utils/ToastAlerta"

function Perfil() {
    const navigate = useNavigate()
    const { usuario } = useContext(AuthContext)

    useEffect(() => {
        if (!usuario.token) {
            ToastAlerta("Você precisa estar logado!", "info");
            navigate("/")
        }
    }, [usuario.token])

    return (
        <div className="flex justify-center mx-4 pt-8">
            {usuario.token &&
            <div className="container mx-auto flex flex-col gap-2.5">
                <div className="relative">
                    <img
                        className="w-full h-72 object-cover rounded-t-2xl"
                        src="https://i.imgur.com/ZZFAmzo.jpg"
                        alt="Capa do Perfil"
                    />

                    <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-16 z-20">
                        <img
                            className="rounded-full w-56 h-56 border-8 border-white shadow-2xl object-cover"
                            src={usuario.photo ? usuario.photo : "https://cdn-icons-png.flaticon.com/256/1077/1077114.png"}
                            alt={`Foto de perfil de ${usuario.username}`}
                        />
                    </div>
                </div>

                <div
                    className="h-72 flex flex-col 
                    bg-sky-500 text-white text-2xl items-center justify-center rounded-b-2xl mt-16"
                >
                    <p>Nome: {usuario.username} </p>
                    <p>Email: {usuario.email}</p>
                </div>
            </div>
            }
        </div>
    )
}

export default Perfil