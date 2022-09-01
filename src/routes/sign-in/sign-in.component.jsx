// import { getRedirectResult } from "@firebase/auth";
// import { useEffect } from "react";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import {
  // auth, signInWithGoogleRedirect,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  /* !! SIGN IN WITH RIDIRECT (OPTIONAL)!!
    useEffect(async () => {
        const response = await getRedirectResult(auth);
        
        if (response) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
        }
    }, []);
  */

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      {/* <button onClick={signInWithGoogleRedirect}> Sign in with Google Redirect</button> */}
      <SignUpForm />
    </div>
  );
};

export default SignIn;
