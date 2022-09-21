import { User } from "firebase/auth";
import React, { useState } from "react"
import { signOutUser } from '../utils/firebase.utils.ts';
import { selectorCurrentUser } from "../store/user/user.selector.ts";
import { useSelector } from 'react-redux';
import { useMobileOnly } from "../hooks/useMobileOnly.tsx";


export default function ProfileIcon() {
    const currentUser: User = useSelector(selectorCurrentUser)
    const [displayField, setDisplayField] = useState(false)
    const {mobileOnly} = useMobileOnly()

    return(
        <>
            {currentUser && <div tabIndex={0} onFocus={() => setDisplayField(true)} onBlur={() => setDisplayField(false)}>
                <i onClick={() => {}} className={`ri-user-line ${mobileOnly? 'text-blue fs-1' : 'text-white fs-2'}  pointer`}></i>
                <div className={`profile-field ${displayField? 'display' : 'not-display'}`}>
                    <p className='fw-600'>{currentUser?.email}</p>
                    <button className='pointer fs-5 text-red fw-600' onClick={signOutUser}>SIGN OUT</button>
                </div>
            </div>}
        </>
    )
}