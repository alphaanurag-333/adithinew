import { RxCrossCircled } from 'react-icons/rx'
import { CardImg1 } from '../Image'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { HiMiniArrowRight } from 'react-icons/hi2'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import API from '../../../api'
import Swal from 'sweetalert2'
import { AiFillDelete } from "react-icons/ai";

const CartList = () => {

  const { user, userToken } = useSelector((state) => state.auth)

  const [cartlist, setcartlist] = useState([])

  const navigate = useNavigate();

  // =========================
  // GET CART
  // =========================
  useEffect(() => {
    GetCartList()
  }, [])

  const GetCartList = async () => {

    try {

      const res = await API.get('/cart', {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });

      setcartlist(res?.data?.data)

    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // DELETE ITEM
  // =========================
  const DeleteItem = async (cartKey) => {

    try {

      const res = await API.delete('/cart/remove', {

        data: {
          key: cartKey
        },

        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        }

      });

      GetCartList();

      Swal.fire({
        icon: 'success',
        title: res?.data?.message || 'Item Removed',
        timer: 1500,
        showConfirmButton: false
      });

    } catch (error) {

      console.log(error);

      Swal.fire({
        icon: 'error',
        title: error?.response?.data?.message || 'Failed to remove item'
      });

    }
  };

  // =========================
  // UPDATE CART
  // =========================
  const UpdateCart = async (cartKey, qty) => {

    try {

      await API.put(
        '/cart/update',

        {
          key: cartKey,
          quantity: qty
        },

        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          }
        }
      );

      GetCartList();

    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // SUMMARY
  // =========================
  const summary = cartlist?.summary || {};

  const subtotal = Number(summary?.sub_total || 0);
  const tax = Number(summary?.tax_total || 0);
  const discount = Number(summary?.discount_total || 0);
  const shipping = Number(summary?.shipping_total || 0);
  const finalTotal = Number(summary?.grand_total || 0);

  return (
    <>
      <section className="commonSection">

        <div className="container">

          <div className="row">

            {/* ========================= */}
            {/* CART TABLE */}
            {/* ========================= */}

            <div className="col-lg-8 mb-3">

              <div className="profileCard">

                <div className="themeHeader fw-bold mb-4">
                  <h2>
                    <span>Cart List</span>
                  </h2>
                </div>

                <div className="cartTable">

                  <table>

                    <thead>
                      <tr>
                        <th colSpan="3">Foods</th>
                        <th>PRICE</th>
                        <th>QUANTITY</th>
                        <th>Sub-Total</th>
                      </tr>
                    </thead>

                    <tbody>

                      {cartlist?.items?.map((item) => (

                        <tr key={item.id}>

                          {/* DELETE */}
                          <td>
                            <button
                              className="removeBtn"
                              onClick={() => DeleteItem(item.id)}
                            >
                              <AiFillDelete />
                            </button>
                          </td>

                          {/* IMAGE */}
                          <td>
                            <img
                              style={{
                                width: "80px",
                                height: "80px",
                                objectFit: "cover",
                                borderRadius: "10px"
                              }}
                              src={item?.product_image_url}
                              alt={item?.name}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-blank-avatar-modern-vector-png-image_40962406.jpg";
                              }}
                            />
                          </td>

                          {/* NAME */}
                          <td>
                            <p className="cartProductDescription mb-1">
                              {item?.name}
                            </p>

                            {/* <small className="text-muted">
                              {item?.vendor?.shop_name}
                            </small> */}
                          </td>

                          {/* PRICE */}
                          <td>
                            <div className="cartTablePrice">
                              <span className="colortex">
                                ₹{Number(item?.price).toFixed(2)}
                              </span>
                            </div>
                          </td>

                          {/* QUANTITY */}
                          <td>

                            <div className="cartQuantityBtn">

                              <button
                                onClick={() =>
                                  item.quantity > 1 &&
                                  UpdateCart(item.id, item.quantity - 1)
                                }
                              >
                                -
                              </button>

                              <p>{item?.quantity}</p>

                              <button
                                onClick={() =>
                                  UpdateCart(item.id, item.quantity + 1)
                                }
                              >
                                +
                              </button>

                            </div>

                          </td>

                          {/* SUBTOTAL */}
                          <td className="colortex">

                            ₹{Number(
                              item?.pricing?.line_total || 0
                            ).toFixed(2)}

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

                <div className="cartTableFootBtn">

                  <button onClick={() => navigate("/")}>
                    BACK TO HOME
                  </button>

                </div>

              </div>

            </div>

            {/* ========================= */}
            {/* PRICE DETAILS */}
            {/* ========================= */}

            <div className="col-lg-4 mb-3">

              <div className="cartCard">

                <div className="themeHeader fw-bold mb-4">
                  <h2>
                    <span>Price Details</span>
                  </h2>
                </div>

                <ul>

                  <li>
                    <span>Sub-total</span>
                    <strong className='colortex'>
                      ₹{subtotal.toFixed(2)}
                    </strong>
                  </li>

                  <li>
                    <span>Shipping</span>
                    <strong className='colortex'>
                      ₹{shipping.toFixed(2)}
                    </strong>
                  </li>

                  <li>
                    <span>Discount</span>
                    <strong className='colortex'>
                      ₹{discount.toFixed(2)}
                    </strong>
                  </li>

                  <li>
                    <span>Tax</span>
                    <strong className='colortex'>
                      ₹{tax.toFixed(2)}
                    </strong>
                  </li>

                </ul>

                <h4>
                  <span className='fw-semibold'>Total</span>

                  <strong className='colortex'>
                    ₹{finalTotal.toFixed(2)}
                  </strong>
                </h4>

                <div className="text-center">

                  <NavLink
                    to="/check-out"

                    onClick={() => {

                      localStorage.setItem(
                        "checkoutFoodPreview",

                        JSON.stringify({

                          total_amount: finalTotal,

                          subtotal,
                          tax,
                          discount,
                          shipping,

                          cart_items: cartlist?.items || [],

                          vendor:
                            cartlist?.items?.[0]?.vendor || {},

                        })
                      );

                    }}
                  >

                    <button>
                      Proceed to Checkout
                      <HiMiniArrowRight />
                    </button>

                  </NavLink>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>
    </>
  )
}

export default CartList
