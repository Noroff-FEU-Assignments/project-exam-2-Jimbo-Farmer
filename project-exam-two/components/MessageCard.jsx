export default function MessageCard({name, email, content}) {
  return(
    <div className="message-card">
      <h2 className="message-card__name">{name}</h2>
      <div className="message-card__email">Email: {email}</div>
      <div className="message-card__content">Message: {content}</div>
    </div>
  )
}
