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

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup()
        createUserDocumentFromAuth(user)
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
            <h3>Sigh up with email and password</h3>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" name="email" onChange={handleChange} value={email} required/>
                <FormInput label="Password" type="password" name="password" onChange={handleChange} value={password} required/>
                <button type="submit">Sign In</button>
                <button type="button" onClick={signInWithGoogle}>Google Sign In</button>
            </form>
        </div>
    )
}

