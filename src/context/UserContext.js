import { createContext, useEffect, useState } from "react";
import { onAuthStateChangedListener } from "../utils/firebase.utils";

export const UserContext = createContext({
    setCurrentUser:() => null,
    currentUser:null,
})
export const UserContextProvider = ({children}) => {
    const [currentUser , setCurrentUser] = useState()
    useEffect(()=>{
      const unsubscribe = onAuthStateChangedListener((user)=>{
        console.log(user);
        setCurrentUser(user)
      })  
      return unsubscribe
    },[])
    return (
        <UserContext.Provider value={{currentUser,setCurrentUser}}>
            {children}
        </UserContext.Provider>
    )
}