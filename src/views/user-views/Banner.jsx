import { Container, Carousel } from "react-bootstrap";
import "../user-views/Banner.css";
import MEDIA_URL from '../../media'


import API from "../../api";
import { useEffect, useLayoutEffect, useState } from "react";

export default function Banner() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [carouselFade, setCarouselFade] = useState(false);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(min-width: 992px)");
    const sync = () => setCarouselFade(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        const res = await API.get("/banners");

        if (res?.data) {
          setBanners(res.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);




  return (
    <Container fluid className="px-0 bannerSectionFull">
      {/* Heading */}
      {/* <div className="themeHeader">
        <h2>
          Special <span>Offers</span>
        </h2>
      </div> */}

      {/* Carousel */}
      <Carousel
        ride="carousel"
        fade={carouselFade}
        controls
        indicators
        interval={4000}
        pause={false}
        className="bannerCarousel"
      >
        {banners?.map((img, index) => (
          <Carousel.Item key={index}>
            <div className="bannerWrapper">
              <img
                className="bannerImage"
                src={`${MEDIA_URL}/banner/${img?.photo}`}
                alt={`Banner ${index + 1}`}
                sizes="100vw"
                decoding="async"
                fetchPriority={index === 0 ? "high" : "low"}
              />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

    </Container>
  );
}
// import React, { useEffect, useState } from 'react'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import 'swiper/css'
// import { Spinner } from 'react-bootstrap'
// import API from '../../api'
// import MEDIA_URL from '../../media'
// import DefaultBannerImg from '../../assets/ordermanagement/deafultimage.jpg'

// export default function Banner() {
//   const [banners, setBanners] = useState([])


//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     const fetchBanners = async () => {
//       try {
//         setLoading(true)
//         const res = await API.get('/user/misc/banner')

//         if (res?.data?.status) {
//           setBanners(res.data.data)
//         }
//       } catch (error) {
//         console.error('Banner fetch error:', error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchBanners()
//   }, [])

//   return (
//     <section className="heroSection alterSection">
//       <div className="container">

//         {loading ? (
//           <div className="text-center py-5">
//             <Spinner animation="border" variant="primary" />
//           </div>
//         ) : (
//           <Swiper className="mySwiper">
//             {banners.length > 0 ? (
//               banners.map((banner) => (
//                 <SwiperSlide key={banner._id}>
//                   <div className="heroBanner">
//                     <img
//                       src={`${MEDIA_URL}${banner?.image}`}
//                       alt={banner.title}
//                       onError={(e) => {
//                         e.target.onerror = null
//                         e.target.src = DefaultBannerImg
//                       }}
//                     />
//                   </div>
//                 </SwiperSlide>
//               ))
//             ) : (
//               <SwiperSlide>
//                 <div className="heroBanner text-center">
//                   <p>No banners available</p>
//                 </div>
//               </SwiperSlide>
//             )}
//           </Swiper>
//         )}

//       </div>
//     </section>
//   )
// }




