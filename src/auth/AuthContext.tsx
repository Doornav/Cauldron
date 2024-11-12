// src/contexts/AuthContext.tsx
import React, { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { loginRequest, signupRequest } from '../services/authService';


interface AuthContextData {
  user: any;
  token: string;
  login: (email: string, password: string) => Promise<string | null>;
  signup: (email: string, password: string, name:string) => Promise<string | null>;
  // sendVerificationEmail: () => Promise<void>;
  // checkEmailVerification: () => Promise<boolean>;
  logout: () => void;

 // complete2FAVerification: (verifcationCode: string) => Promise<void>; 
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<any>(null);




  const login = async (email: string, password: string) => {
    try {
      const response = await loginRequest({ email, password });
      if (response.token) {
        setToken(response.token);
        setUser(response.user); // Assuming `response.user` contains user data
        return response.token;
      } else {
        throw new Error('Login failed: Invalid response');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };



  const signup = async (email: string, password: string, name: string) => {
    try {
      const response = await signupRequest({ email, password, name });
      if (response.token) {
        setToken(response.token);
        setUser(response.user); // Assuming `response.user` contains user data
        return response.token;
      } else {
        throw new Error('Signup failed: Invalid response');
      }
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  // const sendVerificationEmail = async () => {
  //   if (user) {
  //     await authService.sendVerificationEmail(user);
  //   } else {
  //     throw new Error("No user is logged in trying to send verification email");
  //   }
  // };

  // const checkEmailVerification = async () => {
  //   try {
  //     const user = auth().currentUser;
  
  //     // Ensure you await the reload
  //     await user.reload();
  
  //     // Fetch the updated user object
  //     const updatedUser = auth().currentUser;
  
  //     console.log('Email Verified:', updatedUser.emailVerified);
  
  //     if (updatedUser.emailVerified) {
  //       setUser(updatedUser);
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } catch (error) {
  //     console.error('Error checking email verification:', error);
  //     return false;
  //   }
  // };
  

  const logout = () => {
    // Clear token from local storage or cookies
    // Clear user and token state in AuthContext
    setToken(null);
    setUser(null);
  };

  const complete2FAVerification = async (verifcationCode: string) => {
   // await authService.confirm2FAVerification(verifcationCode);
  }

  return (
    <AuthContext.Provider
    value={{ 
      user,
      token,
      login, 
      signup, 
      // sendVerificationEmail,
      // checkEmailVerification, 
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
