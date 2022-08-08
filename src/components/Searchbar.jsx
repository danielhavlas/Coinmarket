import Select from 'react-select'
import { useState, useEffect } from 'react'
import {useNavigate, Link} from 'react-router-dom'
import { useMobileOnly } from '../hooks/useMobileOnly'

export default function Searchbar(props){

    const [options, setOptions] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [value, setValue] = useState()
    const [searchData,setSearchData] = useState([])
    const {mobileOnly} = useMobileOnly()
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`
  
    const navigate = useNavigate()

    useEffect(()=>{
      fetch(url)
      .then(res => res.json())
      .then(data => {
        setSearchData(data)
      })
    },[inputValue])

    function handleChange(o){
      setValue(o)
    }
    
    function search(){
      navigate(`/coins/${value.value}`)
      setValue(null)
    }

    const searchStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: 'hsl(255 255% 255%)',
            border:'none',
        }),
        input: (provided) =>({
            ...provided,
            color:'black',
    
        }),
        noOptionsMessage: (provided) =>({
            ...provided,
            display:'none',
        }),
        indicatorsContainer: (provided) =>({
            ...provided,
            display:'none',
            
        }),
        menu: (provided) =>({
            ...provided,
            backgroundColor: mobileOnly? '#2C2C34' : 'white',
            height:mobileOnly?'1000px':'300px'
        }),
        menuList: (provided) =>({
            ...provided,
            height:'100%'
        }),
        indicatorsContainer: (provided) =>({
            ...provided,
            display:'none'
        })
    
      }


    function search(input){
        setInputValue(input)
        const options = searchData.map(coin => {
            return{
                value: coin.id,
                label: <Link to={`/currencies/${coin.id}`} onClick={() => props.closeSearch('closed')} className={`option align-center ${mobileOnly? 'bg-black text-white' : 'bg-white text-black'} flex gap-1`}>
                        <img className='small-img' src={coin.image}/>
                        <p>{coin.name}</p>
                       </Link> ,
            }
        })
        setOptions(options)
    }
    const [key,setKey] = useState()
    

    useEffect(()=>{
      if(key==='Enter'){
        search()
      }
    },[key])

    
    

    return(
      <Select 
        onKeyDown={e => setKey(e.code)} 
        onInputChange={search} 
        placeholder='Search' 
        onChange={handleChange} 
        onFocus={search}
        className='select' 
        value={value}
        styles={searchStyles} 
        options={options} 
      />
    )
}