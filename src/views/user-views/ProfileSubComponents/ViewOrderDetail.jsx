import React from 'react'
import { HiLocationMarker } from 'react-icons/hi'
import productImg from '../../../assets/webImage/orderdetails.jfif'
import { useNavigate } from 'react-router-dom'


function ViewOrderDetail() {
  const Navigate = useNavigate();
  return (
    <section className="viewDetailSection customTabBorder">
      <div className="row justify-content-between">
        <div className="col-md-7  col-12 mb-2 orderHistoryDetailDiv">
          <h6>
            My Booking / <span>OD329656937544056100</span>
          </h6>
          <div className="orderAddressDiv">
            <h3>
              <HiLocationMarker />
              Address
            </h3>
            <p>Rajat Matkar</p>
            <p>
              G-17 1st shabari nagar, sukhliya (Indore) indore, near Bandhan Garden INDORE - 452010
            </p>
            <p>Madhya Pradesh</p>
            <p>
              Whatsapp number - <span>9685762333</span>{' '}
            </p>
          </div>
        </div>
        <div className="col-md-5 col-12 orderHistoryDetailCard">
          <h6 className="historyCardHeader colortex">Price Detail</h6>
          <table className="historyDetailTable">
            <tr>
              <th>Amount</th>
              <td className='colortex'>₹120.00</td>
            </tr>
            <tr>
              <th>Fee</th>
              <td className='colortex'>₹0</td>
            </tr>
            <tr>
              <th>Discount</th>
              <td className='colortex'>₹80</td>
            </tr>
            <tr>
              <th className="p-0">
                <hr />
              </th>
              <td className="p-0">
                <hr />
              </td>
            </tr>

            <tr>
              <th className="historyOrderTotal">Total Amount</th>
              <td className="historyOrderTotalAmount">₹120.00</td>
            </tr>
           <tr>
  <td colSpan="100%">
    <div className="d-flex justify-content-center">
      <button className="bg-success mt-2 mb-2 completeTab px-5 py-1 text-light rounded-pill border">
  Pay Now
</button>
    </div>
  </td>
</tr>
          </table>
        </div>
      </div>
      <div className="historyOrderInfo">
        <div className="row">
          <div className="col-md-7 col-12 mb-2">
            <div className="orderDescriptionDiv">
              <img src={productImg} alt="img" />
              <div className="historyOrderDecription">
                <h6 className="historyOrderName">South Indian Tiffin</h6>
                <h6 className="historyOrderPrice">
                  ₹120.00 <span> ₹200</span>
                </h6>
                <div className="historyOrderData flex-wrap">
                  <span className="historyOrderId">
                    Order ID - <p>OID52466246325</p>
                  </span>
                  {/* <h6>|</h6>
                  <span className="historyOrderSellerInfo">
                    Sold by : <p>Seller</p>
                  </span> */}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5 col-12 historyOrderBtn">

            <button onClick={()=>Navigate("/homestaydetails/1")}>Explore Homestay</button>
            <button onClick={()=>Navigate("/ridesdetails/1")}>Explore Vehicle</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ViewOrderDetail
