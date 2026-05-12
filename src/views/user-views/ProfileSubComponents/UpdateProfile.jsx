import React, { useState } from 'react'
import  SignupImg from '../../../assets/images/signupImg.png'
import { useSelector, useDispatch } from 'react-redux'
import API from '../../../api'
import MEDIA_URL from '../../../media'
import { updateUserProfile } from '../../../features/auth/authSlice'
import Swal from 'sweetalert2'

function UpdateProfile() {
  const { user, userToken } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const formattedDob = user?.dob ? new Date(user.dob).toISOString().split('T')[0] : ''
  const [formInputs, setFormInputs] = useState({
    f_name: user?.f_name ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
  })

  const [profileImagePreview, setProfileImagePreview] = useState(
    user?.image ? `${user.image}` : SignupImg,
  )
  const [newProfileImage, setNewProfileImage] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setNewProfileImage(file)
      setProfileImagePreview(URL.createObjectURL(file))
    }
  }

  const handleInput = (e) => {
    const { name, value } = e.target

    // Allow alphabets + spaces only for Name
    if (name === 'f_name') {
      if (!/^[A-Za-z\s]*$/.test(value)) return
    }

    // Allow only digits for Phone
    if (name === 'phone') {
      if (!/^\d*$/.test(value)) return
    }

    setFormInputs({
      ...formInputs,
      [name]: value,
    })
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    if (loading) return

    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to update your profile?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'Cancel',
    })

    if (!confirm.isConfirmed) {
      return
    }
     setLoading(true)

    const formData = new FormData()
    formData.append('f_name', e.target.f_name.value.trim())
    formData.append('email', e.target.email.value.trim())
    formData.append('phone', e.target.phone.value.trim())

    if (newProfileImage) {
      formData.append('image', newProfileImage)
    }

    try {
      const response = await API.post('/customer/update-profile', formData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'multipart/form-data',
        },
      })

      dispatch(updateUserProfile(response.data?.user))

      Swal.fire({
        title: 'Profile Updated!',
        text: 'Your profile has been updated successfully.',
        icon: 'success',
        timer: 2000,
      })
    } catch (error) {
      console.error('Error updating profile:', error)

      Swal.fire({
        title: 'Error!',
        text: error?.response?.data?.message || 'Failed to update profile.',
        icon: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="profileCard">
      <h6 className="profileHeading colortex">YOUR PROFILE</h6>

      <div className="row profileUpdateDiv ">
        <div className="col-md-12 col-xxl-2 mt-3 text-start flex-nowrap">
          {/* <img src={profileImagePreview} className="profilePicImg" alt="profile" /> */}
          <img
  src={profileImagePreview || "/src/assets/images/user.png"}
  className="profilePicImg"
  alt="profile"
  onError={(e) => {
    e.target.src = "/src/assets/images/user.png";
  }}
/>
          <div>
            <label className="uploadBtn mt-2">
              <input type="file" accept="image/*" hidden onChange={handleImageChange} />
              <span className="themeBtn">Change Photo</span>
            </label>
          </div>
        </div>

        <div className="col-md-12 col-xxl-12">
          <form className="userForm p-2 inputForm" onSubmit={handleUpdateProfile}>
            <div className="row g-3">
              <div className="col-lg-4">
                <div className="themeInput">
                  <label>
                    Full Name
                    <small className="text-danger">*</small>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    maxLength={40}
                    minLength={3}
                    name="f_name"
                    value={formInputs.f_name}
                    onChange={handleInput}
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="themeInput">
                  <label>
                    Email
                    {/* <small className="text-danger">*</small> */}
                  </label>
                  <input

                    className="form-control"
                    type="email"
                    name="email"
                    defaultValue={user?.email ?? ''}
                    placeholder="Enter your email-id"

                  />
                </div>
              </div>

              <div className="col-lg-4">
                <div className="themeInput">
                  <label>
                    Whatsapp Number
                    <small className="text-danger">*</small>
                  </label>
                  <input
                    readOnly
                    className="form-control"
                    type="text"
                    name="phone"
                    maxLength={10}
                    minLength={10}
                    value={formInputs.phone.trim()}
                    onChange={handleInput}
                    required
                    placeholder="Enter you mobile number"
                  />
                </div>
              </div>

              <div className="col-md-12">
                <button className="themeBtn mobilewidth" type="submit" disabled={loading}>
                 {loading ? 'Updating...' : 'Update Profile'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateProfile
