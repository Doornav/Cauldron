// src/services/authService.ts
import { auth } from '../config/firebaseConfig';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut
} from 'firebase/auth';

// LOGIN WITH EMAIL
export const loginWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    return { user };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Login failed');
  }
};

// SIGN UP WITH EMAIL
export const signupWithEmail = async (email: string, password: string, phoneNumber: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    return { user }; 
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Signup with 2FA failed');
  }
};

//VERIFICATION EMAIL
export const sendVerificationEmail = async (user: any) => {
  if (user && !user.emailVerified) {
    try {
      await sendEmailVerification(user);
      console.log("Verification email sent.");
    } catch (error) {
      console.error("Error sending verification email:", error);
      throw new Error("Could not send verification email. Please try again.");
    }
  } else {
    console.log("User is already verified or user not logged in.");
  }
};


export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Sign out failed:", error);
    throw new Error("Failed to log out. Please try again.");
  }
};
