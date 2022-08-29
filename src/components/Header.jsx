import Searchbar from './Searchbar';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { signOutUser } from '../utils/firebase.utils';
import { selectorCurrentUser } from "../store/user/user.selector";
import {UserContext} from '../context/UserContext'
import { useSelector } from 'react-redux';

export default function Header(){

    const currentUser = useSelector(selectorCurrentUser)
    console.log(currentUser);
    return(
        <div className="header flex bg-blue space-between align-center">
            <h1 className='uppercase fs-1'>coinmarket</h1>
            <div className="nav flex space-between gap-2 align-center">
                <Link to='/'>HOME</Link>
                <Link to='/portfolio'>ASSETS</Link>
                <Link to='/currencies'>CURRENCIES</Link>
                <Searchbar/>
                {currentUser ?<i onClick={signOutUser} className="ri-user-line text-white fs-2 pointer"></i> :<Link to='/auth'>SIGN IN</Link>}
            </div>
        </div>
    )
}