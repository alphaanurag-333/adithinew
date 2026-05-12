import React, { useState } from 'react'

import { LuUserRound } from 'react-icons/lu'
import { AiOutlineShop } from 'react-icons/ai'
import { SlLocationPin } from 'react-icons/sl'
import { TbArrowBackUp } from 'react-icons/tb'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { TfiLock } from 'react-icons/tfi'
import { MdOutlineLogout } from 'react-icons/md'
import { RiBookletLine } from 'react-icons/ri'
import { TfiWallet } from 'react-icons/tfi'
import { PiChatCircleText } from 'react-icons/pi'
import { LuHeart } from 'react-icons/lu'
import OrderHistory from './ProfileSubComponents/OrderHistory'
import Wishlist from './ProfileSubComponents/Wishlist'
import { RxQuestionMarkCircled } from 'react-icons/rx'
import SignupImg  from '../../assets/images/signupImg.png'
import UpdateProfile from './ProfileSubComponents/UpdateProfile'
import TrackOrder from './ProfileSubComponents/TrackOrder'
import ReturnOrder from './ProfileSubComponents/ReturnOrder'
import Wallet from './ProfileSubComponents/Wallet'
import PaymentHistory from './ProfileSubComponents/PaymentHistory'
import SellerChat from './ProfileSubComponents/SellerChat'
import Address from './ProfileSubComponents/Address'
import SupportTicket from './ProfileSubComponents/SupportTicket'
import ChangePassoword from './ProfileSubComponents/ChangePassoword'
import ViewOrderDetail from './ProfileSubComponents/ViewOrderDetail'
import Notification from './ProfileSubComponents/Notification'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useAuth } from '../../context/AuthContext'

const UserProfile = () => {
  const { userLogout } = useAuth()
  const navigate = useNavigate();
  // const [activeTab, setActiveTab] = useState('update')
  const [activeTab, setActiveTab] = useState(
  () => localStorage.getItem('profileTab') || 'update'
)



  const renderContent = () => {
    switch (activeTab) {
      case 'update':
        return <UpdateProfile />
      case 'wishlist':
        return <Wishlist />
      case 'orderHistory':
        return <OrderHistory setActiveTab={setActiveTab} />
      case 'trackOrder':
        return <TrackOrder />
      case 'returnOrder':
        return <ReturnOrder />
      case 'wallet':
        return <Wallet />
      case 'paymentHistory':
        return <PaymentHistory />
      case 'sellerChat':
        return <SellerChat />
      case 'address':
        return <Address />
      case 'notification':
        return <Notification />
      case 'changePassword':
        return <ChangePassoword />
      case 'supportTicket':
        return <SupportTicket />
      case 'viewDetail':
        return <ViewOrderDetail />
      default:
        return <UpdateProfile />
    }
  }

  const handleLogout = () => {
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to logout?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, logout',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          // Optional: show a success message after logout
          Swal.fire({
            icon: 'success',
            title: 'Logged out',
            text: 'You have been logged out successfully',
            timer: 1500,
            showConfirmButton: false,
          })
          userLogout()
          navigate('/home')
        }
      })
    }
  return (
    <>
      <section className="profileSection container">
        <div className="row m-0">
          <div className="col-md-3 col-12">
             <div
    className="profileSidebar"
    style={{
      overflowX: "auto",
      textWrap:"nowrap"
    }}
  >
    <div

      className='manage'
    >
            {/* <div className="profileSidebar"> */}
              <button
                onClick={() => {
                  setActiveTab('update')
                  localStorage.setItem('profileTab', 'update')
                }}
                className={`profileSideTabs ${activeTab === 'update' ? 'active' : ''}`}
              >
                <LuUserRound />
                Profile
              </button>
               <button
                onClick={() => {
                  setActiveTab('orderHistory')
                  localStorage.setItem('profileTab', 'orderHistory')
                }}
                className={`profileSideTabs ${activeTab === 'orderHistory' ? 'active' : ''}`}
              >
                <AiOutlineShop />
                Enquiry/Booking History
              </button>
             {/* <button
                onClick={() => {
                  setActiveTab('trackOrder')
                  localStorage.setItem('profileTab', 'trackOrder')
                }}
                className={`profileSideTabs ${activeTab === 'trackOrder' ? 'active' : ''}`}
              >
                <SlLocationPin />
                Track Order
              </button> */}
              <button
                onClick={() => {
                  setActiveTab('wishlist')
                  localStorage.setItem('profileTab', 'wishlist')
                }}
                className={`profileSideTabs ${activeTab === 'wishlist' ? 'active' : ''}`}
              >
                <LuHeart />
                Favourite
              </button>
              {/* <button
                onClick={() => {
                  setActiveTab('returnOrder')
                  localStorage.setItem('profileTab', 'returnOrder')
                }}
                className={`profileSideTabs ${activeTab === 'returnOrder' ? 'active' : ''}`}
              >
                <TbArrowBackUp /> Return Order
              </button>
              <button
                onClick={() => {
                  setActiveTab('wallet')
                  localStorage.setItem('profileTab', 'wallet')
                }}
                className={`profileSideTabs ${activeTab === 'wallet' ? 'active' : ''}`}
              >
                <TfiWallet />
                Wallet
              </button>
              <button
                onClick={() => {
                  setActiveTab('paymentHistory')
                   localStorage.setItem('profileTab', 'paymentHistory')
                }}
                className={`profileSideTabs ${activeTab === 'paymentHistory' ? 'active' : ''}`}
              >
                <RiBookletLine />
                Payment History
              </button>
                <button
                onClick={() => {
                  setActiveTab('address')
                  localStorage.setItem('profileTab', 'address')
                }}
                className={`profileSideTabs ${activeTab === 'address' ? 'active' : ''}`}
              >
                <SlLocationPin />
                Address
              </button>
                 <button
                onClick={() => {
                  setActiveTab('changePassword')
                  localStorage.setItem('profileTab', 'changePassword')
                }}
                className={`profileSideTabs ${activeTab === 'changePassword' ? 'active' : ''}`}
              >
                <TfiLock />
                Change Password
              </button>

              {/* <button
                onClick={() => {
                  setActiveTab('sellerChat')
                  localStorage.setItem('profileTab', 'sellerChat')
                }}
                className={`profileSideTabs ${activeTab === 'sellerChat' ? 'active' : ''}`}
              >
                <PiChatCircleText />
                Vendor Chat
              </button> */}

              <button
                onClick={() => {
                  setActiveTab('notification')
                   localStorage.setItem('profileTab', 'notification')
                }}
                className={`profileSideTabs ${activeTab === 'notification' ? 'active' : ''}`}
              >
                <IoIosNotificationsOutline />
                Notification
              </button>

              <button
                onClick={() => {
                  setActiveTab('supportTicket')
                  localStorage.setItem('profileTab', 'supportTicket')
                }}
                className={`profileSideTabs ${activeTab === 'supportTicket' ? 'active' : ''}`}
              >
                <RxQuestionMarkCircled />
                Support Ticket
              </button>
              <button onClick={handleLogout} className="nav-link profileSideTabs" type="button">
                <MdOutlineLogout />
                Log-out
              </button>
            </div>
            </div>
          </div>

          <div className="col-md-9 col-12">
            <div id={activeTab} className="profileContent">
              {renderContent()}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default UserProfile
