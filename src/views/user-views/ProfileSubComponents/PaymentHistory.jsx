import React from 'react'

function PaymentHistory() {
  return (
    <section className="orderHistorySection customTabBorder">
      <h6 className="profileTabTitle">PAYMENT HISTORY</h6>
      <div className="orderHistoryTable">
        <table className="table">
          <thead className="orderTableHeader">
            <tr>
              <th scope="col">ORDER ID</th>
              <th scope="col">PRODUCT NAME</th>
              <th scope="col">AMOUNT</th>
              <th scope="col">TNX ID</th>
              <th scope="col">DATE/TIME</th>
              <th scope="col">STATUS</th>
            </tr>
          </thead>
          <tbody className="orderTableBody ">
            <tr>
              <td>
                <b>#96459761</b>
              </td>
              <td>Visiting Card</td>
              <td>₹80</td>
              <td>TNX215631</td>
              <td>Dec 30, 2019 07:52</td>
              <td className="progressTab"> IN PROGRESS</td>
            </tr>
            <tr>
              <td>
                <b>#96459761</b>
              </td>
              <td>Visiting Card</td>
              <td>₹80</td>
              <td>TNX215631</td>
              <td>Dec 30, 2019 07:52</td>
              <td className="completeTab"> PAID</td>
            </tr>
            <tr>
              <td>
                <b>#96459761</b>
              </td>
              <td>Visiting Card</td>
              <td>₹80</td>
              <td>TNX215631</td>
              <td>Dec 30, 2019 07:52</td>
              <td className="cancelledTab"> CANCELLED</td>
            </tr>
            <tr>
              <td>
                <b>#96459761</b>
              </td>
              <td>Visiting Card</td>
              <td>₹80</td>
              <td>TNX215631</td>
              <td>Dec 30, 2019 07:52</td>
              <td className="progressTab"> IN PROGRESS</td>
            </tr>
            <tr>
              <td>
                <b>#96459761</b>
              </td>
              <td>Visiting Card</td>
              <td>₹80</td>
              <td>TNX215631</td>
              <td>Dec 30, 2019 07:52</td>
              <td className="cancelledTab"> CANCELLED</td>
            </tr>
            <tr>
              <td>
                <b>#96459761</b>
              </td>
              <td>Visiting Card</td>
              <td>₹80</td>
              <td>TNX215631</td>
              <td>Dec 30, 2019 07:52</td>
              <td className="completeTab"> PAID</td>
            </tr>
            <tr>
              <td>
                <b>#96459761</b>
              </td>
              <td>Visiting Card</td>
              <td>₹80</td>
              <td>TNX215631</td>
              <td>Dec 30, 2019 07:52</td>
              <td className="progressTab"> IN PROGRESS</td>
            </tr>{' '}
            <tr>
              <td>
                <b>#96459761</b>
              </td>
              <td>Visiting Card</td>
              <td>₹80</td>
              <td>TNX215631</td>
              <td>Dec 30, 2019 07:52</td>
              <td className="completeTab"> PAID</td>
            </tr>
            <tr>
              <td>
                <b>#96459761</b>
              </td>
              <td>Visiting Card</td>
              <td>₹80</td>
              <td>TNX215631</td>
              <td>Dec 30, 2019 07:52</td>
              <td className="cancelledTab"> CANCELLED</td>
            </tr>
            <tr>
              <td>
                <b>#96459761</b>
              </td>
              <td>Visiting Card</td>
              <td>₹80</td>
              <td>TNX215631</td>
              <td>Dec 30, 2019 07:52</td>
              <td className="progressTab"> IN PROGRESS</td>
            </tr>
            <tr>
              <td>
                <b>#96459761</b>
              </td>
              <td>Visiting Card</td>
              <td>₹80</td>
              <td>TNX215631</td>
              <td>Dec 30, 2019 07:52</td>
              <td className="cancelledTab"> CANCELLED</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default PaymentHistory
