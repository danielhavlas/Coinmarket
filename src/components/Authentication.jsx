
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";


export default function Authentication(){

    return(
        <div className="flex">
            <SignInForm/>
            <SignUpForm/>
        </div>
    )
}