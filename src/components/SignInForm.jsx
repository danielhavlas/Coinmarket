import {useState } from "react";
import { createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../utils/firebase.utils";

import FormInput from "./FormInput";


const defaultFormFields = {
    email:'',
    password:'',
}
export default function SignInForm(){ 

    const [formFields,setFormFields] = useState(defaultFormFields)
    const {email,password} = formFields

    const resetForm = () => {
        setFormFields(defaultFormFields)
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormFields({...formFields,[name]: value})
    }
    const handleSubmit = async (e) => { 
        e.preventDefault()
        try{
            const {user} = await signInAuthUserWithEmailAndPassword(email,password)
            resetForm()
        }catch(error){
            switch(error.code){
                case 'auth/wrong-password':
                    alert('wrong password')
                    break
                case 'auth/user-not-found':
                    alert('user not found')
                    break
                default:
                    console.log(error);
            }
        }
    }

    return(
        <div>   
            <div className="card bg-white auth--card">
                <h3 className="text-blue">Sign in</h3>
                <form onSubmit={handleSubmit}>
                    <FormInput label="Email" type="email" name="email" onChange={handleChange} value={email} required/>
                    <FormInput label="Password" type="password" name="password" onChange={handleChange} value={password} required/>
                    <button type="submit" className="sign-in-button fs-4">Sign In</button>
                </form>
            </div>
            
        </div>
    )
}

