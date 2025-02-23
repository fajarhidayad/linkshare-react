import { createContext, ReactNode, useContext, useState } from 'react';

export interface UserProfile {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  id: string;
  profile_picture_url: string;
}

export interface AuthContext {
  isAuthenticated: boolean;
  profile: UserProfile | null;
  login: (user: UserProfile) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider(props: { children: ReactNode }) {
  const [isAuth, setIsAuth] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  function login(user: UserProfile) {
    setIsAuth(true);
    setProfile(user);
  }

  function logout() {
    setIsAuth(false);
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: isAuth, login, logout, profile }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
