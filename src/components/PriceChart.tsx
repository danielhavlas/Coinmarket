import React,{useEffect, useState, useRef} from "react"
import Chart, {ChartData, ChartOptions} from 'chart.js/auto'
import {Line} from "react-chartjs-2"
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(ChartDataLabels);

interface IPriceChartProps {
    id: number,
    range: number,
    large: boolean,
    price: number,
    green: boolean
}

function PriceChart (props:IPriceChartProps){
    const rangeInDays = ['1','3','7','30','180','365','max']
    const [chartData, setChartData] = useState([])
    const chartRef = useRef<ForwardedRef<Chart<TType, TData, TLabel>>>(null)
    const [gradient, setGradient] = useState<CanvasGradient>()

    useEffect(()=>{
        async function getChartData(){
            try {
                const res = await fetch(`https://api.coingecko.com/api/v3/coins/${props.id}/market_chart?vs_currency=usd&days=${rangeInDays[props.range]}`)
                const data = await res.json()
                const filter = props.large? props.range === 6 ? 20 : props.range === 3 ? 15 : props.range === 1? 2 : 4 : 10
                const prices = data.prices.filter((_, index) => index % filter === 0)
                setChartData(prices)
            } catch (error) {
                console.log(error);
            }
        }
        getChartData()
    },[props.range,props.id])

    useEffect(()=>{
        if(chartRef.current){
            const canvas = chartRef.current
            const ctx = canvas.ctx
            const gradient = ctx.createLinearGradient(0, 0, 0, 350);
            gradient.addColorStop(0, '#E8E7FF');
            gradient.addColorStop(0.85, 'rgba(255,255,255,1)');
            setGradient(gradient)
        }
    },[])

    return(
        <>
        {props.large? <div className="chart-container">
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
                    tooltip: {
                        enabled: false 
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
                                return props.price;
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
        </div> : <div className="small-chart">  <Line 
            ref={chartRef}
            
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
                        borderColor: props.green? 'rgb(0, 231, 0)' : 'red',
                    }
                },
                
                plugins: {
                    
                    legend:{
                        display: false,
                        
                    },
                    tooltip: {
                        enabled: false
                      },
                    
                    datalabels: {
                        display:false,
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
             />
             </div>
        }
        </>
    )
}

export default PriceChart
