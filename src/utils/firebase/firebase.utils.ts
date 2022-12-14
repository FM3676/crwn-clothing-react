// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { Category } from "../../store/categories/category.types";
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

export const addCollectionAndDocuments = async <T extends { title: string }>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectionKey); // Get the collection reference
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    // For each object to add, create a document reference, and give this document a title
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object); // Then set each document with object.
  });

  await batch.commit();
  console.log("done");
};

export const getCategorieAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef); // Generate a query of this collection

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (docSnapshot) => docSnapshot.data() as Category
  );

  // const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
  //   const { title, items } = docSnapshot.data();
  //   acc[title.toLowerCase()] = items;
  //   return acc;
  // }, {});

  // return categoryMap;
};

export type AdditionalInformation = {
  displayName?: string;
};

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
};

export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
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
      console.log("Error creating the user", error);
    }
  }

  // If user data exists
  // Return userDocRef
  // return userDocRef;
  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> =>
  new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
