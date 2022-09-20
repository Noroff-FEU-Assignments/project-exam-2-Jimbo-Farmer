import { useState } from "react";
import EnquiryModal from './EnquiryModal';
import Image from "next/image";

export default function Details({acc}) {
  function thumbnails(){
    if(acc.data.attributes.images.data.length > 1){
      for(let i = 1; i <= acc.data.attributes.images.data.length; i++){
        return <div className="details__thumbnail-container"><Image src={acc.data.attributes.images.data[i].attributes.url} alt={acc.data.attributes.images.data[i].attributes.alternativeText} width={150} height={150}/></div>;
      }
    }
  }
  const thumbnailDivs = thumbnails();
  const [showModal, setShowModal] = useState(false);
  function openEnquiryModal(){
    setShowModal(true);
  }
  
  return(
    <>
      <div className="details">
        <h1>{acc.data.attributes.name}</h1>
        <div className="details__flex-container">
          <div className="details__images">
            <div className="details__image-container">
              <Image src={acc.data.attributes.images.data[0].attributes.url} alt={acc.data.attributes.images.data[0].attributes.alternativeText} width={800} height={800}/>
            </div>
            <div className="details__thumbnails">{thumbnailDivs}</div>
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
