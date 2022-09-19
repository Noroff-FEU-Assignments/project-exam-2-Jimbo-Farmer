import Link from "next/link";
import Image from "next/image";

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
                        <Image src={accomm.attributes.images.data[0].attributes.formats.thumbnail.url} alt={accomm.attributes.name} width={200} height={200}/> 
                      </a>
                    </Link>
                  </li>
                )
      })}
    </ul>
  )
}
