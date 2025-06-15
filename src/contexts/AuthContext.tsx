import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface AuthContextType {
  token: string | null;
  username: string | null;
  isAuthenticated: boolean;
  usuarioId: number | null;
  permissoes: string[];
  login: (token: string) => void;
  logout: () => void;
  hasPermissao: (perm: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function parseJwt(token: string): any {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [username, setUsername] = useState<string | null>(null);
  const [permissoes, setPermissoes] = useState<string[]>([]);
  const [usuarioId, setUsuarioId] = useState<number | null>(null);
  useEffect(() => {
    if (token) {
      const payload = parseJwt(token);
      setUsername(payload?.username || null);
      setPermissoes(payload?.authorities || []);
      setUsuarioId(payload?.usuarioId || null);
    } else {
      setUsername(null);
      setPermissoes([]);
      setUsuarioId(null)
    }
  }, [token]);

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
    setPermissoes([]);
    localStorage.removeItem('token');
  };

  const isAuthenticated = !!token;

  const hasPermissao = (perm: string) => {
    return permissoes.includes(perm);
  };

  return (
    <AuthContext.Provider value={{ token, username, isAuthenticated, usuarioId, permissoes, login, logout, hasPermissao }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};