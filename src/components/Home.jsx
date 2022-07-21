import Watchlist from './Watchlist'
import Assets from './Assets'
import Header from './Header'
import { useRef } from 'react'
import Stockpage from './Stockpage'

export default function Home(){

    const searchRef = useRef(null)

    return(
        <div className="home">
            <Header />
            <div className="container">
                <input ref={searchRef} type="text" />
                <div className="flex home-grid">
                    <Assets />
                    <Watchlist />
                </div>
            </div>
        </div>
    )
}