
import { useEffect, useState } from 'react'
import { LuSearch } from 'react-icons/lu'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import '../../../views/user-views/Components/productpage.css'
import { GoLocation } from 'react-icons/go'
import API from '../../../api'
import { BsStarFill } from 'react-icons/bs'
import { FaLocationDot } from 'react-icons/fa6'

function normalizeImageUrl(url) {
  if (url == null || url === '') return ''
  return String(url).replace(/\\\//g, '/').trim()
}

function getHomestayGalleryImages(item) {
  const raw = [item?.featured_image_url, ...(item?.gallery_images_urls || [])]
    .map(normalizeImageUrl)
    .filter(Boolean)
  return [...new Set(raw)]
}

function saveCheckoutHotelPreview(item) {
  const gallery = getHomestayGalleryImages(item)
  localStorage.setItem(
    'checkoutHotelPreview',
    JSON.stringify({
      homestay_id: item?.id,
      name: item?.property_name || 'Homestay',
      image: gallery[0] || '',
      rating: Number(item?.star_rating || 0),
      city: item?.city || '',
      price_per_night: Number(item?.base_price_per_night || 0),
    }),
  )
}

function ProductPage() {
  const MAX_PRICE_LIMIT = 10000
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(MAX_PRICE_LIMIT)
  const [productCount, setProductCount] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedRating, setSelectedRating] = useState('')
  const [selectedAmenities, setSelectedAmenities] = useState([])
  const [sortBy, setSortBy] = useState('recommended')

  const [homestays, setHomestay] = useState([])
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [gallerySlideById, setGallerySlideById] = useState({})

  // useEffect(() => {
  //   const q = searchParams.get('q')?.trim()
  //   if (q) setSearchTerm(q)
  // }, [searchParams])   

  useEffect(() => {
    const fetchHomestay = async () => {
      try {
        setLoading(true)
        const res = await API.get('/homestays' )



        if (res?.data?.status === 'success') {
          setHomestay(res.data.data.data)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchHomestay()
  }, [])

  // ✅ SET PRODUCTS
  useEffect(() => {
    setProducts(homestays)
    setFilteredProducts(homestays)
    setProductCount(homestays.length)
  }, [homestays])

  // ✅ FILTER LOGIC
  useEffect(() => {
    let filtered = [...products]

    // SEARCH
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.property_name?.toLowerCase().includes(searchTerm.toLowerCase())||
            item.city?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // LOCATION
    if (selectedLocation) {
      filtered = filtered.filter(item => item.city === selectedLocation)
    }

    // PRICE
    filtered = filtered.filter(item => {
      const price = parseFloat(item.base_price_per_night || 0)
      return price >= minValue && price <= maxValue
    })

    // RATING
    if (selectedRating) {
      filtered = filtered.filter(item =>
        parseFloat(item.star_rating) >= selectedRating
      )
    }

    // AMENITIES
    if (selectedAmenities.length > 0) {
      filtered = filtered.filter(item =>
        selectedAmenities.every(a => item.amenities?.includes(a))
      )
    }

    // SORT
    const getPrice = (item) => Number(item.base_price_per_night || 0)
    const getRating = (item) => Number(item.star_rating || 0)
    if (sortBy === 'price_low_high') {
      filtered.sort((a, b) => getPrice(a) - getPrice(b))
    } else if (sortBy === 'price_high_low') {
      filtered.sort((a, b) => getPrice(b) - getPrice(a))
    } else if (sortBy === 'rating_high') {
      filtered.sort((a, b) => getRating(b) - getRating(a))
    }

    setFilteredProducts(filtered)
    setProductCount(filtered.length)

  }, [searchTerm, minValue, maxValue, selectedLocation, selectedRating, selectedAmenities, sortBy, products])

  const toggleAmenity = (amenity) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    )
  }

  const clearFilters = () => {
    setMinValue(0)
    setMaxValue(MAX_PRICE_LIMIT)
    setSearchTerm('')
    setSelectedLocation('')
    setSelectedRating('')
    setSelectedAmenities([])
    setSortBy('recommended')
  }

  const availableCities = [...new Set(products.map((item) => item.city).filter(Boolean))]
  const hasActiveFilters =
    searchTerm || selectedLocation || selectedRating || selectedAmenities.length > 0 || minValue > 0 || maxValue < MAX_PRICE_LIMIT

  return (
    <section className="productSection container product-page-pro">
      <div className="row g-3 g-lg-2 product-layout-row">
        <div className="col-12 themeHeader product-page-title">
          <h2>
            Find Your <span>Perfect Stay</span>
          </h2>
          <p>Compare verified properties by location, budget, rating, and amenities.</p>
        </div>

        {/* SIDEBAR */}
        <div className="col-12 col-lg-3 product-page-sidebar-col">
          <div className="productSidebar">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <h6 className="filterTitle mb-0">FILTERS</h6>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="product-filter-reset" type="button">
                  Reset
                </button>
              )}
            </div>

            {/* PRICE */}
            <div className="priceFilterSection product-filter-block">
              <h6 className="filterTitle">PRICE RANGE</h6>
              <p className="priceRangeHint mb-2">Set your budget in rupees</p>

              <div className="minMaxInputs">
                <div className="priceInputField">
                  <label htmlFor="stay-min-price">Min Price</label>
                  <div className="priceInputWrap">
                    <span aria-hidden>₹</span>
                    <input
                      id="stay-min-price"
                      type="number"
                      min="0"
                      max={MAX_PRICE_LIMIT}
                      step="100"
                      placeholder="0"
                      value={minValue}
                      onChange={(e) => {
                        const next = Math.max(0, Number(e.target.value || 0))
                        setMinValue(next > maxValue ? maxValue : next)
                      }}
                    />
                  </div>
                </div>
                <div className="priceInputField">
                  <label htmlFor="stay-max-price">Max Price</label>
                  <div className="priceInputWrap">
                    <span aria-hidden>₹</span>
                    <input
                      id="stay-max-price"
                      type="number"
                      min={minValue}
                      max={MAX_PRICE_LIMIT}
                      step="100"
                      placeholder={String(MAX_PRICE_LIMIT)}
                      value={maxValue}
                      onChange={(e) => {
                        const raw = Number(e.target.value || MAX_PRICE_LIMIT)
                        const bounded = Math.min(MAX_PRICE_LIMIT, Math.max(0, raw))
                        setMaxValue(bounded < minValue ? minValue : bounded)
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* LOCATION */}
            <div className="categoryFilter mt-3 product-filter-block">
              <h6 className="filterTitle">LOCATION</h6>
              <div className="prdouctSelectDiv">
                <select
                  className="productSelect"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="">All cities</option>
                  {availableCities.map((city) => (
                    <option value={city} key={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* RATING */}
            <div className="categoryFilter product-filter-block">
              <h6 className="filterTitle">RATING</h6>

              {[5, 4, 3, 2, 1].map(rate => (
  <div key={rate} className="filterTab">
    <label className="customCheckbox">
      <input
        type="radio"
        name="selectedRating"
        checked={selectedRating === rate}
        onChange={() => setSelectedRating(selectedRating === rate ? '' : rate)}
      />
      <span className="webCheckmark"></span>

      <span
  className="ratingStars"
  aria-hidden="true"
>

  {[1, 2, 3, 4, 5].map((star) => (

    <BsStarFill
      key={star}
      className={
        star <= rate
          ? 'starFilled'
          : 'starEmpty'
      }
    />

  ))}

</span>

      {rate} + Stars
    </label>
  </div>
))}
            </div>

            {/* AMENITIES */}
            <div className="categoryFilter mt-3 product-filter-block">
              <h6 className="filterTitle">AMENITIES</h6>

              {['wifi', 'pool', 'parking'].map(am => (
                <div key={am} className="filterTab">
                  <label className="customCheckbox text-capitalize">
                    <input
                      type="checkbox"
                      checked={selectedAmenities.includes(am)}
                      onChange={() => toggleAmenity(am)}
                    />
                    <span className="webCheckmark"></span>
                    {am}
                  </label>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-12 col-lg-9">
          <div className="productContainer">

            {/* SEARCH */}
            <div className="prdouctPageHeader">
              <div className="productSearchBar w-100">
                <input
                  className="productSearchInput"
                  placeholder="Search homestays by location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <LuSearch />
              </div>
            </div>

            {/* COUNT */}
            <div className="activeFilterDiv product-top-meta">
              <div className="filterCounts ">
                {productCount} <span>Results found.</span>
              </div>
              <div className="product-toolbar">
                <select
                  className="product-sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="recommended">Sort: Recommended</option>
                  <option value="price_low_high">Price: Low to High</option>
                  <option value="price_high_low">Price: High to Low</option>
                  <option value="rating_high">Top Rated</option>
                </select>
                {hasActiveFilters && (
                  <button type="button" onClick={clearFilters} className="product-filter-reset">
                    Clear active filters
                  </button>
                )}
              </div>
            </div>

            {/* CARDS */}
            <section className="commonSection homeCardSection p-0 mt-2">
              <div className="row m-0 productpageItem p-0">

                {loading ? (
                  <div className="product-state-wrap">
                    <div className="text-center py-5 product-state product-page-state">
                      <Spinner variant="primary" className="color" />
                      <p>Finding great stays for you...</p>
                    </div>
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="product-state-wrap">
                    <div className="text-center product-state product-page-state">
                      <h5 className="w-auto mt-4">No Results Found</h5>
                      <p>Try changing filters or search term.</p>
                      <button type="button" onClick={clearFilters} className="themeBtn addToBtn mt-2">
                        Clear all filters
                      </button>
                    </div>
                  </div>
                ) : (
                  filteredProducts.map((item) => {
                    const galleryImages = getHomestayGalleryImages(item)
                    const slideIdx = Math.min(
                      gallerySlideById[item.id] ?? 0,
                      Math.max(0, galleryImages.length - 1),
                    )
                    const displaySrc = galleryImages[slideIdx] || galleryImages[0] || ''

                    return (
                    <article
                      onClick={() => {
                        saveCheckoutHotelPreview(item)
                        navigate(`/homestaydetails/${item.id}`)
                      }}
                      className="cursor productPageCard trivozoCard"
                      key={item.id}
                    >

                      <div className="productPageImg product-card-media product-card-gallery mb-2">
                        {galleryImages.length > 0 ? (
                        <img
                          src={displaySrc}
                          alt={item.property_name || 'Homestay'}
                          className="product-card-gallery-img"
                          loading="lazy"
                          onError={(e) => {
                            e.target.onerror = null; // infinite loop avoid
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
                        <span className="product-card-badge">Verified Stay</span>
                      </div>

                      <div className="productPageCardData">

                      <div class="mb-2 d-flex align-items-center justify-content-between gap-2">
                      <h2 class="h6 listing-card-title mb-0 text-capitalize">{item.property_name}</h2>
                      <span class="text-warning small d-inline-flex align-items-center gap-1" aria-label="Rating 2.0 out of 5">
                      <BsStarFill /> <span class="text-dark fw-bold">{Number(item.star_rating || 0).toFixed(1)}</span>
                      </span>
                    </div>
                        {/* <h6 className="listing-card-title text-capitalize">{item.property_name}</h6>
                        <p className="text-muted small mb-2 d-flex align-items-center gap-2 product-rating-row">
                          <span className="d-flex align-items-center gap-1 text-warning">
                            {[...Array(Math.floor(item.star_rating || 0))].map((_, i) => (
                              <BsStarFill key={i} />
                            ))}
                          </span>
                          <span className="d-flex align-items-center gap-1 text-warning rating product-rating-pill">
                            {Number(item.star_rating || 0).toFixed(1)}
                          </span>
                        </p> */}

                        <p className="hotelAddress listing-card-subtext">
                        <FaLocationDot className="text-danger me-1" /> {item.city}
                        </p>



                        <div className="product-card-price-row mb-2">
                          Starting from
                          <p className="itemPrice mb-0">₹{item.base_price_per_night}</p><small className="colortex listing-card-subtext">/night</small>
                        </div>

                        

                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            saveCheckoutHotelPreview(item)
                            navigate(`/homestaydetails/${item.id}`)
                          }}
                          className="themeBtn addToBtn"
                        >
                          Details →
                        </button>

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
    </section>
  )
}

export default ProductPage
