import { createContext, ReactNode, useEffect, useState } from "react";
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { api } from "../services/api";

WebBrowser.maybeCompleteAuthSession(); // redireciona do navegador para o aplicativo novamente

interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  isUserLoading: boolean;
  signIn: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [isUserLoading, setIsUserLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '', // clienteId da aplicação que foi cadastrada no console.cloud.google.com
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }), // link de redirecionamento da aplicação
    scopes: ['profile', 'email'], // o que será acessado do usuário
  });

  async function signIn() {
    try {
      setIsUserLoading(true);
      promptAsync(); // permite iniciar o fluxo de autenticação no google
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  async function signInWithGoogle(access_token: string) {
    try {
      setIsUserLoading(true);

      const tokenResponse = await api.post('/users', { access_token });
      api.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.data.token}`;

      const userInfoResponse = await api.get('/me');
      setUser(userInfoResponse.data.user);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  useEffect(() => {
    // response => resposta da autenticação no google
    // verifica se o tipo da resposta é success e se dentro da resposta tem o objeto authentication
    // e dentro dele tem o accessToken
    if(response?.type === 'success' && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken);
    }
  }, [response]);

  return (
    <AuthContext.Provider value={{
      user,
      isUserLoading,
      signIn,
    }}>
      {children}
    </AuthContext.Provider>
  );
}