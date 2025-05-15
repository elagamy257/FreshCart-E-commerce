import { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export let userContext = createContext();

export default function UserContextProvider(props) {
  const [isLogin, setLogin] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setLogin(token); // Sync with localStorage on mount
    }
  }, []);

  return <userContext.Provider value={{ isLogin, setLogin }}>
    {props.children}
  </userContext.Provider>;
}