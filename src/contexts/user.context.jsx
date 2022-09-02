import { createContext, useState } from "react";

// See the context as being two parts, one is the actual storge thing itself, the literal context.

// as the actual value you want to access
export const UserContext = createContext({ // pass the default value, not necessarily the initial value
  currentUser: null,
  setCurrentUser: () => null,
});


export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
