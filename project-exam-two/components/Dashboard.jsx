import { useRouter } from "next/router";
import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();
  function handleClick(){
    localStorage.removeItem('Token');
    router.reload();
  }
  return(
    <>
      <div className='dashboard-intro'>
        <h1>Dashboard</h1>
        <p>View messages, booking enquiries and create accommodation listings</p>
      </div>
      <div className= 'dashboard__link'>
        <Link href="/messages">
          <a>Messages</a>
        </Link>
      </div>
      <div className= 'dashboard__link'>
        <Link href="/enquiries">
          <a>Booking Enquiries</a>
        </Link>
      </div>
      <div className= 'dashboard__link'>
        <Link href="/create">
          <a>New Accommodation</a>
        </Link>
      </div>
      <div className='button-container'>
        <button id="logout" onClick={handleClick}>Logout</button>
      </div>
    </>
  )
}
