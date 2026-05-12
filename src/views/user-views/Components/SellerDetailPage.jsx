import { useState, useEffect } from 'react'
import { FaArrowRight } from 'react-icons/fa6'
import { GoLocation } from 'react-icons/go'
import { BsFillHeartFill } from 'react-icons/bs'
import { RxCross2 } from 'react-icons/rx'


import { NavLink } from 'react-router-dom'

import API from '../../../api.js'
function SellerDetailPage() {
  const [selected, setSelected] = useState({})
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(10000)
  const [isLiked, setIsLiked] = useState(false)
  const [closeUserChatModal, setCloseUserChatModal] = useState(true)
  const [selectedPrice, setSelectedPrice] = useState('All Price')
  const categories = [
    'Business Card',
    'Flyers',
    'Posters',
    'Diaries',
    'Bill Books',
    'Wedding Invitations',
    'Birthday Invitations',
    'Banners',
    'Brochures',
    'Notepads',
    'Calendars',
    'Greeting Cards',
  ]
  const priceOptions = [
    'All Price',
    'Under ₹20',
    '₹25 to ₹100',
    '₹100 to ₹300',
    '₹300 to ₹500',
    '₹500 to ₹1,000',
    '₹1,000 to ₹10,000',
  ]

  const toggleCategory = (label) => {
    setSelected((prev) => ({
      ...prev,
      [label]: !prev[label],
    }))
  }

  const [sellers, setSellers] = useState([])
  const [loading, setLoading] = useState(false)
  const fetchSellers = async () => {
    if (loading) return
    setLoading(true)

    try {
      const res = await API.get(`/user/misc/sellers`)

      if (res.data.status) {
        const newData = res.data.data || []

        setSellers(newData)
      }
    } catch (error) {
      console.error('Failed to fetch sellers', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSellers(false)
  }, [])

  return (
    <section>
      <div className="sellerDetailsHeader">
        <div className="sellersPosterDiv"></div>
        <div className="container sellersDetails ">
          <div className="col-8 sellersinfo">
            <div className="sellersProfileImgDiv">
              <img src={DummyImg} alt="dummy.png" />
            </div>
            <div className="sellersInfoDiv">
              <h6 className="sellerName">Seller ABC</h6>
              <div className="sellerAddressDiv">
                <GoLocation />
                <h6 className="sellersDetailsAddress mt-0">
                  {' '}
                  123 Colony, abc area, near South Tukoganj, Indore M.P 452010
                </h6>
              </div>
            </div>
          </div>
          <div className="col-4 sellersChatBtn">
            <button className="themeBtn" onClick={() => setCloseUserChatModal(false)}>
              CHAT
            </button>
          </div>
        </div>
        <div className="container sellerProductsContainer">
          <div className="row">
            <div className="sellerProductsHeader">
              <div className="filterTitle">ALL PRODUCTS</div>
              <NavLink to="/products" className="browseproducts">
                Browse All Products <FaArrowRight />
              </NavLink>
            </div>
            <div className="col-12 pr-0 col-lg-3">
              <div className="productSidebar">
                <div className="categoryFilter">
                  <h6 className="filterTitle">CATEGORY</h6>

                  {categories.map((category) => (
                    <div key={category} className="filterTab">
                      <label className="customCheckbox">
                        <input
                          type="checkbox"
                          checked={!!selected[category]}
                          onChange={() => toggleCategory(category)}
                        />
                        <span className="webCheckmark"></span>
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="priceFilterSection">
                  <h6 className="filterTitle">PRICE RANGE</h6>

                  {/* Range Slider */}
                  <div className="rangeSliderWrapper">
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      value={minValue}
                      onChange={(e) => setMinValue(e.target.value)}
                      className="rangeSlider"
                    />

                    <input
                      type="range"
                      min="0"
                      max="10000"
                      value={maxValue}
                      onChange={(e) => setMaxValue(e.target.value)}
                      className="rangeSlider"
                    />
                  </div>

                  {/* Min - Max Inputs */}
                  <div className="minMaxInputs">
                    <input
                      type="number"
                      placeholder="Min price"
                      value={minValue}
                      onChange={(e) => setMinValue(e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Max price"
                      value={maxValue}
                      onChange={(e) => setMaxValue(e.target.value)}
                    />
                  </div>

                  {/* Radio Buttons */}
                  <div className="priceRadioList">
                    {priceOptions.map((option) => (
                      <label key={option} className="customRadio">
                        <input
                          type="radio"
                          checked={selectedPrice === option}
                          onChange={() => setSelectedPrice(option)}
                          name="price"
                        />
                        <span className="radioMark"></span>
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-9">
              <div className="productContainer">
                <div className="activeFilterDiv mt-0">
                  <div className="filterTagsDiv">
                    <label>Active Filters :</label>
                  </div>
                  <div className="filterCounts">
                    65,867
                    <span>Results found.</span>
                  </div>
                </div>

                <div className="row productpageItem">
                  <div className="productPageCard">
                    <div className="productPageImg">
                      <img src={DummyImg} alt="Product" />
                    </div>
                    <div className="productPageCardData">
                      <div className="productPageCardTitle">
                        <h6>Product Name</h6>
                        <div
                          className={`wishlistBtn ${isLiked ? 'savedProduct' : ''}`}
                          onClick={() => setIsLiked((prev) => !prev)}
                        >
                          <BsFillHeartFill />
                        </div>
                      </div>
                      <h6 className="itemPrice">₹500</h6>
                      <button className="themeBtn addToBtn">Add to Cart</button>
                    </div>
                  </div>
                  <div className="productPageCard">
                    <div className="productPageImg">
                      <img src={DummyImg} alt="Product" />
                    </div>
                    <div className="productPageCardData">
                      <div className="productPageCardTitle">
                        <h6>Product Name</h6>
                        <div
                          className={`wishlistBtn ${isLiked ? 'savedProduct' : ''}`}
                          onClick={() => setIsLiked((prev) => !prev)}
                        >
                          <BsFillHeartFill />
                        </div>
                      </div>
                      <h6 className="itemPrice">₹500</h6>
                      <button className="themeBtn addToBtn">Add to Cart</button>
                    </div>
                  </div>
                  <div className="productPageCard">
                    <div className="productPageImg">
                      <img src={DummyImg} alt="Product" />
                    </div>
                    <div className="productPageCardData">
                      <div className="productPageCardTitle">
                        <h6>Product Name</h6>
                        <div
                          className={`wishlistBtn ${isLiked ? 'savedProduct' : ''}`}
                          onClick={() => setIsLiked((prev) => !prev)}
                        >
                          <BsFillHeartFill />
                        </div>
                      </div>
                      <h6 className="itemPrice">₹500</h6>
                      <button className="themeBtn addToBtn">Add to Cart</button>
                    </div>
                  </div>
                  <div className="productPageCard">
                    <div className="productPageImg">
                      <img src={DummyImg} alt="Product" />
                    </div>
                    <div className="productPageCardData">
                      <div className="productPageCardTitle">
                        <h6>Product Name</h6>
                        <div
                          className={`wishlistBtn ${isLiked ? 'savedProduct' : ''}`}
                          onClick={() => setIsLiked((prev) => !prev)}
                        >
                          <BsFillHeartFill />
                        </div>
                      </div>
                      <h6 className="itemPrice">₹500</h6>
                      <button className="themeBtn addToBtn">Add to Cart</button>
                    </div>
                  </div>
                  <div className="productPageCard">
                    <div className="productPageImg">
                      <img src={DummyImg} alt="Product" />
                    </div>
                    <div className="productPageCardData">
                      <div className="productPageCardTitle">
                        <h6>Product Name</h6>
                        <div
                          className={`wishlistBtn ${isLiked ? 'savedProduct' : ''}`}
                          onClick={() => setIsLiked((prev) => !prev)}
                        >
                          <BsFillHeartFill />
                        </div>
                      </div>
                      <h6 className="itemPrice">₹500</h6>
                      <button className="themeBtn addToBtn">Add to Cart</button>
                    </div>
                  </div>
                  <div className="productPageCard">
                    <div className="productPageImg">
                      <img src={DummyImg} alt="Product" />
                    </div>
                    <div className="productPageCardData">
                      <div className="productPageCardTitle">
                        <h6>Product Name</h6>
                        <div
                          className={`wishlistBtn ${isLiked ? 'savedProduct' : ''}`}
                          onClick={() => setIsLiked((prev) => !prev)}
                        >
                          <BsFillHeartFill />
                        </div>
                      </div>
                      <h6 className="itemPrice">₹500</h6>
                      <button className="themeBtn addToBtn">Add to Cart</button>
                    </div>
                  </div>
                  <div className="productPageCard">
                    <div className="productPageImg">
                      <img src={DummyImg} alt="Product" />
                    </div>
                    <div className="productPageCardData">
                      <div className="productPageCardTitle">
                        <h6>Product Name</h6>
                        <div
                          className={`wishlistBtn ${isLiked ? 'savedProduct' : ''}`}
                          onClick={() => setIsLiked((prev) => !prev)}
                        >
                          <BsFillHeartFill />
                        </div>
                      </div>
                      <h6 className="itemPrice">₹500</h6>
                      <button className="themeBtn addToBtn">Add to Cart</button>
                    </div>
                  </div>
                  <div className="productPageCard">
                    <div className="productPageImg">
                      <img src={DummyImg} alt="Product" />
                    </div>
                    <div className="productPageCardData">
                      <div className="productPageCardTitle">
                        <h6>Product Name</h6>
                        <div
                          className={`wishlistBtn ${isLiked ? 'savedProduct' : ''}`}
                          onClick={() => setIsLiked((prev) => !prev)}
                        >
                          <BsFillHeartFill />
                        </div>
                      </div>
                      <h6 className="itemPrice">₹500</h6>
                      <button className="themeBtn addToBtn">Add to Cart</button>
                    </div>
                  </div>
                  <div className="productPageCard">
                    <div className="productPageImg">
                      <img src={DummyImg} alt="Product" />
                    </div>
                    <div className="productPageCardData">
                      <div className="productPageCardTitle">
                        <h6>Product Name</h6>
                        <div
                          className={`wishlistBtn ${isLiked ? 'savedProduct' : ''}`}
                          onClick={() => setIsLiked((prev) => !prev)}
                        >
                          <BsFillHeartFill />
                        </div>
                      </div>
                      <h6 className="itemPrice">₹500</h6>
                      <button className="themeBtn addToBtn">Add to Cart</button>
                    </div>
                  </div>
                  <div className="productPageCard">
                    <div className="productPageImg">
                      <img src={DummyImg} alt="Product" />
                    </div>
                    <div className="productPageCardData">
                      <div className="productPageCardTitle">
                        <h6>Product Name</h6>
                        <div
                          className={`wishlistBtn ${isLiked ? 'savedProduct' : ''}`}
                          onClick={() => setIsLiked((prev) => !prev)}
                        >
                          <BsFillHeartFill />
                        </div>
                      </div>
                      <h6 className="itemPrice">₹500</h6>
                      <button className="themeBtn addToBtn">Add to Cart</button>
                    </div>
                  </div>
                  <div className="productPageCard">
                    <div className="productPageImg">
                      <img src={DummyImg} alt="Product" />
                    </div>
                    <div className="productPageCardData">
                      <div className="productPageCardTitle">
                        <h6>Product Name</h6>
                        <div
                          className={`wishlistBtn ${isLiked ? 'savedProduct' : ''}`}
                          onClick={() => setIsLiked((prev) => !prev)}
                        >
                          <BsFillHeartFill />
                        </div>
                      </div>
                      <h6 className="itemPrice">₹500</h6>
                      <button className="themeBtn addToBtn">Add to Cart</button>
                    </div>
                  </div>
                  <div className="productPageCard">
                    <div className="productPageImg">
                      <img src={DummyImg} alt="Product" />
                    </div>
                    <div className="productPageCardData">
                      <div className="productPageCardTitle">
                        <h6>Product Name</h6>
                        <div
                          className={`wishlistBtn ${isLiked ? 'savedProduct' : ''}`}
                          onClick={() => setIsLiked((prev) => !prev)}
                        >
                          <BsFillHeartFill />
                        </div>
                      </div>
                      <h6 className="itemPrice">₹500</h6>
                      <button className="themeBtn addToBtn">Add to Cart</button>
                    </div>
                  </div>
                  <div className="productPageCard">
                    <div className="productPageImg">
                      <img src={DummyImg} alt="Product" />
                    </div>
                    <div className="productPageCardData">
                      <div className="productPageCardTitle">
                        <h6>Product Name</h6>
                        <div
                          className={`wishlistBtn ${isLiked ? 'savedProduct' : ''}`}
                          onClick={() => setIsLiked((prev) => !prev)}
                        >
                          <BsFillHeartFill />
                        </div>
                      </div>
                      <h6 className="itemPrice">₹500</h6>
                      <button className="themeBtn addToBtn">Add to Cart</button>
                    </div>
                  </div>
                  <div className="productPageCard">
                    <div className="productPageImg">
                      <img src={DummyImg} alt="Product" />
                    </div>
                    <div className="productPageCardData">
                      <div className="productPageCardTitle">
                        <h6>Product Name</h6>
                        <div
                          className={`wishlistBtn ${isLiked ? 'savedProduct' : ''}`}
                          onClick={() => setIsLiked((prev) => !prev)}
                        >
                          <BsFillHeartFill />
                        </div>
                      </div>
                      <h6 className="itemPrice">₹500</h6>
                      <button className="themeBtn addToBtn">Add to Cart</button>
                    </div>
                  </div>
                  <div className="productPageCard">
                    <div className="productPageImg">
                      <img src={DummyImg} alt="Product" />
                    </div>
                    <div className="productPageCardData">
                      <div className="productPageCardTitle">
                        <h6>Product Name</h6>
                        <div
                          className={`wishlistBtn ${isLiked ? 'savedProduct' : ''}`}
                          onClick={() => setIsLiked((prev) => !prev)}
                        >
                          <BsFillHeartFill />
                        </div>
                      </div>
                      <h6 className="itemPrice">₹500</h6>
                      <button className="themeBtn addToBtn">Add to Cart</button>
                    </div>
                  </div>
                  <div className="productPageCard">
                    <div className="productPageImg">
                      <img src={DummyImg} alt="Product" />
                    </div>
                    <div className="productPageCardData">
                      <div className="productPageCardTitle">
                        <h6>Product Name</h6>
                        <div
                          className={`wishlistBtn ${isLiked ? 'savedProduct' : ''}`}
                          onClick={() => setIsLiked((prev) => !prev)}
                        >
                          <BsFillHeartFill />
                        </div>
                      </div>
                      <h6 className="itemPrice">₹500</h6>
                      <button className="themeBtn addToBtn">Add to Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`supportUserChatModal ${closeUserChatModal ? 'd-none' : 'd-block'}`}>
          <div className="supportModalHeader">
            <div className=" d-flex gap-3 align-items center">
              <img className="chatHeaderProfileDiv" src={DummyImg} alt="dummy.png" />
              <p className="supportChatName">Seller ABC</p>
            </div>
            <div onClick={() => setCloseUserChatModal((prev) => !prev)}>
              <RxCross2 />
            </div>
          </div>
          <div className="supportChatSectionDiv">
            <div className="sellerChatArea">
              <div className="receiveMsgDiv">
                <h6 className="receiveMsg">Hey there! 👋</h6>
                <p className="receiveMsgTime">10:10</p>
              </div>
              <div className="receiveMsgDiv">
                <h6 className="receiveMsg">
                  This is your delivery driver from Speedy Chow. I'm just around the corner from
                  your place. 😊
                </h6>
                <p className="receiveMsgTime">10:10</p>
              </div>
              <div className="sendMsgDiv">
                <h6 className="sendMsg">Hii</h6>
                <p className="sendMsgTime">10:10</p>
              </div>
              <div className="sendMsgDiv">
                <h6 className="sendMsg">
                  Awesome, thanks for letting me know ! <br /> Can't wait for my delivery. 🎉
                </h6>
                <p className="sendMsgTime">10:11</p>
              </div>
              <div className="receiveMsgDiv">
                <h6 className="receiveMsg">
                  No problem at all! I'll be there in about 15 minutes.
                </h6>
                <p className="receiveMsgTime">10:11</p>
              </div>
              <div className="sendMsgDiv">
                <h6 className="sendMsg">Great! 😊</h6>
                <p className="sendMsgTime">10:12</p>
              </div>
            </div>
            <div className="supportChatInputBar">
              <input className="chatInput" type="text" placeholder="Ask anything..." />
              <img src={SentImg} alt="sent.png" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SellerDetailPage
