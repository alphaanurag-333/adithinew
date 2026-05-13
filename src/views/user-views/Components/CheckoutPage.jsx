import React, { useEffect, useRef, useState } from 'react'
import { HiMiniArrowRight } from 'react-icons/hi2'
import ConfirmImg from '../../../assets/webImage/CheckCircle.png'
import { useNavigate } from 'react-router-dom'
import { BsStarFill, BsStar } from 'react-icons/bs'
import { Modal, Button, Spinner } from 'react-bootstrap'
import Swal from 'sweetalert2'
import API from '../../../api'
import './checkoutpage.css'
import { useSelector } from 'react-redux'


function readJsonStorage(key) {
  try {
    const s = localStorage.getItem(key)
    return s ? JSON.parse(s) : null
  } catch {
    return null
  }
}

function getCustomerEmail() {
  try {
    const p = localStorage.getItem('user_profile')
    if (!p) return ''
    const u = JSON.parse(p)
    return u.email || u.user?.email || ''
  } catch {
    return ''
  }
}

function isBookingApiOk(res) {
  const s = res?.data?.status
  if (s === 'success' || s === true) return true
  return !!res?.data?.data
}

function formatDateRange(start, end) {
  if (!start && !end) return '—'
  if (start && end) return `${start} - ${end}`
  return start || end || '—'
}

function CheckoutPage() {
  const { userToken , user  } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const formRef = useRef(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const bookingType = localStorage.getItem('type')
  const hotelCtx = readJsonStorage('checkoutHomestayContext')
  const hotelPreview = readJsonStorage('checkoutHotelPreview')
  const vehicleCtx = readJsonStorage('checkoutVehicleContext')
  const vehiclePreview = readJsonStorage('checkoutVehiclePreview')
  const foodPreview = readJsonStorage('checkoutFoodPreview')
  const [checkoutData, setCheckoutData] = useState({});
  useEffect(() => {

    const storedData = localStorage.getItem("checkoutFoodPreview");
  
    if (storedData) {
      setCheckoutData(JSON.parse(storedData));
    }
  
  }, []);

  function onConfirmBooking() {
    const form = formRef.current
    if (!form) return

    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    const name = form.fullName.value.trim()
    const phone = form.phone.value.trim()
    const address = form.address.value.trim()
    const msg = form.message.value.trim()

    if (name.length < 3 || !/^[A-Za-z\s]+$/.test(name)) {
      Swal.fire('Check karein', 'Naam kam se kam 3 letters, sirf A–Z.', 'warning')
      return
    }
    if (phone.length !== 10) {
      Swal.fire('Check karein', 'WhatsApp number 10 digit hona chahiye.', 'warning')
      return
    }
    if (address.length < 10) {
      Swal.fire('Check karein', 'Address kam se kam 10 characters.', 'warning')
      return
    }
    if (msg.length < 5) {
      Swal.fire('Check karein', 'Message kam se kam 5 characters.', 'warning')
      return
    }

    setShowConfirm(true)
  }


  async function submitBookingFromForm() {
    const form = formRef.current
    if (!form) return

    const name = form.fullName.value.trim()
    const phone = form.phone.value.trim()
    const address = form.address.value.trim()
    const msg = form.message.value.trim()
    const email = getCustomerEmail()

    const type = localStorage.getItem('type')

    // if (type === 'food') {
    //   setShowConfirm(false)
    //   setShowSuccess(true)
    //   return
    // }


    setLoading(true)
    try {
      if (type === 'vehicle') {
        const ctx = readJsonStorage('checkoutVehicleContext')
        const vid = Number(ctx?.vehicle_id)
        if (!Number.isFinite(vid) || vid <= 0) {
          Swal.fire(
            'Details missing',
            'Something went wrong in vehicle checkout',
            'warning',
          )
          return
        }
        const payload = {
          user_id: user?.id,
          customer_name: name,
          customer_phone: phone,
          customer_email: email || undefined,
          pickup_location: address,
          drop_location: address,
          pickup_date: ctx.travel_date || undefined,
          drop_date: ctx.travel_date || undefined,
          passengers: 1,
          special_requests: msg,
          address,
          travel_time: ctx.travel_time || undefined,
        }
        const res = await API.post(`/vehicles/${ctx.vehicle_id}/book-enquiry`, payload,{
          headers: { Authorization: `Bearer ${userToken}` },
        })
        if (isBookingApiOk(res)) {
          setShowConfirm(false)
          setShowSuccess(true)
          localStorage.removeItem('checkoutVehicleContext')
        } else {
          Swal.fire('Error', res?.data?.message || 'Booking request failed.', 'error')
        }
      } else if (type === 'hotel') {
        const ctx = readJsonStorage('checkoutHomestayContext')
        if (!ctx?.homestay_id || !ctx.check_in_date || !ctx.check_out_date || !ctx.room_name) {
          Swal.fire(
            'Details missing',
            'Something went wrong in homestay checkout',
            'warning',
          )
          return
        }
        const guests = Number(ctx.adults || 1) + Number(ctx.children || 0)
        const payload = {
          customer_name: name,
          user_id: user?.id,
          customer_phone: phone,
          customer_email: email || undefined,
          check_in_date: ctx.check_in_date,
          check_out_date: ctx.check_out_date,
          guests,
          number_of_rooms: ctx.number_of_rooms || 1,
          room_type_id: ctx.room_type_id ?? undefined,
          room_name: ctx.room_name,
          price_per_night: ctx.price_per_night,
          special_requests: msg,
          address,
          adults: ctx.adults,
          children: ctx.children,
        }
        const res = await API.post(`/homestays/${ctx.homestay_id}/whatsapp-connect`,payload,{
          headers: { Authorization: `Bearer ${userToken}` },
        })
        if (isBookingApiOk(res)) { 
          setShowConfirm(false)
          setShowSuccess(true)
          localStorage.removeItem('checkoutHomestayContext')
        } else {
          Swal.fire('Error', res?.data?.message || 'Booking request failed.', 'error')
        }
      }
     else if (type === 'food') {

      const checkoutData = JSON.parse(
        localStorage.getItem('checkoutFoodPreview') || '{}'
      )
    
      const payload = {
        name: name,
        phone: phone,
        email: email || undefined,
    
"quantity": "2",
        // vendor_id: checkoutData?.vendor_id,
        // food_category: checkoutData?.category,
    

        preferred_date: checkoutData?.delivery_date,
        // delivery_time: checkoutData?.delivery_time,
        // delivery_charge: checkoutData?.delivery_charge,
    

        // total_amount: checkoutData?.total_amount,
        message: msg,
    

        delivery_address: address,
    

        // cart_items: checkoutData?.cart_items || [],
        delivery_city: "Indore",
  delivery_state: "Madhya Pradesh",
  delivery_zip: "452001",
  delivery_landmark: "Near C21 Mall",
  delivery_latitude: "22.7196",
  delivery_longitude: "75.8577"
      }
    
      const res = await API.post(
        `/food/${checkoutData?.vendor_id}/book-enquiry`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
    
      if (isBookingApiOk(res)) {
    
        setShowConfirm(false)
        setShowSuccess(true)
    
        localStorage.removeItem('checkoutFoodPreview')
    
      } else {
    
        Swal.fire(
          'Error',
          res?.data?.message || 'Food booking failed.',
          'error'
        )
    
      }
      
    
    }
   
    } catch (err) {
      const apiMsg = err?.response?.data?.message
      Swal.fire('Error', apiMsg || err?.message || 'Network error. Try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="commonSection checkout-page-pro">
      <div className="container">
        <div className="row checkout-layout">
          <div className="col-lg-8 col-md-7 col-12 p-3 order-2 order-md-1 checkout-form-card">
            <div className="themeHeader text-center mb-4">
              <h2>
                Booking <span>Request</span>
              </h2>
            </div>

            <form
              ref={formRef}
              className="updateAddForm checkoutForm"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="row ">
                <div className="col-lg-6">
                  <div className="themeInput">
                    <label className="form-label" htmlFor="checkout-fullName">
                      Full name<small className="text-danger">*</small>
                    </label>

                    <input
                      id="checkout-fullName"
                      className="form-control col-6"
                      placeholder="Enter full name"
                      type="text"
                      maxLength={40}
                      name="fullName"
                      required
                      minLength={3}
                      autoComplete="name"
                      onChange={(e) => {
                        let v = e.target.value
                        v = v.replace(/^\s+/, '')
                        v = v.replace(/[^A-Za-z\s]/g, '')
                        e.target.value = v
                      }}
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="themeInput">
                    <label className="form-label" htmlFor="checkout-phone">
                      WhatsApp number<small className="text-danger">*</small>
                    </label>
                    <input
                      id="checkout-phone"
                      placeholder="Enter WhatsApp number"
                      className="form-control"
                      type="text"
                      inputMode="numeric"
                      name="phone"
                      maxLength={10}
                      minLength={10}
                      required
                      pattern="\d{10}"
                      title="10-digit mobile number"
                      autoComplete="tel"
                      onChange={(e) => {
                        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10)
                      }}
                    />
                  </div>
                </div>

                <div className="col-lg-12 ">
                  <div className="themeInput">
                    <label className="form-label" htmlFor="checkout-address">
                      Address<small className="text-danger">*</small>
                    </label>
                    <input
                      id="checkout-address"
                      placeholder="Enter address"
                      className="form-control"
                      type="text"
                      name="address"
                      required
                      minLength={10}
                      maxLength={500}
                      autoComplete="street-address"
                      onChange={(e) => {
                        e.target.value = e.target.value.replace(/^\s+/, '')
                      }}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="themeInput">
                    <label className="form-label" htmlFor="checkout-message">
                      Message<small className="text-danger">*</small>
                    </label>
                    <textarea
                      id="checkout-message"
                      placeholder="Enter message"
                      className="form-control"
                      name="message"
                      required
                      minLength={5}
                      maxLength={2000}
                      rows={4}
                      onChange={(e) => {
                        e.target.value = e.target.value.replace(/^\s+/, '')
                      }}
                    />
                  </div>
                </div>

                <div className="col-lg-12 mt-1">
                  <div className="text-center gap-2 d-flex justify-content-center">
                    <button
                      type="button"
                      className="themeBtn"
                      onClick={onConfirmBooking}
                    >
                      Confirm Booking <HiMiniArrowRight />
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate(-1)}
                      className="rounded-5 btn btn-secondary px-3 fs-8 checkout-back-btn"
                    >
                      ← Back
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {bookingType === 'hotel' ? (
            <div className="col-lg-4 col-md-5 col-12 order-1 order-md-2 mb-3 checkout-summary-col">
              <div className="cartCard p-3 checkout-summary-card">
                <h6 className="checkoutHeading colortex ps-0">Booking Summery</h6>

                <div className="cartProductImgDiv">
                  <img
                    className="borderradius"
                    src={
                      hotelPreview?.image ||
                      'https://a0.muscache.com/im/pictures/miso/Hosting-659847153811698690/original/fb1290b5-09d1-458f-b57d-6e276a170c02.jpeg?im_w=960'
                    }
                    alt=""
                  />
                  <div className="cartProductInfo">
                    <p className=" colortexcheckout fw-semibold">{hotelPreview?.name || 'Homestay'}</p>
                    <div>
                      <div className="text-warning mb-1 d-flex align-items-center gap-1">
                        {[1, 2, 3, 4, 5].map((s) =>
                          s <= Math.round(Number(hotelPreview?.rating || 0)) ? (
                            <BsStarFill key={s} />
                          ) : (
                            <BsStar key={s} />
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <ul>
                  <li>
                    <span>Date</span>
                    <strong className="colortexcheckout">
                      {formatDateRange(hotelCtx?.check_in_date, hotelCtx?.check_out_date)}
                    </strong>
                  </li>
                  <li>
                    <span>Guests</span>
                    <strong className="colortexcheckout">
                      {Number(hotelCtx?.adults || 1)} adults, {Number(hotelCtx?.children || 0)} children
                    </strong>
                  </li>
                  <li>
                    <span>Room</span>
                    <strong className="colortexcheckout">{hotelCtx?.room_name || '—'}</strong>
                  </li>
                  <li>
                    <span>Location</span>
                    <strong className="colortexcheckout">{hotelPreview?.city || '—'}</strong>
                  </li>
                </ul>
                <h4>
                  <span className="fw-semibold">Total Amount</span>
                  <strong className="colortexcheckout">
                    {hotelCtx?.price_per_night ? `₹${hotelCtx.price_per_night}/night` : '—'}
                  </strong>
                </h4>
              </div>
            </div>
          ) : bookingType === 'food' ? (
            <div className="col-lg-4 col-md-5 col-12 order-1 order-md-2 mb-3 checkout-summary-col">
              <div className="cartCard p-3 checkout-summary-card">
                <h6 className="checkoutHeading colortex ps-0">Booking Summery</h6>

                <div className="cartProductImgDiv">
                  <img
                    className="borderradius"
                    src={
                      checkoutData?.vendor?.shop_image_url ||
                      'https://a0.muscache.com/im/pictures/miso/Hosting-659847153811698690/original/fb1290b5-09d1-458f-b57d-6e276a170c02.jpeg?im_w=960'
                    }
                    alt=""
                  />
                  <div className="cartProductInfo">
                    <p className="colortexcheckout fw-semibold">{checkoutData?.vendor?.shop_name || 'Food Service'}</p>
                    <div>
                      <div className="text-warning mb-1 d-flex align-items-center gap-1">
                        {[1, 2, 3, 4, 5].map((s) =>
                          s <= Math.round(Number(checkoutData?.rating || 0)) ? (
                            <BsStarFill key={s} />
                          ) : (
                            <BsStar key={s} />
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <ul>
                 

                  {/* <li className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Delivery Date</span>
                    <strong className="colortexcheckout">
                      {checkoutData?.delivery_date || '—'}
                    </strong>
                  </li> */}
                  <li className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Sub Total</span>
                    <strong className="colortexcheckout">
                      ₹{Number(checkoutData?.subtotal || 0).toFixed(2)}
                    </strong>
                  </li>
                  <li className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Delivery Charge</span>
                    <strong className="colortexcheckout">
                      ₹{Number(checkoutData?.shipping || 0).toFixed(2)}
                    </strong>
                  </li>
                  <li className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Tax</span>
                    <strong className="colortexcheckout">
                      ₹{Number(checkoutData?.tax || 0).toFixed(2)}
                    </strong>
                  </li>
                </ul>

                <hr className="my-1" />
                <h4>
                  <span className="fw-semibold">Total Amount</span>
                  <strong className="colortexcheckout">₹{Number(checkoutData?.total_amount || 0).toFixed(2)}</strong>
                </h4>
              </div>
            </div>
          ) : (
            <div className="col-lg-4 col-md-5 col-12 order-1 order-md-2 mb-3 checkout-summary-col">
              <div className="cartCard p-3 rounded-3 shadow-sm checkout-summary-card">
                <h6 className="checkoutHeading colortex ps-0">Vehicle Booking Summary</h6>

                <div className="cartProductImgDiv">
                  <img
                    className="borderradius"
                    src={
                      vehiclePreview?.image ||
                      'https://site-assets.evgo.com/f/78437/1280x720/b804203690/ev-model-chevrolet-equinox-ev.jpg'
                    }
                    alt=""
                     onerror={(e) => {
                      e.target.onerror = null; // infinite loop avoid
                      e.target.src = "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-blank-avatar-modern-vector-png-image_40962406.jpg";
                    }}
                  />
                  <div className="cartProductInfo">
                    <p className="colortexcheckout fw-semibold">{vehiclePreview?.name || 'Vehicle'}</p>
                    <div>
                      <div className="text-warning mb-1 d-flex align-items-center gap-1">
                        {[1, 2, 3, 4, 5].map((s) =>
                          s <= Math.round(Number(vehiclePreview?.rating || 0)) ? (
                            <BsStarFill key={s} />
                          ) : (
                            <BsStar key={s} />
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <ul className="list-unstyled bookingList mb-3">
                  <li className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Vehicle</span>
                    <strong className="colortexcheckout">
                      {vehiclePreview?.vehicle_type || vehiclePreview?.name || '—'}
                    </strong>
                  </li>

                  <li className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Booking Date</span>
                    <strong className="colortexcheckout">
                      {vehicleCtx?.travel_date || vehiclePreview?.travel_date || '—'}
                    </strong>
                  </li>

                  <li className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Pickup Location</span>
                    <strong className="colortexcheckout text-end" style={{ maxWidth: '60%' }}>
                      {vehiclePreview?.pickup_location || '—'}
                    </strong>
                  </li>

                  <li className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Drop Location</span>
                    <strong className="colortexcheckout text-end" style={{ maxWidth: '60%' }}>
                      {vehiclePreview?.drop_location || '—'}
                    </strong>
                  </li>

                  <li className="d-flex justify-content-between">
                    <span className="text-muted">Passengers</span>
                    <strong className="colortexcheckout">
                      {Number(vehiclePreview?.passengers || 1)} Persons
                    </strong>
                  </li>
                </ul>

                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-semibold">Total Amount</span>
                  <h5 className="colortexcheckout fw-bold mb-0">
                    {vehiclePreview?.price_per_day ? `₹${vehiclePreview.price_per_day}/day` : '—'}
                  </h5>
                </div>
              </div>
            </div>
          )}
        </div>

        <Modal
          show={showConfirm}
          onHide={() => setShowConfirm(false)}
          centered
          className="checkout-confirm-modal"
          contentClassName="checkout-confirm-content p-3 text-center"
          backdrop="static"
        >
          <Modal.Header closeButton className="border-0 pb-0 justify-content-center" style={{background:"white"}}>
            <Modal.Title className="w-100 text-center">Confirm Booking</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6 className="mb-0">Are you sure you want to place this booking?</h6>
          </Modal.Body>
          <Modal.Footer className="border-0 justify-content-center gap-2 checkout-confirm-actions">
            <Button
              variant="success"
              className="themeBtn px-3 py-2"
              disabled={loading}
              onClick={() => {
                submitBookingFromForm()
              }}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Sending…
                </>
              ) : (
                'Yes, Confirm'
              )}
            </Button>
            <Button
              variant="secondary"
              className="btn btn-secondary px-3 fs-8 py-2 rounded-5"
              onClick={() => setShowConfirm(false)}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showSuccess}
          onHide={() => {
            setShowSuccess(false)
            navigate('/')
          }}
          centered
          backdrop="static"
          dialogClassName="checkoutModal"
          contentClassName="checkout-success-content"
        >
          <Modal.Body>
            <div className="checkoutModalBody">
              <img src={ConfirmImg} alt="" />
              <h6 className="text-center">Your booking request has been successfully shared!</h6>
              <p>
                Your booking request has been successfully submitted. Our team will verify and
                confirm your booking shortly.
              </p>
              <div className="uploadBtn">
                <button
                  type="button"
                  className="checkoutUploadBtn"
                  onClick={() => {
                    setShowSuccess(false)
                    navigate('/')
                  }}
                >
                  Okay
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </section>
  )
}

export default CheckoutPage
