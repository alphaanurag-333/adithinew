import React, { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import MEDIA_URL from '../../media'
import { useSelector } from 'react-redux'
import weblogo from '../../assets/images/footerlogo.png'
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn
} from 'react-icons/fa6'


const UserAppFooter = () => {
  const location = useLocation()
  const { config } = useSelector((state) => state.appConfig)

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }, 200)
    return () => clearTimeout(timeout)
  }, [location.pathname])

  const logoSrc = config?.user_logo ? MEDIA_URL + config.user_logo : weblogo
  const copyrightText =
    config?.app_footer_text || `© ${new Date().getFullYear()} Athiti. All rights reserved.`
  const supportEmail = config?.company_email || 'athiti@gmail.com'
  const supportPhone = config?.company_phone || '+91 7776825045'
  const supportLocation = config?.default_location?.address || 'Pune, India'

  const social = [

    {
      key: 'facebook',
      icon: <FaFacebookF />,
      href: config?.facebook,
    },
  
    {
      key: 'twitter',
      icon: <FaXTwitter />,
      href: config?.twitter,
    },
  
    {
      key: 'instagram',
      icon: <FaInstagram />,
      href: config?.instagram,
    },
  
    {
      key: 'linkedin',
      icon: <FaLinkedinIn />,
      href: config?.linkedin,
    },
  
  ]

  return (
    <footer className="user-footer-v2" aria-label="Site footer">
      <Container className="user-footer-v2__container">
        <div className="user-footer-v2__top">
          <div className="user-footer-v2__brand">
            <Link to="/home" className="user-footer-v2__logo-link" aria-label="Go to homepage">
              <img
                src={logoSrc}
                alt="Atithi Devo Bhava"
                className="user-footer-v2__logo"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = weblogo
                }}
              />
            </Link>
            <p className="user-footer-v2__tagline">
            ATHITI connects travelers with authentic homestays, local food experiences, and trusted rides across India.
            </p>
          </div>

          <div className="user-footer-v2__links">
            <h5>Quick links</h5>
            <ul>
              
             
              <li>
                <a href="https://atithi.developmentalphawizz.com/backend/seller/auth/login"
  target="_blank">Become a Host</a>
              </li>
              <li>
                <a href="https://atithi.developmentalphawizz.com/backend/seller/auth/login"
  target="_blank">Become a Food Partner</a>
              </li>
              <li>
                <a href="https://atithi.developmentalphawizz.com/backend/seller/auth/login"
  target="_blank">Become a Ride Partner</a>
              </li>
              <li>
                <a href="https://atithi.developmentalphawizz.com/backend/seller/auth/login"
  target="_blank">Vendor Login</a>
              </li>
            </ul>
          </div>

          <div className="user-footer-v2__links">
            <h5>Services</h5>
            <ul>
              <li>
                <Link to="/">Homestays</Link>
              </li>
              <li>
                <Link to="/">Food</Link>
              </li>
              <li>
                <Link to="/">Rides</Link>
              </li>
            </ul>
          </div>

          <div className="user-footer-v2__links">
            <h5>About Us</h5>
            <ul>
              <li>
                <Link to="/page/about-us">About us</Link>
              </li>
              <li>
                <Link to="/contact-us">Contact us</Link>
              </li>
              <li>
                <Link to="/page/privacy-policy">Privacy policy</Link>
              </li>
              <li>
                <Link to="/page/terms-conditions">Terms &amp; conditions</Link>
              </li>
              <li>
                <Link to="/page/faqs">FAQ</Link>
              </li>
            </ul>
          </div>

          <div className="user-footer-v2__contact">
            <h5>Contact</h5>
            <ul>
              <li>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(supportLocation)}`} target="_blank" rel="noreferrer">
                  {supportLocation}
                </a>
              </li>
              <li>
                <a href={`tel:${String(supportPhone).replace(/\s+/g, '')}`}>{supportPhone}</a>
              </li>
              <li>
                <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
              </li>
            </ul>
            <div className="user-footer-v2__social" aria-label="Social media">
            {social.map(({ key, icon, href }) =>

            href ? (
          
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={key}
                data-social={key}
                className="socialIcon"
              >
                {icon}
              </a>
          
            ) : (
          
              <span
                key={key}
                className="user-footer-v2__social-placeholder socialIcon"
                data-social={key}
                aria-hidden="true"
                title={`${key} — add URL in admin settings`}
              >
                {icon}
              </span>
          
            )
          
          )}
            </div>
          </div>
        </div>

        <div className="user-footer-v2__bottom">
          <p>{copyrightText}</p>
        </div>
      </Container>
    </footer>
  )
}

export default React.memo(UserAppFooter)
