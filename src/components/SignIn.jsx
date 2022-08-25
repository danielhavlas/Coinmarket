import { getRedirectResult } from "firebase/auth";
import { useEffect } from "react";
import { auth,signInWithGoogleRedirect,signInWithGooglePopup, createUserDocumentFromAuth } from "../utils/firebase.utils";

import SignUpForm from "./signUpForm";


export default function SignIn(){

    useEffect(() => {
        async function getResult(){
            const response = await getRedirectResult(auth)
            if(response){
                const userDocRef = await createUserDocumentFromAuth(response.user)
            }
        }
        getResult()
    },[])

    const getGoggleUser = async () => {
        const {user} = await signInWithGoogleRedirect()
        const userDocRef = await createUserDocumentFromAuth(user)
    }
    return(
        <div>
            <h1>Sign in page</h1>
            <button onClick={getGoggleUser}>Sign in with Google</button>
            <SignUpForm/>
        </div>
    )
}