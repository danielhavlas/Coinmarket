import Searchbar from './Searchbar';
import { Link } from 'react-router-dom';

export default function Header(){
    return(
        <div className="header flex bg-black space-between">
            <h1 className='uppercase'>Coinbase</h1>
            <div className="nav flex space-between gap-2">
                <Link to='/'>HOME</Link>
                <Searchbar/>
            </div>
        </div>
    )
}