import { useEffect, useState } from 'react'
import { LuSearch } from 'react-icons/lu'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Spinner, Modal, Button, Form } from 'react-bootstrap'
import '../../../views/user-views/Components/productpage.css'
import { GoLocation } from 'react-icons/go'
import { useNavigate, useSearchParams } from 'react-router-dom'
import API from '../../../api'

import { BsStarFill } from 'react-icons/bs'
import { FaLocationDot } from 'react-icons/fa6'

const VEHICLE_IMG_FALLBACK =
  'https://atithi.developmentalphawizz.com/backend/storage/app/public/vehicle/2026-03-23-69c10ee2b1a97.jpg'

function normalizeImageUrl(url) {
  if (url == null || url === '') return ''
  return String(url).replace(/\\\//g, '/').trim()
}

function getVehicleGalleryImages(item) {
  const raw = [
    item?.featured_image_url,
    ...(item?.gallery_images_urls || []),
    ...(item?.gallery_images || []),
  ]
    .map(normalizeImageUrl)
    .filter(Boolean)
  const unique = [...new Set(raw)]
  return unique.length ? unique : [VEHICLE_IMG_FALLBACK]
}

function saveCheckoutVehiclePreview(item, pickupLocation, destinationLocation, travelDate) {
  const gallery = getVehicleGalleryImages(item)
  localStorage.setItem(
    'checkoutVehiclePreview',
    JSON.stringify({
      vehicle_id: item?.id,
      name: item?.vehicle_name || 'Vehicle',
      image: gallery[0] || VEHICLE_IMG_FALLBACK,
      rating: Number(item?.average_rating || 0),
      vehicle_type: item?.vehicle_type || '',
      pickup_location: pickupLocation || '',
      drop_location: destinationLocation || '',
      travel_date: travelDate || '',
      passengers: Number(item?.seating_capacity || 1),
      price_per_day: Number(item?.price_per_day || 0),
    }),
  )
}

function Rides() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(10000)
  const [productCount, setProductCount] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRating, setSelectedRating] = useState('')
  const [selectedVehicleType, setSelectedVehicleType] = useState('car')
  const [pickupLocation, setPickupLocation] = useState('')
  const [destinationLocation, setDestinationLocation] = useState('')
  const [travelDate, setTravelDate] = useState('')
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [gallerySlideById, setGallerySlideById] = useState({})

  // ====== MODAL STATE ======
  const [showModal, setShowModal] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [enquiryName, setEnquiryName] = useState('')
  const [enquiryPhone, setEnquiryPhone] = useState('')
  const [enquiryMessage, setEnquiryMessage] = useState('')

  const handleClose = () => setShowModal(false)
  const handleShow = (vehicle) => {
    setSelectedVehicle(vehicle)
    setShowModal(true)
  }

  useEffect(() => {
    const pickup = searchParams.get('pickup')?.trim()
    const drop = searchParams.get('drop')?.trim()
    const vt = searchParams.get('vehicleType')?.trim()
    const date = searchParams.get('date')?.trim()
    // if (pickup) setPickupLocation(pickup)
    // if (drop) setDestinationLocation(drop)
    if (vt) setSelectedVehicleType(vt)
    if (date) setTravelDate(date)
  }, [searchParams])

  // ✅ FETCH API
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true)
        const res = await API.get(`/vehicles/get-vehicles?type=${selectedVehicleType}`)
        if (res?.data?.status === 'success') {
          const data = res.data.data.data
          setProducts(data)
          setFilteredProducts(data)
          setProductCount(data.length)
        }
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchVehicles()
  }, [selectedVehicleType])

  const cleanCities = (cities) => cities?.map((c) => c.replace(/"/g, ''))

  // ✅ FILTER LOGIC
  useEffect(() => {
    let filtered = [...products]
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.vehicle_name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    filtered = filtered.filter(
      (item) => Number(item.price_per_day) >= minValue && Number(item.price_per_day) <= maxValue
    )
    if (selectedRating) {
      filtered = filtered.filter(
        (item) => Number(item.average_rating) >= selectedRating
      )
    }
    if (pickupLocation) {
      filtered = filtered.filter(
        (item) => JSON.stringify(item.available_cities || []).toLowerCase().includes(pickupLocation.toLowerCase())
      )
    }
    if (destinationLocation) {
      filtered = filtered.filter(
        (item) => JSON.stringify(item.available_cities || []).toLowerCase().includes(destinationLocation.toLowerCase())
      )
    }
    if (selectedVehicleType) {
      filtered = filtered.filter(
        (item) => item.vehicle_type === selectedVehicleType
      )
    }
    setFilteredProducts(filtered)
    setProductCount(filtered.length)
  }, [
    searchTerm,
    minValue,
    maxValue,
    selectedRating,
    pickupLocation,
    destinationLocation,
    selectedVehicleType,
    products,
  ])

  const submitEnquiry = async () => {
    if (!enquiryName || !enquiryPhone) {
      alert('Please enter Name & Phone')
      return
    }

    // Example API call
    try {
      await API.post('/enquiry', {
        vehicle_id: selectedVehicle.id,
        name: enquiryName,
        phone: enquiryPhone,
        message: enquiryMessage
      })
      alert('Enquiry submitted successfully!')
      setShowModal(false)
      setEnquiryName('')
      setEnquiryPhone('')
      setEnquiryMessage('')
    } catch (err) {
      console.log(err)
      alert('Error submitting enquiry')
    }
  }

  const clearFilters = () => {
    setPickupLocation('')
    setDestinationLocation('')
    setTravelDate('')
    setSelectedVehicleType('')
   
  }
  return (
    <section className="productSection container rides-page-pro">
      <div className="row">
        <div className="themeHeader">
          <h2>
            Available <span>Vehicles</span>
          </h2>
        </div>

        <div className="col-12 col-lg-12">
          <div className="productContainer">

            {/* FILTER BAR */}
            <div className="mb-3">
              <div className="row g-2 align-items-end">
                <div className="col-12 col-md-3">
                  <div className="productSearchBar w-100">
                    <input
                      type="text"
                      placeholder="Pickup Location"
                      className="productSearchInput"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-12 col-md-3">
                  <div className="productSearchBar w-100">
                    <input
                      type="text"
                      placeholder="Drop Location"
                      className="productSearchInput"
                      value={destinationLocation}
                      onChange={(e) => setDestinationLocation(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-12 col-md-2">
                  <div className="productSearchBar w-100">
                    <input
                      type="date"
                      className="productSearchInput"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-12 col-md-2">
                  <div className="productSearchBar w-100">
                    <select
                      className="productSearchInput"
                      value={selectedVehicleType}
                      onChange={(e) => setSelectedVehicleType(e.target.value)}
                    >

                      <option value="car">Car</option>
                      <option value="scooter">Scooter</option>
                      <option value="bike">Bike</option>

                      <option value="auto_rickshaw">Auto </option>

                      <option value="suv">SUV</option>
                      <option value="sedan">Sedan</option>
                      <option value="bicycle">Tempo Traveller</option>
                    </select>
                  </div>
                </div>

                 <div className="col-12 col-md-2">
                  <button className="goBtn purple w-100 themeBtn w-100 h-100 d-flex align-items-center justify-content-center gap-2">
                    <LuSearch /> Search
                  </button>
                </div>
              </div>
            </div>

            {/* COUNT */}
            <div className="activeFilterDiv">
              <div className="filterCounts">
                {productCount} <span>Results found.</span> 
              </div>
            </div>

            {/* CARDS */}
            <section className="commonSection homeCardSection p-0 mt-0">
              <div className="row m-0 productpageItem p-2 rides-list">
                {loading ? (
                  <div className="rides-state-wrap">
                    <div className="text-center py-5 product-state rides-product-state">
                      <Spinner variant="primary" className="color" />
                      <p>Finding suitable vehicles for your trip...</p>
                    </div>
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="rides-state-wrap">
                    <div className="text-center product-state rides-product-state">
                      <h5 className="w-auto mt-4">No Data Found</h5>
                      <p>Try changing filters or search term.</p>
                      <button type="button" onClick={clearFilters} className="themeBtn addToBtn mt-2">
                        Clear all filters
                      </button>
                    </div>
                  </div>
                ) : (
                  filteredProducts.map((item) => {
                    const galleryImages = getVehicleGalleryImages(item)
                    const slideIdx = Math.min(
                      gallerySlideById[item.id] ?? 0,
                      Math.max(0, galleryImages.length - 1),
                    )
                    const displaySrc = galleryImages[slideIdx] || galleryImages[0]

                    return (
                    <article onClick={() => {
                      saveCheckoutVehiclePreview(item, pickupLocation, destinationLocation, travelDate)
                      navigate(`/ridesdetails/${item.id}`)
                    }}
                      key={item.id}
                      className="cursor productPageCard trivozoCard rides-list-card"
                    >
                      <div className="productPageImg mb-0 rides-list-media product-card-gallery">
                        {displaySrc ? (
                          <img
                            src={displaySrc}
                            alt={item.vehicle_name || 'Vehicle'}
                            className="product-card-gallery-img"
                            loading="lazy"
                            onError={(e) => {
                              e.target.onerror = null; 
                              e.target.src = "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-blank-avatar-modern-vector-png-image_40962406.jpg";
                            }}
                          />
                        ) : (
                          <div className="product-card-gallery-empty" aria-hidden />
                        )}
                        {galleryImages.length > 1 && (
                          <>
                            <button
                              type="button"
                              className="product-gallery-arrow product-gallery-arrow--prev"
                              aria-label="Previous photo"
                              onClick={(e) => {
                                e.stopPropagation()
                                const len = galleryImages.length
                                setGallerySlideById((prev) => {
                                  const cur = prev[item.id] ?? 0
                                  return { ...prev, [item.id]: (cur - 1 + len) % len }
                                })
                              }}
                            >
                              <FiChevronLeft aria-hidden />
                            </button>
                            <button
                              type="button"
                              className="product-gallery-arrow product-gallery-arrow--next"
                              aria-label="Next photo"
                              onClick={(e) => {
                                e.stopPropagation()
                                const len = galleryImages.length
                                setGallerySlideById((prev) => {
                                  const cur = prev[item.id] ?? 0
                                  return { ...prev, [item.id]: (cur + 1) % len }
                                })
                              }}
                            >
                              <FiChevronRight aria-hidden />
                            </button>
                            <span className="product-gallery-count" aria-hidden>
                              {slideIdx + 1}/{galleryImages.length}
                            </span>
                          </>
                        )}
                      </div>

                      <div className="productPageCardData rides-list-content">
                        <div className='mb-0 d-flex align-items-center justify-content-between gap-2'>
                        <h6 className="listing-card-title text-capitalize rides-list-title">{item.vehicle_name}</h6>
                        <p className="rides-list-rating">
                          <BsStarFill />
                          {Number(item.average_rating || 0).toFixed(1)}
                        </p>
                        </div>
                        <p className="hotelAddress listing-card-subtext">
                        <FaLocationDot className="text-danger me-1" />
                          {cleanCities(item.available_cities)?.join(', ') || 'Location'}
                        </p>
                        <p className="text-muted small mb-1 rides-list-specs">
                          👥 {item.seating_capacity} Seater • {item.fuel_type} • {item.transmission}
                        </p>

                        <div className="rides-list-bottom">
                          <div className="rides-list-pricing">
                            <div className="d-flex align-items-center gap-1 mt-1">
                              <p className="itemPrice  mb-0">₹{item.price_per_day}</p><small className="colortex listing-card-subtext">/Day</small>
                            </div>
                            
                            <div className="d-flex align-items-center gap-1 mt-1">
                              <p className="itemPrice  mb-0">₹{item.price_per_hour}</p><small className="colortex listing-card-subtext">/Hour</small>
                            </div>
                            <div className="d-flex align-items-center gap-1 mt-1">
                              <p className="itemPrice  mb-0">₹{item.price_per_km}</p><small className="colortex listing-card-subtext">/KM</small>
                            </div>

                           


                           </div>

                          {/* ===== ENQUIRY BUTTON ===== */}
                          <button
                            type="button"
                            className="themeBtn addToBtn rides-list-cta"
                            // onClick={() => handleShow(item)}
                          >
                            View Details →
                          </button>
                        </div>
                      </div>
                    </article>
                    )
                  })
                )}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* ===== ENQUIRY MODAL ===== */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton className='bg-primary'>
          <Modal.Title className='text-light'>Enquiry for {selectedVehicle?.vehicle_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={enquiryName} onChange={(e) => setEnquiryName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" value={enquiryPhone} onChange={(e) => setEnquiryPhone(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={3} value={enquiryMessage} onChange={(e) => setEnquiryMessage(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button className='themeBtn bg-light' variant="secondary" onClick={handleClose}>Close</Button> */}
          <Button className='themeBtn' variant="primary" onClick={submitEnquiry}>Submit Enquiry</Button>
        </Modal.Footer>
      </Modal>
    </section>
  )
}

export default Rides
