import Link from 'next/link';
import {useRouter} from 'next/router';

export default function Layout({children}) {
  const router = useRouter();
  return(
    <>
      <Link href="/">
        <a className='page-title'><p>Holidaze</p></a>
      </Link>
      <nav>
        <Link href="/">
          <a className={router.pathname === "/" ? "active" : ""}>Home</a>
        </Link>
        <Link href="/accommodation">
          <a className={router.pathname === "/accommodation" ? "active" : ""}>Accommodation</a>
        </Link>
        <Link href="/contact">
          <a className={router.pathname === "/contact" ? "active" : ""}>Contact</a>
        </Link>
        <Link href="/login">
          <a className={router.pathname === "/login" ? "active" : ""}>Admin Login</a>
        </Link>
        <Link href="/dashboard">
          <a className='hide'></a>
        </Link>
        <Link href="/results">
          <a className='hide'></a>
        </Link>
        <Link href="/specific/:param">
          <a className='hide'></a>
        </Link>
      </nav>
      <div className='page-container'>{children}</div>
    </>
  )
}

