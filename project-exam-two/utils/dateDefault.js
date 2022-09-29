/**
 * Generates two dates to autopopulate checkin and checkout fields. Checkin is set to today and checkout in two days' time. 
 * @function
 * no params 
 * @returns {object} - {checkin: today, checkout:checkoutDefault }
 */

export default function dateDefault(){
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
    return {checkin: today, checkout:checkoutDefault };
}  
  