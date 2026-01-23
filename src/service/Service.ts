import axios from "axios";
import CadastroUsuario from "../models/usuario/CadatroUsuario";
import LoginUsuario from "../models/usuario/LoginUsuario";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

export const cadastrarUsuario = async (usuario: CadastroUsuario, setDados: Function) => {
    const resposta = await api.post(`/user/signup`, usuario);
    setDados(resposta.data);
}

export const login = async (login: LoginUsuario, setDados: Function) => {
    const resposta = await api.post(`/auth/login`, login);
    console.log("no login", resposta.data);
    setDados(resposta.data);
}

export const buscar = async (endpoint: string, setDados: Function, token: string) => {
    const resposta = await api.get(endpoint, {
        headers: {
            'Authorization': token
        }
    });
    setDados(resposta.data);
}

export const cadastrar = async (endpoint: string, dados: unknown, setDados: Function, token: string) => {
    const resposta = await api.post(endpoint, dados, {
        headers: {
            'Authorization': token
        }
    });
    setDados(resposta.data);
}

export const atualizar = async (endpoint: string, dados: unknown, setDados: Function, token: string) => {
    const resposta = await api.put(endpoint, dados, {
        headers: {
            'Authorization': token
        }
    });
    setDados(resposta.data);
}

export const deletar = async (endpoint: string, token: string) => {
    await api.delete(endpoint, {
        headers: {
            'Authorization': token
        }
    });
}