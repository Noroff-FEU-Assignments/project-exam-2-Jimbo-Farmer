import Layout from '../components/Layout';
import Head from '../components/Head';
import Dropdown from '../components/Dropdown';
import SearchForm from '../components/SearchForm';
import dateDefault from '../utils/dateDefault';
import { useEffect, useState } from 'react';
import { BASE_URL } from "../constants/baseUrl";
import axios from "axios";


export default function Home(props) {
  dateDefault();
  return(
    <Layout pageId='homepage'>
      <Head title='Home' description='Browse and book accommodation in the Bergen area with Holidaze - your gateway to the fjords'/>
      <div className='homepage-container'>
        <div className='hero'>
          <div className='introduction'>
            <p>Fjordside? Hillside? City centre? Find accommodation 
            in and around Bergen on Norway's stunning west coast. </p>
          </div>
          <SearchForm list={props} />
        </div>
        <h1 className='gateway'>Your Gateway to the Fjords</h1>
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
  };
}






