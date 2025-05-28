import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { createContext, useContext, useEffect, useState } from 'react';


export interface IUser {
  id: string,
  email: string,
}

interface IAuthProps {
  authState?: { token: string | null, authenticated: boolean | null },
  usersState?: IUser[],
  register?: (email: string, password: string) => Promise<any>,
  login?: (email: string, password: string) => Promise<any>,
  logout?: () => Promise<any>,
  getUsers?: () => Promise<any>,
}

const TOKEN_KEY = process?.env?.EXPO_PUBLIC_TOKEN_KEY || 'TOKEN_KEY';
const API_URL = process?.env?.EXPO_PUBLIC_API_URL || '';
const AuthContext = createContext<IAuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({children}: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null,
    authenticated: boolean | null,
  }>({ token: null, authenticated: null });
  const [usersState, setUsersState] = useState<IUser[]>([]);

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        setAuthState({ token, authenticated: true });
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    };
    loadToken();
  }, []);

  const register = async (email: string, password: string) => {
    try {
      return await axios.post(`${API_URL}/register`, { email, password });
    } catch (error: any) {
      return { error: true, message: error?.response?.data?.message || 'Error' };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      const token = response.data.token;
      setAuthState({ token, authenticated: true });
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await SecureStore.setItemAsync(TOKEN_KEY, token);
      return response;
    } catch (error: any) {
      return { error: true, message: error?.response?.data?.message || 'Error' };
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      axios.defaults.headers.common['Authorization'] = '';
      setAuthState({ token: null, authenticated: false });
      return { error: false, message: 'Bye-bye!' };
    } catch (error: any) {
      return { error: true, message: error?.response?.data?.message || 'Error' };
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      setUsersState(response.data);
      return response;
    } catch (error: any) {
      return { error: true, message: error?.response?.data?.message || 'Error' };
    }
  };

  const value = {
    authState,
    usersState,
    register,
    login,
    logout,
    getUsers,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};
