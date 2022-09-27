import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import {useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState, useContext, useEffect } from 'react';
import { BASE_URL } from '../constants/baseUrl';
import AuthContext from '../context/AuthContext';
import Head from '../components/Head';
import Layout from '../components/Layout';

const schema = yup.object().shape({
  name: yup.string().required("Please enter the accommodation name"),
  description: yup.string().required("Please provide a description").min(30, "Minimum 30 characters"),
  price: yup.number().required("Please enter price per night").min(100, "Minimum price 100kr per night"),
})

export default function CreateAccommodation(){
  //Check for Auth and redirect if necessary
  const [auth] = useContext(AuthContext);
  const router = useRouter();
  useEffect(()=>{ !auth ? router.push('/login') : ""},[auth]);

  const [imageId, setImageId] = useState([20]);   // 20 is the ID of the placeholder image stored on strapi. 
  const [sendError, setSendError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [imageSubmitting, setImageSubmitting] = useState(null);
  const [success, setSuccess] = useState(false);
  const [feedback, setFeedback] = useState('');
  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema),
  });

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
      <Layout pageId="create-page">
        <Head title='Create' description="Create a new accommodation listing."/>
        <div id='create-page__container' className='main'>
          <div className='create-intro page-intro'>
            <Link href='/login'><a className='dashboard-link'>Back to Dashboard</a></Link>
            <h1>Create New Listing</h1>
            <p>Create a new accommodation listing using the form below</p>
          </div>
          <div>Creating...</div><div className='loading'></div>
        </div>
      </Layout>
    )
  }

  if(success){
    return (
      <Layout pageId="create-page">
        <Head title='Create' description="Create a new accommodation listing."/>
        <div id='create-page__container' className='main'>
          <div className='create-intro page-intro'>
            <Link href='/login'><a className='dashboard-link'>Back to Dashboard</a></Link>
            <h1>Create New Listing</h1>
            <p>Create a new accommodation listing using the form below</p>
            <p>New accommodation created successfully!</p>
            <div className='button-container'>
              <button onClick={handleClick}>Add Another</button>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  if(sendError){
    return(
      <Layout pageId="create-page">
        <Head title='Create' description="Create a new accommodation listing."/>
        <div id='create-page__container' className='main'>
          <div className='create-intro page-intro'>
            <Link href='/login'><a className='dashboard-link'>Back to Dashboard</a></Link>
            <h1>Create New Listing</h1>
            <p>Create a new accommodation listing using the form below</p>
          </div>
          <div>{sendError}</div>
        </div>
      </Layout>
    ) 
  }

  return(
    <Layout pageId="create-page">
      <Head title='Create' description="Create a new accommodation listing."/>
      <div id='create-page__container' className='main'>
        <div className='create-intro page-intro'>
          <Link href='/login'><a className='dashboard-link'>Back to Dashboard</a></Link>
          <h1>Create New Listing</h1>
          <p>Create a new accommodation listing using the form below. Add images first, then submit the rest of the details.</p>
        </div>
        <form id='image-form' onSubmit={handleImageSubmit}>
          <label htmlFor="imageFile">Add accommodation image(s)</label>
          <input type="file" onChange={(e)=>setFiles(e.target.files)} multiple/>
          <div className='image-form__image-display'></div>
          <div className='create-form__button-container button-container'>
            <button>Add Image(s)</button>
          </div>
          <div className={imageSubmitting ? 'loading' : ''}></div>
          <div>{feedback}</div>
        </form>
        <form id='create-form' onSubmit={handleSubmit(onSubmit)}>
          <div className='create-form__item'>
            <label htmlFor='name'>Accommodation Name</label>
            <input {...register("name")} />
            {errors.name && <span className='form__error create-form__error'>{errors.name.message}</span>}
          </div>
          <div className='create-form__item'>
            <label htmlFor='name'>Description</label>
            <textarea {...register("description")} rows='5'/>
            {errors.description && <span className='form__error create-form__error'>{errors.description.message}</span>}
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
      </div>
    </Layout>
  )
}