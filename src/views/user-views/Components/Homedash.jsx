import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import '../../user-views/Components/Homedash.css'
import { useNavigate } from 'react-router-dom'
import heroVideo from '../../../assets/5.mp4'
import heroPoster from '../../../assets/webImage/login-hero-homestay-food-ride.svg'
import { FaLocationCrosshairs, FaRupeeSign } from 'react-icons/fa6'
import { FiCheckCircle, FiSliders, FiDollarSign } from 'react-icons/fi'
import { BsCurrencyRupee } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'

export default function Homedash() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('stay')

  const [stayLocation, setStayLocation] = useState('')
  const [stayPropertyType, setStayPropertyType] = useState('')
  const [stayGuestType, setStayGuestType] = useState('')
  const [stayCheckIn, setStayCheckIn] = useState('')
  const [stayCheckOut, setStayCheckOut] = useState('')

  const [foodArea, setFoodArea] = useState('')
  const [foodCategory, setFoodCategory] = useState('')
  const [foodDeliveryDate, setFoodDeliveryDate] = useState('')
  const [foodDeliveryTime, setFoodDeliveryTime] = useState('')

  const [ridePickup, setRidePickup] = useState('')
  const [rideDrop, setRideDrop] = useState('')
  const [rideVehicleType, setRideVehicleType] = useState('car')
  const [rideDate, setRideDate] = useState('')
  const [rideTime, setRideTime] = useState('')

  const buildQuery = (obj) => {
    const p = new URLSearchParams()
    Object.entries(obj).forEach(([k, v]) => {
      if (v !== undefined && v !== null && String(v).trim() !== '') p.set(k, String(v).trim())
    })
    const s = p.toString()
    return s ? `?${s}` : ''
  }

  const navigateToStays = () => {
    const loc = stayLocation.trim()
    navigate(
      `/products${buildQuery({
        q: loc,
        propertyType: stayPropertyType,
        guestType: stayGuestType,
        checkIn: stayCheckIn,
        checkOut: stayCheckOut,
      })}`,
    )
  }

  const navigateToFood = () => {
    const area = foodArea.trim()
    navigate(
      `/food${buildQuery({
        q: area,
        category: foodCategory,
        deliveryDate: foodDeliveryDate,
        deliveryTime: foodDeliveryTime,
      })}`,
    )
  }

  const navigateToRides = () => {
    const pickup = ridePickup.trim()
    const drop = rideDrop.trim()
    navigate(
      `/rides${buildQuery({
        pickup,
        drop,
        vehicleType: rideVehicleType,
        date: rideDate,
        time: rideTime,
      })}`,
    )
  }

  const getCurrentLocation = (type) => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser')
      return
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
        )
        const data = await res.json()
        const address = data.display_name || ''

        if (type === 'stay') {
          setStayLocation(address)
        } else if (type === 'tiffin') {
          setFoodArea(address)
        } else {
          setRidePickup(address)
        }
      } catch (err) {
        console.error('Error fetching location:', err)
      }
    })
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="homeHero d-flex align-items-center">
      <Container>
        <div className="homeHeroFrame text-center text-white">
          <video
            className="homeHeroVideo"
            poster={heroPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Homestays, food, and rides"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="homeHeroVideoOverlay" aria-hidden="true" />
          <div className="homeHeroInner">
            <h1 className="fw-bold mainHeading">"Athiti Devo Bhava — Hospitality, Reimagined."</h1>
            <p className="subHeading mb-3">"Book authentic stays, local food, and trusted rides — all in one seamless experience."</p>

            <div className='d-flex gap-2 justify-content-center'>
            <NavLink to="#" className="homeAuthBtn homeAuthBtn--primary">
           
              
            Explore Stays
           
          </NavLink>
          <a   href="https://atithi.developmentalphawizz.com/backend/seller/auth/login"
  target="_blank" className="homeAuthBtn homeAuthBtn--secondary">
            <span>
            Become a Host
            </span>
          </a>
          </div>
            <div className="searchBox mt-4 mb-3">
          <div className="searchTabs">
            <span
              className={activeTab === 'stay' ? 'active' : ''}
              onClick={() => setActiveTab('stay')}
            >
              Homestays
            </span>
            <span
              className={activeTab === 'tiffin' ? 'active' : ''}
              onClick={() => setActiveTab('tiffin')}
            >
              Food
            </span>
            <span
              className={activeTab === 'carpool' ? 'active' : ''}
              onClick={() => setActiveTab('carpool')}
            >
              Ride
            </span>
          </div>

          {activeTab === 'stay' && (
            <form
              className="searchFormGrid"
              onSubmit={(e) => {
                e.preventDefault()
                if (!e.currentTarget.checkValidity()) {
                  e.currentTarget.reportValidity()
                  return
                }
                navigateToStays()
              }}
            >
              <div className="searchFormRow searchFormRow--stay-1">
                <div className="locationInput themeInput searchFormField">
                  <label className="form-label form-labels">
                    Location <span className="text-danger">*</span>
                  </label>
                  <div className="locationInput-field">
                    <input
                      placeholder="Enter location"
                      value={stayLocation}
                      onChange={(e) => setStayLocation(e.target.value)}
                      autoComplete="off"
                      required
                      minLength={3}
                    />
                    <FaLocationCrosshairs
                      className="locIcon"
                      title="Use current location"
                      aria-label="Use current location"
                      role="button"
                      tabIndex={0}
                      onClick={() => getCurrentLocation('stay')}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          getCurrentLocation('stay')
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="themeInput searchFormField">
                  <label className="form-label form-labels">
                    Hotel Preference <span className="text-danger">*</span>
                  </label>
                  <select
                    value={stayPropertyType}
                    onChange={(e) => setStayPropertyType(e.target.value)}
                    required
                  >
                    <option value="">Select Property Type</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Homestay">Homestay</option>
                    <option value="Farmstay">Farmstay</option>
                    <option value="Villa">Villa</option>
                    <option value="Resort">Resort</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Independent House">Independent House</option>
                    <option value="Independent Room">Independent Room</option>
                    <option value="Dormitory / Hostel">Dormitory / Hostel</option>
                  </select>
                </div>
                <div className="themeInput searchFormField">
                  <label className="form-label form-labels">
                    Guest Preference <span className="text-danger">*</span>
                  </label>
                  <select
                    value={stayGuestType}
                    onChange={(e) => setStayGuestType(e.target.value)}
                    required
                  >
                    <option value="">Select Guest Type</option>
                    <option value="Solo Male">Solo Male</option>
                    <option value="Solo Female">Solo Female</option>
                    <option value="Married Couple">Married Couple</option>
                    <option value="Unmarried Couple">Unmarried Couple</option>
                    <option value="Family with Children">Family with Children</option>
                    <option value="Elderly Couple">Elderly Couple</option>
                    <option value="Group of Friends">Group of Friends</option>
                    <option value="Business Traveller">Business Traveller</option>
                    <option value="Religious Group">Religious Group</option>
                  </select>
                </div>
              </div>
              <div className="searchFormRow searchFormRow--stay-2">
                <div className="themeInput searchFormField">
                  <label className="form-label form-labels">
                    Check-in Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    min={today}
                    value={stayCheckIn}
                    onChange={(e) => setStayCheckIn(e.target.value)}
                    required
                  />
                </div>
                <div className="themeInput searchFormField">
                  <label className="form-label form-labels">
                    Check-out Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    min={stayCheckIn || today}
                    value={stayCheckOut}
                    onChange={(e) => setStayCheckOut(e.target.value)}
                    required
                  />
                </div>
                <div className="themeInput searchFormField searchFormField--submit">
                  <span className="form-label form-labels searchFormLabelSpacer" aria-hidden="true">
                    &nbsp;
                  </span>
                  <button type="submit" className="goBtn purple w-100">
                    Search
                  </button>
                </div>
              </div>
            </form>
          )}

          {activeTab === 'tiffin' && (
            <form
              className="searchFormGrid"
              onSubmit={(e) => {
                e.preventDefault()
                if (!e.currentTarget.checkValidity()) {
                  e.currentTarget.reportValidity()
                  return
                }
                navigateToFood()
              }}
            >
              <div className="searchFormRow searchFormRow--food-1">
                <div className="locationInput themeInput searchFormField">
                  <label className="form-label form-labels">
                    Delivery Area <span className="text-danger">*</span>
                  </label>
                  <div className="locationInput-field">
                    <input
                      placeholder="Enter delivery location"
                      value={foodArea}
                      onChange={(e) => setFoodArea(e.target.value)}
                      required
                      minLength={3}
                    />
                    <FaLocationCrosshairs
                      className="locIcon"
                      title="Use current location"
                      aria-label="Use current location"
                      role="button"
                      tabIndex={0}
                      onClick={() => getCurrentLocation('tiffin')}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          getCurrentLocation('tiffin')
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="themeInput searchFormField">
                  <label className="form-label form-labels">
                    Food Category <span className="text-danger">*</span>
                  </label>
                  <select
                    value={foodCategory}
                    onChange={(e) => setFoodCategory(e.target.value)}
                  >
                    <option value="">All Type Cuisines</option>
                    <option value="Veg">Veg</option>
                    <option value="Nonveg">Nonveg</option>
                    <option value="Veg & Nonveg">Veg & Nonveg</option>
                    <option value="Home Tiffin">Home Tiffin</option>
                    <option value="Jain Food">Jain Food</option>
                    <option value="Diabetic Meal">Diabetic Meal</option>
                    <option value="Vegan">Vegan</option>
                  </select>
                </div>
                <div className="themeInput searchFormField">
                  <label className="form-label form-labels">
                    Delivery Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    min={today}
                    value={foodDeliveryDate}
                    onChange={(e) => setFoodDeliveryDate(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="searchFormRow searchFormRow--food-2">
                <div className="themeInput searchFormField">
                  <label className="form-label form-labels">
                    Delivery Time <span className="text-danger">*</span>
                  </label>
                  <input
                    type="time"
                    value={foodDeliveryTime}
                    onChange={(e) => setFoodDeliveryTime(e.target.value)}
                    required
                  />
                </div>
                <div className="searchFormField searchFormField--filler d-none d-lg-block" aria-hidden="true" />
                <div className="themeInput searchFormField searchFormField--submit">
                  <span className="form-label form-labels searchFormLabelSpacer" aria-hidden="true">
                    &nbsp;
                  </span>
                  <button type="submit" className="goBtn green w-100">
                    Search
                  </button>
                </div>
              </div>
            </form>
          )}

          {activeTab === 'carpool' && (
            <form
              className="searchFormGrid"
              onSubmit={(e) => {
                e.preventDefault()
                if (!e.currentTarget.checkValidity()) {
                  e.currentTarget.reportValidity()
                  return
                }
                navigateToRides()
              }}
            >
              <div className="searchFormRow searchFormRow--ride-1">
                <div className="locationInput themeInput searchFormField">
                  <label className="form-label form-labels">
                    Pickup Location <span className="text-danger">*</span>
                  </label>
                  <div className="locationInput-field">
                    <input
                      placeholder="Enter pickup location"
                      value={ridePickup}
                      onChange={(e) => setRidePickup(e.target.value)}
                      required
                      minLength={3}
                    />
                    <FaLocationCrosshairs
                      className="locIcon"
                      title="Use current location"
                      aria-label="Use current location"
                      role="button"
                      tabIndex={0}
                      onClick={() => getCurrentLocation('ride')}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          getCurrentLocation('ride')
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="themeInput searchFormField">
                  <label className="form-label form-labels">
                    Drop Location <span className="text-danger">*</span>
                  </label>
                  <input
                    placeholder="Enter drop location"
                    value={rideDrop}
                    onChange={(e) => setRideDrop(e.target.value)}
                    required
                    minLength={3}
                  />
                </div>
                <div className="themeInput searchFormField">
                  <label className="form-label form-labels">
                    Vehicle Type <span className="text-danger">*</span>
                  </label>
                  <select
                    value={rideVehicleType}
                    onChange={(e) => setRideVehicleType(e.target.value)}
                  >
                    <option value="bike">Bike</option>
                    <option value="scooter">Scooter</option>
                    <option value="auto_rickshaw">Auto</option>
                    <option value="car">Car</option>
                    <option value="suv">SUV</option>
                    <option value="sedan">Sedan</option>
                    <option value="bicycle">Tempo Traveller</option>
                  </select>
                </div>
              </div>
              <div className="searchFormRow searchFormRow--ride-2">
                <div className="themeInput searchFormField">
                  <label className="form-label form-labels">
                    Pickup Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    min={today}
                    value={rideDate}
                    onChange={(e) => setRideDate(e.target.value)}
                    required
                  />
                </div>
                <div className="themeInput searchFormField">
                  <label className="form-label form-labels">
                    Pickup Time <span className="text-danger">*</span>
                  </label>
                  <input
                    type="time"
                    value={rideTime}
                    onChange={(e) => setRideTime(e.target.value)}
                    required
                  />
                </div>
                <div className="themeInput searchFormField searchFormField--submit">
                  <span className="form-label form-labels searchFormLabelSpacer" aria-hidden="true">
                    &nbsp;
                  </span>
                  <button type="submit" className="goBtn orange w-100">
                    Search
                  </button>
                </div>
              </div>
            </form>
          )}
            </div>
          </div>
        </div>


        <div className="homeHeroBenefits">
          <div className="homeHeroBenefitItem">
            <FiCheckCircle />
            <div>
              <h6>Everything in one place</h6>
              <p>Simplify your search by finding every bookable option in one site.</p>
            </div>
          </div>
          <div className="homeHeroBenefitItem">
            <FiSliders />
            <div>
              <h6>Filter for what you want</h6>
              <p>Quickly customize results based on your stay, food, and ride preference.</p>
            </div>
          </div>
          <div className="homeHeroBenefitItem">
            <BsCurrencyRupee />
            <div>
              <h6>No booking fees</h6>
              <p>Transparent pricing with clear details before checkout.</p>
            </div>
          </div>
        </div>
        
      </Container>
      
    </div>
  )
}
