import { useState } from "react";
import Image from "next/image";
import EnquiryModal from './EnquiryModal';

/**
 * Generates HTML to display accommodation details. 
 * Contains functionality to operate image carousel and open the enquiry modal. 
 * @Component
 * @param {object} acc - details for a specific accommodation 
 * @returns {HTMLElement}
 */

export default function Details({acc}) {
  const noOfImages = acc.data.attributes.images.data.length;
  const [currentImage, setCurrentImage] = useState(0);
  let thumbnailList = [];
  (function thumbnails(){
    if(noOfImages > 1){
      for(let i = 0; i < noOfImages; i++){
        thumbnailList.push(acc.data.attributes.images.data[i])
      }
    }
  })();

  const [showModal, setShowModal] = useState(false);
  function openEnquiryModal(){
    setShowModal(true);
  }
  function carouselLeft(){
    if(currentImage > 0){
      setCurrentImage(currentImage -1);
    }
  }
  function carouselRight(){
    if(currentImage < (noOfImages -1)){
      setCurrentImage(currentImage +1);
    }
  }
  
  return(
    <>
      <h1 className="details__title">{acc.data.attributes.name}</h1>
      <div className="details">
        <div className="details__flex-container">
          <div className="details__images">
            <div className="details__image-container">
              <button onClick={carouselLeft} className="details__carousel-left"><div className="arrow-slope-l"></div><div className="arrow-slope-r"></div></button>
              <Image src={acc.data.attributes.images.data[currentImage].attributes.url} alt={acc.data.attributes.images.data[currentImage].attributes.alternativeText} width={800} height={800}/>
              <button onClick={carouselRight} className="details__carousel-right"><div className="arrow-slope-l"></div><div className="arrow-slope-r"></div></button>
            </div>
            <div className="details__thumbnails">
              {thumbnailList.map((thumbnail, index)=> {
                return (<div onClick={()=>{setCurrentImage(index)}} key={thumbnail.id} className="details__thumbnail-container"><Image src={thumbnail.attributes.url} alt={thumbnail.attributes.alternativeText} width={150} height={150}/></div>)
              })}
            </div>
          </div>
          <div className="details__info">
            <div className="details__description"><p>{acc.data.attributes.description}</p></div>
            <div className="details__price">Price per night: {acc.data.attributes.price} Norwegian Kroner</div>
            <div className="details__button-container button-container">
              <button className="details__enquiry-link" onClick={openEnquiryModal}>Send Enquiry</button>
            </div>
          </div>
        </div>
      </div>
      <EnquiryModal onClose={() => setShowModal(false)} accommName={acc.data.attributes.name} show={showModal}/>
    </>
  )
}
