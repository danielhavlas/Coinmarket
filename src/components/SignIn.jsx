import { signInWithGooglePopup, createUserDocumentFromAuth } from "../utils/firebase.utils";


export default function SignIn(){

    const getGoggleUser = async () => {
        const {user} = await signInWithGooglePopup()
        const userDocRef = await createUserDocumentFromAuth(user)
    }
    return(
        <div>
            <h1>Sign in page</h1>
            <button onClick={getGoggleUser}>Sign in with Google</button>
        </div>
    )
}