import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GoLocation } from 'react-icons/go'
import { BsFillHeartFill } from 'react-icons/bs'
import { Spinner } from 'react-bootstrap'
import Swal from 'sweetalert2'
import API from '../../../api'
import './ridesdetails.css'

const FALLBACK_VEHICLE_IMG =
  'https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-blank-avatar-modern-vector-png-image_40962406.jpg'

function cleanCities(cities) {
  return cities?.map((c) => String(c).replace(/"/g, ''))
}

function digitsForWhatsApp(phone) {
  const d = String(phone ?? '').replace(/\D/g, '')
  if (!d) return ''
  if (d.length === 10) return `91${d}`
  return d
}

function isApiSuccess(res) {
  const s = res?.data?.status
  return s === 'success' || s === true
}

function Ridesdetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState('')
  const [isLiked, setIsLiked] = useState(false)
  const [travelDate, setTravelDate] = useState('')
  const [travelTime, setTravelTime] = useState('')
  const [vehicle, setVehicle] = useState(null)
  const [loading, setLoading] = useState(false)

  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setLoading(true)
        const res = await API.get(`/vehicles/${id}`)
        if (isApiSuccess(res)) {
          const data = res.data.data
          setVehicle(data)
          const first =
            data?.gallery_images_urls?.length > 0
              ? data.gallery_images_urls[0]
              : data?.featured_image_url || FALLBACK_VEHICLE_IMG
          setSelectedImage(first)
        } else {
          setVehicle(null)
        }
      } catch {
        setVehicle(null)
      } finally {
        setLoading(false)
      }
    }
    fetchVehicle()
  }, [id])

  const imageList = useMemo(() => {
    if (!vehicle) return []
    return [
      ...new Set(
        [vehicle.featured_image_url, ...(vehicle.gallery_images_urls || [])].filter(Boolean),
      ),
    ]
  }, [vehicle])

  useEffect(() => {
    if (!imageList.length) return
    if (!imageList.includes(selectedImage)) {
      setSelectedImage(imageList[0])
    }
  }, [imageList, selectedImage])

  const waDigits = vehicle ? digitsForWhatsApp(vehicle.phone) : ''
  const waMessage = vehicle
    ? `Hi, I want to book ${vehicle.vehicle_name}${travelDate ? ` on ${travelDate}` : ''}${travelTime ? ` at ${travelTime}` : ''}.`
    : ''
  const waHref =
    waDigits && vehicle
      ? `https://wa.me/${waDigits}?text=${encodeURIComponent(waMessage)}`
      : ''

  const goToConfirm = () => {
    if (!travelDate || !travelTime) {
      Swal.fire('Please fill all the fields', 'Please fill all the fields', 'warning')
      return
    }
    localStorage.setItem('type', 'vehicle')
    localStorage.setItem(
      'checkoutVehiclePreview',
      JSON.stringify({
        vehicle_id: Number(id),
        name: vehicle?.vehicle_name || 'Vehicle',
        image: displayImage || FALLBACK_VEHICLE_IMG,
        rating: Number(vehicle?.average_rating || 0),
        vehicle_type: vehicle?.vehicle_type || '',
        pickup_location: cleanCities(vehicle?.available_cities)?.join(', ') || '',
        drop_location: cleanCities(vehicle?.available_cities)?.join(', ') || '',
        travel_date: travelDate || '',
        passengers: Number(vehicle?.seating_capacity || 1),
        price_per_day: Number(vehicle?.price_per_day || 0),
      }),
    )
    localStorage.setItem(
      'checkoutVehicleContext',
      JSON.stringify({
        vehicle_id: Number(id),
        travel_date: travelDate || null,
        travel_time: travelTime || null,
        pickup_date: travelDate || null,
      }),
    )
    navigate('/check-out')
  }

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner variant="primary" className="color" />
      </div>
    )
  }

  if (!vehicle) {
    return (
      <div className="container mt-5 rides-details-page">
        <h5 className="text-center text-muted">No vehicle found</h5>
        <p className="text-center mt-2">
          <button type="button" className="btn btn-link" onClick={() => navigate('/rides')}>
            Back to rides
          </button>
        </p>
      </div>
    )
  }

  const displayImage = selectedImage || vehicle.featured_image_url || FALLBACK_VEHICLE_IMG
  const priceHour = vehicle.price_per_hour ?? vehicle.price_per_hr
  const descriptionText =
    (typeof vehicle.description === 'string' && vehicle.description.trim()) ||
    `${vehicle.vehicle_name || 'Vehicle'}${vehicle.vehicle_model ? ` (${vehicle.vehicle_model})` : ''}${
      vehicle.brand ? ` by ${vehicle.brand}` : ''
    }.`

  return (
    <section className="container mt-4 rides-details-page userPageSection">
      <div className="mb-3 position-relative rides-hero-media">
        <img
          src={displayImage}
          className="w-100 rides-main-image"
          alt={vehicle.vehicle_name || 'Vehicle'}
          onError={(e) => {
            e.target.onerror = null
            e.target.src = FALLBACK_VEHICLE_IMG
          }}
        />
        <button
          type="button"
          className="wishlistIcon rides-wishlist-btn"
          aria-label={isLiked ? 'Remove from saved' : 'Save vehicle'}
          aria-pressed={isLiked}
          onClick={() => setIsLiked(!isLiked)}
        >
          <BsFillHeartFill color={isLiked ? '#e11d48' : '#ffffff'} aria-hidden />
        </button>
      </div>

      {imageList.length > 1 && (
        <div className="d-flex gap-2 mb-4 overflow-auto rides-thumb-strip" role="list">
          {imageList.map((img, i) => (
            <button
              key={`${img}-${i}`}
              type="button"
              className={`rides-thumb-btn ${selectedImage === img ? 'active' : ''}`}
              onClick={() => setSelectedImage(img)}
              aria-label={`Show image ${i + 1}`}
              aria-current={selectedImage === img ? 'true' : undefined}
            >
              <img
                className="rides-thumb"
                src={img}
                alt=""
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = FALLBACK_VEHICLE_IMG
                }}
              />
            </button>
          ))}
        </div>
      )}

      <div className="d-flex justify-content-between align-items-start mb-3 rides-title-row">
        <div>
          <h4 className="fw-semibold text-capitalize colortex mb-2">{vehicle.vehicle_name}</h4>
          <div className="text-warning mb-1 gap-1 rides-rating-row" aria-label={`Rating ${vehicle.average_rating || 0} out of 5`}>
            {[1, 2, 3, 4, 5].map((star) => (
              <i
                key={star}
                className={
                  star <= Math.round(Number(vehicle.average_rating) || 0) ? 'bi bi-star-fill' : 'bi bi-star'
                }
              />
            ))}
            <span className="ms-2 text-body-secondary">({Number(vehicle.average_rating || 0).toFixed(1)})</span>
          </div>
          <div className="d-flex align-items-center text-muted rides-location-row">
            <GoLocation aria-hidden />
            <span className="ms-2">{cleanCities(vehicle.available_cities)?.join(', ') || 'Location'}</span>
          </div>
        </div>

        <div className="text-end rides-price-box">
          <h4 className="fw-semibold colortex mb-1">₹{vehicle.price_per_day}/day</h4>
          <small className="text-muted d-block">₹{vehicle.price_per_km}/km</small>
          {priceHour != null && priceHour !== '' && (
            <small className="text-muted d-block">₹{priceHour}/hour</small>
          )}
          <div className="mt-2">
            {vehicle.is_available ? (
              <span className="text-success fw-semibold small">Available</span>
            ) : (
              <span className="text-danger fw-semibold small">Not available</span>
            )}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card p-3 mb-4 rounded-2 rides-soft-card">
            <h5 className="fw-semibold mb-3 colortex">Description</h5>
            <p className="text-muted rides-description-text">{descriptionText}</p>
          </div>
        </div>

        <div className="col-12 col-lg-8">
          <div className="card p-3 mb-4 rounded-2 rides-soft-card">
            <h5 className="fw-semibold mb-3 colortex">Vehicle details</h5>
            <div className="rides-spec-grid">
              <p>Seating: {vehicle.seating_capacity ?? '—'}</p>
              <p>Fuel: {vehicle.fuel_type ?? '—'}</p>
              <p>Transmission: {vehicle.transmission ?? '—'}</p>
              <p>Color: {vehicle.color ?? '—'}</p>
            </div>
            <p className="fw-semibold colortex p-2 rides-price-inline mb-0">
              ₹{vehicle.price_per_day}/day
              {priceHour != null && priceHour !== '' ? ` · ₹${priceHour}/hour` : ''}
              {vehicle.price_per_km != null && vehicle.price_per_km !== '' ? ` · ₹${vehicle.price_per_km}/km` : ''}
            </p>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="card p-3 mb-3 rounded-2 rides-soft-card rides-booking-card">
            <h5 className="fw-semibold mb-3 colortex rides-booking-title">Book</h5>

            <div className="themeInput mb-2">
              <label className="form-label small mb-1" htmlFor="ride-pickup-date">
                Date <span className="text-muted fw-normal">*</span>
              </label>
              <input
                id="ride-pickup-date"
                type="date"
                className="form-control"
                min={today}
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                required
              />
            </div>
            <div className="themeInput mb-3">
              <label className="form-label small mb-1" htmlFor="ride-pickup-time">
                Time <span className="text-muted fw-normal">*</span>
              </label>
              <input
                id="ride-pickup-time"
                type="time"
                className="form-control"
                value={travelTime}
                onChange={(e) => setTravelTime(e.target.value)}
                required
              />
            </div>

            <button
              type="button"
              onClick={goToConfirm}
              className="goBtn green mb-3 rides-primary-btn w-100"
              disabled={!vehicle.is_available}
            >
              Book now
            </button>

            {waHref ? (
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className="btn btn-success gap-2 w-100 text-light mb-0 rides-whatsapp-btn"
              >
                <i className="bi bi-whatsapp me-2" aria-hidden />
                Book via WhatsApp
              </a>
            ) : (
              <p className="small text-muted mb-0 text-center">WhatsApp booking unavailable (no phone on file).</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Ridesdetails
