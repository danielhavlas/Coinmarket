import Select from 'react-select'
import { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

export default function Searchbar(){

    const [options, setOptions] = useState([])
    const [inputValue, setInputValue] = useState([])
    const [recentSearches, setRecentSearches] = useState([])
    const [searchData,setSearchData] = useState([])
    const [selectedOption, setSelectedOption] = useState()
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`
  
    const navigate = useNavigate()

    useEffect(()=>{
      fetch(url)
      .then(res => res.json())
      .then(data => {
        setSearchData(data)
      })

      if(inputValue.length===0){
        setOptions(recentSearches.map(v => ({label: v.name, value: v.id})))
      }
    },[inputValue])

    function handleChange(o){
        setSelectedOption(o)
        setRecentSearches(prevRecentSearches => [o, ...prevRecentSearches] )
        navigate(`/coins/${o.value}`)
    }

    const searchStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: 'hsl(255 255% 255%)',
            border:'none',
        }),
        input: (provided) =>({
            ...provided,
            color:'white',
    
        }),
        noOptionsMessage: (provided) =>({
            ...provided,
            display:'none',
        }),
        indicatorsContainer: (provided) =>({
            ...provided,
            display:'none',
        }),
    
      }

    const [key,setKey] = useState()

    function searchInput(input){
        const tempInput = inputValue
        setInputValue(input)
        // if(input==='' && key !=='Backspace'){setInputValue(tempInput)}
            
        const options = searchData.map(coin => {
            return{
                value: coin.id,
                label: coin.name,
            }
        })
        setOptions(options)
    }

    
    
    

    return(
      <Select 
        onKeyDown={(k)=> setKey(k.code)} 
        onInputChange={searchInput} 
        placeholder='Search' 
        onChange={handleChange} 
        className='select' 
        value={selectedOption}
        styles={searchStyles} 
        options={options} 
      />
    )
}