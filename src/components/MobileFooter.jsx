import { Link } from 'react-router-dom';

export default function Header(){
    return(
            <div className="mobile-footer flex bg-blue text-white">
                <Link to='/'>HOME</Link>
                <Link to='/portfolio'>ASSETS</Link>
                <Link to='/currencies'>CURRENCIES</Link>
            </div>
    )
}