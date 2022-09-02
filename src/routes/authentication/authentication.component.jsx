// import { getRedirectResult } from "@firebase/auth";
// import { useEffect } from "react";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import "./authentication.styles..scss";
/* import {
  // auth, signInWithGoogleRedirect,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils"; */

const Authentication = () => {
  /* !! SIGN IN WITH RIDIRECT (OPTIONAL)!!
    useEffect(async () => {
        const response = await getRedirectResult(auth);
        
        if (response) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
        }
    }, []);
  */

  return (
    <div className="authentication-container">
      {/* <button onClick={logGoogleUser}>Sign in with Google Popup</button> */}
      {/* <button onClick={signInWithGoogleRedirect}> Sign in with Google Redirect</button> */}
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
