import Tema from "../tema/Tema";
import Usuario from "../usuario/Usuario";

export default interface Postagem {
    id: number;
    title: string;
    text: string;
    theme: Tema;
    user: Usuario;
    updatedAt: string;
}