import axios from 'axios';
import { BASE_URL } from '../constants/baseUrl';
import Layout from '../components/Layout';
import Head from '../components/Head';
import AccommCard from '../components/AccommCard';

export default function AllAccommodation(props) {
  console.log(props.accommodation.data)
  return(
    <Layout pageId='all-accommodation-page'>
      <Head title='Home' description='Browse and book accommodation in the Bergen area with Holidaze - your gateway to the fjords'/>
      <div className='all-accommodation__container'>
        <div className='all-accommodation__intro'>
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
  console.log("fetching");
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
  };
}