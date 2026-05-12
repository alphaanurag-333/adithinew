import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../api'
import { Spinner, Row, Col } from 'react-bootstrap'
import '../../assets/staticPage.css'
import MissionImg from '../../assets/webImage/info.svg'
import VisionImg from '../../assets/webImage/Group.svg'
import TeamFallbackImg from '../../assets/images/programmer1.png'

export default function StaticPage() {
  const { slug } = useParams()

  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchPage = async () => {
    try {
      const res = await API.get(`/pages/${slug}`)

      if (res?.data?.status === 'success') {
        setPage(res.data.data)
      } else {
        setPage(null)
      }
    } catch (err) {
      setPage(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPage()
  }, [slug])
  const [activeIndex, setActiveIndex] = useState(null)
  const handleToggle = (index) => {
  setActiveIndex(activeIndex === index ? null : index)
}


  // ================= RENDER =================
  const renderContent = () => {
    if (!page) return null

    // ✅ ABOUT PAGE
    if (slug === 'about-us') {
      const stats = [
        { label: 'Users', value: page.statistics?.total_users },
        { label: 'Vendors', value: page.statistics?.total_vendors },
        { label: 'Cities', value: page.statistics?.cities_covered },
        { label: 'Services', value: page.statistics?.services_completed },
      ]

      return (
        <div className="staticAbout">
          <div className="staticPageHero staticPageCard mb-4">
            <p className="staticPageEyebrow mb-2">Who we are</p>
            <h2 className="staticPageHeroTitle mb-0">{page.company_info?.name}</h2>
            <Row className="g-3 mt-2">
              <Col md={6}>
                <div className="staticPageHighlight">
                  <img src={MissionImg} alt="Mission" className="staticPageHighlightImage" />
                  <span className="staticPageHighlightLabel">Mission</span>
                  <p className="mb-0 staticPageBody">{page.company_info?.mission}</p>
                </div>
              </Col>
              <Col md={6}>
                <div className="staticPageHighlight">
                  <img src={VisionImg} alt="Vision" className="staticPageHighlightImage" />
                  <span className="staticPageHighlightLabel">Vision</span>
                  <p className="mb-0 staticPageBody">{page.company_info?.vision}</p>
                </div>
              </Col>
            </Row>
          </div>

          {page.our_story?.title && (
            <div className="staticPageCard mb-4 text-center">
              <h3 className="staticPageSectionTitle mb-2">{page.our_story.title}</h3>
              <p className="mb-0 staticPageBody staticPageProse">{page.our_story.content}</p>
            </div>
          )}

          {page.key_features?.length > 0 && (
            <div className="mb-4">
              <h3 className="staticPageSectionTitle mb-2">Key features</h3>
              <Row className="g-3">
                {page.key_features.map((f, i) => (
                  <Col md={6} lg={4} key={i}>
                    <div className="staticPageCard staticPageFeature h-100">
                      <h4 className="staticPageFeatureTitle mb-2">{f.title}</h4>
                      <p className="mb-0 staticPageBody">{f.description}</p>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          )}

          <div className="staticPageCard mb-4 staticPageStatsWrap">
            <h3 className="staticPageSectionTitle mb-2">By the numbers</h3>
            <Row className="g-3 text-center">
              {stats.map((s, i) => (
                <Col xs={6} md={3} key={i}>
                  <div className="staticStatTile">
                    <div className="staticStatValue">{s.value ?? '—'}</div>
                    <div className="staticStatLabel">{s.label}</div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>

          {page.team?.length > 0 && (
            <div className="mb-2">
              <h3 className="staticPageSectionTitle mb-2">Our team</h3>
              <Row className="g-3">
                {page.team.map((t, i) => (
                  <Col md={6} key={i}>
                    <div className="staticPageCard staticPageTeamCard h-100">
                      <img
                        src={t.image || t.photo || t.avatar || t.profile_image || TeamFallbackImg}
                        alt={t.name || 'Team member'}
                        className="staticPageTeamImage"
                      />
                      <div className="staticPageTeamMeta mb-2">
                        <span className="staticPageTeamName">{t.name}</span>
                        <span className="staticPageTeamRole">{t.role}</span>
                      </div>
                      <p className="mb-0 staticPageBody">{t.description}</p>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </div>
      )
    }

    // ✅ PRIVACY POLICY
    if (slug === 'privacy-policy') {
      return (
        <div className="staticPolicy">
          <div className="staticPageMeta mb-4">
            <span className="staticPageMetaBadge">Last updated</span>
            <span className="staticPageMetaDate">{page.last_updated}</span>
          </div>
          <div className="staticPolicyList">
            {Object.values(page.content || {}).map((item, i) => (
              <article key={i} className="staticPageCard staticPolicyArticle mb-3">
                <h3 className="staticPolicyHeading mb-3">
                  <span className="staticPolicyIndex">{i + 1}</span>
                  {item.title}
                </h3>
                <div className="staticPageBody staticPageProse mb-0">{item.content}</div>
              </article>
            ))}
          </div>
        </div>
      )
    }

    // ✅ TERMS & CONDITIONS
    if (slug === 'terms-conditions') {
      return (
        <div className="staticPolicy">
          <div className="staticPageMeta mb-4">
            <span className="staticPageMetaBadge">Last updated</span>
            <span className="staticPageMetaDate">{page.last_updated}</span>
          </div>
          <div className="staticPolicyList">
            {Object.values(page.content || {}).map((item, i) => (
              <article key={i} className="staticPageCard staticPolicyArticle mb-3">
                <h3 className="staticPolicyHeading mb-3">
                  <span className="staticPolicyIndex">{i + 1}</span>
                  {item.title}
                </h3>
                <div className="staticPageBody staticPageProse mb-0">{item.content}</div>
              </article>
            ))}
          </div>
        </div>
      )
    }
// ✅ FAQ PAGE
// if (slug === 'faqs') {
//   return (
//     <>
//       {Object.values(page || {}).map((section, i) => (
//         <div key={i} className="mb-4">
//           <h5 className="mb-3">{section.title}</h5>

//           {section.items?.map((faq, index) => (
//             <div key={index} className="faqItem mb-3">
//               <h6 className="fw-bold">Q: {faq.question}</h6>
//               <p className="mb-0">A: {faq.answer}</p>
//             </div>
//           ))}
//         </div>
//       ))}
//     </>
//   )
// }
// ✅ FAQ PAGE (Accordion Design)
if (slug === 'faqs') {
  let count = 0 // global index for toggle

  return (
    <>
      {Object.values(page || {}).map((section, i) => (
        <div key={i} className="mb-4">
          <h5 className="mb-3">{section.title}</h5>

          {section.items?.map((faq, index) => {
            const currentIndex = count++

            return (
              <div
                key={currentIndex}
                className="mb-3 border rounded"
                style={{
                  cursor: 'pointer',
                  background:
                    activeIndex === currentIndex ? 'rgb(247 247 247)' : '#fff',
                  transition: '0.3s'
                }}
              >
                {/* QUESTION */}
                <div
                  onClick={() => handleToggle(currentIndex)}
                  className="p-3 pb-1 d-flex justify-content-between align-items-center"
                >
                  <h6 className="mb-0 fw-bold">
                    {faq.question}
                  </h6>

                  <span style={{ fontSize: '24px' }}>
                    {activeIndex === currentIndex ? '−' : '+'}
                  </span>
                </div>

                {/* ANSWER */}
                {activeIndex === currentIndex && (
                  <div className="p-3 pt-2">
                    <p className="mb-0">{faq.answer}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ))}
    </>
  )
}

    // ✅ DEFAULT (HTML fallback)
    return (
      <div
        className="staticPageProseWrap staticPageCard"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    )
  }

  return (
    <section className="userPageSection">
      <div>

        {loading ? (
          <div className="text-center py-5">
                    <Spinner variant="primary" className="color" />
                  </div>
        ) : !page ? (
          <div className="text-center py-5">
            <h3>Data Not Found</h3>
          </div>
        ) : (
          <>
            <div className="contact-page-head text-center">
              <h1 className="pt-3 mb-0 text-center text-capitalize">
                {page.title || slug.replace('-', ' ')}
              </h1>
            </div>

            <div className="pageContent container staticPageContainer staticPageLayout">
              {renderContent()}
            </div>
          </>
        )}

      </div>
    </section>
  )
}
