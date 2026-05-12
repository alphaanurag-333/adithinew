import infoImg from "../../../assets/webImage/info.svg";
import { GoArrowRight } from "react-icons/go";
import ProgressBar from "./ProgressBar";
import { BiCheckDouble } from "react-icons/bi";
import { useState } from "react";

function TrackOrder() {
  const [trackOrder, setTrackOrder] = useState(false);

  return (
    <>
      <section className="profileCard">
        {/* <div className="profileCard"> */}
      <h6 className="profileHeading">TRACK ORDER</h6>
      <div className="row profileUpdateDiv">
        {/* <h6 className="profileTabHeader">Track Order</h6> */}

        <div className="row g-4 tackOrderForm">
<p className="text-secondary fw-5 col-md-12 mt-1">
          To track your order please enter your order ID in the input field
          below and press the “Track Order” button. this was given to you on
          your receipt and in the confirmation email you should have received.
        </p>
          <div className="col-md-6 mt-3  flex-nowrap">
            <label className="form-label">Order ID</label>
            <input
              className="form-control"
              placeholder="ID..."
              type="text"
              name="name"
            />
          </div>
          <div className="col-md-6 mt-3 flex-nowrap">
            <label className="form-label">Billing Email</label>
            <input
              className="form-control"
              placeholder="Email address"
              type="text"
              name="name"
            />
          </div>
          <div className="trackRemark">
            <img src={infoImg} alt="info.png" />
            <p>Order ID that we sended to your in your email address.</p>
          </div>
          <button
            className="themeBtn trackBtn"
            onClick={() => setTrackOrder((prev) => !prev)}
          >
            TRACK ORDER <GoArrowRight />
          </button>
        </div>
        </div>
      </section>
      {trackOrder && (
        <div className="trackChartSection">
          <div className="trackProgressSection">
            <div className="progressHeader">
              <div className="col-6 ">
                <h4 className="trackID">#96459761</h4>
                <div className="orderDetailDiv">
                  <p className="orderCount">4 Products</p>
                  <span>•</span>
                  <p className="orderDeliveryData">
                    Order Placed in 17 Jan, 2021 at 7:32 PM
                  </p>
                </div>
              </div>
              <div className="col-6 orderPrice">₹1199.00</div>
            </div>
          </div>

          <div className="progressBarDiv">
            <p className="barTitle">
              Order expected arrival <b>23 Jan, 2021</b>
            </p>
            <ProgressBar status={"onTheRoad"} />
          </div>
          <div className="orderSummary">
            <div className="profileTabTitle">Order</div>
            <div className="orderdetailDiv">
              <div className="orderIcon">
                <BiCheckDouble />
              </div>
              <div className="orderDetail">
                <p>
                  Your order has been delivered. Thank you for shopping at
                  Clicon!
                </p>
                <p className="orderTiming">23 Jan, 2021 at 7:32 PM</p>
              </div>
            </div>
            <div className="orderdetailDiv">
              <div className="orderIcon">
                <BiCheckDouble />
              </div>
              <div className="orderDetail">
                <p>
                  Our delivery man (John Wick) Has picked-up your order for
                  delvery.
                </p>
                <p className="orderTiming">23 Jan, 2021 at 2:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TrackOrder;
