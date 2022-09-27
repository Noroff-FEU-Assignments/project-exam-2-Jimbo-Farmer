import Layout from "./Layout";
import Head from "./Head";

/**
 * Generates layout for contact page to make contact.js less repetitive
 * @param {children} children - All additional page contents, depending on success/loading/error etc.  
 * @returns {void}
 */

export default function ContactLayout({children}) {
  return(
    <Layout pageId="contact-page">
        <Head title='Contact' description="Any questions? Take contact and someone from the Holidaze team will get back to you with help and advice."/>
        <div id='contact-page__container' className='main'>
          <div className='contact-intro page-intro'>
            <h1>Contact us</h1>
            <p>Got a query? Wondering where to stay or what to do? Don&apos;t hesitate to get in touch! </p>
          </div>
          {children}
        </div>
      </Layout>
  )
}
