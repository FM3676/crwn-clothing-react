import { Route, Routes } from "react-router";
// import Home from "./routes/home/home.compon/home.component";
// import Navigation from "./routes/navigation/navigation.component";
// import Authentication from "./routes/authentication/authentication.component";
// import Shop from "./routes/shop/shop.component";
// import Checkout from "./routes/checkout/checkout.component";
import { Suspense, useEffect,lazy } from "react";
import {
  createUserDocumentFromAuth,
  getCurrentUser,
  onAuthStateChangedListener,
} from "./utils/firebase/firebase.utils";
import { checkUserSession, setCurrentUser } from "./store/user/user.action";
import { useDispatch } from "react-redux";
import Spinner from "./components/spinner/spinner.styles";

const Home = lazy(() => import("./routes/home/home.compon/home.component"));
const Navigation = lazy(() =>
  import("./routes/navigation/navigation.component")
);
const Authentication = lazy(() =>
  import("./routes/authentication/authentication.component")
);
const Shop = lazy(() => import("./routes/shop/shop.component"));
const Checkout = lazy(() => import("./routes/checkout/checkout.component"));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
    /*     const unsubscribe = onAuthStateChangedListener((user) => {
      // return null or user object
      if (user) createUserDocumentFromAuth(user);
      // console.log(user);
      dispatch(setCurrentUser(user));// This dispatch dispatches actions to thr root reducer, which is turn passes the action to every single reducer function.
    });
    return unsubscribe; */
  }, []);

  return (
    <Suspense fallback={<Spinner />}>
      {" "}
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />}></Route>
          <Route path="shop/*" element={<Shop />}></Route>
          <Route path="auth" element={<Authentication />}></Route>
          <Route path="checkout" element={<Checkout />}></Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
