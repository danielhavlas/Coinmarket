import { useContext } from "react"
import { PortfolioContext } from "../PortfolioContext"



export default function Portfolio(){

    const {portfolioArray, usdBalance, totalBalance} = useContext(PortfolioContext)
    console.log(portfolioArray);

    const assets = portfolioArray.map((asset,index) => {
        const allocation = (asset.value/totalBalance).toFixed(2)
        return(
            <tr key={index} className='fs-4'>
                <td className="flex gap-0 align-center">
                    <img src={asset.coinData.image} className='small-img'/>
                    <p>{asset.coinData.name}</p>
                </td>
                <td className="text-blue">${asset.value}</td>
                <td>${asset.coinData.current_price}</td>
                <td>{allocation}%</td>
            </tr>
        )
    })
    return(
        <div className="">
            <table className="container table">
                <thead>
                    <tr className='fs-5 text-grey' >
                        <th>Name</th>
                        <th>Balance</th>
                        <th>Price</th>
                        <th>Allocation</th>
                    </tr>
                </thead>
                <tbody>
                    {assets}
                </tbody>
            </table>
        </div>
    )
}