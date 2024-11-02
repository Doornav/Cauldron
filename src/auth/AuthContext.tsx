// src/contexts/AuthContext.tsx
import React, { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../config/firebaseConfig';
import { onAuthStateChanged, User, reload } from 'firebase/auth';
import * as authService from '../services/authService';

interface AuthContextData {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, phoneNumber:string) => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  checkEmailVerification: () => Promise<boolean>;
  logout: () => Promise<void>;

 // complete2FAVerification: (verifcationCode: string) => Promise<void>; 
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = user !== null;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    await authService.loginWithEmail(email, password);
  };

  const signup = async (email: string, password: string, phoneNumber: string) => {
    await authService.signupWithEmail(email, password, phoneNumber);
  };

  const sendVerificationEmail = async () => {
    if (user) {
      await authService.sendVerificationEmail(user);
    } else {
      throw new Error("No user is logged in trying to send verification email");
    }
  };

  const checkEmailVerification = async () => {
    if (user) {
      await reload(user);
      if (user.emailVerified) {
        setUser(user);
        return true;
      }
    }
    return false;
  }

  const logout = async () => {
    await authService.logout();
  };

  const complete2FAVerification = async (verifcationCode: string) => {
   // await authService.confirm2FAVerification(verifcationCode);
  }

  return (
    <AuthContext.Provider
    value={{ 
      isAuthenticated,
      user,
      login, 
      signup, 
      sendVerificationEmail,
      checkEmailVerification, 
      logout
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
