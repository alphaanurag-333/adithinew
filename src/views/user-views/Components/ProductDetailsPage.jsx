import { useEffect, useState } from 'react'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import { GoLocation } from 'react-icons/go'
import { FaArrowRight } from 'react-icons/fa6'
import { BsFillHeartFill } from 'react-icons/bs'
import { RiSubtractFill, RiAddFill } from 'react-icons/ri'




import API from '../../../api'
import { useSelector } from 'react-redux'
import MEDIA_URL from '../../../media'
import Products from '../ProductsDisplay'

function ProductDetailsPage() {
  const productImages = [DummyImg, DummyImg2, DummyImg3, DummyImg4, DummyImg5, DummyImg6]
  //const [selectedImage, setSelectedImage] = useState(productImages[0])
  const [isLiked, setIsLiked] = useState(false)
  const [productQuantity, setProductQuantity] = useState(1)

  const { userToken } = useSelector((state) => state.auth)
  const location = useLocation()
  // const id = location.state?.id
  const { id } = useParams()
  const [products, setProducts] = useState([])
  const [selectedImage, setSelectedImage] = useState('')
const quantityInc = ()=>{
  setProductQuantity(productQuantity+1)
}
const quantityDec = ()=>{
   if (productQuantity > 1) {
    setProductQuantity(productQuantity - 1);
  }

}
  // useEffect(() => {
  //   if (products?.thumbnail) {
  //     setSelectedImage(products?.thumbnail)
  //   }
  // }, [id])
useEffect(() => {
  if (!products) return;


  if (products?.thumbnail) {
    setSelectedImage(products?.thumbnail);
  }

  else if (products?.images?.length > 0) {
    setSelectedImage(products?.images[0]);
  }

  else {
    setSelectedImage(null);
  }

}, [products]);

  useEffect(() => {
    if (!id) return

    API.get(`/user/misc/products`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }).then((res) => {
      const allProducts = res.data.data || []

      const foundProduct = allProducts.find((item) => item._id === id)

      setProducts(foundProduct)
    })
  }, [id])

  return (
    <section className="container productDetailSection">
      <div className="row m-0">
        {/* <div className="col-md-6 productDetailLeftDiv">
          <div className="productMainImgDiv">
            <img src={selectedImage} className="" alt="Product" />
          </div>

          <div className="row g-2 productImgThumbnailsDiv">
            {products?.images?.map((img, index) => (
              <div className="col-3 col-md-2" key={index}>
                <div
                  className={`thumbnailDiv ${selectedImage === img ? 'gradientBorder' : ''}`}
                  onClick={() => setSelectedImage(img)}
                >
                  <img src={`${MEDIA_URL}${img}`} className="thumbnailImg" alt="Thumbnail" />
                </div>
              </div>
            ))}
          </div>
        </div> */}
        <div className="col-md-6 productDetailLeftDiv mb-2">
          <div className="productMainImgDiv">
            <img src={`${MEDIA_URL}${selectedImage}`} className="img-fluid" alt="Product" />
          </div>

          {/* <div className="row g-2 productImgThumbnailsDiv mt-2"> */}
            {/* {products?.thumbnail && (
              <div className="col-3 col-md-2">
                <div
                  className={`thumbnailDiv ${
                    selectedImage === products?.thumbnail ? 'gradientBorder' : ''
                  }`}
                  onClick={() => setSelectedImage(products?.thumbnail)}
                >
                  <img
                    src={`${MEDIA_URL}${products?.thumbnail}`}
                    className="thumbnailImg img-fluid"
                    alt="Thumbnail"
                  />
                </div>
              </div>
            )} */}

            {/* {products?.images?.map((img, index) => (
              <div className="col-3 col-md-2" key={index}>
                <div
                  className={`thumbnailDiv ${selectedImage === img ? 'gradientBorder' : ''}`}
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={`${MEDIA_URL}${img}`}
                    className="thumbnailImg img-fluid"
                    alt="Thumbnail"
                  />
                </div>
              </div>
            ))}
          </div> */}
       <div
  className="productImgThumbnailsDiv mt-2"
  style={{
    display: "flex",
    gap: "10px",
    overflowX: "auto",
    whiteSpace: "nowrap",
  }}
>
  {products?.images?.map((img, index) => (
    <div
      key={index}
      onClick={() => setSelectedImage(img)}
      style={{
        minWidth: "80px",
        flex: "0 0 auto",
        cursor: "pointer", marginBottom:'10px'
      }}
    >
      <div
        className={`thumbnailDiv ${
          selectedImage === img ? "gradientBorder" : ""
        }`}
      >
        <img
          src={`${MEDIA_URL}${img}`}
          alt="Thumbnail"
          style={{
            width: "100%",
            height: "70px",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  ))}
</div>
        </div>

        <div className="col-md-6 productDetailRightDiv">
          <div className="productInfoDiv">
            <h6 className="productName">{products?.name}</h6>
            <div className="sellerAddressDiv">
              <GoLocation />
              <h6 className="sellersDetailsAddress mt-0">
                123 Colony, abc area, near South Tukoganj, Indore M.P 452010
              </h6>
            </div>
            <div className="productSubSectionDiv">
              <div className="col-6 productShopName">
                <label>Shop Name: </label>
                <p>ABC Shop Name</p>
              </div>
              <div className="col-6 productAvailability">
                <label>Availability: </label>
                <p>In Stock</p>
              </div>
              <div className="col-6 productVariety">
                <label>Color: </label>
                <p>Dark Blue, Golden</p>
              </div>
              <div className="col-6 productCategory">
                <label>Category: </label>
                <p>Visiting Card</p>
              </div>
            </div>
            <div className="productPricingDiv">
              <h6 className="productPrice">
                ₹{products?.variants?.[0]?.b2c_mrp} <span className="productLastPrice">₹1000.00</span>
                <span className="productPriceOffer">
                  {products?.discountType === 'percentage'
                    ? `${products?.discount}% OFF`
                    : `₹${products?.discount} OFF`}
                </span>
              </h6>
              <p className="productShippingCharge">
                <span>+</span>₹ 50 Shipping Charges
              </p>
            </div>
            <div className="productSelectDiv">
              <label htmlFor="productSize">Size</label>
              <div className="customSelectSizeDiv col-md-8 col-12">
                <select className="sizeSelect" id="productSize">
                  <option selected value="">
                    Select Size
                  </option>
                  <option value="">3.5-inches x 2 inches</option>
                </select>
              </div>
            </div>
            <div className="productActionBtnDiv row align-items-center g-2">

  {/* Quantity */}
  <div className="productQuantityUpdateBtn col-12 col-md-3 d-flex  quanitiy">
    <button onClick={quantityDec}>
      <RiSubtractFill />
    </button>

    <h6 className="productQuantityCount mx-2">{productQuantity}</h6>

    <button onClick={quantityInc}>
      <RiAddFill />
    </button>
  </div>

  {/* Add to Cart */}
  <div className="productAddToCartBtn col-12 col-md-6 text-center">
    <button className="themeBtn addToBtn w-100">
      Add to Cart
    </button>
  </div>

  {/* Buy Now */}
  <div className="productBuyNowBtn col-12 col-md-3 text-center">
    <button className="w-100">
      <span>BUY NOW</span>
    </button>
  </div>

</div>
            {/* <div className="productActionBtnDiv">
              <div className="productQuantityUpdateBtn col-3">
                <button>
                  <RiSubtractFill />
                </button>
                <h6 className="productQuantityCount">{productQuantity}</h6>
                <button>
                  <RiAddFill />
                </button>
              </div>
              <div className="productAddToCartBtn col-6">
                <button className="themeBtn addToBtn">Add to Cart</button>
              </div>
              <div className="productBuyNowBtn col-3">
                <button>
                  <span>BUY NOW</span>
                </button>
              </div>
            </div> */}
            <div className="productDescriptionDiv">
              <h6 className="descriptionTitle">Description</h6>
              <p className="descriptionText">{products?.longDescription} </p>
            </div>
          </div>
        </div>
      </div>
      <div className="productSuggestionDiv pb-0">
        <div className="bestByOptionDiv">
          <div className="sellerProductsHeader padg">
            <div className="filterTitle">Best Buy Options</div>
            <div className="browseproducts">
              Browse All Products <FaArrowRight />
            </div>
          </div>

          <div className="row m-0 productpageItem">

            <div className="suggesionProductCard mb-2">
              <NavLink to={'/product-details'}>
                <div className="productPageImg">
                  <img src={SuggestionImg} alt="Product" />
                </div>
              </NavLink>
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
            <div className="suggesionProductCard mb-2">
              <NavLink to={'/product-details'}>
                <div className="productPageImg">
                  <img src={SuggestionImg} alt="Product" />
                </div>
              </NavLink>
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
            <div className="suggesionProductCard mb-2">
              <NavLink to={'/product-details'}>
                <div className="productPageImg">
                  <img src={SuggestionImg} alt="Product" />
                </div>
              </NavLink>
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
            <div className="suggesionProductCard mb-2">
              <NavLink to={'/product-details'}>
                <div className="productPageImg">
                  <img src={SuggestionImg} alt="Product" />
                </div>
              </NavLink>
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
            <div className="suggesionProductCard mb-2">
              <NavLink to={'/product-details'}>
                <div className="productPageImg">
                  <img src={SuggestionImg} alt="Product" />
                </div>
              </NavLink>
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
        <div className="relatedProductDiv">
          <div className="sellerProductsHeader padg">
            <div className="filterTitle">RELATED PRODUCT</div>
            <div className="browseproducts">
              Browse All Products <FaArrowRight />
            </div>
          </div>
          <div className="row m-0 productpageItem">
            <div className="suggesionProductCard mb-2">
              <NavLink to={'/product-details'}>
                <div className="productPageImg">
                  <img src={SuggestionImg} alt="Product" />
                </div>
              </NavLink>
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
            <div className="suggesionProductCard mb-2">
              <NavLink to={'/product-details'}>
                <div className="productPageImg">
                  <img src={SuggestionImg} alt="Product" />
                </div>
              </NavLink>
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
            <div className="suggesionProductCard mb-2">
              <NavLink to={'/product-details'}>
                <div className="productPageImg">
                  <img src={SuggestionImg} alt="Product" />
                </div>
              </NavLink>
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
            <div className="suggesionProductCard mb-2">
              <NavLink to={'/product-details'}>
                <div className="productPageImg">
                  <img src={SuggestionImg} alt="Product" />
                </div>
              </NavLink>
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
            <div className="suggesionProductCard mb-2">
              <NavLink to={'/product-details'}>
                <div className="productPageImg">
                  <img src={SuggestionImg} alt="Product" />
                </div>
              </NavLink>
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
    </section>
  )
}

export default ProductDetailsPage
