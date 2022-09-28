import { useRouter } from "next/router";
import Link from "next/link";
import Head from "./Head";
import Layout from "./Layout";

/**
 * Generates a dashboard for the admin user after checking that they have successfully logged in
 * @Component
 * @param {none} - 
 * @returns {HTMLElement}
 */

export default function Dashboard() {
  const router = useRouter();
  function handleClick(){
    localStorage.removeItem('Authorization');
    router.reload();
  }
  return(
    <Layout pageId="login-page">
        <Head title='Administration' description="Read messages and create accommodation listings from the dashboard."/>
        <div id='login-page__container' className='main'>
          <div className='dashboard-intro page-intro'>
            <h1>Dashboard</h1>
            <p>View messages, booking enquiries and create accommodation listings</p>
          </div>
          <div className= 'dashboard__link'>
            <Link href="/messages">
              <a>Messages</a>
            </Link>
          </div>
          <div className= 'dashboard__link'>
            <Link href="/enquiries">
              <a>Booking Enquiries</a>
            </Link>
          </div>
          <div className= 'dashboard__link'>
            <Link href="/create">
              <a>New Accommodation</a>
            </Link>
          </div>
          <div className='button-container'>
            <button id="logout" onClick={handleClick}>Logout</button>
          </div>
        </div>
    </Layout>    
  )
}
