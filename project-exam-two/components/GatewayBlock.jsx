import Image from "next/image"

/**
 * Generates a black of HTML that appears lower down on the homepage. .  
 * @Component
 * @param {URL} image - image url
 * @param {String} imageAlt - image alt text
 * @param {String} attribute - image attribute text
 * @param {URL} attributeLink - link to image attributes
 * @param {String} heading - heading for the block
 * @param {String} text - copy for the black
 * @returns {HTMLElement}
 */

export default function GatewayBlock({image, imageAlt, attribute, attributeLink, heading, text}) {
  return(
    <div className='gateway-block'>
      <div className='gateway-block__image-container'>
        <Image src={image} alt={imageAlt} width={1000} height={1333} />
        <div className='attribute'>
          <a href={attributeLink} target="_blank" rel="noreferrer">{attribute} on Unsplash</a>
        </div>
      </div>
      <div className='gateway-block__info'>
        <h2>{heading}</h2>
        <p>{text}</p>
      </div>
    </div>
  )
}
