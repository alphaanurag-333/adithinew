import { useEffect, useState } from 'react'
import { LuSearch } from 'react-icons/lu'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import '../../../views/user-views/Components/productpage.css'
import { GoLocation } from 'react-icons/go'
import API from '../../../api'
import { BsStarFill } from 'react-icons/bs'
import { FiClock } from 'react-icons/fi'
import { FaLocationDot } from 'react-icons/fa6'


function Food() {
  const MAX_PRICE_LIMIT = 500
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(MAX_PRICE_LIMIT)
  const [productCount, setProductCount] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')

  const [selectedRating, setSelectedRating] = useState('')
  const [selectedCuisine, setSelectedCuisine] = useState([])
  const [sortBy, setSortBy] = useState('recommended')

  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const q = searchParams.get('q')?.trim()
    const category = searchParams.get('category')?.trim()
    if (q) setSearchTerm(q)
    else if (category) setSearchTerm(category)
  }, [searchParams])

  // ✅ FETCH API
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setLoading(true)
        const res = await API.get('/food/vendors')



        if (res?.data?.status === 'success') {
          const vendors = res.data.data.vendors || []
          setProducts(vendors)
          setFilteredProducts(vendors)
          setProductCount(vendors.length)
        }

      } catch (error) {

      } finally {
        setLoading(false)
      }
    }

    fetchVendors()
  }, [])

  // ✅ FILTER LOGIC
  useEffect(() => {
    let filtered = [...products]

    // SEARCH
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // PRICE (using minimum_order)
    filtered = filtered.filter(item => {
      const price = parseFloat(item.minimum_order || 0)
      return price >= minValue && price <= maxValue
    })

    // RATING
    if (selectedRating) {
      filtered = filtered.filter(item =>
        parseFloat(item.star_rating || 0) >= selectedRating
      )
    }

    // CUISINE (optional - static for UI)
    if (selectedCuisine.length > 0) {
      filtered = filtered.filter(item =>
        selectedCuisine.includes(item.city) // mapped to city for now
      )
    }

    setFilteredProducts(filtered)
    setProductCount(filtered.length)

    // SORT
    const getMinOrder = (item) => Number(item.minimum_order || 0)
    const getRating = (item) => Number(item.star_rating || 0)
    const getDelivery = (item) => Number(item.estimated_delivery_time || 0)
    if (sortBy === 'price_low_high') {
      filtered.sort((a, b) => getMinOrder(a) - getMinOrder(b))
    } else if (sortBy === 'price_high_low') {
      filtered.sort((a, b) => getMinOrder(b) - getMinOrder(a))
    } else if (sortBy === 'rating_high') {
      filtered.sort((a, b) => getRating(b) - getRating(a))
    } else if (sortBy === 'delivery_fast') {
      filtered.sort((a, b) => getDelivery(a) - getDelivery(b))
    }

  }, [searchTerm, minValue, maxValue, selectedRating, selectedCuisine, sortBy, products])

  const toggleCuisine = (cuisine) => {
    setSelectedCuisine(prev =>
      prev.includes(cuisine)
        ? prev.filter(c => c !== cuisine)
        : [...prev, cuisine]
    )
  }

  const clearFilters = () => {
    setMinValue(0)
    setMaxValue(MAX_PRICE_LIMIT)
    setSearchTerm('')
    setSelectedRating('')
    setSelectedCuisine([])
    setSortBy('recommended')
  }

  const cuisineOptions = [...new Set(products.map((item) => item.city).filter(Boolean))]
 



const saveCheckoutFoodPreview = (item, searchParams) => {

  const payload = {
    food: item,
    query: Object.fromEntries(searchParams.entries())
  }

  localStorage.setItem(
    "foodPreview",
    JSON.stringify(payload)
  )

}
  return (
    <section className="productSection container food-page-pro product-page-pro">
      <div className="row g-3 g-lg-2 product-layout-row">

        {/* HEADER */}
        <div className="themeHeader product-page-title">
          <h2>
            Top <span>Restaurants</span>
          </h2>
          <p>Discover trusted kitchens, best-rated meals, and quick doorstep delivery.</p>
        </div>

        {/* SIDEBAR */}
        <div className="col-12 pr-0 col-lg-3">
          <div className="productSidebar">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <h6 className="filterTitle mb-0">FILTERS</h6>
              {(searchTerm || selectedRating || selectedCuisine.length > 0 || minValue > 0 || maxValue < MAX_PRICE_LIMIT) && (
                <button onClick={clearFilters} className="product-filter-reset" type="button">
                  Reset
                </button>
              )}
            </div>

            {/* CUISINE */}
            <div className="categoryFilter product-filter-block">
              <h6 className="filterTitle">CUISINE</h6>

              {cuisineOptions.map(c => (
                <div key={c} className="filterTab">
                  <label className="customCheckbox">
                    <input
                      type="checkbox"
                      checked={selectedCuisine.includes(c)}
                      onChange={() => toggleCuisine(c)}
                    />
                    <span className="webCheckmark"></span>
                    {c}
                  </label>
                </div>
              ))}
            </div>

            {/* PRICE */}
            <div className="priceFilterSection pb-0 product-filter-block">
              <h6 className="filterTitle">PRICE RANGE</h6>
              <p className="priceRangeHint mb-2">Set your budget in rupees</p>

              <div className="minMaxInputs">
                <div className="priceInputField">
                  <label htmlFor="food-min-price">Min Price</label>
                  <div className="priceInputWrap">
                    <span aria-hidden>₹</span>
                    <input
                      id="food-min-price"
                      type="number"
                      min="0"
                      max={MAX_PRICE_LIMIT}
                      step="50"
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
                  <label htmlFor="food-max-price">Max Price</label>
                  <div className="priceInputWrap">
                    <span aria-hidden>₹</span>
                    <input
                      id="food-max-price"
                      type="number"
                      min={minValue}
                      max={MAX_PRICE_LIMIT}
                      step="50"
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

            {/* RATING */}
            <div className="categoryFilter mt-3 product-filter-block">
              <h6 className="filterTitle">RATING</h6>

              {[5,4, 3, 2,1].map(rate => (
                <div key={rate} className="filterTab">
                  <label className="customCheckbox">
                    <input
                      type="radio"
                      name="selectedFoodRating"
                      checked={selectedRating === rate}
                      onChange={() => setSelectedRating(selectedRating === rate ? '' : rate)}
                    />
                    <span className="webCheckmark"></span>
                    <span className="text-warning" aria-hidden="true">
        {[1, 2, 3, 4, 5].map(star => (
           <BsStarFill
           key={star}
           className={
             star <= rate
               ? 'starFilled'
               : 'starEmpty'
           }
         />

          // <i
          //   key={star}
          //   className={`fas fa-star ${star <= rate ? '' : 'text-secondary'}`}
          // ></i>
        ))}
      </span> {rate} Stars
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
                  placeholder="Search foods..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <LuSearch />
              </div>
            </div>

            {/* COUNT */}
            <div className="activeFilterDiv product-top-meta">
              <div className="filterCounts">
                {productCount} <span>Results found.</span>
              </div>
              <div className="product-toolbar">
                <select
                  className="product-sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="recommended">Sort: Recommended</option>
                  <option value="price_low_high">Min Order: Low to High</option>
                  <option value="price_high_low">Min Order: High to Low</option>
                  <option value="rating_high">Top Rated</option>
                  <option value="delivery_fast">Fastest Delivery</option>
                </select>
              </div>
            </div>

            {/* CARDS */}
            <section className="commonSection homeCardSection p-0 mt-0">
              <div className="row m-0 productpageItem p-0">

                {loading ? (
                  <div className="food-state-wrap">
                    <div className="text-center py-5 product-state food-product-state">
                      <Spinner variant="primary" className="color" />
                      <p>Finding the best food partners for you...</p>
                    </div>
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="food-state-wrap">
                    <div className="text-center product-state food-product-state">
                      <h5 className="w-auto mt-4">No Results Found</h5>
                      <p>Try changing filters or search term.</p>
                      <button type="button" onClick={clearFilters} className="themeBtn addToBtn mt-2">
                        Clear all filters
                      </button>
                    </div>
                  </div>
                ) : (
                  filteredProducts.map((item) => {
                    const cuisineLabel = Array.isArray(item?.cuisine)
                      ? item.cuisine.slice(0, 2).join(' · ')
                      : item?.cuisine || item?.category_name || 'Multi Cuisine'
                    
                    const heroTag = Number(item?.estimated_delivery_time || 0) <= 30 ? 'Fast Delivery' : 'Top Rated'

                    return (
                    <article
                      onClick={() => {
                        saveCheckoutFoodPreview(item, searchParams)
                        navigate(`/fooddetails/${item.id}`)
                      }}
                      className="cursor productPageCard trivozoCard food-card food-restaurant-card"
                      key={item.id}
                    >
                      <div className="productPageImg product-card-media mb-2 food-media-hero">
                        <img src={item.featured_image_url || '/no-image.png'} alt={item.name || 'Food restaurant'}  onError={(e) => {
                            e.target.onerror = null; // infinite loop avoid
                            e.target.src = "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-blank-avatar-modern-vector-png-image_40962406.jpg";
                          }}/>
                        <span className="food-hero-tag">{heroTag}</span>
                        <div className="food-media-overlay">
                          <span className="food-rating-chip">
                            <BsStarFill />
                            {Number(item.star_rating || 0).toFixed(1)}
                          </span>
                        </div>
                      </div>

                      <div className="productPageCardData food-card-content">
                        <h6 className="listing-card-title text-capitalize">{item.name}</h6>
                        <div className="food-meta-row">
                          <p className="food-cuisine">{cuisineLabel}</p>
                          <p className="food-price-for-two">₹{item.minimum_order || 0} for two</p>
                        </div>

                        <div className="food-meta-row food-meta-row-muted">
                          <p className="hotelAddress mb-0 listing-card-subtext">
                            <FaLocationDot className="text-black" /> {item.city}
                          </p>
                          <p className="food-delivery-time mb-0">
                            <FiClock />
                            {item.estimated_delivery_time || 0} min
                          </p>
                        </div>

                       


                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            saveCheckoutFoodPreview(item, searchParams)
                            navigate(`/fooddetails/${item.id}`)
                          }}
                          className="themeBtn addToBtn"
                        >
                          Order Now →
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

export default Food
