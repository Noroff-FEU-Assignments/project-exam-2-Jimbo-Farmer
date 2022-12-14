import axios from "axios";
import { useEffect } from 'react';
import { BASE_URL } from "../constants/baseUrl";
import homeimage1 from '../public/images/home-image-1.jpg';
import homeimage2 from '../public/images/home-image-2.jpg';
import homeimage3 from '../public/images/home-image-3.jpg';
import Layout from '../components/Layout';
import Head from '../components/Head';
import SearchForm from '../components/SearchForm';
import GatewayBlock from '../components/GatewayBlock';

/**
 * The homepage, where users can search for accommodation.
 * @Page
 * Fetches accommodation from API and provides search (filter) functionality
 * @param {children} props - accommodation list. 
 * @returns {HTMLElement}
 */

export default function Home(props) {
  console.log(props);
  useEffect(()=> {
    window.addEventListener('scroll', handleScroll);
    return()=>{
      window.removeEventListener('scroll', handleScroll);
    }
  })
  function handleScroll(){
    const navbar = document.querySelector("header");
    window.scrollY ? navbar.classList.add('scrolled') : navbar.classList.remove('scrolled');
  }
  
  return(
    <Layout pageId='homepage'>
      <Head title='Home' description='Browse and book accommodation in the Bergen area with Holidaze - your gateway to the fjords'/>
      <div className='homepage-container'>
        <div className='hero'>
          <div className='introduction'>
            <p>Fjordside? Hillside? City centre? Find accommodation 
            in and around Bergen on Norway&apos;s stunning west coast. </p>
          </div>
          <SearchForm list={props} />
        </div>
        <h1 className='gateway'>Your Gateway to the Fjords</h1>
        <div className='gateway-block-container'>
          <GatewayBlock image={homeimage1} imageAlt={'Bergen wharf buildings by the seafront'} 
          attribute={`Adrien Aletti on `} attributeLink={'https://unsplash.com/photos/Acuc51Q2gAg'} 
          heading={'Discover'} text={'From hiking in the mountains to fine dining in the city or boating on the fjord, Bergen and its surroundings have much to discover. '} />
          <GatewayBlock image={homeimage2} imageAlt={'Lake scene at dusk'} 
          attribute={`Lachlan Gowen on `} attributeLink={'https://unsplash.com/photos/vytw7y6yEeg'} 
          heading={'Relax'} text={'Whether you choose a hotel, B&B, cabin or campsite, you can rest assured that our hosts live up to our rigorous standards on comfort, cleanliness and safety.'} />
          <GatewayBlock image={homeimage3} imageAlt={'Narrow cobbled street in Bergen'} 
          attribute={`mahdis mousavi on `} attributeLink={'https://unsplash.com/photos/h5J8bpKkL3o'} 
          heading={'Experience'} text={'Fjord safaris, music, theater, mountain tops, cuisine, wildlife, nightlife, the list is endless...'} />
        </div>
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






