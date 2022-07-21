import { useEffect, useState } from "react"

export default function Stockpage(props){



    useEffect(() =>{
        fetch(`https://api.coingecko.com/api/v3/coins/bitcoin`)
    },[])
    return(
        <div>

        </div>
    )
}