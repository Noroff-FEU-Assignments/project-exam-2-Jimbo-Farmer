import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ENQUIRY_URL } from '../constants/enquiriesUrl';
import AuthContext from '../context/AuthContext';
import Layout from '../components/Layout';
import Head from '../components/Head';
import EnquiryCard from '../components/EnquiryCard';

/**
 * Page for displaying enquiries to an administrator
 * @Page
 * @returns {HTMLElement}
 */

export default function Enquiries() {
  const [auth, setAuth] = useContext(AuthContext);
  const [enquiryList, setEnquiryList] = useState([]);
  const router = useRouter();
  const [update, setUpdate] = useState(false);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(()=>{ !auth ? router.push('/login') : ""},[auth, router]);
  
  useEffect(() => {
    async function getEnquirys(){
      try {
        const response = await axios.get(ENQUIRY_URL, {headers: {Authorization:  `Bearer ${auth.data.jwt}`}} );
          setEnquiryList(response.data.data);
          if(document.querySelector("#nameSearch").value){      //Check if list is being filtered and if so: generate new filtered list using same filter input. 
            setFilteredList(filterEnquiries(enquiryList, document.querySelector("#nameSearch").value));
          } else {setFilteredList(response.data.data);}
      } catch (error) {
        console.log(error);
      }
    }
    getEnquirys();
  }, [update]);

  //Filter enquiries when filter input changes. 
  function handleChange(e){
    setFilteredList(filterEnquiries(enquiryList, e.target.value.toLowerCase()));
    if(!e.target.value.length){
      setFilteredList(enquiryList);
    }
  }

  // Function to filter enquiries list based on search term. 
  function filterEnquiries(list, searchTerm){
    let output = list.filter(function(item){
      if(item.attributes.accommodationname.toLowerCase().includes(searchTerm)){
        return true;
      }
    })   
    if(searchTerm.length === 0){
      output = []};
    return output;   
  }

  if(!enquiryList.length || !filteredList.length){
    return(
      <Layout pageId='enquirys-page'>
        <Head title='Enquirys' description='View contact forms'/>
        <div className='enquirys__container main'>
          <div className='enquirys__intro page-intro'>
            <Link href='/login'><a className='dashboard-link'>Back to Dashboard</a></Link>
            <h1>Enquiries</h1>
            <p>View and filter booking enquiries.</p>
            <label htmlFor="nameSearch">Filter by accommodation name: </label>
            <input onChange={handleChange} name='nameSearch' id='nameSearch' />
            <p>No enquiries</p>
          </div>
        </div>
      </Layout>
    )
  }

  return(
    <Layout pageId='enquirys-page'>
      <Head title='Enquirys' description='View contact forms'/>
      <div className='enquirys__container main'>
        <div className='enquirys__intro page-intro'>
          <Link href='/login'><a className='dashboard-link'>Back to Dashboard</a></Link>
          <h1>Enquiries</h1>
          <p>View and filter booking enquiries.</p>
          <label htmlFor="nameSearch">Filter by accommodation name: </label>
          <input onChange={handleChange} name='nameSearch' id='nameSearch' />
        </div>
        {filteredList.map((enquiry)=>{
          return <EnquiryCard key={enquiry.id} accommodationInfo={enquiry.attributes}/> 
        })}
      </div>
    </Layout>
  )
}

