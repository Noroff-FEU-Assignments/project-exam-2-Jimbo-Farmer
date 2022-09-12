import { useEffect, useState } from 'react';
import { BASE_URL } from "../constants/baseUrl";
import axios from "axios";
import Dropdown from './Dropdown';

export default function SearchForm({list}) {
  console.log(list.accommodation.data)
  const [filteredList, setFilteredList] = useState([]);
  function handleChange(e){
    setFilteredList(searchDropdown(list.accommodation.data, e.target.value));
    console.log(filteredList);
  }
  return(
    <form className='search'>
      <div className='search__checkin'>
        <label htmlFor="checkin">Check In</label>
        <input type="date" name="checkin" id="checkin" />
      </div>
      <div className='search__checkout'>
        <label htmlFor="checkout">Check Out</label>
        <input type="date" name="checkout" id="checkout" />
      </div>
      <div className='search__accommodation'>
        <label htmlFor="accommodation-search">Search</label>
        <input onKeyUp={handleChange} type="text" name="accommodation-search" id="accommodation-search" />
        <button>Go</button> 
        <Dropdown filteredList={filteredList} />        
      </div>
    </form>
  )
}

function searchDropdown(list, searchTerm){
  let output = list.filter(function(item){
    if(item.attributes.name.toLowerCase().includes(searchTerm)){
      return true;
    }
  })   
  if(searchTerm.length === 0){
    output = []};
  return output;   
}