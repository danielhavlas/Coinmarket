export default function FormInput({label, ...props}){
    return(
        <div>
            <label>{label}</label>
            <input {...props}/>
        </div>
    )
}