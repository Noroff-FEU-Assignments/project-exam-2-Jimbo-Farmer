import axios from 'axios';
import {useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from 'react';
import { ENQUIRY_URL } from '../constants/enquiriesUrl';
import Link from 'next/link';

const schema = yup.object().shape({
  accommodationname: yup.string(),
  checkin: yup.string().required("Please provide a checkin date"),
  checkout: yup.string().required("Please provide a checkout date"),
  adults: yup.number().required("Please provide number of adults"),
  children: yup.number().required("Please provide number of children"),
  name: yup.string().required("Please provide a name"),
  email: yup.string().required("Please provide your email address").email("Please enter a valid email address"),
  phone: yup.string().required("Please provide a contact number"),
  query: yup.string().max(300, "Maximum 300 characters")
})

export default function EnquiryModal({accommName, onClose, show}){
  let modalVisibility = "hide";
  if(show){
    modalVisibility = "";
  }
  const [success, setSuccess] = useState(null);
  const [sendError, setSendError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data){
    setSubmitting(true);
    setSendError(null);
    setSuccess(null);

    try {
      const response = await axios.post(ENQUIRY_URL, {"data": data});
      if(response.statusText === "OK"){
        setSuccess(true);
      }
    } catch (error) {
      setSendError(true);
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  if(submitting){
    return (
      <div id='enquiry-modal__container' className={modalVisibility}>
        <button className='close-button' type='button' onClick={onClose}>Close</button>
        <div className='enquiry-intro page-intro'>
          <h1>Enquiry</h1>
          <p>Your enquiry form is being submitted. <div className='loading'></div></p>
        </div>
      </div>
    )
  }

  if(success){
    return (
      <div id='enquiry-modal__container' className={modalVisibility}>
        <button className='close-button' type='button' onClick={onClose}>Close</button>
        <div className='enquiry-intro page-intro'>
          <h1>Enquiry</h1>
          <p>Your enquiry form has been successfully sent.</p>
          <Link href='/'><a className='enquiry__link-to-home'>&lt;&lt; Back to Hompage</a></Link>
        </div>
      </div>
    )
  }

  if(sendError){
    return (
      <div id='enquiry-modal__container' className={modalVisibility}>
        <button className='close-button' type='button' onClick={onClose}>Close</button>
        <div className='enquiry-intro page-intro'>
          <h1>Enquiry</h1>
          <p>Apologies, an error has occurred.</p>
        </div>
      </div>
    )
  }

  return(  
    <div id='enquiry-modal__container' className={modalVisibility}>
      <div className='button-container'><button className='close-button' type='button' onClick={onClose}>Close</button></div>
      <div className='enquiry-intro page-intro'>
        <h1>Enquiry</h1>
        <p>Please fill in the enquiry form below and the accommodation provider will get back to you as soon as possible.</p>
      </div>
      <form id='enquiry-form' onSubmit={handleSubmit(onSubmit)}>
        <div className='enquiry-form__item enquiry-form__accommodation-name'>
          <label htmlFor='accommodationname'>Accommodation</label>
          <input {...register("accommodationname")} defaultValue={accommName}/>
          {errors.accommodationname && <span className='form__error enquiry-form__error'>{errors.accommodationname.message}</span>}
        </div>
        <div className='enquiry-form__item enquiry-form__checkin'>
          <label htmlFor='checkin'>Check-in Date</label>
          <input {...register("checkin")} type="date"/>
          {errors.checkin && <span className='form__error enquiry-form__error'>{errors.checkin.message}</span>}
        </div>
        <div className='enquiry-form__item enquiry-form__checkout'>
          <label htmlFor='checkout'>Check-out Date</label>
          <input {...register("checkout")} type="date"/>
          {errors.checkout && <span className='form__error enquiry-form__error'>{errors.checkout.message}</span>}
        </div>
        <div className='enquiry-form__additional-label'>Number of guests:</div>
        <div className='enquiry-form__item enquiry-form__adults'>
          <label htmlFor='adults'>Adults</label>
          <input {...register("adults")} type="number" defaultValue="1"/>
          {errors.adults && <span className='form__error enquiry-form__error'>{errors.adults.message}</span>}
        </div>
        <div className='enquiry-form__item enquiry-form__children'>
          <label htmlFor='children'>Children</label>
          <input {...register("children")} type="number" defaultValue="0"/>
          {errors.children && <span className='form__error enquiry-form__error'>{errors.children.message}</span>}
        </div>
        <div className='enquiry-form__item enquiry-form__name'>
          <label htmlFor='name'>Name</label>
          <input {...register("name")} />
          {errors.name && <span className='form__error enquiry-form__error'>{errors.name.message}</span>}
        </div>
        <div className='enquiry-form__item enquiry-form__email'>
          <label htmlFor='email'>Email</label>
          <input {...register("email")} />
          {errors.email && <span className='form__error enquiry-form__error'>{errors.email.message}</span>}
        </div>
        <div className='enquiry-form__item enquiry-form__phone'>
          <label htmlFor='phone'>Phone</label>
          <input {...register("phone")} type="tel"/>
          {errors.phone && <span className='form__error enquiry-form__error'>{errors.phone.message}</span>}
        </div>
        <div className='enquiry-form__item enquiry-form__query'>
          <label htmlFor='query'>Additional queries</label>
          <textarea {...register("query")} rows="4"/>
          {errors.query && <span className='form__error enquiry-form__error'>{errors.query.message}</span>}
        </div>
        <div className='enquiry-form__button-container button-container'>
          <button>Send</button>
        </div> 
      </form>
    </div>
  )
}