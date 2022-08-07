import {useEffect, useRef} from 'react'
import lottie from 'lottie-web'
import animation from '../assets/check-icon.json'

export default function OrderPopup(props){
    const iconRef = useRef(null)
    const x = props.status === 'finished'? 'open' : 'closed'
    useEffect(() => {
        if (props.status === 'finished') {
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
            <p className="fs-2 text-white">You {props.traded} {props.amount} <span className='uppercase'>{props.currency}</span> for {props.price}</p>
        </div>
    )
}