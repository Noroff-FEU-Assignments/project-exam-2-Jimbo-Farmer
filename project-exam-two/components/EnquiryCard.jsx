export default function EnquiryCard({accommodation, checkin, checkout, adults, children, name, email, phone, query}) {
  return(
    <div className="enquiry-card">
      <h2 className="enquiry-card__accommodation">{accommodation}</h2>
      <div className="enquiry-card__checkin">Checkin: {checkin}</div>
      <div className="enquiry-card__checkout">Checkout: {checkout}</div>
      <div className="enquiry-card__adults">Adults: {adults}</div>
      <div className="enquiry-card__children">Children: {children}</div>
      <div className="enquiry-card__name">Name: {name}</div>
      <div className="enquiry-card__phone">Phone: {phone}</div>
      <div className="enquiry-card__email">Email: {email}</div>
      <div className="enquiry-card__content">Query: {query}</div>
    </div>
  )
}