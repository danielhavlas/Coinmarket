import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import {useNavigate, Link} from 'react-router-dom'
import { useMobileOnly } from '../hooks/useMobileOnly'
import { fetchData } from "../utils/fetchData.utils.ts";

interface IOptions {
  value: number,
  label: JSX.Element
}

interface ISearchBarProps {
  closeSearch: (param: string) => void
}

interface ICoinData {
  id: number,
  image: string,
  name: string
}

export default function Searchbar({closeSearch}:ISearchBarProps){

    const [options, setOptions] = useState<IOptions[]>([])
    const [value, setValue] = useState<IOptions | null>()
    const [searchData,setSearchData] = useState<ICoinData[]>([])
    const {mobileOnly} = useMobileOnly()
    const [key,setKey] = useState('')
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`
  
    const navigate = useNavigate()

    useEffect(()=>{
      const getData = async () => {
        const data = await fetchData<ICoinData[]>(url)
        setSearchData(data)
      }
      getData()
    },[])

    function handleChange(o) {
      setValue(o)
    }
    
    function search(){
      if (value){
        navigate(`/coins/${value.value}`)
        setValue(null)
      }
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
            height:mobileOnly?'1000px':'300px',
        }),
        menuList: (provided) =>({
            ...provided,
            height:'100%',
        })
      }


    function searchInput(){
        const options: IOptions[] = searchData.map(coin => {
            return{
                value: coin.id,
                label: <Link to={`/currencies/${coin.id}`} onClick={() => closeSearch('closed')} className={`option align-center ${mobileOnly? 'bg-black text-white' : 'bg-white text-black'} flex gap-1`}>
                        <img className='small-img' src={coin.image}/>
                        <p>{coin.name}</p>
                       </Link> ,
            }
        })
        setOptions(options)
    }
    

    useEffect(()=>{
      if(key==='Enter'){
        search()
      }
    },[key])

    
    

    return(
      <Select 
        onKeyDown={e => setKey(e.code)} 
        onInputChange={searchInput} 
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