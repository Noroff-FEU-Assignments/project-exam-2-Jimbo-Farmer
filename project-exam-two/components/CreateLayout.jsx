import Link from "next/link";
import Layout from "./Layout";
import Head from "./Head";

/**
 * Generates layout for the create page to avoid repetition for different outcomes (success, error, sending, null).  
 * @Component
 * @param {string} intro - short message.
 * @param {function} close - declared on line 70 of details - sets showModal to false. 
 * @param {boolean} loading - displays loading spinner when true.
 * @param {children} children - rest of page content.
 * @returns {HTMLElement}
 */

 export default function CreateLayout({intro, loading, children}) {
  let loadingClass = '';
  if(loading){
    loadingClass = 'loading';
  }
  return(
    <Layout pageId="create-page">
      <Head title='Create' description="Create a new accommodation listing."/>
      <div id='create-page__container' className='main'>
        <div className='create-intro page-intro'>
          <Link href='/login'><a className='dashboard-link'>Back to Dashboard</a></Link>
          <h1>Create New Listing</h1>
          <p>{intro}</p>
        </div>
        <div className={loadingClass}></div>
        {children}
      </div>
    </Layout>
  )
}