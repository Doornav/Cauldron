// import { auth } from '../config/firebaseConfig';
// import { FirebaseAuthTypes } from '@react-native-firebase/auth';

// interface ErrorState {
//   setFirebaseError: (message: string) => void;
  
// }

// export const handleFirebaseError = (
//   error: FirebaseAuthTypes.NativeFirebaseAuthError,
//   { setFirebaseError }: ErrorState
// ) => {
//   setFirebaseError('');

//   console.log('Error Message:', error.message);

//   switch (error.message) {

//     case '[auth/invalid-email] The email address is badly formatted.':
//       setFirebaseError('Please enter a valid email address.');
//       break;

//     case '[auth/invalid-credential] The supplied auth credential is malformed or has expired.':
//       setFirebaseError('Incorrect credentials. Please try again.');
//       break;

//     case '[auth/wrong-password] The password is invalid or the user does not have a password.':
//       setFirebaseError('Please enter a password.');
//       break;

//     case '[auth/email-already-in-use] The email address is already in use by another account.':
//       setFirebaseError('Email is already in use.');
//       break;

//     case '[auth/weak-password] The given password is invalid.':
//       setFirebaseError('Enter a password of at least 6 characters.');
//       break;

//     case '[auth/invalid-email] An email address must be provided.':
//       setFirebaseError('Please provide an email address.');
//       break;

//     case '[auth/weak-password] The given password is invalid.':
//       setFirebaseError('Enter a password of at least 6 characters');
//       break;
      
//     default:
//       setFirebaseError('Login failed. Please try again.');
//       break;
//   }
// };
