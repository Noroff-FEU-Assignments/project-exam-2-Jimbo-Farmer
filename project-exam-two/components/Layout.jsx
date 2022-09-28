import Link from 'next/link';
import {useRouter} from 'next/router';
import { useState } from 'react';
import Footer from './Footer';

/**
 * Generates basic page layout including head.  
 * @Component
 * @param {children} children - all extra page content.
 * @param {string} pageId - id so that page can be selected for specific styling.
 * @returns {HTMLElement}
 */

export default function Layout({children, pageId}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  function hamburger(){
    setOpen(!open);
  };
  return(
    <div id={pageId} className="page">
      <div className='not-footer'>
        <header>
          <Link href="/">
            <a id='page-title'>Holidaze</a>
          </Link>
          <nav className={open ? ('show') : ('')}>
            <Link href="/accommodation">
              <a className={router.pathname === "/accommodation" ? "nav__link nav__link-active" : "nav__link"}>Accommodation</a>
            </Link>
            <Link href="/contact">
              <a className={router.pathname === "/contact" ? "nav__link nav__link-active" : "nav__link"}>Contact</a>
            </Link>
            <Link href="/login">
              <a className={router.pathname === "/login" ? "nav__link nav__link-active" : "nav__link"}>Administration</a>
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
          <div onClick={hamburger} id="hamburger" className={open ? ('open') : ('')}>
            <div className="burger__layer burger__top"></div>
            <div className="burger__layer burger__middle1"></div>
            <div className="burger__layer burger__middle2"></div>
            <div className="burger__layer burger__bottom"></div>
          </div>
        </header>
        <div className='page-container'>{children}</div>
      </div>
      <Footer />
    </div>
  )
}


