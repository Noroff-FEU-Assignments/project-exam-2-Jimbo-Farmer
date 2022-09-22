import Layout from "./Layout";
import Head from "./Head";

export default function LoginLayout({children}) {
  return(
    <Layout pageId="login-page">
      <Head title='Administration' description="Read messages and create accommodation listings from the dashboard."/>
      <div id='login-page__container' className='main'>
        <div className='login-intro page-intro'>
          <h1>Administrator Login</h1>
          <p>Please log in to continue</p>
        </div>
        {children}
      </div>
    </Layout>
  )
}
