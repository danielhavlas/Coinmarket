import React, { useRef, useState } from 'react';
import Searchbar from './Searchbar.tsx';
import { Link } from 'react-router-dom';
import { signOutUser } from '../utils/firebase.utils.ts';
import { selectorCurrentUser } from "../store/user/user.selector.ts";
import { useSelector } from 'react-redux';
import { User } from 'firebase/auth';

export default function Header(){

    const currentUser: User = useSelector(selectorCurrentUser)
    const [displayField, setDisplayField] = useState('not-display')
    const fieldRef = useRef<HTMLDivElement>()
    
    // const profileField = (
        
    // )
        
    return(
        <div className="header flex bg-blue space-between align-center">
            <h1 className='uppercase fs-1'>coinmarket</h1>
            <div className="nav flex space-between gap-2 align-center">
                <Link to='/home'>HOME</Link>
                <Link to='/portfolio'>ASSETS</Link>
                <Link to='/currencies'>CURRENCIES</Link>
                <Searchbar/>
                {currentUser && (<div tabIndex={0} onFocus={() => setDisplayField('display')} onBlur={() => setDisplayField('not-display')}>
                    <i onClick={() => {}} className="ri-user-line text-white fs-2 pointer"></i>
                    <div className={`profile-field bg-white ${displayField}`}>
                        <p className='text-black fw-600'>{currentUser?.email}</p>
                        <button className='pointer fs-5 text-red fw-600' onClick={signOutUser}>SIGN OUT</button>
                    </div>
                </div>)}
            </div>
        </div>
    )
}