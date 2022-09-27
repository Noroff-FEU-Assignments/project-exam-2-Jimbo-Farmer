import Link from "next/link";

export default function Footer() {
  return(
    <div className="footer">
      <div className="footer__banner-container">
        <div className="attribute">Photo by <a href="https://unsplash.com/es/@agentj?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Agent J</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
        </div>
      </div>
      <p className="footer__link">Browse our <Link href="/accommodation"><a>accommodation</a></Link> </p>
      <hr />
      <p className='footer__link'><Link href="/contact"><a>Contact us</a></Link> or call +47 328790234</p>
      <hr />
      <p className="footer__link">Holidaze, <br />Brattvåtgate, <br />Bergen 5003 </p>
    </div>
  )
}
