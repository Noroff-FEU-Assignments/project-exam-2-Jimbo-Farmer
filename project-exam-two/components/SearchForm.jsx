import { useState } from 'react';
import { useRouter } from 'next/router';
import dateDefault from '../utils/dateDefault';
import Dropdown from './Dropdown';

/**
 * Generates search form for the homepage and passes search (filter) results to dropdown element.  
 * Listens for input field change and generates a filtered list. 
 * Stores results in localstorage for use by the results page. 
 * @Component
 * @param {Array} list - list of all accommodation from the api
 * @returns {HTMLElement}
 */

export default function SearchForm({list}) {
  const [filteredList, setFilteredList] = useState([]);
  const [input, setInput] = useState('');
  const router = useRouter();
  const dates = dateDefault();

  function handleChange(e){
    setFilteredList(searchDropdown(list.accommodation.data, e.target.value));
    if(e.target.value.length){
      setInput(e.target.value);
    } else {
      setInput('');
    }
  }

  //Redirect to results page and use localstorage to store search terms and list of results to use on results page.
  function handleSearchClick(e){     
    e.preventDefault();
    if(document.querySelector('#accommodation-search').value.length === 0){ 
      //If no input given, display all accommodation on results page rather than none. 
      localStorage.setItem('ResultsList', JSON.stringify(list.accommodation.data));
    } else {
      localStorage.setItem('ResultsList', JSON.stringify(filteredList));
    }   
    localStorage.setItem('Input', JSON.stringify(input));
    router.push('/results');
  }

  return(
    <form className='search'>
      <div className='search__checkin'>
        <label htmlFor="checkin">Check In</label>
        <input type="date" name="checkin" id="checkin" defaultValue={dates.checkin} />
      </div>
      <div className='search__checkout'>
        <label htmlFor="checkout">Check Out</label>
        <input type="date" name="checkout" id="checkout" defaultValue={dates.checkout} />
      </div>
      <div className='search__accommodation'>
        <label htmlFor="accommodation-search">Search</label>
        <input onChange={handleChange} type="text" name="accommodation-search" id="accommodation-search" />
        <button onClick={handleSearchClick}>Go</button> 
        <Dropdown filteredList={filteredList} input={input} />        
      </div>
    </form>
  )
}

function searchDropdown(list, searchTerm){
  let output = list.filter(function(item){
    if(item.attributes.name.toLowerCase().includes(searchTerm.toLowerCase())){
      return true;
    }
  })   
  if(searchTerm.length === 0){
    output = []};
  return output;   
}