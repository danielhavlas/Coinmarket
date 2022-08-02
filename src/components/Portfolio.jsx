import { useState, useContext,useEffect } from "react"
import { PortfolioContext } from "../PortfolioContext"



export default function Portfolio(){

    const {portfolioArray, usdBalance, totalBalance, order} = useContext(PortfolioContext)
    const [displaySell, setDisplaySell] = useState(false)
    const [sellAmount, setSellAmount] = useState()
    const [sellAsset, setSellAsset] = useState()

    const assets = portfolioArray.map((asset,index) => {
        const allocation = (asset.value/totalBalance).toFixed(2) * 100
        return(
            <tr key={index} className='fs-4'>
                <td className="flex gap-0 align-center">
                    <img src={asset.coinData.image} className='small-img'/>
                    <div>
                        <p>{asset.coinData.name}</p>
                        <p className="text-grey uppercase">{asset.coinData.symbol}</p>
                    </div>
                </td>
                <td>
                    <div>
                        <p className="text-blue">${asset.value}</p>
                        <p className="text-grey uppercase">{asset.amount} {asset.coinData.symbol}</p>
                    </div>
                </td>
                <td>${asset.coinData.current_price}</td>
                <td>{allocation}%</td>
                <td className="text-white bg-blue order-button" onClick={() => {setSellAsset(asset);setDisplaySell(true); setSellAmount(asset.amount) }}>Sell</td>
            </tr>
        )
    })


    const sellField = (
         <div className='flex-vert gap-0 order-container'>
          <div className="flex gap-0">
            <button className='count-button fs-3 text-white bg-blue' onClick={()=> changeSellAmount('minus')}>-</button>
            <input className='count-input fs-5' value={sellAmount} onChange={(e) => changeSellAmount('set',e.target.value)} type='text'/>
            <button className='count-button fs-3 text-white bg-blue' onClick={()=> changeSellAmount('plus')}>+</button>
          </div>
          {/* <p className='order bg-blue text-white fs-3'>${(sellAmount * sellAsset.coinData.current_price).toFixed(2)}</p> */}
          <button className='order bg-blue text-white fs-3' onClick={() => order('sell',sellAsset.id,sellAsset.coinData ,sellAmount , sellAsset.coinData.current_price * sellAmount)}>Sell</button>
        </div>
    )

    function changeSellAmount(action,e){
        console.log(sellAsset.amount);
        if(action==='minus' && sellAmount !== 0){
            setSellAmount(prevSellAmount => prevSellAmount - 1 )
        }
        else if(action==='plus' && sellAmount !== sellAsset.amount){
            setSellAmount(prevSellAmount => prevSellAmount + 1 )
        }
        else if(action==='set' && !isNaN(e)){
            setSellAmount(Number(e) > sellAsset.amount? sellAsset.amount : Number(e))
        }
        
      }

    return(
        <div className="container ">
            <h2>Total balance: ${totalBalance}</h2>
            <div className="flex gap-1">
                <table className="card  table">
                    <thead>
                        <tr className='fs-5 text-grey' >
                            <th>Name</th>
                            <th>Balance</th>
                            <th>Price</th>
                            <th>Allocation</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="fs-4 text-blue">
                            <td>USD</td>
                            <td>${usdBalance}</td>
                        </tr>
                        {assets}
                    </tbody>
                </table>
                {displaySell && sellField}
            </div>
        </div>
    )
}