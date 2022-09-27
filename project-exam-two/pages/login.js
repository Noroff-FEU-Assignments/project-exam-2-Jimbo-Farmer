import axios from 'axios';
import { useEffect, useContext, useState } from 'react';
import {useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LOGIN_URL } from '../constants/loginUrl';
import AuthContext from '../context/AuthContext';
import LoginLayout from '../components/LoginLayout';
import Dashboard from '../components/Dashboard';

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
      <LoginLayout><div className='form-feedback'>Logging in...<div className='loading'></div></div></LoginLayout>
    )
  }

  if(sendError){
    return (
      <LoginLayout><div className='form-feedback'><div>{sendError}</div></div></LoginLayout>
    )
  }

  if(success){
    return (
      <Dashboard />  
    )
  }
  
  return(
    <LoginLayout>
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
    </LoginLayout>
  )
}