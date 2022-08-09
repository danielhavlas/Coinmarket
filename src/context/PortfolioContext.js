import React,{useEffect, useState} from 'react'
const PortfolioContext = React.createContext()

function PortfolioContextProvider(props){
    const [portfolioArray, setPortfolioArray] = useState([])
    const [totalBalance, setTotalBalance] = useState()
    const [usdBalance, setUsdBalance] = useState(100000)

    useEffect(()=> {

        const portArrStorage = JSON.parse(localStorage.getItem('portfolio'))
        setPortfolioArray(prevPortfolioArray => portArrStorage === null? prevPortfolioArray : portArrStorage)
        const usdBalanceStorage = localStorage.getItem('usdBalance')
        setUsdBalance(prevUsdBalance => usdBalanceStorage === null? prevUsdBalance : Number(usdBalanceStorage))
        const totalBalanceStorage = localStorage.getItem('totalBalance')
        setTotalBalance(prevTotalBalance => totalBalanceStorage === null? prevTotalBalance : Number(totalBalanceStorage))
        async function updatePrices(){
            portArrStorage.forEach(asset => {
                fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${asset.id}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
                .then(res => res.json())
                .then(data => {
                    setPortfolioArray(prevPortfolioArray => {
                        return prevPortfolioArray.map(v => {
                            if(v.id === asset.id){
                                return {...v,coinData: data [0], value: data[0].current_price * v.amount}
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
        const portfolioValue = portfolioArray.map(v => parseInt(v.value)).reduce((t,v) => t + v, 0)
        setTotalBalance(portfolioValue + parseInt(usdBalance))
    },[portfolioArray])

    useEffect(() => {
        localStorage.setItem('usdBalance', usdBalance)
    },[usdBalance])

    
    useEffect(() => {
        localStorage.setItem('totalBalance', totalBalance)
    },[totalBalance])

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
            setUsdBalance(prevBalance => prevBalance - price)
            
        }
        else if(action === 'sell'){
            setPortfolioArray(prevPortfolioArray => {
                return(
                    prevPortfolioArray.map(asset => {
                        if(asset.id === id){
                            return {...asset,amount: asset.amount - amount, value: (asset.amount - amount)*asset.coinData.current_price}
                        }else{
                            return asset
                        }
                    }).filter(v => v.amount > 0)
                )
                
            })
            setUsdBalance(prevBalance => prevBalance + price)
        }
    }

    return(
        <PortfolioContext.Provider value={{portfolioArray,order,usdBalance, totalBalance}}>
            {props.children}
        </PortfolioContext.Provider>
    )
}

export {PortfolioContextProvider, PortfolioContext}