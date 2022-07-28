import React,{useEffect, useState} from 'react'
const PortfolioContext = React.createContext()

function PortfolioContextProvider(props){
    const [portfolioArray, setPortfolioArray] = useState([])
    const [balance, setBalance] = useState(100000)

    function order(action,id,coinData,amount, price){
        if(action==='buy'){
            const idArray = portfolioArray.map(v => v.id)
            setPortfolioArray(prevPortfolioArray => {
                if(idArray.includes(id)){
                    return(
                        prevPortfolioArray.map(asset => {
                            if(asset.id === id){
                                return {id,coinData,amount: asset.amount + amount, value: asset.value + price}
                            }else{
                                return asset
                            }
                        })
                    )
                }else{
                    return [...prevPortfolioArray, {id,coinData, amount, value: price}]
                }
            })
            setBalance(prevBalance => prevBalance - price)
            
        }
        else if(action === 'sell'){

        }
    }

    return(
        <PortfolioContext.Provider value={{portfolioArray,order,balance}}>
            {props.children}
        </PortfolioContext.Provider>
    )
}

export {PortfolioContextProvider, PortfolioContext}