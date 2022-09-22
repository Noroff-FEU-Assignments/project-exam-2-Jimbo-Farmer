import axios from 'axios';
import { CONTACT_URL } from '../constants/contactUrl';
import Layout from '../components/Layout';
import Head from '../components/Head';
import AuthContext from '../context/AuthContext';
import { useEffect, useState, useContext } from 'react';
import MessageCard from '../components/MessageCard';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Messages() {
  const [auth, setAuth] = useContext(AuthContext);
  const [messageList, setMessageList] = useState([]);
  const router = useRouter();
  useEffect(()=>{
    if(!auth){
      router.push('/login');
    }
  });
  
  useEffect(() => {
    async function getMessages(){
      try {
        const response = await axios.get(CONTACT_URL, {headers: {Authorization:  `Bearer ${auth.data.jwt}`}} );
        setMessageList(response.data.data);
      } catch (error) {
        console.log(error)
      }
    }
    getMessages();
  });
  
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
          return <MessageCard key={message.id} name={message.attributes.name} email={message.attributes.email} content={message.attributes.messagecontent} /> 
        })}
      </div>
    </Layout>
  )
}
