import React, { useEffect, useState } from 'react';
import { GoLocation } from 'react-icons/go';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../../api';
import { Spinner } from 'react-bootstrap';
import '../Components/foodsdetails.css';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
const Fooddetails = () => {
  const { user, userToken } = useSelector((state) => state.auth)
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [vendor, setVendor] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  // ✅ FETCH DATA
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);

        const res = await API.get(`/food/vendor/${id}`);

        if (res?.data?.status === 'success') {
          const data = res.data.data;

          setVendor(data.vendor);
          setMenuItems(data.menu_items);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  // ⭐ STAR FUNCTION
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => {
      if (i < Math.floor(rating)) {
        return <BsStarFill key={i} className="text-warning" />;
      } else if (i < rating) {
        return <BsStarHalf key={i} className="text-warning" />;
      } else {
        return <BsStar key={i} className="text-warning" />;
      }
    });
  };

  // ⏳ LOADING
  if (loading) {
    return  <div className="text-center py-5">
                              <Spinner variant="primary" className='color'/>
                            </div>;
  }

  const Addedtocart = async (id) => {
    try {
  const data = {
    
      "id": id,
      "quantity": "1"
    }
  
      const res = await API.post(`/cart/add`, 
       
        data,{
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      Swal.fire({
        icon: 'success',
        title: `${res.data.message}`,
        timer: 1500,
        showConfirmButton: false
      });
  
    } catch (error) {
  
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong'
      });
  
      console.log(error);
    }
  };
  return (
    <section className="food-details-page mt-3 mt-md-4">
      <div className="food-details-shell">
        {/* ================= VENDOR INFO ================= */}
        <div className='food-vendor-card mb-4'>
          <div>
            <h2 className="food-vendor-title mb-1">{vendor?.name}</h2>

            <div className="locationRow mb-1 food-vendor-location">
              <GoLocation className="locationIcon me-2" />
              <span className="text-muted">
                {vendor?.shop_location}
              </span>
            </div>

            <div className="d-flex align-items-center food-vendor-rating">
              {renderStars(4)} {/* API me rating 0 hai abhi */}
              <span className="ms-1">(4)</span>
            </div>
          </div>

          <div className="food-vendor-actions d-flex flex-column flex-sm-row gap-2">
            <button
              onClick={() => navigate("/cart-list")}
              className="themeBtn food-vendor-action-btn"
              type="button"
            >
              <i className="bi bi-cart me-1"></i> Cart List
            </button>

            <button
              onClick={() => navigate(-1)}
              className="themeBtn food-vendor-action-btn"
              type="button"
            >
              Back
            </button>
          </div>
        </div>

        {/* ================= MENU ITEMS ================= */}
        <div className="food-menu-head">
          <h4>Popular Dishes</h4>
          <span>{menuItems.length} items available</span>
        </div>
        <div className="row g-3 food-menu-grid">
          {menuItems.map((item) => (
            <div key={item.id} className="col-12 col-lg-6">
              <article className="card foodCard food-list-card p-2 rounded-3">
                <div className="position-relative mb-0 imageWrapper">
                  <img
                    src={item.featured_image || "https://via.placeholder.com/300"}
                    alt={item.name}
                    className="foodImg"
                    onError={(e) => {
                      e.target.onerror = null; // infinite loop avoid
                      e.target.src = "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-blank-avatar-modern-vector-png-image_40962406.jpg";
                    }}
                  />

                  <span className={`badgeType ${item.is_veg ? 'veg' : 'nonveg'}`}>
                    {item.is_veg ? 'Veg' : 'Non-Veg'}
                  </span>
                </div>

                <div className="food-card-content">
                  <h6 className="fw-semibold mb-1 food-item-title">{item.name}</h6>

                  <p className="small text-muted mb-2 food-item-category">
                    {item.category_name || 'Food Item'}
                  </p>

                  <div className="d-flex justify-content-between align-items-center mb-2 food-item-meta">
                    <h6 className="mb-0">
                      <strong className='food-item-price'>₹{item.price}</strong>
                    </h6>

                    <div className="d-flex align-items-center small food-item-rating">
                      {renderStars(item.rating || 0)}
                      <span className="ms-1 rating">{item.rating || 0}</span>
                    </div>
                  </div>

                  <button
                   onClick={() => Addedtocart(item.id)}
                    type="button"
                    className="btn whatsappBtn w-100"
                  >
                    <i className="bi bi-cart me-1"></i> Add to Cart
                  </button>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Fooddetails;
