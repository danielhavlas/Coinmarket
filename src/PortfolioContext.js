import React,{useEffect, useState} from 'react'
const PortfolioContext = React.createContext()

function PortfolioContextProvider(props){
    const [portfolioArray, setPortfolioArray] = useState([])
    const [balance, setBalance] = useState(100000)
    const [x,setX] = useState()

    useEffect(()=> {

        const portArrStorage = JSON.parse(localStorage.getItem('portfolio'))
        setPortfolioArray(prevPortfolioArray => portArrStorage === null? prevPortfolioArray : portArrStorage)
        const balanceStorage = localStorage.getItem('balance')
        setBalance(prevBalance => balanceStorage === null? prevBalance : balanceStorage)
        async function updatePrices(){
            portArrStorage.forEach(asset => {
                fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${asset.id}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
                .then(res => res.json())
                .then(data => {
                    setPortfolioArray(prevPortfolioArray => {
                        return prevPortfolioArray.map(v => {
                            if(v.id === asset.id){
                                return {...v,coinData: data [0], value: (data[0].current_price * v.amount).toFixed(2)}
                            }else {
                                return {...v}
                            }
                        })
                    })
                } )
            })
            
          }
          
          updatePrices()
    },[])

    useEffect(() => {
        localStorage.setItem('portfolio', JSON.stringify(portfolioArray))
    },[portfolioArray])

    useEffect(() => {
        localStorage.setItem('balance', balance)
    },[balance])
    
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