import { getRedirectResult } from "firebase/auth";
import { useEffect } from "react";
import { auth, createUserDocumentFromAuth } from "../utils/firebase.utils";

import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";


export default function Authentication(){

    useEffect(() => {
        async function getResult(){
            const response = await getRedirectResult(auth)
            if(response){
                await createUserDocumentFromAuth(response.user)
            }
        }
        getResult()
    },[])

    
    return(
        <div>
            <h1>Sign in page</h1>
            <SignInForm/>
            <SignUpForm/>
        </div>
    )
}