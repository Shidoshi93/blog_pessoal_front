import { createContext, type ReactNode, useState } from "react"; 
import UsuarioLoginResult from "../models/usuario/UsuarioLoginResult";
import { login } from "../service/Service";
import LoginUsuario from "../models/usuario/LoginUsuario";
import { ToastAlerta } from "../utils/ToastAlerta";

interface AuthContextProps {
    usuario: UsuarioLoginResult;
    handleLogin: (usuario: LoginUsuario) => void;
    handleLogout: () => void;
    isLoading: boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
    const [usuario, setUsuario] = useState<UsuarioLoginResult>({} as UsuarioLoginResult);
    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin(usuario: LoginUsuario) {
        setIsLoading(true);

        try {
          await login(usuario, setUsuario);
          ToastAlerta("Usuário foi autenticado com sucesso!", "sucesso")
        } catch (error) {
            ToastAlerta("Os dados do Usuário estão inconsistentes!", "erro")
        } finally {
            setIsLoading(false);
        }
    }

    function handleLogout() {
        setUsuario({} as UsuarioLoginResult);
    }

    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}