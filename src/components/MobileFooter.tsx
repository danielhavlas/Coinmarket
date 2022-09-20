import React from 'react';
import { Link } from 'react-router-dom';

interface IMobileFooterProps {
    openSearch: (s: string) => void
}

export default function MobileFooter({openSearch}:IMobileFooterProps){
    return(
            <div className="mobile-footer flex bg-blue text-white">
                <Link to='/home'><i className="text-white fs-2 ri-home-4-line"></i></Link>
                <Link to='/portfolio'><i className="text-white fs-2 ri-funds-fill"></i></Link>
                <Link to='/currencies'><i className="text-white fs-2 ri-database-2-fill"></i></Link>
                <i onClick={() => openSearch('open')} className="text-white fs-2 ri-search-2-line"></i>
            </div>
    )
}