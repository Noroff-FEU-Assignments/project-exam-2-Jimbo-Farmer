import Link from "next/link";
import Image from "next/image";

/**
 * Generates a card to display accommodation information.
 * @component
 * @param {object} acc - Data for this accommodation (obtained from the API) 
 * @returns {HTMLElement}
 */

export default function AccommCard({acc}) {
  const imageUrl = acc.attributes.images.data[0].attributes.url;
  return(
    <div className="accommodation-card">
      <Link href={`accommodation/${acc.id}`}>
        <a className="accommodation-card__link">
          <div className="accommodation-card__img-container">
            <Image className="accommodation-card__img" src={imageUrl} alt={acc.attributes.name} width={500} height={500} /> 
          </div>
          <div className="accommodation-card__details">
            <h2>{acc.attributes.name}</h2>
            <div className="accommodation-card__description">{acc.attributes.description}</div>
            <div className="accommodation-card__button-container button-container"><button>Details</button></div>
          </div>
        </a>
      </Link>
    </div>
  )
}
