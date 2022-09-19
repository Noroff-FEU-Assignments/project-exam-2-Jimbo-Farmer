import Link from "next/link";
import Image from "next/image";

export default function AccommCard({acc}) {
  return(
    <div className="accommodation-card">
      <Link href={`accommodation/${acc.id}`}>
        <a className="accommodation-card__link">
          <div className="accommodation-card__img-container">
            <Image className="accommodation-card__img" src={acc.attributes.images.data[0].attributes.url} alt={acc.attributes.name} width={500} height={500} /> 
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
