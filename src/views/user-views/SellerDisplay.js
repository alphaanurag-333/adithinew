import React, { useEffect, useState } from 'react'

import { NavLink } from 'react-router-dom'
import { HiMiniArrowRight } from 'react-icons/hi2'
import { GoLocation } from 'react-icons/go'
import API from '../../api'
import MEDIA_URL from '../../media'
import { LuSearch } from 'react-icons/lu'
import { Spinner } from 'react-bootstrap'

function SellerDisplay({ limit = 10, isHome = false }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sellers, setSellers] = useState([])
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)

  const fetchSellers = async (loadMore = false) => {
    if (loading) return
    setLoading(true)

    try {
      const res = await API.get(`/user/misc/sellers?limit=${limit}&offset=${loadMore ? offset : 0}`)

      if (res.data.status) {
        const newData = res.data.data || []

        setSellers((prevSellers) => (loadMore ? [...prevSellers, ...newData] : newData))

        setHasMore(res.data.hasMore)
        setOffset((prev) => prev + limit)
      }
    } catch (error) {
      console.error('Failed to fetch sellers', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSellers(false)
  }, [])

  const displayedSellers = sellers.filter((seller) =>
    seller?.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <section className="commonSection homeCardSection pt-4">
      <div className="container">
        <div className="themeHeader">
          <h2>
            Near by <span>Sellers</span>
          </h2>

          {isHome && (
            <NavLink className="browseBtnNavLink" to="/sellers">
              Browse All Sellers <HiMiniArrowRight />
            </NavLink>
          )}
        </div>

        {!isHome && (
          <div className="col-12 col-lg-12">
            <div className="productContainer">
              <div className="prdouctPageHeader">
                <div className="productSearchBar">
                  <input
                    className="productSearchInput"
                    type="search"
                    placeholder="Search by seller name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <LuSearch />
                </div>

                <div className="prdouctSelectDiv">
                  <label className="selectLable">Sort by:</label>
                  <select className="productSelect">
                    <option>Select</option>
                    <option>Near by</option>
                  </select>
                </div>
              </div>

              <div className="activeFilterDiv">
                <div className="filterTagsDiv">
                  <label>Active Filters :</label>
                </div>
                <div className="filterCounts">
                  {displayedSellers.length}
                  <span> Results found.</span>
                </div>
              </div>
            </div>
          </div>
        )}
 {loading  ? (
    <div className="text-center py-5 w-100">
      <Spinner animation="border" variant="primary" />
    </div>
  ) : (
        <div className="themeContainer sellerCardDisplay mb-3">
          {
          displayedSellers.length === 0 ? (
            <h5 className="text-center w-100 mt-4">No Sellers Found</h5>
          ) : (
            displayedSellers.map((seller) => (
              <div className="productPageCard" key={seller._id}>
                <div className="productPageImg">
                  <img
                    src={seller.profileImage ? `${MEDIA_URL}${seller.profileImage}` : DummyImg}
                    alt={seller.name}
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = DummyImg
                    }}
                  />
                </div>

                <div className="productPageCardData">
                  <div className="productPageCardTitle">
                    <h6 className="sellerName text-capitalize">{seller?.name}</h6>
                  </div>

                  <div className="d-flex align-items-start mb-3 sellerAddressDiv">
                    <GoLocation className="me-1 flex-shrink-0 mt-2" size={18} />
                    <h6 className="sellerAddress mb-0">{seller?.address || 'N/A'}</h6>
                  </div>

                  <NavLink to={`/seller-details/${seller._id}`}>
                    <button className="themeBtn addToBtn">View details</button>
                  </NavLink>
                </div>
              </div>
            ))
          )}
        </div>
  )}
        {/* {!isHome && hasMore && (
          <div className="text-center mt-4 mb-3">
            <button
              className="btn btn-outline-primary"
              onClick={() => fetchSellers(true)}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )} */}
      </div>
    </section>
  )
}

export default SellerDisplay
