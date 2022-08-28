import { createContext, useEffect, useReducer, useState } from "react";
import { onAuthStateChangedListener } from "../utils/firebase.utils";

export const UserContext = createContext({
    setCurrentUser:() => null,
    currentUser:null,
})

export const USER_ACTION_TYPE = {
  SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
  const {type, payload} = action

  switch(type){
    case 'SET_CURRENT_USER':
      return{
        currentUser: payload
      }
    default:
      throw new Error(`Unhandled type ${type} in userReducer`)
  }

}
const INITIAL_STATE = {
  currentUser: null
}
export const UserContextProvider = ({children}) => {

  const [{currentUser}, disbatch] = useReducer(userReducer,INITIAL_STATE)

  const setCurrentUser = (user) => {
    disbatch({type: USER_ACTION_TYPE.SET_CURRENT_USER, payload: user})
  }

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