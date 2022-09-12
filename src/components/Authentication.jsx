
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";


export default function Authentication(){

    return(
        <div className="auth">
            <SignInForm/>
            <SignUpForm/>
        </div>
    )
}