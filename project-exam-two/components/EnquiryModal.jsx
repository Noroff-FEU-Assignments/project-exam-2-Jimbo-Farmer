import axios from 'axios';
import Head from '../components/Head';
import Layout from '../components/Layout';
import {useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from 'react';
import { CONTACT_URL } from '../constants/contactUrl';

const schema = yup.object().shape({
  accommodationname: yup.string(),
  checkin: yup.string().required("Please provide a checkin date"),
  checkout: yup.string().required("Please provide a checkout date"),
  adults: yup.number().required("Please provide number of adults"),
  children: yup.number().required("Please provide number of children"),
  name: yup.string().required("Please provide a name"),
  email: yup.string().required("Please provide your email address").email("Please enter a valid email address"),
  phone: yup.number().required("Please provide a contact number"),
  query: yup.string().max(300, "Maximum 300 characters")
})

export default function Enquiry({accommName}){
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
    <div id='enquiry-modal__container'>
      <div className='enquiry-intro'>
        <h1>Enquiry</h1>
        <p>Please fill in the enquiry form below and the accommodation provider will get back to you as soon as possible.</p>
      </div>
      <form id='enquiry-form' onSubmit={handleSubmit(onSubmit)}>
        <div className='enquiry-form__item'>
          <label htmlFor='accommodationname'>Accommodation</label>
          <input {...register("accommodationname")} defaultValue={accommName}/>
          {errors.accommodationname && <span className='form__error enquiry-form__error'>{errors.accommodationname.message}</span>}
        </div>

        <div className='enquiry-form__item'>
          <label htmlFor='name'>Name</label>
          <input {...register("name")} />
          {errors.name && <span className='form__error enquiry-form__error'>{errors.name.message}</span>}
        </div>

        <div className='enquiry-form__item'>
          <label htmlFor='name'>Name</label>
          <input {...register("name")} />
          {errors.name && <span className='form__error enquiry-form__error'>{errors.name.message}</span>}
        </div>

        <div className='enquiry-form__item'>
          <label htmlFor='name'>Name</label>
          <input {...register("name")} />
          {errors.name && <span className='form__error enquiry-form__error'>{errors.name.message}</span>}
        </div>

        <div className='enquiry-form__item'>
          <label htmlFor='name'>Name</label>
          <input {...register("name")} />
          {errors.name && <span className='form__error enquiry-form__error'>{errors.name.message}</span>}
        </div>
        <div className='enquiry-form__item'>
          <label htmlFor='email'>Email</label>
          <input {...register("email")} />
          {errors.email && <span className='form__error enquiry-form__error'>{errors.email.message}</span>}
        </div>
        <div className='enquiry-form__item'>
          <label htmlFor='message'>Message</label>
          <textarea {...register("messagecontent")} />
          {errors.messagecontent && <span className='form__error enquiry-form__error'>{errors.messagecontent.message}</span>}
        </div>
        <div className='enquiry-form__button-container button-container'>
          <button>Send</button>
        </div> 
      </form>
    </div>
  )
}