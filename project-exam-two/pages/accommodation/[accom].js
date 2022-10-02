import axios from "axios";
import Head from '../../components/Head';
import Layout from '../../components/Layout';
import { BASE_URL } from "../../constants/baseUrl";
import Details from "../../components/Details";

/**
 * Generates pages for each accommodation.  
 * @Page
 * @param {list} accomm- list of accommodation.
 * @returns {HTMLElement}
 */

export default function SingleAccommodation({ accomm }) {
  return(
    <Layout>
      <Head title={accomm.data.attributes.name} description={accomm.data.attributes.description}/>
      <Details acc={accomm}/>
    </Layout>
  );
}

export async function getStaticPaths(){
  const url = BASE_URL +"api/accommodations"
  try {
    const response = await axios.get(url);
    const accomm = response.data;
    const paths = accomm.data.map(item => {
      return {
        params: {accom: item.id.toString()}
      }  
    });

    return {paths, fallback: 'blocking'};
    
  } catch (error) {
    console.log(error);
  }
}

export async function getStaticProps({ params }){
  const url = BASE_URL + "api/accommodations/" + params.accom + "?populate=*";
  let accomm = null;  
  try {
    const response = await axios.get(url);
    accomm = response.data;
  } catch (error) {
    console.log(error);
  }
  return {
    props: {accomm: accomm},
    revalidate: 60,
  };
}

  