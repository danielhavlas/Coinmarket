import Searchbar from './Searchbar';
import { Link } from 'react-router-dom';
import { signOutUser } from '../utils/firebase.utils';
import { selectorCurrentUser } from "../store/user/user.selector";
import { useSelector } from 'react-redux';

export default function Header(){

    const currentUser = useSelector(selectorCurrentUser)
    return(
        <div className="header flex bg-blue space-between align-center">
            <h1 className='uppercase fs-1'>coinmarket</h1>
            <div className="nav flex space-between gap-2 align-center">
                <Link to='/'>HOME</Link>
                <Link to='/portfolio'>ASSETS</Link>
                <Link to='/currencies'>CURRENCIES</Link>
                <Searchbar/>
                {currentUser ? <div> <Link to='/auth'><i onClick={signOutUser} className="ri-user-line text-white fs-2 pointer"></i></Link></div> :<Link to='/auth'>SIGN IN</Link>}
            </div>
        </div>
    )
}