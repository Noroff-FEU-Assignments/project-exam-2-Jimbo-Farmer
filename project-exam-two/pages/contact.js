import axios from 'axios';
import Link from 'next/link';
import {useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from 'react';
import { CONTACT_URL } from '../constants/contactUrl';
import ContactLayout from '../components/ContactLayout';

/**
 * Page for contact form
 * @Page
 * Generates contact form and validates using yup. 
 * Sends form using axios and returns depend on response from api (success, error, submitting)
 * @returns {HTMLElement}
 */

const schema = yup.object().shape({
  name: yup.string().required("Please provide a name"),
  email: yup.string().required("Please provide your email address").email("Please enter a valid email address"),
  messagecontent: yup.string().required("Please enter your message").min(10, "Minimum 10 characters").max(300, "Maximum 300 characters")
})

export default function Contact(){
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
      const response = await axios.post(CONTACT_URL, {"data": data});
      if(response.request.statusText === "OK"){
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
      <ContactLayout><div className='form-feedback'>Sending...<div className='loading'></div></div></ContactLayout>
    )
  }

  if(sendError){
    return (
      <ContactLayout><div className='form-feedback'>{sendError}</div></ContactLayout>
    )
  }

  if(success){
    return (
      <ContactLayout>
        <div className='form-feedback'>
          <div>Your message has been received!</div>
          <Link href="/"><a className='contact-page__home-link'>Return to homepage</a></Link>
        </div>
      </ContactLayout>
      )
  }

  return(
    <ContactLayout>
      <form id='contact-form' onSubmit={handleSubmit(onSubmit)}>
        <div className='contact-form__item'>
          <label htmlFor='name'>Name</label>
          <input {...register("name")} />
          {errors.name && <span className='form__error contact-form__error'>{errors.name.message}</span>}
        </div>
        <div className='contact-form__item'>
          <label htmlFor='email'>Email</label>
          <input {...register("email")} />
          {errors.email && <span className='form__error contact-form__error'>{errors.email.message}</span>}
        </div>
        <div className='contact-form__item'>
          <label htmlFor='messagecontent'>Message</label>
          <textarea {...register("messagecontent")} rows="5"/>
          {errors.messagecontent && <span className='form__error contact-form__error'>{errors.messagecontent.message}</span>}
        </div>
        <div className='contact-form__button-container button-container'>
          <button>Send</button>
        </div> 
      </form>
    </ContactLayout> 
  )
}