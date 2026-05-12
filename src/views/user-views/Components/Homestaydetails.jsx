import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GoLocation } from 'react-icons/go'
import { BsFillHeartFill } from 'react-icons/bs'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Spinner } from 'react-bootstrap'
import API from '../../../api'
import { BsStarFill, BsStar } from 'react-icons/bs'
import Swal from 'sweetalert2'

const FALLBACK_IMAGE =
  'https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-blank-avatar-modern-vector-png-image_40962406.jpg'

function parsePossiblyNestedJson(value) {
  if (value == null) return []
  if (Array.isArray(value)) return value
  if (typeof value !== 'string') return []

  let parsed = value
  for (let i = 0; i < 2; i += 1) {
    try {
      parsed = JSON.parse(parsed)
    } catch {
      break
    }
  }
  if (Array.isArray(parsed)) return parsed
  return []
}

function roomImageList(room, propertyFeaturedImage) {
  const raw = [
    room?.featured_image_url,
    room?.image_url,
    ...(room?.gallery_images_urls || []),
    ...(room?.images_urls || []),
    ...parsePossiblyNestedJson(room?.images),
  ]
    .filter(Boolean)
    .map((img) => String(img).trim())
    .filter(Boolean)

  const baseDir = propertyFeaturedImage?.includes('/')
    ? propertyFeaturedImage.split('/').slice(0, -1).join('/')
    : ''

  const normalized = raw.map((img) => {
    if (/^(https?:)?\/\//i.test(img) || img.startsWith('data:')) return img
    if (img.startsWith('/')) return `https://atithi.developmentalphawizz.com${img}`
    if (baseDir) return `${baseDir}/${img}`
    return img
  })

  const unique = [...new Set(normalized)]
  return unique.length ? unique : [propertyFeaturedImage || FALLBACK_IMAGE]
}

function Homestaydetails() {
  const { id } = useParams()

const Navigate = useNavigate();
 const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(1)
  const [showGuest, setShowGuest] = useState(false)

  const guestRef = useRef()

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (guestRef.current && !guestRef.current.contains(e.target)) {
        setShowGuest(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const increase = (type) => {
    if (type === 'adult') setAdults(adults + 1)
    if (type === 'child') setChildren(children + 1)
  }

  const decrease = (type) => {
    if (type === 'adult' && adults > 1) setAdults(adults - 1)
    if (type === 'child' && children > 0) setChildren(children - 1)
  }
  const today = new Date().toISOString().split('T')[0]
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  /** `null` = user ne abhi room choose nahi kiya */
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(null)
  const [property, setProperty] = useState(null)
  const [selectedImage, setSelectedImage] = useState('')
  const [isLiked, setIsLiked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [roomSlideByKey, setRoomSlideByKey] = useState({})

  const gotoconfirm = () => {
    const rooms = property?.rooms_details || []
    if (!rooms.length) {
      Swal.fire('Rooms unavailable', 'Is property ke liye abhi koi room list nahi hai.', 'warning')
      return
    }
    if (selectedRoomIndex === null) {
      Swal.fire('Check karein', 'Reserve karne se pehle ek room select karein.', 'warning')
      return
    }
    const room = rooms[selectedRoomIndex]
    if (!room || Number(room.available_rooms) < 1) {
      Swal.fire('Check karein', 'Ye room ab available nahi hai — koi aur room select karein.', 'warning')
      return
    }
    if (!checkIn || !checkOut) {
      Swal.fire('Check karein', 'Check-in aur check-out date dono select karein.', 'warning')
      return
    }
    if (checkOut <= checkIn) {
      Swal.fire('Check karein', 'Check-out date check-in ke baad honi chahiye.', 'warning')
      return
    }
    const totalGuests = adults + children
    if (totalGuests < 1) {
      Swal.fire('Check karein', 'Kam se kam 1 guest chahiye.', 'warning')
      return
    }
    const cap = Number(room.max_guests) || 0
    // if (cap > 0 && totalGuests > cap) {
    //   Swal.fire(
    //     'Check karein',
    //     `Is room mein maximum ${cap} guests allowed hain. Guests count kam karein ya doosra room select karein.`,
    //     'warning',
    //   )
    //   return
    // }
    const roomTypeId = room.room_type_id ?? room.id ?? room.room_type?.id
    localStorage.setItem('type', 'hotel')
    localStorage.setItem(
      'checkoutHotelPreview',
      JSON.stringify({
        homestay_id: Number(id),
        name: property?.property_name || 'Homestay',
        image: selectedImage || property?.featured_image_url || '',
        rating: Number(property?.star_rating || 0),
        city: property?.city || property?.address || '',
        price_per_night: Number(room.price_per_night) || 0,
      }),
    )
    localStorage.setItem(
      'checkoutHomestayContext',
      JSON.stringify({
        homestay_id: Number(id),
        check_in_date: checkIn,
        check_out_date: checkOut,
        adults,
        children,
        room_type_id: roomTypeId != null ? Number(roomTypeId) : null,
        room_name: room.room_name || room.room_type || 'Room',
        price_per_night: Number(room.price_per_night) || 0,
        number_of_rooms: 1,
      }),
    )
    Navigate('/check-out')
  }

  // ✅ FETCH API
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true)

        const res = await API.get(`/homestays/${id}`)

        if (res?.data?.status === 'success') {
          const data = res.data.data
          setProperty(data)

          // ✅ default image
          if (data.featured_image_url) {
            setSelectedImage(data.featured_image_url)
          }
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchDetails()
  }, [id])

  useEffect(() => {
    setSelectedRoomIndex(null)
    setCheckIn('')
    setCheckOut('')
    setRoomSlideByKey({})
  }, [id])

  if (loading) {
    return (
       <div className="text-center py-5">
                              <Spinner variant="primary" className='color'/>
                            </div>
    )
  }

  if (!property) return <h5 className="text-center mt-5">No Property Found</h5>

  const rooms = property.rooms_details || []
  const selectedRoom = selectedRoomIndex !== null ? rooms[selectedRoomIndex] : null
  const totalGuests = adults + children

  const nights =
    checkIn && checkOut && checkOut > checkIn
      ? Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000)
      : 0
  const estimatedTotal =
    selectedRoom && nights > 0 ? nights * (Number(selectedRoom.price_per_night) || 0) : null

  return (
    <section className="container mt-4 homestay-details-page">



      {/* IMAGE */}
      <div className="mb-3 position-relative homestay-hero-media">
        <img
          src={selectedImage}
          className="w-100 homestay-main-image"
          alt={property.property_name || 'Homestay'}
          onError={(e) => {
            e.target.onerror = null // infinite loop avoid
            e.target.src = FALLBACK_IMAGE
          }}
        />
         <div
    className="wishlistIcon"
    onClick={() => setIsLiked(!isLiked)}
  >
    <BsFillHeartFill color={isLiked ? 'red' : 'white'} />
  </div>
      </div>

      {/* GALLERY */}
      <div className="d-flex gap-2 mb-4 overflow-auto homestay-gallery-strip">
        {[property.featured_image_url, ...(property.gallery_images_urls || [])]
          .filter(Boolean)
          .map((img, i) => (
            <img className={`mb-3 homestay-thumb ${selectedImage === img ? 'active' : ''}`}
              key={i}
              src={img}
              onClick={() => setSelectedImage(img)}
              alt={`Gallery ${i + 1}`}
              onError={(e) => {
                e.target.onerror = null // infinite loop avoid
                e.target.src = FALLBACK_IMAGE
              }}
            />
          ))}
      </div>

{/* HEADER */}
      <div className="d-flex justify-content-between align-items-start mb-3 homestay-title-row">
        <div>
          <h4 className="fw-semibold text-capitalize colortex">{property.property_name}

          </h4>

          <div className="text-warning mb-1 d-flex align-items-center gap-1 homestay-rating-row">
  {[1, 2, 3, 4, 5].map((star) =>
    star <= property?.star_rating ? (
      <BsStarFill key={star} />
    ) : (
      <BsStar key={star} />
    )
  )}

  <span className="ms-2 text-dark">({property.star_rating})</span>
</div>

          <div className="d-flex align-items-center text-muted homestay-location-row">
            <GoLocation />
            <span className="ms-2">{property.address}</span>
          </div>
        </div>

        <div className="text-end homestay-price-box">
          <h4 className="fw-semibold colortex">
            Rooms from ₹{property.base_price_per_night}
          </h4>
          <span className="text-success fw-semibold homestay-availability-tag">AVAILABLE NOW</span>
        </div>
      </div>


      {/* AVAILABILITY */}


      <div className="row">
        <div className="col-12 col-lg-8">
{/* DESCRIPTION */}
      <div className="card p-3 mb-4 rounded-2 homestay-soft-card">
        <h5 className="fw-semibold mb-3 colortex">Description</h5>
        <p className="text-muted homestay-description-text">{property.description}</p>
      </div>
          {/* ROOMS — user must select one before Reserve */}
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
            <h5 className="fw-semibold mb-0 colortex">
              Select a room<small className="text-danger">*</small>
            </h5>
           
          </div>
          {!rooms.length ? (
            <p className="text-muted small mb-4">Rooms ki jankari abhi uplabdh nahi hai.</p>
          ) : null}
          {rooms.map((room, index) => {
            const available = Number(room.available_rooms) > 0
            const isSelected = selectedRoomIndex === index
            const roomKey = room.id ?? room.room_type_id ?? index
            const images = roomImageList(room, property.featured_image_url)
            const slide = Math.min(
              roomSlideByKey[roomKey] ?? 0,
              Math.max(0, images.length - 1),
            )
            const roomImage = images[slide]
            return (
              <div
                key={roomKey}
                role="button"
                tabIndex={available ? 0 : -1}
                onClick={() => {
                  if (!available) return
                  setSelectedRoomIndex(index)
                }}
                onKeyDown={(e) => {
                  if (!available) return
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelectedRoomIndex(index)
                  }
                }}
                className={`card p-3 mb-4 rounded-3 d-flex flex-row gap-3 room-card homestay-soft-card homestay-room-selectable ${
                  isSelected ? 'homestay-room-selected border border-2 border-warning shadow-sm ' : ''
                } ${!available ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}`}
                aria-pressed={isSelected}
                aria-disabled={!available}
              >
                <div className="form-check d-flex align-items-start pt-1">
                  <input required
                    className="form-check-input mt-1"
                    type="radio"
                    name="homestay-room"
                    id={`homestay-room-${index}`}
                    checked={isSelected}
                    disabled={!available}
                    onChange={() => available && setSelectedRoomIndex(index)}
                  />
                </div>

                <div className="homestay-room-media">
                  <img
                    src={roomImage}
                    className="room-img"
                    alt={room.room_name || 'Room'}
                    onError={(e) => {
                      e.target.onerror = null // infinite loop avoid
                      e.target.src = FALLBACK_IMAGE
                    }}
                  />
                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        className="product-gallery-arrow product-gallery-arrow--prev"
                        aria-label="Previous room image"
                        onClick={(e) => {
                          e.stopPropagation()
                          setRoomSlideByKey((prev) => ({
                            ...prev,
                            [roomKey]: (slide - 1 + images.length) % images.length,
                          }))
                        }}
                      >
                        <FiChevronLeft aria-hidden />
                      </button>
                      <button
                        type="button"
                        className="product-gallery-arrow product-gallery-arrow--next"
                        aria-label="Next room image"
                        onClick={(e) => {
                          e.stopPropagation()
                          setRoomSlideByKey((prev) => ({
                            ...prev,
                            [roomKey]: (slide + 1) % images.length,
                          }))
                        }}
                      >
                        <FiChevronRight aria-hidden />
                      </button>
                      <span className="product-gallery-count" aria-hidden>
                        {slide + 1}/{images.length}
                      </span>
                    </>
                  )}
                </div>

                <div className="flex-grow-1 d-flex flex-column justify-content-between">
                  <div>
                    <label htmlFor={`homestay-room-${index}`} className="w-100 mb-0 cursor-pointer">
                      {room.room_type ? (
                        <span className="badge bg-light text-capitalize mb-2 homestay-room-type-badge">
                          {room.room_type}
                        </span>
                      ) : null}

                      <h5 className="fw-semibold colortex text-capitalize">{room.room_name}</h5>

                      <p className="text-muted small homestay-room-meta mb-1">
                        Max {room.max_guests} guests · Available: {room.available_rooms} / {room.total_rooms}
                      </p>
                      {!available ? (
                        <p className="text-danger small mb-0 fw-semibold">Fully booked</p>
                      ) : totalGuests > Number(room.max_guests) && Number(room.max_guests) > 0 ? (
                        null
                      ) : null}

                      <p className="colortex fw-semibold homestay-room-price mb-0">
                        ₹{room.price_per_night}
                        <span className="fs-6 text-muted"> /night</span>
                      </p>
                    </label>
                  </div>
                </div>
              </div>
            )
          })}

          {/* AMENITIES */}
          <div className="card p-3 mb-4 rounded-3 shadow-sm homestay-soft-card">
            <h5 className="fw-semibold mb-3 colortex">Amenities</h5>

            <div className="row">
              <div className="col-12 mb-2">
                <strong>🏨 Property:</strong>
                <ul className="ps-3 homestay-amenities-list">
                  {(property.amenities || []).map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>

              <div className="col-12">
                <strong>📜 Rules:</strong>
                <p className="text-muted small homestay-rules-text">
                  {property.house_rules || 'No rules specified'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-12 col-lg-4">
 <div className="card p-3 mb-4 rounded-2 shadow bg-white homestay-booking-card">
        <h5 className="fw-semibold mb-2 colortex homestay-booking-title">Check Availability</h5>
        <p className="small fw-semibold mb-3 mb-md-3 text-danger">
          Room, check-in / check-out and guests are required.
        </p>

     <div className="row g-3 align-items-end">

      {/* CHECK-IN */}
      <div className="col-md-6">
        <div className='themeInput mb-0'>
          <label className="form-label form-labels">
            Check-in<small className="text-danger">*</small>
          </label>
          <input
            type="date"
            className="form-control"
            min={today}
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>
      </div>

      {/* CHECK-OUT */}
      <div className="col-md-6">
        <div className='themeInput mb-0'>
          <label className="form-label form-labels">
            Check-out<small className="text-danger">*</small>
          </label>
          <input
            type="date"
            className="form-control"
            min={checkIn || today}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>
      </div>

      {/* GUEST */}
      <div className="col-md-12 position-relative" ref={guestRef}>
        <div className='themeInput mb-0'>
          <label className="form-label form-labels">
            Guests<small className="text-danger">*</small>
          </label>
          {selectedRoom && Number(selectedRoom.max_guests) > 0 ? (
            <small className="text-muted d-block mb-1">
              Max {selectedRoom.max_guests} (Total Guests: {totalGuests})
            </small>
          ) : null}

          {/* INPUT */}
          <input
            className="form-control"
            value={`${adults} Adult, ${children} Child`}
            readOnly
            onClick={() => setShowGuest(!showGuest)}
            style={{ cursor: 'pointer' }}
          />

          {/* DROPDOWN */}
          {/* {showGuest && (
            <div className="guestDropdown shadow bg-white p-3 rounded">


              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <strong>Adults</strong>
                </div>
                <div>
                  <button onClick={() => decrease('adult')} className="btn btn-sm btn-outline-secondary">-</button>
                  <span className="mx-3">{adults}</span>
                  <button onClick={() => increase('adult')} className="btn btn-sm btn-outline-secondary">+</button>
                </div>
              </div>


              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>Children</strong>
                </div>
                <div>
                  <button onClick={() => decrease('child')} className="btn btn-sm btn-outline-secondary">-</button>
                  <span className="mx-3">{children}</span>
                  <button onClick={() => increase('child')} className="btn btn-sm btn-outline-secondary">+</button>
                </div>
              </div>

            </div>
          )} */}
      {showGuest && (
      <div className="guestDropdown p-2 rounded">


              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <strong className='fw-semibold'>Adults</strong>
                </div>
                <div>
                  <button onClick={() => decrease('adult')} className="quanitiybtn btn btn-sm btn-secondary">-</button>
                  <span className="mx-3">{adults}</span>
                  <button onClick={() => increase('adult')} className="quanitiybtn btn btn-sm btn-secondary">+</button>
                </div>
              </div>


              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong className='fw-semibold'>Children</strong>
                </div>
                <div>
                  <button onClick={() => decrease('child')} className="quanitiybtn btn btn-sm btn-secondary">-</button>
                  <span className="mx-3">{children}</span>
                  <button onClick={() => increase('child')} className="quanitiybtn btn btn-sm btn-secondary">+</button>
                </div>
              </div>

            </div>
      )}
        </div>

      </div>


   <div className="col-md-12 mt-0">
  <div className="priceSummary p-0 rounded homestay-price-summary">



    <hr />

    <div className="d-flex justify-content-between fw-bold fs-6">
      <span>Estimated total</span>
      <span className="colortex">
        {estimatedTotal != null && estimatedTotal >= 0
          ? `₹${estimatedTotal.toLocaleString('en-IN')}`
          : '—'}
      </span>
    </div>
    {selectedRoom && nights > 0 ? (
      <p className="small text-muted mb-0 mt-2">
        {nights} night{nights !== 1 ? 's' : ''} × ₹{Number(selectedRoom.price_per_night) || 0}
      </p>
    ) : (
null
    )}

  </div>
</div>
      {/* BUTTON */}
      <div className="col-md-12">

        <button
          type="button"
          onClick={gotoconfirm}
          className="themeBtn w-100"
          disabled={
            selectedRoomIndex === null ||
            !checkIn ||
            !checkOut ||
            checkOut <= checkIn ||
            !rooms.length 
            // ||
            // (selectedRoom &&
            //   Number(selectedRoom.max_guests) > 0 &&
            //   totalGuests > Number(selectedRoom.max_guests))
          }
        >
          Reserve
        </button>

  </div>
    </div>
      </div>

          {/* POLICIES */}
          <div className="card p-3 mb-3 rounded-2 homestay-soft-card">
          <div className="">

            {/* WhatsApp */}
            <a
              href={`https://wa.me/91${property.phone || '9999999999'}?text=Hi, I'm interested in ${property.property_name}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-success w-100 mb-0 text-light homestay-whatsapp-btn"
            >
             <i className="bi bi-whatsapp"></i> Book Via WhatsApp
            </a>

            {/* SAVE */}
            {/* <button
              onClick={() => setIsLiked(!isLiked)}
              className={`btn w-100 ${
                isLiked ? 'btn-primary' : 'btn-outline-secondary'
              }`}
            >
              <BsFillHeartFill /> {isLiked ? 'Saved' : 'Save'}
            </button> */}
          </div>
</div>
          <div className="card p-3 mb-3 rounded-2 homestay-soft-card">
            <h5 className="fw-semibold mb-3 colortex">Hotel Policies</h5>

            <p className="homestay-policy-line"><strong>CHECK-IN :</strong> {property.check_in_time}</p>
            <p className="homestay-policy-line"><strong>CHECK-OUT:</strong> {property.check_out_time}</p>

            <p className="text-muted small">
              Valid ID required. Extra bed subject to availability.
            </p>
          </div>

        </div>
      </div>

    </section>
  )
}

export default Homestaydetails
