import axios from 'axios';
import { useContext } from 'react';
import { CONTACT_URL } from '../constants/contactUrl';
import AuthContext from '../context/AuthContext';

/**
 * Generates a card to show messages submitted via the contact form to an administrator.  
 * @Component
 * @param {number} id - message id as assigned by the api
 * @param {string} name - name from contact form
 * @param {string} email - email from contact form
 * @param {string} content - content from contact form
 * @param {Function} onDelete - changes state of update in parent component (messages page) to trigger re-render when message is deleted.
 * @returns {HTMLElement}
 */

export default function MessageCard({id, name, email, content, onDelete}) {
  const [auth] = useContext(AuthContext);
  async function handleClick(e){
    const id = e.target.parentElement.dataset.id;
    try {
      const response = await axios.delete(CONTACT_URL +'/' +id, {headers: {Authorization:  `Bearer ${auth.data.jwt}`}} );
      console.log(response);
      if(response.request.statusText === "OK"){
        onDelete();
      }
    } catch (error) {
      console.log(error);
    } 
  }
  return(
    <div className="message-card" data-id={id}>
      <h2 className="message-card__name">{name}</h2>
      <div className="message-card__email">Email: {email}</div>
      <div className="message-card__content">Message: {content}</div>
      <button onClick={handleClick} className="message-card__delete-button">Delete</button>
    </div>
  )
}
