import { NavLink, Link } from 'react-router-dom'
import { CardImg1 } from './Image'




// import { Homestay } from '../../assets/homestay.jpg'
import { useState } from 'react'
import { Spinner } from 'react-bootstrap'

const Categories = () => {

  const [loading] = useState(false)

  // ✅ Categories
  const categories = [
    { _id: 1, name: "Stay", icon: CardImg1 },
    { _id: 2, name: "Ride", icon: CardImg1 },
    { _id: 3, name: "Food", icon: CardImg1 }
  ]

  // ✅ Featured Services (STATIC)
  const services = [
    { _id: 1, name: "Luxury Homestay", price: 1200, type: "Stay", img:Homestay},
    { _id: 2, name: "Car Rental", price: 800, type: "Ride", img:Carrental },
    { _id: 3, name: "Daily Tiffin", price: 120, type: "Food",  img:Tifin},
    { _id: 4, name: "Budget Room", price: 600, type: "Stay", img:Budget }
  ]

  return (
    <section className="commonSection homeCardSection pt-4">
      <div className="container">

        {/* ================= CATEGORY ================= */}
        {/* <div className="themeHeader">
          <h2>
            Browse by <span>Category</span>
          </h2>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (

          <div className="themeContainer mb-4">
            {categories.map((category) => (
              <div className="categoryCard mb-3" key={category._id}>
                <NavLink
                  to="/products"
                  state={{ category_id: category._id }}
                >
                  <img src={category.icon} alt={category.name} />
                  <h6>{category.name}</h6>
                </NavLink>
              </div>
            ))}
          </div>

        )} */}

        {/* ================= FEATURED SERVICES ================= */}
        <div className="themeHeader mt-4">
          <h2>
            Popular <span>Services</span>
          </h2>
        </div>

        <div className="row m-0 productpageItem p-2">

          {services.map((service) => (
            <div className="productPageCard" key={service._id}>

              <Link to="#">
                <div className="productPageImg">
                  <img src={service.img} alt="service" />
                </div>
              </Link>

              <div className="productPageCardData">

                <div className="productPageCardTitle">
                  <h6>{service.name}</h6>

                  {/* TYPE */}
                  <span style={{ fontSize: "12px", color: "#666" }}>
                    {service.type}
                  </span>
                </div>

                <h6 className="itemPrice">₹{service.price}</h6>

                {/* WHATSAPP BUTTON */}
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noreferrer"
                >
                  <button className="themeBtn addToBtn">
                    Chat on WhatsApp
                  </button>
                </a>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  )
}

export default Categories




// import { HiMiniArrowRight } from 'react-icons/hi2'
// import { NavLink } from 'react-router-dom'
// import { CardImg1 } from './Image'
// import { useEffect, useState } from 'react'
// import API from '../../api'
// import MEDIA_URL from '../../media'
// import { Spinner } from 'react-bootstrap'

// const Categories = ({ limit = 10, isHome = false }) => {
//   const [categories, setCategories] = useState([])
//   const [offset, setOffset] = useState(0)
//   const [hasMore, setHasMore] = useState(true)
//   const [loading, setLoading] = useState(false)

//   const fetchCategories = async (loadMore = false) => {
//     if (loading) return
//     setLoading(true)

//     try {
//       const res = await API.get(
//         `/user/misc/categories?limit=${limit}&offset=${loadMore ? offset : 0}`
//       )

//       if (res.data.status) {
//         setCategories(prev =>
//           loadMore ? [...prev, ...res.data.data] : res.data.data
//         )

//         setHasMore(res.data.hasMore)
//         setOffset(prev => prev + limit)
//       }
//     } catch (error) {
//       console.error('Failed to load categories', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchCategories(false)

//   }, [])

//   return (
//     <section className="commonSection homeCardSection pt-4">
//       <div className="container">
//         <div className="themeHeader">
//           <h2>
//             Shop with <span>Categories</span>
//           </h2>

//           {isHome && (
//             <NavLink className="browseBtnNavLink" to="/category">
//               Browse All Categories <HiMiniArrowRight />
//             </NavLink>
//           )}
//         </div>

// {loading ? (
//           <div className="text-center py-5">
//             <Spinner animation="border" variant="primary" />
//           </div> ): (
//         <div className="themeContainer mb-0">
//           {categories?.map((category) => (
//             <div className="categoryCard mb-3" key={category._id}>

//               <NavLink
//   to="/products"
//   state={{ category_id: category._id }}
// >
//                 <img
//                   src={
//                     category.icon
//                       ? `${MEDIA_URL}${category.icon}`
//                       : CardImg1
//                   }
//                   alt={category.name}
//                   onError={(e) => {
//                     e.target.onerror = null
//                     e.target.src = CardImg1
//                   }}
//                 />
//                 <h6>{category.name}</h6>
//               </NavLink>
//             </div>
//           ))}
//         </div>
//           )}

//         {!isHome && hasMore && (
//           <div className="text-center mt-4 mb-3">
//             <button
//               className="btn btn-outline-primary"
//               onClick={() => fetchCategories(true)}
//               disabled={loading}
//             >
//               {loading ? 'Loading...' : 'Load More'}
//             </button>
//           </div>
//         )}
//       </div>
//     </section>
//   )
// }

// export default Categories
