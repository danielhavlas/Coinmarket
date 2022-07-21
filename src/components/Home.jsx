import Watchlist from './Watchlist'
import Assets from './Assets'
import Header from './Header'

export default function Home(){

    return(
        <div className="home">
            <Header />
            <div className="container">
                <div className="grid home-grid">
                    <Assets />
                    <Watchlist />
                </div>
            </div>
        </div>
    )
}