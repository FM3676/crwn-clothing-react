// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDh51wzbSPpwi-ZWOpTplHTEjQRjdgNDFU",
  authDomain: "crwn-clothing-db-7d0bc.firebaseapp.com",
  projectId: "crwn-clothing-db-7d0bc",
  storageBucket: "crwn-clothing-db-7d0bc.appspot.com",
  messagingSenderId: "837019584058",
  appId: "1:837019584058:web:30471e801f8a2f342d9703",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize a provider to use Google authentication
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  //These custom parameters will take some kind of configuration object, with it we can tell different ways that we want this Google Auth proider to behave
  prompt: "select_account", //This means everytime some one interacts with our provider, we want to always force them to select a account
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// Here the provider we use new keyword, because we may need different provider to provide different server, like popup or signin.
// But, we won't ever need more than one authentication, the authentication for Firebase or for Google, it should be same one for every application.
// Once you authenticate for this web as a whole, it should be held onto for the duration of the lifecycle of this application.

// ----------------------------------------------------------------
export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  // Check whether there is already a document for this user. True, give it back to me || False, create one for mee
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  //   console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  //   console.log(userSnapshot);
  //   console.log(userSnapshot.exists());

  // If user data doesn't exist
  // Create / Set the document with the data from userAuth in my collection.
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("Error creating the user", error.message);
    }
  }

  // If user data exists
  // Return userDocRef
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
