import axios from 'axios';
import Head from '../components/Head';
import Layout from '../components/Layout';
import Link from 'next/link';
import {useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState, useContext, useEffect } from 'react';
import { BASE_URL } from '../constants/baseUrl';
import AuthContext from '../context/AuthContext';
import { useRouter } from 'next/router';

const schema = yup.object().shape({
  name: yup.string().required("Please enter the accommodation name"),
  description: yup.string().required("Please provide a description").min(30, "Minimum 30 characters"),
  price: yup.number().required("Please enter price per night").min(100, "Minimum price 100kr per night"),
})

export default function CreateAccommodation(){
  //Check for Auth and redirect if necessary
  const [auth, setAuth] = useContext(AuthContext);
  const router = useRouter();
  useEffect(()=>{
    if(!auth){
      router.push('/login');
    }
  });

  const [imageId, setImageId] = useState([20]);   // 20 is the current ID of the placeholder image stored on strapi. 
  const [sendError, setSendError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema),
  });

  // Submit file form, retrieve image id from response and add it to main form. 
  const [files, setFiles] = useState();

  async function handleImageSubmit(e){
    e.preventDefault();
    const formData = new FormData();
    for(let i = 0; i < files.length; i++){    //Add all image files to be uploaded
      formData.append('files', files[i]);
    }
    
    try {
      const response = await axios.post(BASE_URL+'api/upload', formData, {headers: {Authorization:  `Bearer ${auth.data.jwt}`}});
      setSubmitting(true);
      if(response.statusText === "OK"){
        console.log(response);
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
          <div className='create-intro'>
            <Link href='/login'><a className='dashboard-link'>Back to Dashboard</a></Link>
            <h1>Create New Listing</h1>
            <p>Create a new accommodation listing using the form below</p>
          </div>
          <div>Creating...</div>
        </div>
      </Layout>
    )
  }

  if(success){
    return (
      <Layout pageId="create-page">
        <Head title='Create' description="Create a new accommodation listing."/>
        <div id='create-page__container' className='main'>
          <div className='create-intro'>
            <Link href='/login'><a className='dashboard-link'>Back to Dashboard</a></Link>
            <h1>Create New Listing</h1>
            <p>Create a new accommodation listing using the form below</p>
          </div>
          <p>New accommodation created successfully!</p>
          <button onClick={()=>{setSuccess(false)}}>Add Another</button>
        </div>
      </Layout>
    )
  }

  if(sendError){
    return(
      <Layout pageId="create-page">
        <Head title='Create' description="Create a new accommodation listing."/>
        <div id='create-page__container' className='main'>
          <div className='create-intro'>
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
        <div className='create-intro'>
          <Link href='/login'><a className='dashboard-link'>Back to Dashboard</a></Link>
          <h1>Create New Listing</h1>
          <p>Create a new accommodation listing using the form below</p>
        </div>
        <form id='image-form' onSubmit={handleImageSubmit}>
          <label htmlFor="imageFile">Add accommodation image(s)</label>
          <input type="file" onChange={(e)=>setFiles(e.target.files)} multiple/>
          <div className='image-form__image-display'></div>
          <button>Add Image</button>
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