import { setCurrentUser } from "./user.action.ts";
import { AnyAction } from "redux";
import { User } from "firebase/auth";


export type UserState = {
    readonly currentUser: User | null,
}

const INITIAL_STATE: UserState = {
    currentUser: null,
}

export const userReducer = (state = INITIAL_STATE, action = {} as AnyAction): UserState => {
    if(setCurrentUser.match(action)){
        return {...state, currentUser: action.payload}
    }
    
    return state

}
