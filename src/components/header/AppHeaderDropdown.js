import React from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CDropdownDivider,
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import { adminLogout } from '../../features/auth/authSlice'
import { NavLink, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import DefaultUserImg from '../../assets/ordermanagement/defaultuser.jpg';
import MEDIA_URL from '../../media'

const AppHeaderDropdown = () => {
  const { admin } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // console.log(JSON.stringify(admin), ">>>>>>>>>>>>>>>>>>>");

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of your account!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(adminLogout())
        navigate('/admin/login')
        Swal.fire({
          title: 'Logged out!',
          text: 'You have been successfully logged out.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        })
      }
    })
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar
          src={admin?.profileImage ? MEDIA_URL + admin.profileImage : DefaultUserImg}
          size="md"
          className="profileImgClass"
          onError={(e) => (e.target.src = DefaultUserImg)}
        />
      </CDropdownToggle>

      <CDropdownMenu className="p-2" placement="bottom-end">
        <CDropdownItem as={NavLink} to="/admin/profile" className="navDropdownChild">
          <i className="fa-solid fa-user me-2"></i>
          Profile
        </CDropdownItem>
        <CDropdownItem as={NavLink} to="/admin/app-config" className="navDropdownChild">
          <i className="fa-solid fa-gear me-2"></i>
          Settings
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem component="button" onClick={handleLogout} className="navDropdownChild">
          <i className="fa-solid fa-right-from-bracket me-2"></i>
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
