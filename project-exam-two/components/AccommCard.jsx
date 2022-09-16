import Link from "next/link"

export default function AccommCard({acc}) {
  console.log(acc)
  return(
    <div className="accommodation-card">
      <Link href={`accommodation/${acc.id}`}>
        <a className="accommodation-card__link">
          <div className="accommodation-card__img-container">
            <img src={acc.attributes.images.data[0].attributes.url} alt={acc.attributes.name} /> 
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
