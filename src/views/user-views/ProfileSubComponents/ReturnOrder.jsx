import { FaArrowRight } from 'react-icons/fa6'

function ReturnOrder() {
  return (
    <section className="orderHistorySection customTabBorder">
      <h6 className="profileTabTitle">RETURN HISTORY</h6>
      <div className="orderHistoryTable">
        <table className="table">
          <thead className="orderTableHeader">
            <tr>
              <th scope="col">ORDER ID</th>
              <th scope="col">STATUS</th>
              <th scope="col">DATE</th>
              <th scope="col">TOTAL</th>
              <th scope="col">ACTION</th>
            </tr>
          </thead>
          <tbody className="orderTableBody ">
            <tr>
              <td>
                <b>#96459761</b>
              </td>
              <td className="progressTab">IN PROGRESS</td>
              <td>Dec 30, 2019 07:52</td>
              <td>₹80</td>
              <td className="orderTabAction">
                View Details <FaArrowRight />
              </td>
            </tr>
            <tr>
              <td>
                <b>#123456</b>
              </td>
              <td className="completeTab">COMPLETED</td>
              <td>Dec 7, 2019 23:26</td>
              <td>₹70</td>
              <td className="orderTabAction">
                View Details <FaArrowRight />
              </td>
            </tr>
            <tr>
              <td>
                <b>#123456</b>
              </td>
              <td className="cancelledTab">CANCELED</td>
              <td>Dec 7, 2019 23:26</td>
              <td>₹2,300</td>
              <td className="orderTabAction">
                View Details <FaArrowRight />
              </td>
            </tr>
            <tr>
              <td>
                <b>#123456</b>
              </td>
              <td className="completeTab">COMPLETED</td>
              <td>Feb 2, 2019 19:28</td>
              <td>₹250</td>
              <td className="orderTabAction">
                View Details <FaArrowRight />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default ReturnOrder
