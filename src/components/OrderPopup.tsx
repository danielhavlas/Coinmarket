import React, {useEffect, useRef} from 'react'
import lottie, { LottiePlayer } from 'lottie-web'
import animation from '../assets/check-icon.json'

interface IOrderPopupProps {
    status: string,
    traded: string,
    amount: number,
    currency: string
    price: number
}

export default function OrderPopup(props: IOrderPopupProps){
    const iconRef = useRef<HTMLDivElement>(null)
    const x = props.status === 'finished'? 'open' : 'closed'
    useEffect(() => {
        if (props.status === 'finished' && iconRef.current) {
           lottie.loadAnimation({
            container: iconRef.current, 
            animationData: animation, 
            renderer: 'svg', 
            loop: false, 
            autoplay: true, 
          }) 
        }
        return (() => {
            lottie.destroy()
        })
        
    },[props.status])
    return(
        <div className={`card order-popup order-popup-${x} bg-blue`}>
            <div ref={iconRef} className="icon-container bg-white"></div>
            <p className="fs-2 text-white">You {props.traded} {props.amount} <span className='uppercase'>{props.currency}</span> for ${props.price.toFixed(2)}</p>
        </div>
    )
}