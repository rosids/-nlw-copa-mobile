import { createContext, ReactNode, useState } from "react";

interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  signIn: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);

  async function signIn() {
    console.log('Vamos logar!');
  }

  return (
    <AuthContext.Provider value={{
      user,
      signIn,
    }}>
      {children}
    </AuthContext.Provider>
  );
}