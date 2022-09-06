import Link from 'next/link';
import {useRouter} from 'next/router';
import { useEffect } from 'react';

export default function Layout({children, pageId}) {
  const router = useRouter();
  hamburger();
  return(
    <div className={pageId}>
      <header>
        <Link href="/">
          <a id='page-title'>Holidaze</a>
        </Link>
        <nav>
          <Link href="/accommodation">
            <a className={router.pathname === "/accommodation" ? "nav__link nav__link-active" : "nav__link"}>Accommodation</a>
          </Link>
          <Link href="/contact">
            <a className={router.pathname === "/contact" ? "nav__link nav__link-active" : "nav__link"}>Contact</a>
          </Link>
          <Link href="/login">
            <a className={router.pathname === "/login" ? "nav__link nav__link-active" : "nav__link"}>Admin Login</a>
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
        <div id="hamburger">
          <div className="burger__layer burger__top"></div>
          <div className="burger__layer burger__middle1"></div>
          <div className="burger__layer burger__middle2"></div>
          <div className="burger__layer burger__bottom"></div>
        </div>
      </header>
      <div className='page-container'>{children}</div>
    </div>
  )
}


function hamburger(){
  useEffect(()=> {
    const hamburger = document.querySelector('#hamburger');
    const nav = document.querySelector('nav');
    hamburger.onclick = function(){
      hamburger.classList.toggle("open");
      nav.classList.toggle("show");
    }
  })
}

