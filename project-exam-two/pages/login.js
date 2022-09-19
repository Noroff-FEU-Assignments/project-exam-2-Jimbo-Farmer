import { useEffect, useContext } from 'react';
import axios from 'axios';
import Head from '../components/Head';
import Layout from '../components/Layout';
import Dashboard from '../components/Dashboard';
import {useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from 'react';
import { LOGIN_URL } from '../constants/loginUrl';
import AuthContext from '../context/AuthContext';

const schema = yup.object().shape({
  identifier: yup.string().required("Please provide an email").email("Please enter a valid email address"),
  password: yup.string().required("Please enter a password")
})

export default function Login(){
  const [auth, setAuth] = useContext(AuthContext);
  useEffect(()=>{
    if(auth){
      setSuccess(true)
    }
  },[auth]);
  
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
    try {
      const response = await axios.post(LOGIN_URL, data);
      console.log(response);
      if(response.statusText === "OK"){
        setAuth(response);
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
      <div id='login-page__container' className='main'>
        <div className='login-intro'>
          <h1>Administrator Login</h1>
          <p>Please log in to continue</p>
        </div>
        <div>Logging in...</div><div className='loading'></div>
      </div>
    </Layout>
    )
  }

  if(success){
    return (
      <Layout pageId="login-page">
        <Head title='Administration' description="Read messages and create accommodation listings from the dashboard."/>
        <div id='login-page__container' className='main'>
          <Dashboard />
        </div>
      </Layout>
    )
  }

  if(sendError){
    <Layout pageId="login-page">
      <Head title='Administration' description="Read messages and create accommodation listings from the dashboard."/>
      <div id='login-page__container' className='main'>
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
        <div id='login-page__container' className='main'>
          <div className='login-intro'>
          <h1>Administrator Login</h1>
          <p>Please log in to continue</p>
        </div>
        <form id='login-form' onSubmit={handleSubmit(onSubmit)}>
          <div className='login-form__item'>
            <label htmlFor='identifier'>Email</label>
            <input {...register("identifier")} />
            {errors.identifier && <span className='form__error login-form__error'>{errors.identifier.message}</span>}
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