import axios from 'axios';
import { ENQUIRY_URL } from '../constants/enquiriesUrl';
import Layout from '../components/Layout';
import Head from '../components/Head';
import AuthContext from '../context/AuthContext';
import { useEffect, useState, useContext } from 'react';
import EnquiryCard from '../components/EnquiryCard';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Enquiries() {
  const [auth, setAuth] = useContext(AuthContext);
  const [enquiryList, setEnquiryList] = useState([]);
  const router = useRouter();
  useEffect(()=>{
    if(!auth){
      router.push('/login');
    }
  });
  
  useEffect(() => {
    async function getEnquirys(){
      try {
        const response = await axios.get(ENQUIRY_URL, {headers: {Authorization:  `Bearer ${auth.data.jwt}`}} );
        setEnquiryList(response.data.data);
      } catch (error) {
        console.log(error)
      }
    }
    getEnquirys();
  });
  
  if(!enquiryList.length){
    return(
      <Layout pageId='enquirys-page'>
        <Head title='Enquirys' description='View contact forms'/>
        <div className='enquirys__container main'>
          <div className='enquirys__intro'>
            <Link href='/login'><a className='dashboard-link'>Back to Dashboard</a></Link>
            <h1>Enquiries</h1>
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
        <div className='enquirys__intro'>
          <Link href='/login'><a className='dashboard-link'>Back to Dashboard</a></Link>
          <h1>Enquiries</h1>
          <p>View, sort and filter booking enquiries.</p>
        </div>
        {enquiryList.map((enquiry)=>{
          return <EnquiryCard key={enquiry.id} accommodation={enquiry.attributes.accommodationname} checkin={enquiry.attributes.checkin} checkout={enquiry.attributes.checkout} adults={enquiry.attributes.adults} noOfChildren={enquiry.attributes.children} name={enquiry.attributes.name} email={enquiry.attributes.email} phone={enquiry.attributes.phone} query={enquiry.attributes.query} /> 
        })}
      </div>
    </Layout>
  )
}