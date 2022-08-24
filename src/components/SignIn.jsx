import { signInWithGooglePopup } from "../utils/firebase.utils";

export default function SignIn(){

    const logGoggleUser = async () => {
        const response = await signInWithGooglePopup()
        console.log(response);
    }
    return(
        <div>
            <h1>Sign in page</h1>
            <button onClick={logGoggleUser}>Sign in with Google</button>
        </div>
    )
}