import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CONTACT_URL } from '../constants/contactUrl';
import AuthContext from '../context/AuthContext';
import Layout from '../components/Layout';
import Head from '../components/Head';
import MessageCard from '../components/MessageCard';

/**
 * Page for displaying messages to an administrator
 * @Page
 * Fetches messages and provides functionality to delete messages. 
 * @returns {HTMLElement}
 */

export default function Messages() {
  const [auth, setAuth] = useContext(AuthContext);
  const [messageList, setMessageList] = useState([]);
  const router = useRouter();
  const [update, setUpdate] = useState(false);
  
  useEffect(()=>{ !auth ? router.push('/login') : ""}, [auth, router]);
  
  useEffect(()=>{
    async function getMessages(){
      try {
        const response = await axios.get(CONTACT_URL, {headers: {Authorization:  `Bearer ${auth.data.jwt}`}} );
        setMessageList(response.data.data);
      } catch (error) {
        console.log(error)
      }
    }
    getMessages();
  }, [update, auth]);
  
  
  if(!messageList.length){
    return (
      <Layout pageId='messages-page'>
        <Head title='Messages' description='View contact forms'/>
        <div className='messages__container main'>
          <div className='messages__intro page-intro'>
            <Link href='/login'><a className='dashboard-link'>Back to Dashboard</a></Link>
            <h1>Messages</h1>
            <p>No messages</p>
          </div>
        </div>
      </Layout>
    )
  }
  return(
    <Layout pageId='messages-page'>
      <Head title='Messages' description='View contact forms'/>
      <div className='messages__container main'>
        <div className='messages__intro page-intro'>
          <Link href='/login'><a className='dashboard-link'>Back to Dashboard</a></Link>
          <h1>Messages</h1>
          <p>View messages received via the Holidaze contact form.</p>
        </div>
        {messageList.map((message)=>{
          return <MessageCard key={message.id} onDelete={()=>{setUpdate(!update)}} id={message.id} name={message.attributes.name} email={message.attributes.email} content={message.attributes.messagecontent} /> 
        })}
      </div>
    </Layout>
  )
}
