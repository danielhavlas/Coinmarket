import React from "react"

interface IFormInputProps {
    label: string,
    type: string,
    value: string,
    name: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {}
}

export default function FormInput({label, ...props}:IFormInputProps){
    return(
        <div className="field">
            <input placeholder=" " className="input" {...props}/>
            <label placeholder=" " className="label">{label}</label>
        </div>
    )
}