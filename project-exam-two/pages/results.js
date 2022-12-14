import Layout from '../components/Layout';
import Head from '../components/Head';
import AccommCard from '../components/AccommCard';

/**
 * Page for displaying results from homepage search
 * @Page
 * Results are fetched from localstorage. 
 * @returns {HTMLElement}
 */

export default function Results() {
  let resultsLength = 0;
  let resultsList = [];
  let input;
  if(typeof window !== 'undefined'){
    resultsList = JSON.parse(localStorage.getItem('ResultsList'));
    input = JSON.parse(localStorage.getItem('Input'));
    resultsLength = resultsList.length;
  }

  return(
    <Layout pageId='results'>
      <Head title='Results' description="Find your perfect getaway on Norway's west coast"/>
      <div className='results__container main'>
        <div className='results__intro page-intro'>
          <h1>Results</h1>
          <p>Showing {resultsLength} result(s) for &quot;{input}&quot;</p>
        </div>
        {resultsList.map((item)=>{
          return <AccommCard key={item.id} acc={item} />
        })}
      </div>
    </Layout>
  )
}