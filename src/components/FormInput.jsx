export default function FormInput({label, ...props}){
    return(
        <div className="field">
            <input placeholder=" " className="input" {...props}/>
            <label placeholder=" " className="label">{label}</label>
        </div>
    )
}