import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export let userContext = createContext();

export default function UserContextProvider(props){
    const [isLogin, setLogin] = useState(null)   
    
    return <userContext.Provider value={ {isLogin, setLogin} }>
        {props.children}
    </userContext.Provider>

}