import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
    return(
        <>
            <header>
            <div className="header text-white flex bg-blue space-between align-center">
                <h1 className='uppercase fs-1'>coinmarket</h1>
                <div className='flex gap-1 align-center'>
                    <Link className="fs-4" to="auth">SIGN IN</Link>
                    <Link to='auth' className=" fs-4 fw-600 bg-white text-blue get-started-button">Get Started</Link>
                </div>
            </div>

            </header>
            <div className="container landing--container" >
                <div className="land-text"> 
                    <Link to='auth' className="text-blue fs-5"><i className="align-text-vert fs-3 ri-bit-coin-line"></i><span className="align-text-vert">Jump start your crypto portfolio</span><i className="align-text-vert ri-arrow-right-line"></i></Link>
                    <div className="">
                        <h1 className="fs-0">Jump start your crypto portfolio</h1>
                        <p className="fs-3 line-height-1">Coinbase is the easiest place to buy and sell cryptocurrency. Sign up and get started today.</p>
                        <Link to='auth' className="fs-3 fw-600 bg-blue text-white get-started-button">Get Started</Link>
                    </div>
                </div>
                <div className='portfolio-card card bg-white'>
                    <h2>Portfolio</h2>
                    <div className="flex space-between text-blue">
                        <h3>USD</h3>
                        <h3>$6177.96</h3>
                    </div>
                    <div className='flex space-between'>
                        <div>
                            <div className="flex align-center gap-1">
                                <img className='small-img' src='https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579'/>
                                <div>
                                    <h3>Bitcoin</h3>
                                    <p className='uppercase'>BTC</p>
                                </div>
                            </div>
                        </div>
                        <div className='text-left'>
                            <h3>$56888.82</h3>
                            <p className='uppercase'>3 btc</p>
                        </div>
                    </div>
                    <div className='flex space-between'>
                        <div>
                            <div className="flex align-center gap-1">
                                <img className='small-img' src='https://assets.coingecko.com/coins/images/3688/large/hbar.png?1637045634'/>
                                <div>
                                    <h3>Hedera</h3>
                                    <p className='uppercase'>hbar</p>
                                </div>
                            </div>
                        </div>
                        <div className='text-left'>
                            <h3>$24852.27</h3>
                            <p className='uppercase'>425254 hbar</p>
                        </div>
                    </div>
                    <div className='flex space-between'>
                        <div>
                            <div className="flex align-center gap-1">
                                <img className='small-img' src='https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880'/>
                                <div>
                                    <h3>Ethereum</h3>
                                    <p className='uppercase'>eth</p>
                                </div>
                            </div>
                        </div>
                        <div className='text-left'>
                            <h3>$8028.42</h3>
                            <p className='uppercase'>6 eth</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}