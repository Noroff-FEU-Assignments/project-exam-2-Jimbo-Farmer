import axios from 'axios';
import Head from '../components/Head';
import Layout from '../components/Layout';
import {useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from 'react';
import { CONTACT_URL } from '../constants/contactUrl';

const schema = yup.object().shape({
  name: yup.string().required("Please provide a name"),
  email: yup.string().required("Please provide your email address").email("Please enter a valid email address"),
  messagecontent: yup.string().required("Please enter your message").min(10, "Minimum 10 characters").max(300, "Maximum 300 characters")
})

export default function Contact(){
  const [loginError, setLoginError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data){
    setSubmitting(true);
    setLoginError(null);

    try {
      const response = await axios.post(CONTACT_URL, {"data": data});
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }

    console.log(data);

  }

  return(
    <Layout pageId="contact-page">
      <Head title='Contact' description="Any questions? Take contact and someone from the Holidaze team will get back to you with help and advice."/>
      <div id='contact-page__container'>
        <div className='contact-intro'>
          <h1>Contact us</h1>
          <p>Got a query? Wondering where to stay or what to do? Don't hesitate to get in touch! </p>
        </div>
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
            <label htmlFor='message'>Message</label>
            <textarea {...register("messagecontent")} />
            {errors.messagecontent && <span className='form__error contact-form__error'>{errors.messagecontent.message}</span>}
          </div>
          <div className='contact-form__button-container button-container'>
            <button>Send</button>
          </div> 
        </form>
      </div>
    </Layout>
  )
}