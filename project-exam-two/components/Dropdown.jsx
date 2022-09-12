export default function Dropdown({filteredList}) {
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
                  <li>
                    <a className="dropdown__item" key={accomm.id} href={`accommodation/${accomm.id}`}>
                      <h3>{accomm.attributes.name}</h3>
                      <img src={accomm.attributes.images.data[0].attributes.formats.thumbnail.url} alt={accomm.attributes.name} /> 
                    </a>
                  </li>
                )
      })}
    </ul>
  )
}
