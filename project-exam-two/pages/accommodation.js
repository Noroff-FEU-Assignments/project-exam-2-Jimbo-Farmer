import axios from 'axios';
import { BASE_URL } from '../constants/baseUrl';
import Layout from '../components/Layout';
import Head from '../components/Head';
import AccommCard from '../components/AccommCard';

/**
 * Page showing all accommodation
 * @Page
 * @param {Object} props- list of all accommodation from the api
 * @returns {HTMLElement}
 */

export default function AllAccommodation(props) {
  return(
    <Layout pageId='all-accommodation-page'>
      <Head title='Accommodation' description='Browse through all accommodation on Holidaze - your gateway to the fjords'/>
      <div className='all-accommodation__container main'>
        <div className='all-accommodation__intro page-intro'>
          <h1>Accommodation</h1>
          <p>Browse through everything we have to offer at Holidaze</p>
        </div>
        {props.accommodation.data.map((item)=>{
          return <AccommCard key={item.id} acc={item} />
        })}
      </div>
    </Layout>
  )
}

export async function getStaticProps(){
  const url = BASE_URL + "api/accommodations?populate=*";
  let accommodation = [];
  try {
    const response = await axios.get(url);
    accommodation = await response.data;
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      accommodation: accommodation,
    },
    revalidate: 60,
  };
}