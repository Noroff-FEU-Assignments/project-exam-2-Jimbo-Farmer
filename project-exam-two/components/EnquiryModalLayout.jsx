/**
 * Generates layout for the enquiry modal to avoid repetition for different outcomes (success, error, sending, null).  
 * @Component
 * @param {string} intro - short message.
 * @param {string} visibility - sets the modal class to 'hide' or '' (display).
 * @param {function} close - declared on line 70 of details - sets showModal to false. 
 * @param {boolean} loading - displays loading spinner when true.
 * @param {children} children - rest of page content.
 * @returns {HTMLElement}
 */

export default function EnquiryModalLayout({intro, visibility, close, loading, children}) {
  let loadingClass = '';
  if(loading){
    loadingClass = 'loading';
  }
  return(
    <div>
      <div id='enquiry-modal__container' className={visibility}>
        <button className='close-button' type='button' onClick={close}>Close</button>
        <div className='enquiry-intro page-intro'>
          <h1>Enquiry</h1>
          <p>{intro}</p>
          <div className={loadingClass}></div>
        </div>
        {children}
      </div>
    </div>
  )
}
