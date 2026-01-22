import { Link } from 'react-router-dom'
import Postagem from '../../models/postagem/Postagem'

interface CardPostagensProps {
    postagem: Postagem
}

function CardPostagem({ postagem }: CardPostagensProps) {
    return (
        <div className='border-slate-900 border 
            flex flex-col rounded overflow-hidden justify-between'>
                
            <div>
                <div className="flex w-full bg-indigo-400 py-2 px-4 items-center gap-4">
                    <img src={postagem.user?.photo}
                         className='h-12 rounded-full' alt="" />
                    <h3 className='text-lg font-bold text-center uppercase'>
                        {postagem.user?.username}
                    </h3>
                </div>
                <div className='p-4 '>
                    <h4 className='text-lg font-semibold uppercase'>{postagem.title}</h4>
                    <p>{postagem.text}</p>
                    <p>Tema: {postagem.theme?.name}</p>
                    <p>Data: {new Intl.DateTimeFormat('pt-BR', {
                        dateStyle: 'full',
                        timeStyle: 'medium'
                    }).format(new Date(postagem.updatedAt))}</p>
                </div>
            </div>
            <div className="flex">
                <Link to={`/editar-postagem/${postagem.id}`} className='w-full text-white bg-indigo-400 
                    hover:bg-indigo-800 flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link>
                <Link to={`/deletar-postagem/${postagem.id}`} className='text-white bg-red-400 
                    hover:bg-red-700 w-full flex items-center justify-center'>
                    <button>Deletar</button>
                </Link>
            </div>
        </div>
    )
}

export default CardPostagem