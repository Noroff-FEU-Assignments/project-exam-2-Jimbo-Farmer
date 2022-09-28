import Link from "next/link";
import Image from "next/image";

/**
 * Generates HTML to display a dropdown of search results from the text input on the homepage. 
 * Checks for no results (some input with no list) and displays 'no results'
 * Limits number of results to 5. 
 * @Component
 * @param {Array} filteredList - list of results to show
 * @param {String} input - the text input that the user has used to search for accommodation
 * @returns {HTMLUListElement}
 */

export default function Dropdown({filteredList, input}) {
  //Check for text input and no results
  if(input && !filteredList.length){
    return (
      <ul className="dropdown">
        <li>No results</li>
      </ul>
    )
  }

  //Limit dropdown length to 5 items. 
  let shortList = filteredList;
  if(shortList.length > 5){
    shortList = [];
    for(let i = 0; i < 5; i++){
      shortList.push(filteredList[i]);
    }
  }

  return(
    <ul className="dropdown">
      {shortList.map((accomm)=>{
        return  (
                  <li key={accomm.id}>
                    <Link href={`accommodation/${accomm.id}`}>
                      <a className="dropdown__item" key={accomm.id}>
                        <h3>{accomm.attributes.name}</h3>
                        <div className="dropdown__image-container">
                          <Image className="dropdown__image" src={accomm.attributes.images.data[0].attributes.formats.thumbnail.url} alt={accomm.attributes.name} width={50} height={50}/> 
                        </div>
                      </a>
                    </Link>
                  </li>
                )
      })}
    </ul>
  )
}
