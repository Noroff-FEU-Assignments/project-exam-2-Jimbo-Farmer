import axios from 'axios';
import {useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from 'react';
import { ENQUIRY_URL } from '../constants/enquiriesUrl';
import Link from 'next/link';
import EnquiryModalLayout from './EnquiryModalLayout';
import dateDefault from '../utils/dateDefault';

/**
 * Generates a modal showing a form to make a booking enquiry. 
 * Validates the form and handles submission using yup and axios.  
 * @Component
 * @param {String} accommName - the accommodation name to be used to auto-populate this field on the form
 * @param {Function} onClose - function to hide the modal
 * @param {Boolean} show - modal shows when this parameter is true
 * @returns {HTMLElement}
 */

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
  const dates = dateDefault();
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
      <EnquiryModalLayout visibility={modalVisibility} close={onClose} intro={'Your enquiry form is being submitted.'} loading={true} />
    )
  }

  if(success){
    return (
      <EnquiryModalLayout visibility={modalVisibility} close={onClose} intro={'Your enquiry form has been successfully sent.'} loading={false}>
        <Link href='/'><a className='enquiry__link-to-home'>&lt;&lt; Back to Hompage</a></Link>
      </EnquiryModalLayout>
    )
  }

  if(sendError){
    return (
      <EnquiryModalLayout visibility={modalVisibility} close={onClose} intro={'Apologies, an error has occurred.'} loading={false} />
    )
  }

  return(
    <EnquiryModalLayout visibility={modalVisibility} close={onClose} intro={'Please fill in the enquiry form below and the accommodation provider will get back to you as soon as possible.'} loading={false}>
      <form id='enquiry-form' onSubmit={handleSubmit(onSubmit)}>
        <div className='enquiry-form__item enquiry-form__accommodation-name'>
          <label htmlFor='accommodationname'>Accommodation</label>
          <input {...register("accommodationname")} defaultValue={accommName}/>
          {errors.accommodationname && <span className='form__error enquiry-form__error'>{errors.accommodationname.message}</span>}
        </div>
        <div className='enquiry-form__item enquiry-form__checkin'>
          <label htmlFor='checkin'>Check-in Date</label>
          <input {...register("checkin")} type="date" id='checkin' defaultValue={dates.checkin}/>
          {errors.checkin && <span className='form__error enquiry-form__error'>{errors.checkin.message}</span>}
        </div>
        <div className='enquiry-form__item enquiry-form__checkout'>
          <label htmlFor='checkout'>Check-out Date</label>
          <input {...register("checkout")} type="date" id='checkout' defaultValue={dates.checkout}/>
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
    </EnquiryModalLayout>  
  )
}