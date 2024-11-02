import { AuthError } from 'firebase/auth';

interface ErrorState {
  setFirebaseError: (message: string) => void;
  
}

export const handleFirebaseError = (error: AuthError, { setFirebaseError }: ErrorState) => {
  // Reset all error states before setting a new one
  setFirebaseError('');

  switch (error.message) {
    case 'Firebase: Error (auth/invalid-email).':
      setFirebaseError('Please enter a valid email address.');
      break;
    case 'Firebase: Error (auth/user-not-found).':
      setFirebaseError('No account found with this email.');
      break;
    case 'Firebase: Error (auth/invalid-credential).':
      setFirebaseError('Incorrect credentials. Please try again.');
      break;
    case 'Firebase: Error (auth/missing-password).':
      setFirebaseError('Please enter a password.');
      break;
    case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
      setFirebaseError('Enter a password with at least 6 characters.');
      break;
    case 'Firebase: Error (auth/email-already-in-use).':
      setFirebaseError('Email is already in use.');
      break;
    default:
      setFirebaseError('Login failed. Please try again.');
      break;
  }
};
