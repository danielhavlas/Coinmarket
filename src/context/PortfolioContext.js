import React,{useEffect, useReducer, useState} from 'react'
const PortfolioContext = React.createContext()


const portfolioReducer = (state, action) => {
    const {type, payload} = action

    switch(type){
        case 'SET_PORTFOLIO':
            return{
                ...state,
                ...payload
            }
        default:
            throw new Error(`Unhandled type ${type} in userReducer`)
    }
}

const INITIAL_STATE = {
    portfolioArray: [],
    usdBalance: 100000,
    totalBalance: 100000
}


function PortfolioContextProvider(props){

    const [{portfolioArray,usdBalance,totalBalance}, disbatch] = useReducer(portfolioReducer,INITIAL_STATE)

    const updatePortfolio = (newPortfolio,newUsdBalance) => {
        const updateTotalBalance = () => {
            const portfolioValue = portfolioArray.map(v => parseInt(v.value)).reduce((t,v) => t + v, 0)
            return portfolioValue + usdBalance
        }

        disbatch({type: 'SET_PORTFOLIO', payload: {portfolioArray: newPortfolio, usdBalance:newUsdBalance, totalBalance: updateTotalBalance()}})
    }

    useEffect(()=> {

        async function updatePrices(){
            portfolioArray.forEach(asset => {
                fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${asset.id}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
                .then(res => res.json())
                .then(data => {
                    const newPortfolio = () => {
                        return portfolioArray.map(v => {
                            if(v.id === asset.id){
                                return {...v,coinData: data [0], value: data[0].current_price * v.amount}
                            }else {
                                return {...v}
                            }
                        })
                    }
                    updatePortfolio(newPortfolio,usdBalance)
                } )
            })
          }
          
          updatePrices()
    },[])

    function order(action,id,coinData,amount, price){
        if(action==='buy'){
            const newPortfolio = () => {
                const idArray = portfolioArray.map(v => v.id)
                if(idArray.includes(id)){
                    return(
                        portfolioArray.map(asset => {
                            if(asset.id === id){
                                return {id,coinData,amount: asset.amount + amount, value: asset.value + price}
                            }else{
                                return asset
                            }
                        })
                    )
                }else{
                    return [...portfolioArray, {id,coinData, amount, value: price}]
                }
            }
                
            const newUsdBalance = usdBalance - price
            updatePortfolio(newPortfolio(),newUsdBalance)
            
        }
        else if(action === 'sell'){
            const newPortfolio = () => {
                return(
                    portfolioArray.map(asset => {
                        if(asset.id === id){
                            return {...asset,amount: asset.amount - amount, value: (asset.amount - amount)*asset.coinData.current_price}
                        }else{
                            return asset
                        }
                    }).filter(v => v.amount > 0)
                )
                
            }
            const newUsdBalance = usdBalance + price
            updatePortfolio(newPortfolio(),newUsdBalance)
        }
    }

    return(
        <PortfolioContext.Provider value={{portfolioArray,order,usdBalance, totalBalance}}>
            {props.children}
        </PortfolioContext.Provider>
    )
}

export {PortfolioContextProvider, PortfolioContext}