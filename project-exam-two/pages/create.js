import { useRouter } from 'next/router';
import axios from 'axios';
import {useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState, useContext, useEffect } from 'react';
import { BASE_URL } from '../constants/baseUrl';
import AuthContext from '../context/AuthContext';
import CreateLayout from '../components/CreateLayout';

/**
 * Page for creating new accommodation listings
 * @Page
 * Generates contact form and validates using yup. 
 * Sends form using axios and returns depend on response from api (success, error, submitting)
 * @returns {HTMLElement}
 */

const schema = yup.object().shape({
  name: yup.string().required("Please enter the accommodation name"),
  description: yup.string().required("Please provide a description").min(30, "Minimum 30 characters"),
  features: yup.string().required("Please add features").min(10, "Minimum 10 characters"),
  price: yup.number().required("Please enter price per night").min(100, "Minimum price 100kr per night"),
})

export default function CreateAccommodation(){
  //Check for Auth and redirect if necessary
  const [auth] = useContext(AuthContext);
  const router = useRouter();
  useEffect(()=>{ !auth ? router.push('/login') : ""},[auth, router]);

  const [imageId, setImageId] = useState([20]);   // 20 is the ID of the placeholder image stored on strapi. 
  const [sendError, setSendError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [imageSubmitting, setImageSubmitting] = useState(null);
  const [success, setSuccess] = useState(false);
  const [feedback, setFeedback] = useState('');
  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema),
  });

  // Reset form when user will create more than one accommodation  
  async function handleClick(){
      await setSuccess(false);
      document.querySelector("#image-form").reset();
      document.querySelector("#create-form").reset();
  }
  
  // Submit file form, retrieve image id from response and add it to main form. 
  const [files, setFiles] = useState();
  async function handleImageSubmit(e){
    e.preventDefault();
    if(!files){
      return
    }
    setImageSubmitting(true);
    const formData = new FormData();
    for(let i = 0; i < files.length; i++){    //Add all image files to be uploaded
      formData.append('files', files[i]);
    }
    
    try {
      const response = await axios.post(BASE_URL+ 'api/upload', formData, {headers: {Authorization:  `Bearer ${auth.data.jwt}`}});
      if(response.statusText === "OK"){
        setFeedback('Images uploaded successfully');
        setImageSubmitting(null);
        let imageIdArray = [];
        for(let i = 0; i < response.data.length; i++){ // Get IDs of all newly uploaded image files and put in an array. 
          imageIdArray.push(response.data[i].id)
        }
        setImageId(imageIdArray);
      }
    } catch (error) {
      console.log(error);
      setSendError("Apologies, an error has occurred.");
    } finally {
      setSubmitting(false);
    }
  }

  async function onSubmit(data){
    setSuccess(false);
    setSubmitting(true);
    setSendError(null);
    data.images = imageId;  // Add image ID array to 'images' key to link new accommodation to these images. 
    try {
      const response = await axios.post(BASE_URL + 'api/accommodations', {"data": data}, {headers: {Authorization:  `Bearer ${auth.data.jwt}`}} );
      setSubmitting(true);
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
      <CreateLayout intro={'Submitting'} loading={true} />
    )
  }

  if(success){
    return (
      <CreateLayout intro={'New accommodation created successfully!'} loading={false} >
        <div className='button-container'><button onClick={handleClick}>Add Another</button></div>
      </CreateLayout>
    )
  }

  if(sendError){
    return(
      <CreateLayout intro={sendError} loading={false} />
    ) 
  }

  return(
    <CreateLayout intro={'Create a new accommodation listing using the form below. Add images first, then submit the rest of the details.'} loading={false}>
      <form id='image-form' onSubmit={handleImageSubmit}>
        <label htmlFor="imageFile">Add accommodation image(s) - select several files using CTRL key.</label>
        <input type="file" onChange={(e)=>setFiles(e.target.files)} multiple/>
        <div className='image-form__image-display'></div>
        <div className='create-form__button-container button-container'>
          <button>Add Image(s)</button>
        </div>
        <div className={imageSubmitting ? 'loading' : ''}></div>
        <div className='image-form__feedback'>{feedback}</div>
      </form>
      <form id='create-form' onSubmit={handleSubmit(onSubmit)}>
        <div className='create-form__item'>
          <label htmlFor='name'>Accommodation Name</label>
          <input {...register("name")} />
          {errors.name && <span className='form__error create-form__error'>{errors.name.message}</span>}
        </div>
        <div className='create-form__item'>
          <label htmlFor='description'>Description</label>
          <textarea {...register("description")} rows='5'/>
          {errors.description && <span className='form__error create-form__error'>{errors.description.message}</span>}
        </div>
        <div className='create-form__item'>
          <label htmlFor='features'>Features, separated with a &apos;-&apos;</label>
          <textarea {...register("features")} rows='5'/>
          {errors.features && <span className='form__error create-form__error'>{errors.features.message}</span>}
        </div>
        <div className='create-form__item'>
          <label htmlFor='price'>Price</label>
          <input {...register("price")} />
          {errors.price && <span className='form__error create-form__error'>{errors.price.message}</span>}
        </div>
        <div className='create-form__button-container button-container'>
          <button>Submit</button>
        </div> 
      </form>
    </CreateLayout>
  )
}
