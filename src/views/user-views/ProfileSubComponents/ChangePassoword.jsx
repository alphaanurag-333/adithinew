 import { useState } from 'react'
import { VscEye, VscEyeClosed } from 'react-icons/vsc'
import { useSelector, useDispatch } from 'react-redux'
import API from '../../../api'
import Swal from 'sweetalert2'

function ChangePassword() {
  const dispatch = useDispatch()
  const { userToken, user } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.newPassword.length < 6) {
      return Swal.fire('Error', 'Password must be at least 6 characters long', 'error')
    }

    if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
      return Swal.fire('Error', 'All fields are required', 'error')
    }

    if (formData.newPassword !== formData.confirmPassword) {
      return Swal.fire('Error', 'New password & confirm password must match', 'error')
    }

    setLoading(true)

    try {
      const res = await API.post(
        '/user/change-password',
        {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        },
      )

      if (res.data.status) {
        Swal.fire('Success', 'Password changed successfully', 'success')
        setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' })
      }
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'Something went wrong!', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <h6 className="profileHeading">CHANGE PASSWORD</h6>
      <div className="updateAddressFormDiv customTabBorder">
        <form className="updateAddForm changePassForm" onSubmit={handleSubmit}>
          <div className="row g-3 justify-content-between">
            {/* Old Password */}
            <div className="col-lg-6 mt-0">
              <label>Old Password</label>
              <div className="changePassInput">
                <input
                  className="form-control"
                  name="oldPassword"
                  placeholder="Enter old password"
                  type={showNewPassword ? 'text' : 'password'}
                  required
                  value={formData.oldPassword}
                  onChange={handleInput}
                />
                <div onClick={() => setShowNewPassword(!showNewPassword)}>
                  {showNewPassword ? <VscEye /> : <VscEyeClosed />}
                </div>
              </div>
            </div>

            {/* New Password */}
            <div className="col-lg-6 mt-0">
              <label>New Password</label>
              <div className="changePassInput">
                <input
                  className="form-control"
                  name="newPassword"
                  placeholder="8+ characters"
                  type={showPassword ? 'text' : 'password'}
                  minLength={6}
                  required
                  value={formData.newPassword}
                  onChange={handleInput}
                />

                <div onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VscEye /> : <VscEyeClosed />}
                </div>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="col-lg-6 mt-4">
              <label>Confirm Password</label>
              <div className="changePassInput">
                <input
                  className="form-control"
                  name="confirmPassword"
                  placeholder="8+ characters"
                  type={showConfirmPassword ? 'text' : 'password'}
                  minLength={6}
                  required
                  value={formData.confirmPassword}
                  onChange={handleInput}
                />

                <div onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <VscEye /> : <VscEyeClosed />}
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="col-md-12 mt-4">
              <button className="themeBtn" type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'SAVE PASSWORD'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default ChangePassword
