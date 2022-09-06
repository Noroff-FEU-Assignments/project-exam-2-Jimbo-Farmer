import Layout from '../components/Layout';
import Head from '../components/Head';
import { useEffect } from 'react';



export default function Home() {
  dateSearchDefault();
  return(
    <Layout pageId='homepage'>
      <Head title='Home' description='Browse and book accommodation in the Bergen area with Holidaze - your gateway to the fjords'/>
      <div className='homepage-container'>
        <div className='hero'>
          <div className='search'>
            <div className='search__checkin'><input type="date" name="checkin" id="checkin" /></div>
            <div className='search__checkout'><input type="date" name="checkout" id="checkout" /></div>
            <div className='search__accommodation'><input type="text" name="accommodation" id="accommodation-search" /></div>
          </div>
        </div>
        <div className='gateway'>Your Gateway to the Fjords</div>
        
      </div>
    </Layout>
  )
}

function dateSearchDefault(){
  useEffect(()=> {
    const checkin = document.querySelector("#checkin");
    const checkout = document.querySelector("#checkout");
    let inDate = new Date();
    let inDay = inDate.getDate();
    let inMonth = inDate.getMonth() +1;
    let inYear = inDate.getFullYear();
    if(inDay < 10){ inDay = '0' + inDay;};
    if(inMonth < 10){ inMonth = '0' + inMonth;};
    let outDate = new Date();
    outDate.setDate(inDate.getDate() + 2);
    let outDay = outDate.getDate();
    let outMonth = outDate.getMonth() +1;
    let outYear = outDate.getFullYear();
    if(outDay < 10){ outDay = '0' + outDay;};
    if(outMonth < 10){ outMonth = '0' + outMonth;};
    const today = inYear+'-'+inMonth+'-'+inDay;
    const checkoutDefault = outYear+'-'+outMonth+'-'+outDay;
    checkin.value = today;
    checkout.value = checkoutDefault;
    
    
  })
}  

