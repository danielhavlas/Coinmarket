import { useState } from "react"
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../utils/firebase.utils";

import FormInput from "./FormInput";
 
const defaultFormFields = {
    displayName:'',
    email:'',
    password:'',
    confirmPassword:'',
}
export default function SignUpForm(){ 

    const [formFields,setFormFields] = useState(defaultFormFields)
    const {displayName,email,password,confirmPassword} = formFields

    const resetForm = () => {
        setFormFields(defaultFormFields)
    }
 
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormFields({...formFields,[name]: value})
    }
    const handleSubmit = async (e) => { 
        e.preventDefault()
        if(password != confirmPassword){
            alert('Passwords do not match')
            return
        }
        try{
            const {user} = await createAuthUserWithEmailAndPassword(email,password)
            await createUserDocumentFromAuth(user,{displayName})
            resetForm()
        }catch(error){
            if(error.code=== 'auth/email-already-in-use'){
                alert('Cannot create user, email already in use')
            }else{
                console.log(error);
            }
        }
    }

    return(
        <div>
            <h3>Sigh up with email and password</h3>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" name="displayName" onChange={handleChange} value={displayName} required/>
                <FormInput label="Email" type="email" name="email" onChange={handleChange} value={email} required/>
                <FormInput label="Password" type="password" name="password" onChange={handleChange} value={password} required/>
                <FormInput label="Confirm Password" type="password" name="confirmPassword" onChange={handleChange} value={confirmPassword} required/>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

