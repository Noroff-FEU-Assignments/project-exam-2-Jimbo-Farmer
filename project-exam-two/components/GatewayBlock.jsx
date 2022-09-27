import Image from "next/image"

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
