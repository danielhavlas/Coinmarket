import { Link } from 'react-router-dom';

export default function MobileFooter(props){
    return(
            <div className="mobile-footer flex bg-blue text-white">
                <Link to='/'><i class="text-white fs-2 ri-home-4-line"></i></Link>
                <Link to='/portfolio'><i class="text-white fs-2 ri-funds-fill"></i></Link>
                <Link to='/currencies'><i class="text-white fs-2 ri-database-2-fill"></i></Link>
                <i onClick={() => props.openSearch('open')} class="text-white fs-2 ri-search-2-line"></i>
            </div>
    )
}