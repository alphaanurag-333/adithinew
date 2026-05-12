import { useEffect, useState } from 'react'
import { CardImg1 } from './Image'
import API from '../../api'
import { Button, Modal, Spinner } from 'react-bootstrap'
import MEDIA_URL from '../../media'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'

const Products = ({
  limit = 0,
  filters = { category_id: '' },
  searchTerm = '',
  setProductCount,
  minPrice = 0,
  maxPrice = 10000,
}) => {
  // const Products = ({ limit = 0, filters = { category_id: '' }, setProductCount }) => {
  const location = useLocation()
  const categoryId = location.state?.category_id
  const activeCategory = filters?.category_id || categoryId
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(true)
  const { userToken } = useSelector((state) => state.auth)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    setLoading(true)
    try {
      const res = await API.get(`/user/misc/products`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })

      const productData = res.data.data || []
      setProducts(productData)
      setFilteredProducts(productData)
      //  setProductCount(productData?.length)
      if (setProductCount) {
        setProductCount(productData.length)
      }
    } catch (error) {

    } finally {
      setLoading(false)
    }
  }

  // useEffect(() => {
  //   if (!searchTerm) {
  //     setFilteredProducts(products)
  //     setProductCount(products?.length)
  //   } else {
  //     const filtered = products?.filter((item) =>
  //       item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()),
  //     )
  //     setFilteredProducts(filtered)
  //     setProductCount(filtered?.length)
  //   }
  // }, [searchTerm, products])

  // useEffect(() => {
  //   if (!searchTerm) {
  //     setFilteredProducts(products)

  //     if (setProductCount) {
  //       setProductCount(products.length)
  //     }
  //   } else {
  //     const filtered = products.filter((item) =>
  //       item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()),
  //     )

  //     setFilteredProducts(filtered)

  //     if (setProductCount) {
  //       setProductCount(filtered.length)
  //     }
  //   }
  // }, [searchTerm, products])

  useEffect(() => {
    let filtered = [...products]

    // SEARCH FILTER
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()),
      )
    }

    // CATEGORY FILTER
    // if (filters?.category_id) {
    //   filtered = filtered.filter(
    //     (item) => item?.category === filters.category_id
    //   )
    // }
    // CATEGORY FILTER
    //   if (categoryId) {
    //   filtered = filtered.filter(
    //     (item) => item?.category === categoryId
    //   )
    // }
    if (activeCategory) {
      filtered = filtered?.filter((item) => item?.category === activeCategory)
    }
    // PRICE FILTER
    filtered = filtered?.filter((item) => {
      const price = item?.variants?.[0]?.b2c_mrp || 0
      return price >= minPrice && price <= maxPrice
    })

    setFilteredProducts(filtered)

    if (setProductCount) {
      setProductCount(filtered.length)
    }
  }, [searchTerm, filters, minPrice, maxPrice, products, activeCategory])

  const handleWishlist = async (productId) => {
    try {
      const response = await API.post(
        'user/misc/add-to-wishlist',
        { product_id: productId },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      )

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: response.data.message || 'Added to wishlist',
        showConfirmButton: false,
        timer: 2000,
      })

      getData()
    } catch (error) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: error.response?.data?.message || 'Failed',
        showConfirmButton: false,
        timer: 2000,
      })
    }
  }

  return (
    <section className="commonSection homeCardSection p-0 mt-0">
      <div className="row m-0 productpageItem p-2">
        {loading ? (
          <div className="text-center py-5 w-100">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : filteredProducts?.length === 0 ? (
          <h5 className="text-center w-100 mt-4">No Products Found</h5>
        ) : (
          filteredProducts?.map((product) => (
            <div className="productPageCard" key={product._id}>
              <Link to={`/product-details/${product._id}`}>
                <div className="productPageImg">
                  <img
                    src={product.thumbnail ? `${MEDIA_URL}${product.thumbnail}` : CardImg1}
                    alt="Product"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = CardImg1
                    }}
                  />
                </div>
              </Link>

              <div className="productPageCardData">
                <div className="productPageCardTitle">
                  {/* <h6>{product?.name}</h6> */}
                  <Link
                    to={`/product-details/${product._id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <h6>{product?.name}</h6>
                  </Link>
                  <div
                    className="wishlistBtn savedProduct"
                    onClick={() => handleWishlist(product?._id)}
                  >
                    <svg
                      fill={product?.is_wishlist?.toString() === true ? 'red' : '#999'}
                      viewBox="0 0 16 16"
                      height="1.3em"
                      width="1.3em"
                      style={{ cursor: 'pointer', transition: '0.3s' }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                      />
                    </svg>
                  </div>
                </div>

                <Link
                  to={`/product-details/${product._id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {/* <h6 className="itemPrice sellerAddress mb-3">{product?.sub_title}</h6> */}

                  <h6 className="itemPrice">₹{product?.variants?.[0]?.b2c_mrp}</h6>
                </Link>

                <button className="themeBtn addToBtn">Add to Cart</button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default Products
