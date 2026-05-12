import React, { useRef, useEffect, useState } from 'react'
import Banner from './Banner'
import Homedash from './Components/Homedash'
import Faq from './Components/Faq'
import { Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import CountUp from "react-countup";
import 'swiper/css'
import {
  FaHouseChimney,
  FaUtensils,
  FaCarRear,
  FaMapLocationDot,
  FaShieldHeart,
  FaHandshake,
  FaIndianRupeeSign,
} from 'react-icons/fa6'

import {
  
  
  
  
  FaCarSide
} from "react-icons/fa6";
import './HomeTrivazo.css'

export default function Home() {

  /* =========================================
     ANIMATION VARIANTS
  ========================================= */

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: 'easeOut',
      },
    },
  }

  /* =========================================
     COUNTER
  ========================================= */

  const Counter = ({ value }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const [count, setCount] = useState(0)

    useEffect(() => {
      if (isInView) {
        let end = parseInt(value)

        if (value.includes('k')) {
          end = end * 1000
        }

        let start = 0
        const duration = 1500
        const increment = end / (duration / 16)

        const timer = setInterval(() => {
          start += increment

          if (start >= end) {
            setCount(end)
            clearInterval(timer)
          } else {
            setCount(Math.floor(start))
          }
        }, 16)

        return () => clearInterval(timer)
      }
    }, [isInView, value])

    return (
      <span ref={ref}>
        {value.includes('k')
          ? `${Math.floor(count / 1000)}k+`
          : count + (value.includes('+') ? '+' : '')}
      </span>
    )
  }

  /* =========================================
     SERVICE CARDS
  ========================================= */

  const serviceCards = [
    {
      tag: 'Stay',
      title: 'Luxury Homestays',
      description:
        'Experience authentic hospitality with premium verified stays across beautiful destinations.',

      points: [
        'Verified Local Hosts',
        'Authentic Experiences',
        'Luxury Comfort',
      ],

      link: '/products',
      action: 'Explore stays',
      icon: <FaHouseChimney />,
      accent: 'stay',
    },

    {
      tag: 'Dine',
      title: 'Homely Food',
      description:
        'Discover local flavors and freshly prepared meals crafted with warmth and tradition.',

      points: [
        'Fresh Local Meals',
        'Diet Preferences',
        'Trusted Kitchens',
      ],

      link: '/food',
      action: 'Explore food',
      icon: <FaUtensils />,
      
      accent: 'food',
    },

    {
      tag: 'Travel',
      title: 'Trusted Rides',
      description:
        'Reliable ride services for local travel, pickups, and seamless journeys.',

      points: [
        'Safe Drivers',
        'Easy Scheduling',
        'Comfort Travel',
      ],

      link: '/rides',
      action: 'Explore rides',
      icon: <FaCarRear />,
      
      accent: 'ride',
    },

    {
      tag: 'Experiences',
      title: 'Local Experiences',
      description:
        'Explore culture, traditions, hidden gems, and unforgettable local activities.',

      points: [
        'Cultural Tours',
        'Local Activities',
        'Unique Experiences',
      ],

      link: '/experiences',
      action: 'Explore experiences',
      icon: <FaMapLocationDot />,
      accent: 'experience',
    },
  ]

  return (
    <>
      <Homedash />
      <Banner />

      

<section className="trustStrip">

  <div className="container">

    <div className="trustStripInner">

      {/* Verified Homestays */}
      <div className="trustItem">

        <div className="trustIconWrap">
          <FaHouseChimney className="trustIcon" />
        </div>

        <div className="trustContent">

          <h4 >
            <CountUp
              start={0}
              end={500}
              duration={3}
              suffix="+"
            />
          </h4>

          <span>Verified Homestays</span>

        </div>

      </div>

      {/* Food Partners */}
      <div className="trustItem">

        <div className="trustIconWrap">
          <FaUtensils className="trustIcon" />
        </div>

        <div className="trustContent">

          <h4>
            <CountUp
              start={0}
              end={120}
              duration={3}
              suffix="+"
            />
          </h4>

          <span>Food Partners</span>

        </div>

      </div>

      {/* Ride Providers */}
      <div className="trustItem">

        <div className="trustIconWrap">
          <FaCarRear className="trustIcon" />
        </div>

        <div className="trustContent">

          <h4>
            <CountUp
              start={0}
              end={80}
              duration={3}
              suffix="+"
            />
          </h4>

          <span>Trusted Ride Providers</span>

        </div>

      </div>

      {/* Pricing */}
      <div className="trustItem">

        <div className="trustIconWrap">
          <FaIndianRupeeSign className="trustIcon" />
        </div>

        <div className="trustContent">

          <h4>
            <CountUp
              start={0}
              end={100}
              duration={3}
              suffix="%"
            />
          </h4>

          <span>Transparent Pricing</span>

        </div>

      </div>

    </div>

  </div>

</section>
<section class="commonSection">
  <div class="container">


    <div class="text-center mb-4 mb-lg-3">

    <p class="travelSimplifiedTag">“Join Athiti"</p>
      <h2 class="homeServiceTitle">
        Start Your Journey With ATHITI
      </h2>

      <p class="homeServiceSubtitle">
        Become part of India’s growing travel ecosystem and earn through
        homestays, food experiences, and ride services.
      </p>
    </div>

    <div class="row g-4 justify-content-center">


      <div class="col-lg-4 col-md-6">
        <div class="vendor-card">

          <div class="vendor-top-shape"></div>

          <div class="vendor-icon host-icon">
          
        
      <FaHouseChimney />
          </div>

          <div class="vendor-content">
            <h4>Become a Host</h4>

            <p>
              Welcome travelers into your homestay and create memorable
              local experiences while generating sustainable income.
            </p>

            <a href="https://atithi.developmentalphawizz.com/backend/seller/auth/login"
  target="_blank" class="vendor-btn host-btn">
              List Your Property
            </a>
          </div>

        </div>
      </div>


      <div class="col-lg-4 col-md-6">
        <div class="vendor-card">

          <div class="vendor-top-shape"></div>

          <div class="vendor-icon food-icon">
          
      <FaUtensils />
          </div>

          <div class="vendor-content">
            <h4>Food Partner</h4>

            <p>
              Share authentic homemade meals and regional flavors with
              travelers seeking the true taste of India.
            </p>

            <a href="https://atithi.developmentalphawizz.com/backend/seller/auth/login"
  target="_blank" class="vendor-btn food-btn">
              Start Selling Food
            </a>
          </div>

        </div>
      </div>


      <div class="col-lg-4 col-md-6">
        <div class="vendor-card">

          <div class="vendor-top-shape"></div>

          <div class="vendor-icon ride-icon">
          <FaCarRear />
      
      
          </div>

          <div class="vendor-content">
            <h4>Ride Partner</h4>

            <p>
              Offer trusted rides, guided tours and help tourists explore local destinations
              safely and comfortably.
            </p>

            <a href="https://atithi.developmentalphawizz.com/backend/seller/auth/login"
  target="_blank" class="vendor-btn ride-btn">
              Join as Driver
            </a>
          </div>

        </div>
      </div>

    </div>
  </div>
</section>
      {/* =========================================
          SERVICES SECTION
      ========================================= */}

      <section className="homeServiceBlocks commonSection">
        <Container>

          <div className="text-center mb-4 mb-lg-3">

            <p className="travelSimplifiedTag">
              “Athiti Devo Bhava”
            </p>

            <h2 className="homeServiceTitle">
              Hospitality, Reimagined.
            </h2>

            <p className="homeServiceSubtitle">
              Book authentic stays, local food, and trusted rides —
              all in one seamless experience.
            </p>

          </div>

          <motion.div
            className="row g-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >

            {serviceCards.map((card) => (

              <motion.div
                className="col-lg-3 col-md-6"
                key={card.title}
                variants={cardVariants}
              >

                <div className={`homeServiceCard homeServiceCard--${card.accent}`}>

                  <motion.div
                    className="homeServiceIcon"
                    whileHover={{
                      rotate: 8,
                      scale: 1.15,
                    }}
                  >
                    {card.icon}
                  </motion.div>

                  <small>{card.tag}</small>

                  <h4>{card.title}</h4>

                  <p>{card.description}</p>

                  <ul className="homeServiceList">

                    {card.points.map((point) => (
                      <li key={point}>
                        {point}
                      </li>
                    ))}

                  </ul>

                  {/* <a
                    href={card.link}
                    className="homeServiceLink"
                  >
                    {card.action} →
                  </a> */}

                </div>

              </motion.div>

            ))}

          </motion.div>
        </Container>
      </section>

      
      {/* =========================================
          TRUST STATS
      ========================================= */}

      <section className="homeStats">

        <Container>

          <motion.div
            className="row g-3 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >

            {[
              ['10k+', 'Happy Guests'],
              ['120+', 'Cities & Towns'],
              ['500+', 'Verified Hosts'],
              ['24/7', 'Support Available'],
            ].map(([value, label]) => (

              <motion.div
                className="col-6 col-md-3"
                key={label}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 40,
                  },

                  visible: {
                    opacity: 1,
                    y: 0,

                    transition: {
                      duration: 0.9,
                    },
                  },
                }}
              >

                <div className="homeStatCard">

                  <h3>
                    {value === '24/7'
                      ? value
                      : <Counter value={value} />
                    }
                  </h3>

                  <p>{label}</p>

                </div>

              </motion.div>

            ))}

          </motion.div>

        </Container>

      </section>

      {/* =========================================
          ACCOUNT SECTION
      ========================================= */}

      <section className="homeUnifiedAccount">

        <Container>

          <motion.div
            className="homeUnifiedAccountInner"
            initial={{
              opacity: 0,
              y: 60,
            }}

            whileInView={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              duration: 0.9,
              ease: 'easeInOut',
            }}

            viewport={{ once: true }}
          >

            <h2>
              One account for stays, food & rides
            </h2>

            <p>
              Sign in to manage bookings, saved places,
              offers, and personalized experiences
              across all services.
            </p>

            <motion.div
              className="homeUnifiedAccountActions"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
            >

              {/* SIGN IN */}

              <motion.div
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 20,
                  },

                  visible: {
                    opacity: 1,
                    y: 0,

                    transition: {
                      duration: 0.6,
                    },
                  },
                }}
              >

                <NavLink
                  to="/login"
                  className="homeAuthBtn homeAuthBtn--primary"
                >

                  <motion.span whileHover={{ scale: 1.05 }}>
                    Sign in
                  </motion.span>

                </NavLink>

              </motion.div>

              {/* SIGN UP */}

              <motion.div
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 20,
                  },

                  visible: {
                    opacity: 1,
                    y: 0,

                    transition: {
                      duration: 0.6,
                      delay: 0.1,
                    },
                  },
                }}
              >

                <NavLink
                  to="/signup"
                  className="homeAuthBtn homeAuthBtn--secondary"
                >

                  <motion.span whileHover={{ scale: 1.05 }}>
                    Sign up
                  </motion.span>

                </NavLink>

              </motion.div>

            </motion.div>

          </motion.div>

        </Container>

      </section>

    
<section className="commonSection">

  <div className="container">

    <div className="row align-items-center gy-5">

      {/* Left Image */}
      <div className="col-lg-6">

        <div className="missionImageWrapper">

          <img
            src="./src/assets/images/signupimg.jpg"
            alt="ATITHI Mission"
            className="img-fluid missionMainImage"
          />

          {/* Floating Badge */}
          <div className="missionFloatingCard">

            <h4>Empowering India Through Tourism</h4>

            <p>
              Supporting local families, food partners, and ride providers
              across India.
            </p>

          </div>

        </div>

      </div>

      {/* Right Content */}
      <div className="col-lg-6">

        <div className="missionContent">

       

          <h2>
            Built on the Spirit of
             “Athiti Devo Bhava”
          </h2>

          <p className="missionText">
            ATHITI connects travelers with authentic homestays,
            homemade food, and trusted local rides while empowering
            families and communities across India through sustainable tourism.
          </p>

          {/* Features */}
          <div className="missionFeatures">

            <div className="missionFeatureItem">
              <div className="missionCheck">
                ✓
              </div>

              <span>
                Empower Local Families
              </span>
            </div>

            <div className="missionFeatureItem">
              <div className="missionCheck">
                ✓
              </div>

              <span>
                Promote Sustainable Tourism
              </span>
            </div>

            <div className="missionFeatureItem">
              <div className="missionCheck">
                ✓
              </div>

              <span>
                Create Authentic Experiences
              </span>
            </div>

            <div className="missionFeatureItem">
              <div className="missionCheck">
                ✓
              </div>

              <span>
                Support Rural Communities
              </span>
            </div>

          </div>

          {/* CTA */}
          {/* <button className="missionBtn">
            Explore ATITHI
          </button> */}

        </div>

      </div>

    </div>

  </div>

</section>

<section className="commonSection">

  <div className="container">

    {/* Heading */}
    <div className="whyChooseHeading text-center">

    

      <h2>
        Why Choose Us
      </h2>

      <p>
        ATHITI connects travelers with trusted local communities,
        authentic hospitality, and meaningful travel experiences
        across India.
      </p>

    </div>

    {/* Cards */}
    <div className="row g-4">

      {/* Card 1 */}
      <div className="col-lg-3 col-md-6">

        <div className="whyCard">

          <div className="whyIconWrap">
            <i className="bi bi-globe-central-south-asia"></i>
          </div>

          <h3>Authentic Experiences</h3>

          <p>
            Stay, eat, and travel like a local while exploring
            the true culture of India.
          </p>

        </div>

      </div>

      {/* Card 2 */}
      <div className="col-lg-3 col-md-6">

        <div className="whyCard">

          <div className="whyIconWrap">
            <i className="bi bi-people-fill"></i>
          </div>

          <h3>Trusted Community</h3>

          <p>
            Verified hosts, food partners, and ride providers
            ensuring safe and reliable experiences.
          </p>

        </div>

      </div>

      {/* Card 3 */}
      <div className="col-lg-3 col-md-6">

        <div className="whyCard">

          <div className="whyIconWrap">
            <i className="bi bi-tree-fill"></i>
          </div>

          <h3>Sustainable Tourism</h3>

          <p>
            Every booking helps empower local families and
            supports community-driven tourism.
          </p>

        </div>

      </div>

      {/* Card 4 */}
      <div className="col-lg-3 col-md-6">

        <div className="whyCard">

          <div className="whyIconWrap">
            <i className="bi bi-shield-check"></i>
          </div>

          <h3>Safe & Reliable</h3>

          <p>
            Enjoy transparent pricing, trusted hospitality,
            and secure travel experiences.
          </p>

        </div>

      </div>

    </div>

  </div>

</section>
<section className="experienceSection commonSection">

  <div className="container">

    {/* Heading */}
    <div className="experienceHeading text-center">

    

      <h2>
        Discover the Real
        India With ATHITI
      </h2>

      <p>
        Explore authentic homestays, homemade food, and trusted rides
        designed to connect travelers with local communities.
      </p>

    </div>

    {/* Cards */}
    <div className="row g-4">

      {/* Homestays */}
      <div className="col-lg-4">

        <div className="experienceCard">

          <img
            src="https://images.unsplash.com/photo-1690579031366-2e6b2da62467?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Homestays"
            className="experienceImg"
          />

          <div className="experienceOverlay"></div>

          <div className="experienceContent">

            {/* <span className="experienceMiniTag">
              HOMESTAYS
            </span> */}

            <h3>
              Authentic Local Stays
            </h3>

            <p>
              Stay with local families and experience the warmth of
              true Indian hospitality.
            </p>

            {/* <button className="experienceBtn">
              Explore Stays
            </button> */}

          </div>

        </div>

      </div>

      {/* Food */}
      <div className="col-lg-4">

        <div className="experienceCard">

          <img
            src="https://media.istockphoto.com/id/1560609530/photo/indian-girl-preparing-food-magnificent-young-woman-preparing-delicious-home-cooked.jpg?s=1024x1024&w=is&k=20&c=92Wqu8AX0q36OXuazqGe2uw8sszq6d-rfNhCqa7VmfY="
            alt="Food"
            className="experienceImg"
          />

          <div className="experienceOverlay"></div>

          <div className="experienceContent">

            {/* <span className="experienceMiniTag">
              LOCAL FOOD
            </span> */}

            <h3>
              Homemade Indian Flavors
            </h3>

            <p>
              Taste authentic regional dishes prepared by passionate
              local food partners.
            </p>

            {/* <button className="experienceBtn">
              Explore Food
            </button> */}

          </div>

        </div>

      </div>

      {/* Ride */}
      <div className="col-lg-4">

        <div className="experienceCard">

          <img
            src="https://images.unsplash.com/photo-1652515636740-78d2fd9169cf?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Ride"
            className="experienceImg"
          />

          <div className="experienceOverlay"></div>

          <div className="experienceContent">

            {/* <span className="experienceMiniTag">
              RIDE SERVICES
            </span> */}

            <h3>
              Trusted Local Rides
            </h3>

            <p>
              Explore destinations safely with trusted drivers and
              community ride providers.
            </p>

            {/* <button className="experienceBtn">
              Explore Rides
            </button> */}

          </div>

        </div>

      </div>

    </div>

  </div>

</section>
<section className="guestExperienceSection commonSection">

<Container>

  <div className="guestExperienceHeader">

    <div>

      <p class="travelSimplifiedTag" >
        Guest Experiences
      </p>

      <h2>
        Stories from our travelers
      </h2>

    </div>

    <p>
      Authentic stays, local food, and memorable
      journeys shared by our guests.
    </p>

  </div>

  <Swiper
    slidesPerView={1}
    spaceBetween={24}
    loop={true}
    autoplay={{
      delay: 2500,
      disableOnInteraction: false,
    }}
    breakpoints={{
      576: {
        slidesPerView: 1.2,
      },

      768: {
        slidesPerView: 2,
      },

      1200: {
        slidesPerView: 3,
      },
    }}
    modules={[Autoplay]}
    className="guestExperienceSlider"
  >

    {[
      {
        name: 'Priya Sharma',
        location: 'Udupi',
        image:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330',

        review:
          'Felt like staying with family. The hospitality and homemade meals were unforgettable.',
      },

      {
        name: 'Rahul Mehta',
        location: 'Coorg',
        image:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',

        review:
          'Booking stays and rides together made the entire experience seamless.',
      },

      {
        name: 'Ananya Rao',
        location: 'Chikmagalur',
        image:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',

        review:
          'Authentic local experiences with peaceful stays and amazing food.',
      },

      {
        name: 'Arjun Kapoor',
        location: 'Goa',
        image:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9',

        review:
          'Luxury comfort blended beautifully with genuine Indian hospitality.',
      },

      {
        name: 'Sneha Iyer',
        location: 'Mysore',
        image:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2',

        review:
          'The platform made travel stress-free. Everything felt curated and personal.',
      },

    ].map((item, index) => (

      <SwiperSlide key={index}>

        <div className="guestExperienceCard">

          <div className="guestExperienceTop">

            <img
              src={item.image}
              alt=""
            />

            <div>

              <h5>
                {item.name}
              </h5>

              <span>
                {item.location}
              </span>

            </div>

          </div>

          <div className="guestStars">
            ★★★★★
          </div>

          <p>
            “{item.review}”
          </p>

        </div>

      </SwiperSlide>

    ))}

  </Swiper>

</Container>

</section>
      <Faq />
    </>
  )
}