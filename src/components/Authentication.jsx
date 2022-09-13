import {signInWithGooglePopup, createUserDocumentFromAuth, signInGuest} from '../utils/firebase.utils'
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import google_icon from '../assets/google-logo.png'
import { useState } from 'react';



export default function Authentication(){

    const [signIn, setSignIn] = useState(true)

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup()
        createUserDocumentFromAuth(user)
    }

    return(
        <div className="auth">
            {signIn && <SignInForm />}
            {!signIn && <SignUpForm />}
            {signIn && <p onClick={() => setSignIn(false)} className="center fs-4 text-grey">or Create An Account</p>}
            {!signIn && <p onClick={() => setSignIn(true)} className="center fs-4 text-grey">or Sign In</p>}
            <div className="gap-2 center">
                <button className="google-auth bg-white flex align-center gap-1 fs-5" type="button" onClick={signInWithGoogle}>
                    <img className="google-icon" src={google_icon} alt="" />
                    <p className="fs-4">Google Sign {signIn ? 'In' : 'Up'}</p>
                </button>
                <button className="google-auth bg-white flex align-center gap-1 fs-5" type="button" onClick={signInGuest}>
                    <i className="ri-user-line fs-4"></i>
                    <p className="fs-4">Sign {signIn ? 'In' : 'Up'} as Guest</p>
                </button>
            </div>
        </div>
    )
}