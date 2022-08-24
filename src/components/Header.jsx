import Searchbar from './Searchbar';
import { Link } from 'react-router-dom';

export default function Header(){
    return(
        <div className="header flex bg-blue space-between align-center">
            <h1 className='uppercase fs-1'>coinmarket</h1>
            <div className="nav flex space-between gap-2 align-center">
                <Link to='/'>HOME</Link>
                <Link to='/portfolio'>ASSETS</Link>
                <Link to='/currencies'>CURRENCIES</Link>
                <Searchbar/>
                <Link to='/sign-in'>SIGN IN</Link>
            </div>
        </div>
    )
}