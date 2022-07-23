import React,{useEffect, useState, useRef} from "react"
import Chart from 'chart.js/auto'
import {Line,Bar} from "react-chartjs-2"
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(ChartDataLabels);

function PriceChart (props){
    const rangeInDays = ['1','3','7','30','180','365','max']
    const [chartData, setChartData] = useState([])
    const [volumeData, setVolumeData] = useState([])
    const chartRef = useRef()
    const [gradient, setGradient] = useState()


    useEffect(()=>{
        async function getChartData(){
            const res = await fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${rangeInDays[props.range]}`)
            const data = await res.json()
            const filter = props.range === 6 ? 20 : props.range === 3 ? 15 : props.range === 1? 2 : 4
            const prices = data.prices.filter((_, index) => index % filter === 0)
            const volume = data.total_volumes.filter((volume, index) => index % filter === 0)
            setChartData(prices)
            setVolumeData(volume)
            
        }
        getChartData()


    },[props.range])

    useEffect(()=>{

        const canvas = chartRef.current
        const ctx = canvas.ctx
        const gradient = ctx.createLinearGradient(0, 0, 0, 350);
        gradient.addColorStop(0, '#E8E7FF');
        gradient.addColorStop(0.8, 'rgba(255,255,255,1)');
        setGradient(gradient)
    },[])

    return(
        <>
        
        <div className="chart-container">
            <Line 
            ref={chartRef}
            className="chart"
            data={{
                
                labels: chartData.map((price)=> price[0]) ,
    
                datasets: [{
                    data: chartData.map((price)=>price[1]),
                },
                ],
                
            
            }}
            options={{
                maintainAspectRatio: false,
                elements:{
                    point:{
                        radius:0,
                    },
                    line:{
                        borderWidth:2,
                        borderColor: '#4b40ee',
                        backgroundColor: gradient,
                        fill: true,
                        pointRadius:0,
                        hitPointRadius:0,
                        hoverRadius:0,
                    }
                },
                layout:{
                    padding:{
                        right: 60
                    }
                },
                plugins: {
                    
                    legend:{
                        display: false,
                        
                    },
                    
                    datalabels: {
                        anchor: 'end',
                        align: 'right',
                        offset: -8,
                        color: function(context) {
                            if (context.dataIndex === context.dataset.data.length - 1)
                            {
                                return 'white'
                            }
                            return "";
                        },
                        backgroundColor: function(context) {
                            if (context.dataIndex === context.dataset.data.length - 1)
                            {
                                return '#4b40ee'
                            }
                            return "";
                        },
                        borderRadius: 4,
                        formatter: function(value, context) {
                            if (context.dataIndex === context.dataset.data.length - 1)
                            {
                                const lastPrice = value.toFixed(2)
                                return lastPrice;
                            }
                            return "";
                        },
                        font: {
                            family: 'Familjen Grotesk'
                        },
                       

                    },
                   
                },
                scales: {
                    
                    
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false,
                            
                          },
                      ticks: {
                        display: false,
                        maxTicksLimit:6,
                        
                      }
                    },
                    y: {
                      grid: {
                        display: false,
                        drawBorder: false,

                      },
                      ticks:{
                        display: false,
                      }
                    }
                },
                
            }}
            plugins={[ChartDataLabels]}
            />
        </div>
        </>
    )
}

export default PriceChart
