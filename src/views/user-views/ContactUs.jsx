import React, { useState } from 'react'
import API from '../../api'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'
import Spinner from 'react-bootstrap/Spinner'
import { GrLocation } from 'react-icons/gr'
import { MdOutlineMarkEmailRead } from 'react-icons/md'
import { FiPhone } from 'react-icons/fi'

export default function ContactUs() {
  const { config } = useSelector((state) => state.appConfig)

 const [formData, setFormData] = useState({
  name: '',
  mobile_number: '',
  user_type: '',
  vendor_type: '',
  subject: '',
  message: '',
})

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value })
}

  const [loading, setLoading] = useState(false)
  const [mapLoading, setMapLoading] = useState(true)

const validateForm = () => {
  const { name, mobile_number, user_type, vendor_type, subject, message } = formData

  // Name validation (only letters + min 3 chars)
  if (!name || name.trim().length < 3) {
    Swal.fire('Error', 'Name must be at least 3 characters', 'warning')
    return false
  }

  // Mobile validation (10 digit Indian number)
  const phoneRegex = /^[6-9]\d{9}$/
  if (!phoneRegex.test(mobile_number)) {
    Swal.fire('Error', 'Enter valid 10-digit mobile number', 'warning')
    return false
  }

  if (!user_type) {
    Swal.fire('Error', 'Please select user type', 'warning')
    return false
  }

  if (user_type === 'vendor' && !vendor_type) {
    Swal.fire('Error', 'Please select vendor type', 'warning')
    return false
  }

  if (!subject.trim()) {
    Swal.fire('Error', 'Subject is required', 'warning')
    return false
  }

  if (!message.trim()) {
    Swal.fire('Error', 'Message is required', 'warning')
    return false
  }

  return true
}

 const handleSubmit = async (e) => {
  e.preventDefault()

  if (!validateForm()) return

  setLoading(true)

  try {
    const res = await API.post('/pages/contact-us', formData)

    if (res.data.data) {
      Swal.fire('Success', res.data.message, 'success')

      setFormData({
        name: '',
        mobile_number: '',
        user_type: '',
        vendor_type: '',
        subject: '',
        message: '',
      })
    } else {
      Swal.fire('Error', res.data.message || 'Something went wrong', 'error')
    }
  } catch {
    Swal.fire('Server Error', 'Please try again later', 'error')
  } finally {
    setLoading(false)
  }
}

  const latitude = config?.default_location?.lat || 22.719568
  const longitude = config?.default_location?.lng || 75.857727
  const hasSocial = Boolean(config?.facebook || config?.instagram || config?.linkedin)

  return (
    <section className="contact-page-section">
      <div className="container">
        <div className="contact-page-head text-center">
          <h1>Contact Us</h1>
          <p>We are here to help with bookings, vendor onboarding, and support queries.</p>
          <div className="contact-page-badges">
            <span>Trusted Local Support</span>
            <span>Fast Response</span>
            <span>Partner Onboarding</span>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-lg-5">
            <div className="card border-0 h-100 contact-info-card">
              <div className="card-body p-4 p-md-4">
                <h3 className="contact-brand-title mb-3">Athiti Devo Bhava</h3>
                <p className="contact-brand-subtitle">
                  Premium travel + stay experience, backed by responsive support and verified partners.
                </p>

                <ul className="list-unstyled mb-4 contact-info-list">
                  <li className="d-flex align-items-start gap-3">
                    <span className="contact-icon-wrap">
                      <GrLocation />
                    </span>
                    <div>
                      <strong>Address</strong>
                      <p>{config?.default_location?.address || 'Vijay Nagar, Indore'}</p>
                    </div>
                  </li>

                  <li className="d-flex align-items-start gap-3">
                    <span className="contact-icon-wrap">
                      <MdOutlineMarkEmailRead />
                    </span>
                    <div>
                      <strong>Email</strong>
                      <p>
                        <a href={`mailto:${config?.company_email || 'admin@atithidevobhava.com'}`}>
                          {config?.company_email || 'admin@atithidevobhava.com'}
                        </a>
                      </p>
                    </div>
                  </li>

                  <li className="d-flex align-items-start gap-3">
                    <span className="contact-icon-wrap">
                      <FiPhone />
                    </span>
                    <div>
                      <strong>Phone</strong>
                      <p>
                        <a href={`tel:${config?.company_phone || '+917776825045'}`}>
                          {config?.company_phone || '+91 7776825045'}
                        </a>
                      </p>
                    </div>
                  </li>
                </ul>

                {hasSocial && (
                  <div className="contact-social-row">
                    {config?.facebook && (
                      <a href={config.facebook} target="_blank" rel="noreferrer">
                        Facebook
                      </a>
                    )}
                    {config?.instagram && (
                      <a href={config.instagram} target="_blank" rel="noreferrer">
                        Instagram
                      </a>
                    )}
                    {config?.linkedin && (
                      <a href={config.linkedin} target="_blank" rel="noreferrer">
                        LinkedIn
                      </a>
                    )}
                  </div>
                )}

                <div className="position-relative rounded overflow-hidden contact-map-wrap">
                  {mapLoading && (
                    <div className="position-absolute top-50 start-50 translate-middle">
                      <Spinner animation="border" variant="primary" />
                    </div>
                  )}
                  {latitude && longitude ? (
                    <iframe
                      title="Google Map"
                      src={`https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
                      className="w-100"
                      style={{ height: '250px', border: 0 }}
                      loading="lazy"
                      onLoad={() => setMapLoading(false)}
                    />
                  ) : (
                    <div className="contact-map-fallback">Map location will appear here once configured.</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="card border-0 contact-form-card">
              <div className="card-body p-4 p-md-4">
                <h3 className="contact-form-title">Send us a message</h3>
                <p className="contact-form-subtitle">Please share your details and our team will connect with you soon.</p>
                

                <form onSubmit={handleSubmit} className="contact-form-grid">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="themeInput">
                        <label className="form-label">Your Name <span className="text-danger">*</span></label>
                        <input
                          required
                          className="form-control"
                          name="name"
                          value={formData.name}
                          onChange={(e) => {
                            const value = e.target.value.replace(/[^a-zA-Z\s]/g, '')
                            setFormData({ ...formData, name: value })
                          }}
                          placeholder="Enter your name"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="themeInput">
                        <label className="form-label">Whatsapp Number <span className="text-danger">*</span></label>
                        <input
                          type="tel"
                          className="form-control"
                          name="mobile_number"
                          value={formData.mobile_number}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '')
                            if (value.length <= 10) {
                              setFormData({ ...formData, mobile_number: value })
                            }
                          }}
                          onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                              e.preventDefault()
                            }
                          }}
                          placeholder="Enter your whatsapp number"
                          maxLength={10}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="themeInput">
                        <label className="form-label">Select your role <span className="text-danger">*</span></label>
                        <select
                          className="form-select"
                          name="user_type"
                          value={formData.user_type}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select</option>
                          <option value="guest">Guest</option>
                          <option value="vendor">Vendor / Partner</option>
                        </select>
                      </div>
                    </div>

                    {formData.user_type === 'vendor' && (
                      <div className="col-md-6">
                        <div className="themeInput">
                          <label className="form-label">What do you offer? <span className="text-danger">*</span></label>
                          <select
                            className="form-select"
                            name="vendor_type"
                            value={formData.vendor_type}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select</option>
                            <option value="homestay">Homestay</option>
                            <option value="food">Food</option>
                            <option value="vehicle">Vehicle</option>
                          </select>
                        </div>
                      </div>
                    )}

                    <div className="col-md-12">
                      <div className="themeInput">
                        <label className="form-label">Subject <span className="text-danger">*</span></label>
                        <input
                          className="form-control"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Enter subject"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="themeInput">
                        <label className="form-label">Message <span className="text-danger">*</span></label>
                        <textarea
                          className="form-control"
                          rows="5"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Enter message"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <button className="themeBtn contact-submit-btn" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
