import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { selectorCurrentUser } from "../store/user/user.selector.ts";
import { useSelector } from 'react-redux';
import { User } from 'firebase/auth';

import Searchbar from './Searchbar.tsx';
import ProfileIcon from './ProfileIcon.tsx'

export default function Header(){

    const currentUser: User = useSelector(selectorCurrentUser)
        
    return(
        <div className="header flex bg-blue space-between align-center">
            <h1 className='uppercase fs-1'>coinmarket</h1>
            {currentUser && <div className="nav flex space-between gap-2 align-center">
                <Link to='/home'>HOME</Link>
                <Link to='/portfolio'>ASSETS</Link>
                <Link to='/currencies'>CURRENCIES</Link>
                <Searchbar/>
                <ProfileIcon />
            </div>}
        </div>
    )
}