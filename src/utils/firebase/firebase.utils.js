// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
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
const fiirebaseApp = initializeApp(firebaseConfig);

// Initialize a provider to use Google authentication
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  //These custom parameters will take some kind of configuration object, with it we can tell different ways that we want this Google Auth proider to behave
  prompt: "select_account", //This means everytime some one interacts with our provider, we want to always force them to select a account
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Here the provider we use new keyword, because we may need different provider to provide different server, like popup or signin.
// But, we won't ever need more than one authentication, the authentication for Firebase or for Google, it should be same one for every application.
// Once you authenticate for this web as a whole, it should be held onto for the duration of the lifecycle of this application.

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  // Check whether there is already a document for this user. True, give it back to me || False, create one for mee
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());
};
first;
