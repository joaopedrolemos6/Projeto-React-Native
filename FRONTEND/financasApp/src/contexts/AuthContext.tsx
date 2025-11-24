import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

// Tipagem baseada no seu Backend
type UserProps = {
  id: string;
  name: string;
  email: string;
  token: string;
};

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: any) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storageUser = await AsyncStorage.getItem('@financas:user');
      const storageToken = await AsyncStorage.getItem('@financas:token');

      if (storageUser && storageToken) {
        // Injeta o token em todas as requisições futuras
        api.defaults.headers.common['Authorization'] = `Bearer ${storageToken}`;
        setUser(JSON.parse(storageUser));
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);

  async function signIn({ email, password }: any) {
    // Chama a rota /login do seu backend
    const response = await api.post('/login', {
      email,
      password,
    });

    const { id, name, token } = response.data;

    const data = {
      id,
      name,
      email,
      token,
    };

    await AsyncStorage.setItem('@financas:user', JSON.stringify(data));
    await AsyncStorage.setItem('@financas:token', token);

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(data);
  }

  async function signOut() {
    await AsyncStorage.clear();
    setUser({} as UserProps);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user.token, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
}