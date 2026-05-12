import { useEffect, useState } from 'react'
import { CardImg1 } from '../Image'
import { useSelector } from 'react-redux'
import API from '../../../api'
import { Link } from 'react-router-dom'
import MEDIA_URL from '../../../media'
import Swal from 'sweetalert2'
import { Spinner } from 'react-bootstrap'

function Wishlist() {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])

  const { userToken } = useSelector((state) => state.auth)

  // ✅ STATIC DATA
  const staticWishlist = [
    {
      product_id: {
        _id: '1',
        name: 'Mountain View Stay',
        thumbnail: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=800&q=80',
        variants: [{ b2c_mrp: 2500 }]
      }
    },
    {
      product_id: {
        _id: '2',
        name: 'Beach Side Resort',
        thumbnail: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80',
        variants: [{ b2c_mrp: 4200 }]
      }
    },
    {
      product_id: {
        _id: '3',
        name: 'City Luxury Room',
        thumbnail: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800',
        variants: [{ b2c_mrp: 1800 }]
      }
    }
  ]

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    setLoading(true)
    try {
      const res = await API.get(`/user/misc/wishlist`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })

      const data = res.data.data || []

      // ✅ if API empty → use static
      if (data.length === 0) {
        setProducts(staticWishlist)
      } else {
        setProducts(data)
      }

    } catch (error) {


      // ✅ error aaye → static data dikhao
      setProducts(staticWishlist)

    } finally {
      setLoading(false)
    }
  }

  const handleWishlist = async (productId) => {
    try {
      const res = await API.post(
        'user/misc/add-to-wishlist',
        { product_id: productId },
        { headers: { Authorization: `Bearer ${userToken}` } }
      )

      getData()

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: res.data.message || "Updated wishlist",
        showConfirmButton: false,
        timer: 3000,
      })
    } catch (error) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: "Failed",
        showConfirmButton: false,
        timer: 3000,
      })
    }
  }

  return (
    <div className="profileCard">
      <h6 className="profileHeading colortex">FAVOURITE LIST</h6>

      <div className="row m-0 wishlistItem profileUpdateDiv p-3">
        {loading ? (
          <div className="text-center py-5">
                              <Spinner variant="primary" className='color'/>
                            </div>
        ) : products.length === 0 ? (
          <p className="text-center mt-3">No Data Found</p>
        ) : (
          products.map((product) => (
            <div className="wishlistCard" key={product?.product_id?._id}>

              {/* <Link to={`/product-details/${product?.product_id?._id}`}> */}
                <div className="wishlistImage">
                  <img
                    src={
                      product?.product_id?.thumbnail
                        ? `${product?.product_id?.thumbnail}`
                        : CardImg1
                    }
                    alt={product?.product_id?.name}
                  />
                </div>
              {/* </Link> */}

              <div className="wishListData">

                <div className="wishItemTitle d-flex justify-content-between align-items-center">

                  {/* <Link to={`/product-details/${product?.product_id?._id}`}>
                    <h6>{product?.product_id?.name}</h6>
                  </Link> */}
<h6 className='colortex'>{product?.product_id?.name}</h6>
                  <div
                    className="wishlistBtn savedProduct"
                    onClick={() => handleWishlist(product?.product_id?._id)}
                  >
                    ❤️
                  </div>
                </div>


                  <h6 className="itemPrice d-none">
                    ₹{product?.product_id?.variants?.[0]?.b2c_mrp}
                  </h6>


                <button className="themeBtn addToBtn mt-3">
                  Book Now
                </button>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Wishlist








// import { useEffect, useState } from 'react'
// import { CardImg1 } from '../Image'
// import { useSelector } from 'react-redux'
// import API from '../../../api'
// import { Link } from 'react-router-dom'
// import MEDIA_URL from '../../../media'
// import Swal from 'sweetalert2'
// import { Spinner } from 'react-bootstrap'

// function Wishlist() {
//   const [loading, setLoading] = useState(true)
//   const [products, setProducts] = useState([])

//   const { userToken } = useSelector((state) => state.auth)

//   useEffect(() => {
//     getData()
//   }, [])

//   const getData = async () => {
//     setLoading(true)
//     try {
//       const res = await API.get(`/user/misc/wishlist`, {
//         headers: { Authorization: `Bearer ${userToken}` },
//       })
//       setProducts(res.data.data || [])
//     } catch (error) {
//       console.log('Wishlist Error', error.response?.data || error.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleWishlist = async (productId) => {
//   try {
//     const res = await API.post(
//       'user/misc/add-to-wishlist',
//       { product_id: productId },
//       { headers: { Authorization: `Bearer ${userToken}` } }
//     );

//     getData();

//     Swal.fire({
//       toast: true,
//       position: 'top-end',
//       icon: 'success',
//       title: res.data.message || "Added to wishlist",
//       showConfirmButton: false,
//       timer: 3000,
//       timerProgressBar: true,
//     });
//   } catch (error) {
//     console.log('Wishlist Error', error.response?.data || error.message);

//     Swal.fire({
//       toast: true,
//       position: 'top-end',
//       icon: 'error',
//       title: error.response?.data?.message || "Failed to add to wishlist",
//       showConfirmButton: false,
//       timer: 3000,
//       timerProgressBar: true,
//     });
//   }
// }


//   return (
//     <div className="profileCard">

//       <h6 className="profileHeading">FAVOURITE LIST</h6>
//     {/* <div className="profileCard">
//       <h6 className="profileTabTitle">Wish List</h6> */}
//       <div className="row m-0 wishlistItem profileUpdateDiv p-3">
//         {loading ? (
//            <div className="text-center py-5">
//             <Spinner variant="primary" />
//           </div>
//         ) : products.length === 0 ? (
//           <p className="text-center mt-3">No Data Found</p>
//         ) : (
//           products.map((product) => (
//             <div className="wishlistCard" key={product?.product_id?._id}>
//               <Link to={`/product-details/${product?.product_id?._id}`}

//               >
//                 <div className="wishlistImage">
//                   <img
//                     src={
//                       product?.product_id?.thumbnail
//                         ? `${MEDIA_URL}${product?.product_id?.thumbnail}`
//                         : CardImg1
//                     }
//                     alt={product?.product_id?.name}
//                     onError={(e) => {
//                       e.target.onerror = null
//                       e.target.src = CardImg1
//                     }}
//                   />
//                 </div>
//               </Link>
//               <div className="wishListData">
//                 <div className="wishItemTitle d-flex justify-content-between align-items-center">
//                  <Link to={`/product-details/${product?.product_id?._id}`}

//               >
//                   <h6>{product?.product_id?.name}</h6></Link>
//                   <div
//                     className="wishlistBtn savedProduct"
//                     onClick={() =>
//                       handleWishlist(product?.product_id?._id)
//                     }
//                   >
//                     <svg
//                       stroke="currentColor"
//                       fill="red"
//                       strokeWidth="0"
//                       viewBox="0 0 16 16"
//                       height="1.3em"
//                       width="1.3em"
//                       xmlns="http://www.w3.org/2000/svg"
//                       style={{ cursor: 'pointer', transition: '0.3s' }}
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
//                       />
//                     </svg>
//                   </div>

//                 </div>
//                   <Link
//                   to={`/product-details/${product?.product_id?._id}`}
//                   style={{ textDecoration: 'none', color: 'inherit' }}
//                  >
//                   {/* <h6 className="itemPrice sellerAddress mb-3">{product?.sub_title}</h6> */}

//                  <h6 className="itemPrice">₹{product?.product_id?.variants?.[0]?.b2c_mrp}</h6></Link>
//                 <button className="themeBtn addToBtn mt-3">Add to Cart</button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   )
// }

// export default Wishlist
