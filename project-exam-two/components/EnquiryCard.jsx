/**
 * Generates a card to display an enquiry received from a 'customer' to an administrator.
 * @component
 * @param {various} - self-explanatory, see below.  
 * @returns {HTMLElement}
 */

export default function EnquiryCard({accommodationInfo}) {
  return(
    <div className="enquiry-card">
      <h2 className="enquiry-card__accommodation">{accommodationInfo.accommodationname}</h2>
      <div className="enquiry-card__checkin">Checkin: {accommodationInfo.checkin}</div>
      <div className="enquiry-card__checkout">Checkout: {accommodationInfo.checkout}</div>
      <div className="enquiry-card__adults">Adults: {accommodationInfo.adults}</div>
      <div className="enquiry-card__children">Children: {accommodationInfo.noOfChildren}</div>
      <div className="enquiry-card__name">Name: {accommodationInfo.name}</div>
      <div className="enquiry-card__phone">Phone: {accommodationInfo.phone}</div>
      <div className="enquiry-card__email">Email: {accommodationInfo.email}</div>
      <div className="enquiry-card__content">Query: {accommodationInfo.query}</div>
    </div>
  )
}
