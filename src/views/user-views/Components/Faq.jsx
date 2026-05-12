import React, { useEffect, useState } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import API from '../../../api'
import faq from '../../../assets/images/faq.jpg'
import { motion, AnimatePresence } from 'framer-motion'

export default function Faq() {

  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(null)

  const fetchPage = async () => {
    try {
      const res = await API.get(`/pages/faqs`)

      if (res?.data?.status === 'success') {
        setPage(res.data.data)
      } else {
        setPage(null)
      }
    } catch (err) {
      console.error('Error loading FAQ:', err)
      setPage(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPage()
  }, [])

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className='commonSection homeCustomBg alterSection pt-2 pb-2'>
      <Container className="my-4">
        <div className='row'>

          {/* LEFT */}
          <motion.div
            className='col-12 col-lg-7 order-2 order-lg-1'
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.9, ease: 'easeInOut' }}
            viewport={{ once: true }}
          >

            <div className="themeHeader text-center mb-4">
              <h2>
                Frequently asked questions
              </h2>
            </div>

            <div className="container staticPageContainer mb-0">

              {loading ? (
                <div className="text-center py-5">
                  <Spinner variant="primary" className="color" />
                </div>
              ) : !page ? (
                <div className="text-center py-5">
                  <h5>No FAQs Found</h5>
                </div>
              ) : (

                Object.values(page)
                  .slice(0, 2)
                  .map((section, i) => (
                    <div key={i} className="mb-4">

                      {section.items?.slice(0, 2).map((faq, index) => {
                        const uniqueIndex = `${i}-${index}`
                        const isActive = activeIndex === uniqueIndex

                        return (
                          <motion.div
                            key={uniqueIndex}
                            className="mb-3 border rounded overflow-hidden"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            viewport={{ once: true }}
                          >

                            {/* QUESTION */}
                            <div
                              onClick={() => handleToggle(uniqueIndex)}
                              className="p-3 d-flex justify-content-between align-items-center"
                              style={{ cursor: 'pointer' }}
                            >
                              <h6 className="mb-0 fw-bold">
                                {faq.question}
                              </h6>

                              {/* 🔥 Animated Icon */}
                              <motion.span
                                animate={{ rotate: isActive ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                                style={{ fontSize: '22px' }}
                              >
                                {isActive ? '−' : '+'}
                              </motion.span>
                            </div>

                            {/* ANSWER (Smooth Expand) */}
                            <AnimatePresence>
                              {isActive && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="px-3 pb-3"
                                >
                                  <p className="mb-0">{faq.answer}</p>
                                </motion.div>
                              )}
                            </AnimatePresence>

                          </motion.div>
                        )
                      })}
                    </div>
                  ))
              )}

            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            className='col-12 col-lg-5 order-1 order-lg-2 faqImageCol'
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src={faq}
              alt="FAQ"
              className="faqImage"
            />
          </motion.div>

        </div>
      </Container>
    </section>
  )
}
// import React, { useEffect, useState } from 'react'
// import { Spinner } from 'react-bootstrap'
// import API from '../../../api'

// export default function Faq() {
//   const [page, setPage] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [activeIndex, setActiveIndex] = useState(0) // 👈 first open by default

//   const fetchPage = async () => {
//     try {
//       const res = await API.get(`/user/misc/faqs`)
//       const userFaqs = res.data.data.filter((item) => item?.type === 'user')
//       setPage(userFaqs)
//     } catch (err) {
//       console.error('Error loading page:', err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchPage()
//   }, [])

//   const handleToggle = (index) => {
//     setActiveIndex(activeIndex === index ? null : index)
//   }

//   return (
//     <section className="userPageSection">
//       <div>
//         {loading ? (
//           <div className="text-center py-5">
//                       <Spinner variant="primary" className='color'/>
//                     </div>
//         ) : page.length === 0 ? (
//           <div className="text-center py-5">
//             <h3>No FAQs Found</h3>
//           </div>
//         ) : (
//           <div className="container staticPageContainer">
//             <div className="customHead">
//               <h1 className="mb-4 text-center">FAQs</h1>
//             </div>

//           {page?.map((item, index) => (
//   <div
//     key={item._id}
//     className="mb-3 border rounded"
//     style={{
//       cursor: 'pointer',
//       background: activeIndex === index ? 'rgb(242 244 255)' : '#fff',
//       transition: '0.3s'
//     }}
//   >
//     <div
//       onClick={() => handleToggle(index)}
//       className="p-4 pb-2 d-flex justify-content-between align-items-center"
//     >
//       <h4 className="mb-0">{item?.title}</h4>
//       <span style={{ fontSize: '30px' }}>
//         {activeIndex === index ? '−' : '+'}
//       </span>
//     </div>

//     {activeIndex === index && (
//       <div className="p-4">
//         <p className="mb-3">{item?.content}</p>
//       </div>
//     )}
//   </div>
// ))}

//           </div>
//         )}
//       </div>
//     </section>
//   )
// }
