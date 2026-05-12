// import React, { useState } from 'react';
// import LoginIMg from '../../../assets/webImage/loginImg.png';
// import { NavLink, useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import { useAuth } from '../../../context/AuthContext';
// import './Signup.css';

// const Signup = () => {
//   const navigate = useNavigate();
//   const { sendOtp, verifyOtp, userRegister } = useAuth();

//   const [otpSent, setOtpSent] = useState(false);
//   const [otpVerified, setOtpVerified] = useState(false);

//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     password: '',
//     otp: '',
//     terms: false,
//     customer_type: 'food',
//     food_preference: '',
//     vehicle_preferences: [],
//     hotel_preference: '',
//   });

//   const vehicleOptions = [
//     { value: 'scooter', label: 'Scooter' },
//     { value: 'bike', label: 'Bike' },
//     { value: 'bicycle', label: 'Bicycle' },
//     { value: 'auto_rickshaw', label: 'Auto Rickshaw' },
//     { value: 'car', label: 'Car' },
//     { value: 'suv', label: 'SUV' },
//     { value: 'sedan', label: 'Sedan' },
//   ];

//   // ✅ Validation
//   const validateForm = () => {
//     if (!form.name.trim()) {
//       Swal.fire('', 'Full name is required', 'warning');
//       return false;
//     }
//     if (!/^[a-zA-Z\s]{3,}$/.test(form.name)) {
//       Swal.fire('', 'Enter valid name', 'warning');
//       return false;
//     }
//     if (form.phone.length !== 10) {
//       Swal.fire('', 'Enter valid 10 digit phone', 'warning');
//       return false;
//     }
//     if (form.customer_type === 'food' && !form.food_preference) {
//       Swal.fire('', 'Select food preference', 'warning');
//       return false;
//     }
//     if (form.customer_type === 'hotel' && !form.hotel_preference) {
//       Swal.fire('', 'Select hotel preference', 'warning');
//       return false;
//     }
//     if (form.customer_type === 'vehicle' && !form.vehicle_preferences.length) {
//       Swal.fire('', 'Select at least one vehicle preference', 'warning');
//       return false;
//     }
//     return true;
//   };

//   // ✅ Send OTP
//   const handleSendOtp = async () => {
//     if (!validateForm()) return;
//     const res = await sendOtp({
//       phone: form.phone,
//       f_name: form.name,
//       email: form.email,
//       password: form.password,
//       customer_type: form.customer_type,
//       food_preference: form.customer_type === 'food' ? form.food_preference : '',
//       hotel_preference: form.customer_type === 'hotel' ? form.hotel_preference : '',
//       vehicle_preferences: form.customer_type === 'vehicle' ? form.vehicle_preferences : [],
//     });

//     if (res) {
//       setOtpSent(true);
//       Swal.fire('', res.data.message, 'success');
//     }
//   };

//   // ✅ Verify OTP
//   const handleVerifyOtp = async () => {
//     if (!form.otp) {
//       Swal.fire('', 'Enter OTP', 'warning');
//       return;
//     }
//     const res = await verifyOtp({
//       temporary_token: localStorage.getItem('temp_token'),
//       otp: form.otp,
//     });

//     if (res) {
//       setOtpVerified(true);
//       Swal.fire({ icon: 'success', title: 'OTP Verified Successfully', timer: 1500, showConfirmButton: false });
//     }
//   };

//   // ✅ Register
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;
//     if (!otpVerified) {
//       Swal.fire('', 'Verify OTP first', 'warning');
//       return;
//     }
//     if (!form.terms) {
//       Swal.fire('', 'Accept Terms & Conditions', 'warning');
//       return;
//     }
//     const res = await userRegister(form);
//     if (res) {
//       Swal.fire('', 'Registered Successfully', 'success');
//       navigate('/home');
//     }
//   };

//   const handleCustomerTypeChange = (e) => {
//     const customer_type = e.target.value;
//     setForm((prev) => ({
//       ...prev,
//       customer_type,
//       food_preference: '',
//       vehicle_preferences: [],
//       hotel_preference: '',
//     }));
//   };

//   const handleVehiclePreferenceToggle = (vehicleValue) => {
//     setForm((prev) => {
//       const alreadySelected = prev.vehicle_preferences.includes(vehicleValue);
//       const vehicle_preferences = alreadySelected
//         ? prev.vehicle_preferences.filter((v) => v !== vehicleValue)
//         : [...prev.vehicle_preferences, vehicleValue];
//       return { ...prev, vehicle_preferences };
//     });
//   };

//   return (
//     <section className="signup-section">
//       <div className="signup-container">
//         {/* LEFT IMAGE */}
//         {/* <div className="signup-left">
//           <img src={LoginIMg} alt="Signup" className="signup-image" />
//         </div> */}

//         {/* RIGHT FORM */}
//         <div className="signup-right pt-3">
//           <div className="signup-card">


// <div className="userWelcomeMsg pt-0">
//               <h6>Welcome!</h6>
//               <p>Create Account </p>
//              </div>
//             <form className="signup-form" onSubmit={handleRegister}>
//               {!otpSent && (
//                 <>
//                   <div className="form-group">
//                     <label>Full Name <span className="required">*</span></label>
//                     <input
//                       placeholder="Enter full name"
//                       value={form.name}
//                       onChange={(e) =>
//                         setForm({ ...form, name: e.target.value.replace(/[^a-zA-Z\s]/g, '') })
//                       }
//                     />
//                   </div>

//                   <div className="form-group">
//                     <label>Email (Optional)</label>
//                     <input
//                       type="email"
//                       placeholder="Enter email"
//                       value={form.email}
//                       onChange={(e) => setForm({ ...form, email: e.target.value })}
//                     />
//                   </div>

//                   <div className="form-group">
//                     <label>Mobile Number <span className="required">*</span></label>
//                     <input
//                       maxLength={10}
//                       placeholder="Enter mobile number"
//                       value={form.phone}
//                       onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '') })}
//                     />
//                   </div>

//                   {/* Customer Type */}
//                   <div className="form-group">
//                     <label>Select Preference</label>
//                     <select value={form.customer_type} onChange={handleCustomerTypeChange}>
//                       <option value="food">Food / Dining</option>
//                       <option value="vehicle">Vehicle / Transport</option>
//                       <option value="hotel">Hotel / Homestay</option>
//                     </select>
//                   </div>

//                   {/* Conditional Preferences */}
//                   {form.customer_type === 'food' && (
//                     <div className="form-group">
//                       <label>Food Preference <span className="required">*</span></label>
//                       <select
//                         value={form.food_preference}
//                         onChange={(e) => setForm({ ...form, food_preference: e.target.value })}
//                       >
//                         <option value="">Select Food Preference</option>
//                         <option value="veg">Veg</option>
//                         <option value="non_veg">Non Veg</option>
//                         <option value="veg_non_veg">Veg & Non-Veg</option>
//                         <option value="jain">Jain Veg</option>
//                         <option value="diabetic_low_sodium">Diabetic Low Sodium</option>
//                       </select>
//                     </div>
//                   )}
//                   {form.customer_type === 'hotel' && (
//                     <div className="form-group">
//                       <label>Hotel Preference <span className="required">*</span></label>
//                       <select
//                         value={form.hotel_preference}
//                         onChange={(e) => setForm({ ...form, hotel_preference: e.target.value })}
//                       >
//                         <option value="">Select Preference</option>
//                         <option value="hotel">Hotel</option>
//                         <option value="homestay">Homestay</option>
//                         <option value="resort">Resort / Villa</option>
//                       </select>
//                     </div>
//                   )}
//                   {form.customer_type === 'vehicle' && (
//                     <div className="form-group">
//                       <label>Vehicle Preference <span className="required">*</span></label>
//                       <div className="vehicle-options">
//                         {vehicleOptions.map((item) => (
//                           <label key={item.value} className="vehicle-checkbox">
//                             <input
//                               type="checkbox"
//                               checked={form.vehicle_preferences.includes(item.value)}
//                               onChange={() => handleVehiclePreferenceToggle(item.value)}
//                             />
//                             {item.label}
//                           </label>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   <div className="form-group">
//                     <label>Password <span className="required">*</span></label>
//                     <input
//                       type="password"
//                       minLength={6}
//                       maxLength={15}
//                       placeholder="Enter password"
//                       value={form.password}
//                       onChange={(e) => setForm({ ...form, password: e.target.value })}
//                     />
//                   </div>

//                   <div className="form-terms">
//                     <input
//                       type="checkbox"
//                       checked={form.terms}
//                       onChange={(e) => setForm({ ...form, terms: e.target.checked })}
//                     />
//                     <label>
//                       I agree to <NavLink to="/page/terms-conditions" target="_blank">Terms & Conditions</NavLink>
//                     </label>
//                   </div>

//                   <div className="form-btn">
//                     <button type="button" onClick={handleSendOtp}>Register</button>
//                   </div>
//                 </>
//               )}

//               {/* OTP */}
//               {otpSent && (
//                 <div className="form-group">
//                   <label>Enter OTP <span className="required">*</span></label>
//                   <input
//                     maxLength={4}
//                     placeholder="Enter OTP"
//                     value={form.otp}
//                     onChange={(e) => setForm({ ...form, otp: e.target.value.replace(/\D/g, '') })}
//                   />
//                   {!otpVerified && (
//                     <div className="form-btn">
//                       <button type="button" onClick={handleVerifyOtp}>Verify OTP</button>
//                     </div>
//                   )}
//                 </div>
//               )}

//               <p className="form-login-link">
//                 Already have an account? <NavLink to="/login">Login</NavLink>
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Signup;

import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useAuth } from '../../../context/AuthContext'
const Signup = () => {
 const navigate = useNavigate()
  const { sendOtp, verifyOtp, userRegister } = useAuth()

  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    otp: '',
    terms: false,
    customer_type: 'hotel',
    food_preference: '',
    vehicle_preferences: [],
    hotel_preference: '',
  })

  // ✅ VALIDATION
  const validateForm = () => {
    if (!form.name.trim()) {
      Swal.fire('', 'Full name is required', 'warning')
      return false
    }

    if (!/^[a-zA-Z\s]{3,}$/.test(form.name)) {
      Swal.fire('', 'Enter valid name', 'warning')
      return false
    }

    // if (!form.email) {
    //   Swal.fire('', 'Email required', 'warning')
    //   return false
    // }

    // if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    //   Swal.fire('', 'Invalid email', 'warning')
    //   return false
    // }

    if (form.phone.length !== 10) {
      Swal.fire('', 'Enter valid 10 digit phone', 'warning')
      return false
    }

    if (form.customer_type === 'food' && !form.food_preference) {
      Swal.fire('', 'Select food preference', 'warning')
      return false
    }

    if (form.customer_type === 'hotel' && !form.hotel_preference) {
      Swal.fire('', 'Select hotel preference', 'warning')
      return false
    }

    if (form.customer_type === 'vehicle' && !form.vehicle_preferences.length) {
      Swal.fire('', 'Select at least one vehicle preference', 'warning')
      return false
    }

    return true
  }

  // ✅ SEND OTP
  const handleSendOtp = async () => {
    if (!validateForm()) return

    const res = await sendOtp({ phone: form.phone, f_name: form.name, email: form.email, password:form.password,customer_type: form.customer_type,

  food_preference:
    form.customer_type === "food" ? form.food_preference : "",

  hotel_preference:
    form.customer_type === "hotel" ? form.hotel_preference : "",

  vehicle_preferences:
    form.customer_type === "vehicle" ? form.vehicle_preferences : [] })

    if (res) {
      setOtpSent(true)
      Swal.fire('', res.data.message, 'success')
    }
  }

  // ✅ VERIFY OTP
 const handleVerifyOtp = async () => {
  if (!form.otp) {
    Swal.fire('', 'Enter OTP', 'warning')
    return
  }

  const res = await verifyOtp({
    temporary_token: localStorage.getItem('temp_token'),
    otp: form.otp
  })

  if (res) {
    setOtpVerified(true)

    Swal.fire({
      icon: 'success',
      title: 'OTP Verified Successfully',
      timer: 1500,
      showConfirmButton: false
    })
    navigate('/')
  }
}

  // ✅ REGISTER
  const handleRegister = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    if (!otpVerified) {
      Swal.fire('', 'Verify OTP first', 'warning')
      return
    }

    if (!form.terms) {
      Swal.fire('', 'Accept Terms & Conditions', 'warning')
      return
    }

    const res = await userRegister(form)

    if (res) {
      Swal.fire('', 'Registered Successfully', 'success')
      navigate('/home')
    }
  }
  const vehicleOptions = [
    { value: "scooter", label: "Scooter" },
{ value: "bike", label: "Bike" },
 { value: "auto_rickshaw", label: "Auto" },
    { value: "car", label: "Car" },


    { value: "suv", label: "SUV" },
    { value: "sedan", label: "Sedan" },


    { value: "tempo_traveller", label: "Tempo Traveller" },

  ];

  const handleCustomerTypeChange = (e) => {
    const customer_type = e.target.value
    setForm((prev) => ({
      ...prev,
      customer_type,
      food_preference: '',
      vehicle_preferences: [],
      hotel_preference: '',
    }))
  }

  const handleVehiclePreferenceToggle = (vehicleValue) => {
    setForm((prev) => {
      const alreadySelected = prev.vehicle_preferences.includes(vehicleValue)
      const vehicle_preferences = alreadySelected
        ? prev.vehicle_preferences.filter((value) => value !== vehicleValue)
        : [...prev.vehicle_preferences, vehicleValue]

      return { ...prev, vehicle_preferences }
    })
  }
  return (
    <section className="commonLoginSection login-page signup-page login-section-bg">
      <div className="userAuthDiv login-shell signup-auth-shell px-3 px-sm-4">
        {/*s <div className="auth-page-top-bar">
          <NavLink to="/home">Back to Home</NavLink>
        </div> */}

        <div className="col-12 login-form-col signup-solo-form">
          <div className="userWelcomeMsg login-welcome">
            {/* <span className="login-welcome-badge">Create account</span> */}
            <h6>Welcome!</h6>
            <p>Create your Athiti account in a few steps.</p>
          </div>

          <div className="registerCard mt-2 pb-0 login-card login-card-surface signupCard">
            <form className="inputForm userSignupSecondForm login-form px-0" onSubmit={handleRegister}>
              {/* NAME */}
               {!otpSent && (
              <>

              <div className="themeInput">
                <label>
                  Full Name<small className="text-danger">*</small>
                </label>
                <input
  required maxLength={30} minLength={3}
  placeholder="Enter full name"
  value={form.name}
  onChange={(e) =>
    setForm({
      ...form,
      name: e.target.value
        .replace(/[^a-zA-Z\s]/g, '')
        .replace(/^\s+/, ''),
    })
  }
/>
              </div>

              {/* EMAIL */}
              <div className="themeInput">
                <label>
                  Email Id (Optional)
                </label>
                <input
  type="email"
  placeholder="Enter email (optional)"
  autoComplete="off"
  value={form.email}
  onChange={(e) => {
    const value = e.target.value.replace(/\s+/g, '').toLowerCase();

    setForm({
      ...form,
      email: value,
    });
  }}
/>
              </div>

              {/* PHONE */}
              <div className="themeInput">
                <label>
                  Whatsapp Number<small className="text-danger">*</small>
                </label>
                <input
                  required
                  maxLength={10}
                  placeholder="Enter whatsapp number"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone: e.target.value.replace(/\D/g, ''),
                    })
                  }
                />
              </div>

              {/* FOOD PREFERENCE */}
      <div className="themeInput">
  <label>Select Preference<small className="text-danger">*</small></label>
  <select
    value={form.customer_type }
    onChange={handleCustomerTypeChange}
  >

  <option value="hotel">Hotel / Homestay</option>
    <option value="vehicle">Vehicle / Transport</option>
     <option value="food">Food / Dining</option>
  </select>
</div>

     {form.customer_type  === "food" && (
  <div className="themeInput">
    <label>Food Preference<small className="text-danger">*</small></label>
    <select
      value={form.food_preference}
      onChange={(e) =>
        setForm({ ...form, food_preference: e.target.value })
      }
    >
      <option value="">Select Food Category</option>
      <option value="veg">Veg</option>
      <option value="non_veg">NonVeg</option>
      <option value="veg_non_veg">Veg & NonVeg</option>
            <option value="home_tiffin">Home Tiffin</option>
      <option value="jain">Jain Food</option>
      <option value="diabetic_low_sodium">Debitic Meal</option>
    </select>
  </div>
)}
{form.customer_type  === "hotel" && (
  <div className="themeInput">
    <label>Hotel Preference<small className="text-danger">*</small></label>
    <select
      value={form.hotel_preference}
      onChange={(e) =>
        setForm({ ...form, hotel_preference: e.target.value })
      }
    >
      <option value="">Select Preference</option>
      <option value="hotel">Hotel</option>
      <option value="homestay">Homestay</option>
      <option value="farmstay">Farmstay</option>
            <option value="villa">Villa</option>
      <option value="resort">Resort</option>
      <option value="apartment">Apartment</option>
      <option value="independent_house">Independent House</option>
      <option value="independent_room">Independent Room</option>
       <option value="dormitory_hostel">Dormitory / Hostel</option>
    </select>
  </div>
)}

{form.customer_type  === "vehicle" && (
<div className="themeInput">
<label className="d-block text-start">
      Vehicle Preference<small className="text-danger">*</small>
</label>

    <input
      type="hidden"
      name="vehicle_preference"
      value={form.vehicle_preferences.join(",")}
    />

    <div className="d-flex flex-wrap gap-3 mt-1">
      {vehicleOptions.map((item) => (
        <label key={item.value} className="d-flex align-items-center me-3">
          <input
            type="checkbox"
            className="me-2"
            checked={form.vehicle_preferences.includes(item.value)}
            onChange={() => handleVehiclePreferenceToggle(item.value)}
          />
          {item.label}
        </label>
      ))}
    </div>
</div>
)}

      {/* PASSWORD */}
      <div className="themeInput">
        <label>
          Password<small className="text-danger">*</small>
        </label>
        <input
  maxLength={15}
  minLength={6}
  required
  type="password"
  placeholder="Enter password"
  autoComplete="off"
  value={form.password}
  onChange={(e) => {
    const value = e.target.value.replace(/\s+/g, '');

    setForm({
      ...form,
      password: value,
    });
  }}
/>
      </div>
              <div className="mt-2 d-flex">
                <input
                  type="checkbox"
                  checked={form.terms}
                  onChange={(e) => setForm({ ...form, terms: e.target.checked })}
                />
                <label className="ms-2">
                  I agree to{' '}
                  <NavLink to="/page/terms-conditions" target="_blank" className="">
                    Terms and Privacy Conditions
                  </NavLink>
                </label>
              </div>
              {/* SEND OTP */}

                <div className="UserFormBtn">
                  <button type="button" onClick={handleSendOtp}>
                    Register
                  </button>
                </div>

</>
)}
              {/* OTP SECTION */}
              {otpSent && (
                <div className="themeInput mt-2">
                  <label>
                    Enter OTP<small className="text-danger">*</small> {localStorage.getItem("tempotp")}
                  </label>
                  <input
                    required
                    maxLength={4}
                    placeholder="Enter OTP"
                    value={form.otp}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        otp: e.target.value.replace(/\D/g, ''),
                      })
                    }
                  />

                  {!otpVerified ? (
                    <div className="UserFormBtn mt-2">
                      <button type="button" onClick={handleVerifyOtp}>
                        Verify OTP
                      </button>
                    </div>
                  ) : (
                    null
                  )}
                </div>
              )}

              {/* TERMS */}

              {/* SUBMIT */}
              {/* <div className="UserFormBtn mt-3">
                <button type="submit" disabled={!otpVerified}>
                  Register
                </button>
              </div> */}

              <p className="mt-3 login-signup-text">
                Already have an account? <NavLink to="/login">Login</NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Signup
