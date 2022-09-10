import Link from 'next/link';

export default function Dropdown(filteredList) {
  console.log(filteredList);
  return(
    <ul>
      {filteredList.filteredList.map((accomm)=>{
        return  <Link key={accomm.id} href="/">
                  <a>{accomm.attributes.name}</a>
                </Link>
      })}
    </ul>
  )
}






