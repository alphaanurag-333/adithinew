import { useState } from 'react'
import { LuSearch } from 'react-icons/lu'
import { GoLocation } from 'react-icons/go'



import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

function SellerPage() {
  const [selected, setSelected] = useState({})
  const navigate = useNavigate()
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

  const toggleCategory = (label) => {
    setSelected((prev) => ({
      ...prev,
      [label]: !prev[label],
    }))
  }

  return (
    <section className="productSection container">
      <div className="row">
        <div className="col-12 pr-0 col-lg-3">
          <div className="productSidebar">
            <div className="categoryFilter border-0">
              <h6 className="filterTitle">CATEGORY</h6>

              {categories.map((category) => (
                <div key={category} className="filterTab">
                  <label className="customCheckbox">
                    <input
                      type="checkbox"
                      checked={!!selected[category]}
                      onChange={() => toggleCategory(category)}
                    />
                    <span className="checkmark"></span>
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-9">
          <div className="productContainer">
            <div className="prdouctPageHeader">
              <div className="productSearchBar">
                <input
                  className="productSearchInput"
                  type="search"
                  name=""
                  placeholder="Search for anything..."
                />
                <LuSearch />
              </div>
              <div className="prdouctSelectDiv">
                <label className="selectLable" htmlFor="productSelect">
                  Sort by:{' '}
                </label>
                <select className="productSelect" name="" id="productSelect">
                  <option value="" selected>
                    Nearby
                  </option>
                  <option value="">Most Popular</option>
                </select>
              </div>
            </div>
            <div className="activeFilterDiv">
              <div className="filterTagsDiv">
                <label>Active Filters :</label>
              </div>
              <div className="filterCounts">
                65,867
                <span>Results found.</span>
              </div>
            </div>
            <div className="row sellersDiv">
              <div className="productPageCard">
                <div className="productPageImg ">
                  <img src={DummyImg} alt="Product" />
                </div>
                <div className="productPageCardData">
                  <div className="productPageCardTitle">
                    <h6 className="sellerName">Seller ABC</h6>
                  </div>
                  <div className="sellerAddressDiv">
                    <GoLocation />
                    <h6 className="sellerAddress"> 123 Colony, abc area Indore..</h6>
                  </div>
                  <p className="sellerProducts">
                    Business Card, Posters, Flyers, Wedding Invitation, Bill Books..
                  </p>
                  <NavLink to={'/seller-details'}>
                    <button className="themeBtn addToBtn">View details</button>
                  </NavLink>
                </div>
              </div>
              <div className="productPageCard">
                <div className="productPageImg ">
                  <img src={DummyImg2} alt="Product" />
                </div>
                <div className="productPageCardData">
                  <div className="productPageCardTitle">
                    <h6 className="sellerName">Seller ABC</h6>
                  </div>
                  <div className="sellerAddressDiv">
                    <GoLocation />
                    <h6 className="sellerAddress"> 123 Colony, abc area Indore..</h6>
                  </div>
                  <p className="sellerProducts">
                    Business Card, Posters, Flyers, Wedding Invitation, Bill Books..
                  </p>
                  <NavLink to={'/seller-details'}>
                    <button className="themeBtn addToBtn">View details</button>
                  </NavLink>
                </div>
              </div>
              <div className="productPageCard">
                <div className="productPageImg ">
                  <img src={DummyImg3} alt="Product" />
                </div>
                <div className="productPageCardData">
                  <div className="productPageCardTitle">
                    <h6 className="sellerName">Seller ABC</h6>
                  </div>
                  <div className="sellerAddressDiv">
                    <GoLocation />
                    <h6 className="sellerAddress"> 123 Colony, abc area Indore..</h6>
                  </div>
                  <p className="sellerProducts">
                    Business Card, Posters, Flyers, Wedding Invitation, Bill Books..
                  </p>
                  <NavLink to={'/seller-details'}>
                    <button className="themeBtn addToBtn">View details</button>
                  </NavLink>
                </div>
              </div>
              <div className="productPageCard">
                <div className="productPageImg ">
                  <img src={DummyImg4} alt="Product" />
                </div>
                <div className="productPageCardData">
                  <div className="productPageCardTitle">
                    <h6 className="sellerName">Seller ABC</h6>
                  </div>
                  <div className="sellerAddressDiv">
                    <GoLocation />
                    <h6 className="sellerAddress"> 123 Colony, abc area Indore..</h6>
                  </div>
                  <p className="sellerProducts">
                    Business Card, Posters, Flyers, Wedding Invitation, Bill Books..
                  </p>
                  <NavLink to={'/seller-details'}>
                    <button className="themeBtn addToBtn">View details</button>
                  </NavLink>
                </div>
              </div>
              <div className="productPageCard">
                <div className="productPageImg ">
                  <img src={DummyImg} alt="Product" />
                </div>
                <div className="productPageCardData">
                  <div className="productPageCardTitle">
                    <h6 className="sellerName">Seller ABC</h6>
                  </div>
                  <div className="sellerAddressDiv">
                    <GoLocation />
                    <h6 className="sellerAddress"> 123 Colony, abc area Indore..</h6>
                  </div>
                  <p className="sellerProducts">
                    Business Card, Posters, Flyers, Wedding Invitation, Bill Books..
                  </p>
                  <NavLink to={'/seller-details'}>
                    <button className="themeBtn addToBtn">View details</button>
                  </NavLink>
                </div>
              </div>
              <div className="productPageCard">
                <div className="productPageImg ">
                  <img src={DummyImg2} alt="Product" />
                </div>
                <div className="productPageCardData">
                  <div className="productPageCardTitle">
                    <h6 className="sellerName">Seller ABC</h6>
                  </div>
                  <div className="sellerAddressDiv">
                    <GoLocation />
                    <h6 className="sellerAddress"> 123 Colony, abc area Indore..</h6>
                  </div>
                  <p className="sellerProducts">
                    Business Card, Posters, Flyers, Wedding Invitation, Bill Books..
                  </p>
                  <NavLink to={'/seller-details'}>
                    <button className="themeBtn addToBtn">View details</button>
                  </NavLink>
                </div>
              </div>
              <div className="productPageCard">
                <div className="productPageImg ">
                  <img src={DummyImg3} alt="Product" />
                </div>
                <div className="productPageCardData">
                  <div className="productPageCardTitle">
                    <h6 className="sellerName">Seller ABC</h6>
                  </div>
                  <div className="sellerAddressDiv">
                    <GoLocation />
                    <h6 className="sellerAddress"> 123 Colony, abc area Indore..</h6>
                  </div>
                  <p className="sellerProducts">
                    Business Card, Posters, Flyers, Wedding Invitation, Bill Books..
                  </p>
                  <NavLink to={'/seller-details'}>
                    <button className="themeBtn addToBtn">View details</button>
                  </NavLink>
                </div>
              </div>
              <div className="productPageCard">
                <div className="productPageImg ">
                  <img src={DummyImg4} alt="Product" />
                </div>
                <div className="productPageCardData">
                  <div className="productPageCardTitle">
                    <h6 className="sellerName">Seller ABC</h6>
                  </div>
                  <div className="sellerAddressDiv">
                    <GoLocation />
                    <h6 className="sellerAddress"> 123 Colony, abc area Indore..</h6>
                  </div>
                  <p className="sellerProducts">
                    Business Card, Posters, Flyers, Wedding Invitation, Bill Books..
                  </p>
                  <NavLink to={'/seller-details'}>
                    <button className="themeBtn addToBtn">View details</button>
                  </NavLink>
                </div>
              </div>
              <div className="productPageCard">
                <div className="productPageImg ">
                  <img src={DummyImg} alt="Product" />
                </div>
                <div className="productPageCardData">
                  <div className="productPageCardTitle">
                    <h6 className="sellerName">Seller ABC</h6>
                  </div>
                  <div className="sellerAddressDiv">
                    <GoLocation />
                    <h6 className="sellerAddress"> 123 Colony, abc area Indore..</h6>
                  </div>
                  <p className="sellerProducts">
                    Business Card, Posters, Flyers, Wedding Invitation, Bill Books..
                  </p>
                  <NavLink to={'/seller-details'}>
                    <button className="themeBtn addToBtn">View details</button>
                  </NavLink>
                </div>
              </div>
              <div className="productPageCard">
                <div className="productPageImg ">
                  <img src={DummyImg2} alt="Product" />
                </div>
                <div className="productPageCardData">
                  <div className="productPageCardTitle">
                    <h6 className="sellerName">Seller ABC</h6>
                  </div>
                  <div className="sellerAddressDiv">
                    <GoLocation />
                    <h6 className="sellerAddress"> 123 Colony, abc area Indore..</h6>
                  </div>
                  <p className="sellerProducts">
                    Business Card, Posters, Flyers, Wedding Invitation, Bill Books..
                  </p>
                  <NavLink to={'/seller-details'}>
                    <button className="themeBtn addToBtn">View details</button>
                  </NavLink>
                </div>
              </div>
              <div className="productPageCard">
                <div className="productPageImg ">
                  <img src={DummyImg3} alt="Product" />
                </div>
                <div className="productPageCardData">
                  <div className="productPageCardTitle">
                    <h6 className="sellerName">Seller ABC</h6>
                  </div>
                  <div className="sellerAddressDiv">
                    <GoLocation />
                    <h6 className="sellerAddress"> 123 Colony, abc area Indore..</h6>
                  </div>
                  <p className="sellerProducts">
                    Business Card, Posters, Flyers, Wedding Invitation, Bill Books..
                  </p>
                  <NavLink to={'/seller-details'}>
                    <button className="themeBtn addToBtn">View details</button>
                  </NavLink>
                </div>
              </div>
              <div className="productPageCard">
                <div className="productPageImg ">
                  <img src={DummyImg4} alt="Product" />
                </div>
                <div className="productPageCardData">
                  <div className="productPageCardTitle">
                    <h6 className="sellerName">Seller ABC</h6>
                  </div>
                  <div className="sellerAddressDiv">
                    <GoLocation />
                    <h6 className="sellerAddress"> 123 Colony, abc area Indore..</h6>
                  </div>
                  <p className="sellerProducts">
                    Business Card, Posters, Flyers, Wedding Invitation, Bill Books..
                  </p>
                  <NavLink to={'/seller-details'}>
                    <button className="themeBtn addToBtn">View details</button>
                  </NavLink>
                </div>
              </div>
              <div className="productPageCard">
                <div className="productPageImg ">
                  <img src={DummyImg} alt="Product" />
                </div>
                <div className="productPageCardData">
                  <div className="productPageCardTitle">
                    <h6 className="sellerName">Seller ABC</h6>
                  </div>
                  <div className="sellerAddressDiv">
                    <GoLocation />
                    <h6 className="sellerAddress"> 123 Colony, abc area Indore..</h6>
                  </div>
                  <p className="sellerProducts">
                    Business Card, Posters, Flyers, Wedding Invitation, Bill Books..
                  </p>
                  <NavLink to={'/seller-details'}>
                    <button className="themeBtn addToBtn">View details</button>
                  </NavLink>
                </div>
              </div>
              <div className="productPageCard">
                <div className="productPageImg ">
                  <img src={DummyImg2} alt="Product" />
                </div>
                <div className="productPageCardData">
                  <div className="productPageCardTitle">
                    <h6 className="sellerName">Seller ABC</h6>
                  </div>
                  <div className="sellerAddressDiv">
                    <GoLocation />
                    <h6 className="sellerAddress"> 123 Colony, abc area Indore..</h6>
                  </div>
                  <p className="sellerProducts">
                    Business Card, Posters, Flyers, Wedding Invitation, Bill Books..
                  </p>
                  <NavLink to={'/seller-details'}>
                    <button className="themeBtn addToBtn">View details</button>
                  </NavLink>
                </div>
              </div>
              <div className="productPageCard">
                <div className="productPageImg ">
                  <img src={DummyImg3} alt="Product" />
                </div>
                <div className="productPageCardData">
                  <div className="productPageCardTitle">
                    <h6 className="sellerName">Seller ABC</h6>
                  </div>
                  <div className="sellerAddressDiv">
                    <GoLocation />
                    <h6 className="sellerAddress"> 123 Colony, abc area Indore..</h6>
                  </div>
                  <p className="sellerProducts">
                    Business Card, Posters, Flyers, Wedding Invitation, Bill Books..
                  </p>
                  <NavLink to={'/seller-details'}>
                    <button className="themeBtn addToBtn">View details</button>
                  </NavLink>
                </div>
              </div>
              <div className="productPageCard">
                <div className="productPageImg ">
                  <img src={DummyImg4} alt="Product" />
                </div>
                <div className="productPageCardData">
                  <div className="productPageCardTitle">
                    <h6 className="sellerName">Seller ABC</h6>
                  </div>
                  <div className="sellerAddressDiv">
                    <GoLocation />
                    <h6 className="sellerAddress"> 123 Colony, abc area Indore..</h6>
                  </div>
                  <p className="sellerProducts">
                    Business Card, Posters, Flyers, Wedding Invitation, Bill Books..
                  </p>

                  <NavLink to={'/seller-details'}>
                    <button className="themeBtn addToBtn">View details</button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SellerPage
