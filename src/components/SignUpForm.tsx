import React, { useState } from "react"
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../utils/firebase.utils.ts";
import { useNavigate } from "react-router-dom";
import FormInput from "./FormInput.tsx";
 
const defaultFormFields = {
    displayName:'',
    email:'',
    password:'',
    confirmPassword:'',
}
export default function SignUpForm(){ 

    const navigate = useNavigate()

    const [formFields,setFormFields] = useState(defaultFormFields)
    const {displayName,email,password,confirmPassword} = formFields

    const resetForm = () => {
        setFormFields(defaultFormFields)
    }
 
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormFields({...formFields,[name]: value})
    }
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => { 
        e.preventDefault()
        if(password != confirmPassword){
            alert('Passwords do not match')
            return
        }
        try{
            const {user}:any = await createAuthUserWithEmailAndPassword(email,password)
            await createUserDocumentFromAuth(user,{displayName})
            navigate('/home')
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
        <div className="card bg-white auth--card">
            <h3 className="text-blue">Sign up</h3>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" name="displayName" onChange={handleChange} value={displayName} required/>
                <FormInput label="Email" type="email" name="email" onChange={handleChange} value={email} required/>
                <FormInput label="Password" type="password" name="password" onChange={handleChange} value={password} required/>
                <FormInput label="Confirm Password" type="password" name="confirmPassword" onChange={handleChange} value={confirmPassword} required/>
                <button type="submit" className="sign-in-button fs-4">Sign Up</button>
            </form>
        </div>
    )
}

