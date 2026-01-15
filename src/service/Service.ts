import axios from "axios";
import CadastroUsuario from "../models/usuario/CadatroUsuario";
import LoginUsuario from "../models/usuario/LoginUsuario";

const api = axios.create({
    baseURL: "https://blog-pessoal-92pz.onrender.com"
});

export const cadastrarUsuario = async (usuario: CadastroUsuario, setDados: Function) => {
    const resposta = await api.post(`/user/signup`, usuario);
    setDados(resposta.data);
}

export const login = async (login: LoginUsuario, setDados: Function) => {
    const resposta = await api.post(`/auth/login`, login);
    setDados(resposta.data);
}