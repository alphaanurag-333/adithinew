import { FaArrowRight } from 'react-icons/fa6'
import API from '../../../api'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

function OrderHistory({ setActiveTab }) {

  const { userToken } = useSelector((state) => state.auth)

  const [enquiries, setEnquiries] = useState({
    vehicle_enquiries: [],
    hotel_enquiries: [],
    food_enquiries: [],
  })

  const [activeHistoryTab, setActiveHistoryTab] = useState('vehicle')
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    const fetchEnquiries = async () => {

      try {

        setLoading(true)
        const response = await API.get('/customer/enquiries', {
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Accept': 'application/json',
          },
        })

        setEnquiries(response?.data?.data)

      } catch (error) {

        console.error(error)

      } finally {

        setLoading(false)

      }
    }

    if (userToken) {
      fetchEnquiries()
    }

  }, [userToken])

  return (

    <section className="orderHistorySection customTabBorder">

      <h6 className="profileTabTitle colortex">
        ENQUIRY / BOOKING HISTORY
      </h6>

      {/* Tabs */}

      <div className="historyTabs">

        <button
          className={activeHistoryTab === 'vehicle' ? 'active' : ''}
          onClick={() => setActiveHistoryTab('vehicle')}
        >
          Rides
        </button>

        <button
          className={activeHistoryTab === 'hotel' ? 'active' : ''}
          onClick={() => setActiveHistoryTab('hotel')}
        >
          Homestays
        </button>

        <button
          className={activeHistoryTab === 'food' ? 'active' : ''}
          onClick={() => setActiveHistoryTab('food')}
        >
          Food
        </button>

      </div>

      <div className="orderHistoryTable">

        <div className="table-responsive">

          <table className="table">

            <thead className="orderTableHeader">

              <tr>
                <th>ENQUIRY ID</th>
                <th>NAME</th>
                <th>STATUS</th>
                <th>ENQUIRY DATE</th>
                <th>TOTAL</th>
                <th>ACTION</th>
              </tr>

            </thead>

            <tbody className="orderTableBody">

              {/* VEHICLE */}

              {activeHistoryTab === 'vehicle' && (

                enquiries?.vehicle_enquiries?.length > 0 ? (

                  enquiries.vehicle_enquiries.map((item) => (

                    <tr key={item.id}>

                      <td>
                        <b>#{item.id}</b>
                      </td>

                      <td className='text-capitalize'>
                        {item?.vehicle?.vehicle_name}
                        <br/>
                        {item?.vehicle?.registration_number}
                      </td>

                      <td>
                        <span className={`statusBadge ${item.status}`}>
                          {item.status}
                        </span>
                      </td>

                      <td>
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>

                      <td>
                        {item.number_of_passengers} Passenger
                      </td>

                      <td className="orderTabAction">

                        <button
                          className="viewDetailBtn"
                          onClick={() => setActiveTab('viewDetail')}
                        >
                          View Details <FaArrowRight />
                        </button>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No Vehicle Enquiries Found
                    </td>
                  </tr>

                )

              )}

              {/* HOTEL */}

              {activeHistoryTab === 'hotel' && (

                enquiries?.hotel_enquiries?.length > 0 ? (

                  enquiries.hotel_enquiries.map((item) => (

                    <tr key={item.id}>

                      <td>
                        <b>#{item.id}</b>
                      </td>

                      <td className='text-capitalize'>
                        {item?.property?.property_name}
                      </td>

                      <td>
                        <span className={`statusBadge ${item.status}`}>
                          {item.status}
                        </span>
                      </td>

                      <td>
                        {new Date(item.check_in_date).toLocaleDateString()}
                      </td>

                      <td>
                        {item.number_of_guests} Guests
                      </td>

                      <td className="orderTabAction">

                        <button
                          className="viewDetailBtn"
                          onClick={() => setActiveTab('viewDetail')}
                        >
                          View Details <FaArrowRight />
                        </button>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No Hotel Enquiries Found
                    </td>
                  </tr>

                )

              )}

              {/* FOOD */}

              {activeHistoryTab === 'food' && (

                enquiries?.food_enquiries?.length > 0 ? (

                  enquiries.food_enquiries.map((item) => (

                    <tr key={item.id}>

                      <td>
                        <b>#{item.id}</b>
                      </td>

                      <td className='text-capitalize'>
                        {item?.food_name || 'Food Order'}
                      </td>

                      <td>
                        <span className={`statusBadge ${item.status}`}>
                          {item.status}
                        </span>
                      </td>

                      <td>
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>

                      <td>
                        ₹{item.total || 0}
                      </td>

                      <td className="orderTabAction">

                        <button
                          className="viewDetailBtn"
                          onClick={() => setActiveTab('viewDetail')}
                        >
                          View Details <FaArrowRight />
                        </button>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No Food Enquiries Found
                    </td>
                  </tr>

                )

              )}

            </tbody>

          </table>

        </div>

      </div>

    </section>
  )
}

export default OrderHistory