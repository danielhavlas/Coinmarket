import { useState } from "react"
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../utils/firebase.utils";

const defaultFormFields = {
    displayName:'',
    email:'',
    password:'',
    confirmPassword:'',
}
export default function SignUpForm(){ 

    const [formFields,setFormFields] = useState(defaultFormFields)
    const {displayName,email,password,confirmPassword} = formFields

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
        }catch(error){
            console.log(error);
        }
    }

    return(
        <div>
            <h3>Sigh up with email and password</h3>
            <form onSubmit={handleSubmit}>
                <label>Display Name</label>
                <input type="text" name="displayName" onChange={handleChange} value={displayName} required/>

                <label>Email</label>
                <input type="email" name="email" onChange={handleChange} value={email} required/>

                <label>Password</label>
                <input type="password" name="password" onChange={handleChange} value={password} required/>

                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" onChange={handleChange} value={confirmPassword} required/>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

