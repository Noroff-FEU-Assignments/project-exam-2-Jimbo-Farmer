import axios from 'axios';
import Head from '../components/Head';
import Layout from '../components/Layout';
import {useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from 'react';
import { LOGIN_URL } from '../constants/loginUrl';

const schema = yup.object().shape({
  email: yup.string().required("Please provide an email").email("Please enter a valid email address"),
  password: yup.string().required("Please enter a password")
})

export default function Login(){
  if(JSON.parse(localStorage.getItem('Token'))){
    setSuccess(true)
  }

  const [sendError, setSendError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data){
    setSuccess(false);
    setSubmitting(true);
    setSendError(null);
    console.log(data);
    try {
      const response = await axios.post(LOGIN_URL, data);
      if(response.statusText === "OK"){
        localStorage.setItem('Token', JSON.stringify(response.data.data.token));
        setSuccess(true);
      }
      
    } catch (error) {
      console.log(error);
      setSendError("Apologies, an error has occurred.");
    } finally {
      setSubmitting(false);
    }
  }

  if(submitting){
    return (
    <Layout pageId="login-page">
      <Head title='Administration' description="Read messages and create accommodation listings from the dashboard."/>
      <div id='login-page__container'>
        <div className='login-intro'>
          <h1>Administrator Login</h1>
          <p>Please log in to continue</p>
        </div>
        <div>Logging in...</div>
      </div>
    </Layout>
    )
  }

  if(success){
    return (
      <Layout pageId="login-page">
        <Head title='Administration' description="Read messages and create accommodation listings from the dashboard."/>
        <div id='login-page__container'>
          <div className='login-intro'>
            <h1>Dashboard</h1>
            <p>View messages, booking enquiries and create accommodation listings</p>
          </div>
          <button>Logout</button>
        </div>
      </Layout>
    )
  }

  if(sendError){
    <Layout pageId="login-page">
      <Head title='Administration' description="Read messages and create accommodation listings from the dashboard."/>
      <div id='login-page__container'>
        <div className='login-intro'>
          <h1>Administrator Login</h1>
          <p>Please log in to continue</p>
        </div>
        <div>{sendError}</div>
      </div>
    </Layout>
  }

  return(
    <Layout pageId="login-page">
      <Head title='Administration' description="Read messages and create accommodation listings from the dashboard."/>
        <div id='login-page__container'>
          <div className='login-intro'>
          <h1>Administrator Login</h1>
          <p>Please log in to continue</p>
        </div>
        <form id='login-form' onSubmit={handleSubmit(onSubmit)}>
          <div className='login-form__item'>
            <label htmlFor='email'>Email</label>
            <input {...register("email")} />
            {errors.email && <span className='form__error login-form__error'>{errors.email.message}</span>}
          </div>
          <div className='login-form__item'>
            <label htmlFor='password'>Password</label>
            <input {...register("password")} type="password"/>
            {errors.password && <span className='form__error login-form__error'>{errors.password.message}</span>}
          </div>
          <div className='login-form__button-container button-container'>
            <button>Send</button>
          </div> 
        </form>
      </div>
    </Layout>
  )
}