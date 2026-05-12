import React from "react";

function Notification() {

  const notifications = [
    {
      sender: "Admin",
      orderId: "#96459761",
      product: "PANEER ANGARA",
      amount: "₹80",
      tnxId: "TNX215631",
      date: "Dec 30, 2019 07:52",
      status: "IN PROGRESS",
    },
    {
      sender: "Seller",
      orderId: "#96459762",
      product: "LAHORI PANEER",
      amount: "₹120",
      tnxId: "TNX215632",
      date: "Dec 31, 2019 08:20",
      status: "PAID",
    },
    {
      sender: "Admin",
      orderId: "#96459763",
      product: "Order Cancelled",
      amount: "₹80",
      tnxId: "TNX215633",
      date: "Jan 01, 2020 09:10",
      status: "CANCELLED",
    },
    {
      sender: "Seller",
      orderId: "#96459764",
      product: "PANEER ANGARA",
      amount: "₹90",
      tnxId: "TNX215634",
      date: "Jan 02, 2020 11:00",
      status: "IN PROGRESS",
    },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "PAID":
        return "completeTab";
      case "CANCELLED":
        return "cancelledTab";
      default:
        return "progressTab";
    }
  };

  return (
    <section className="orderHistorySection customTabBorder">
      <h6 className="profileTabTitle colortex">NOTIFICATION HISTORY</h6>

      <div className="orderHistoryTable">
        <table className="table">
          <thead className="orderTableHeader">
            <tr>
              <th>BOOKING ID</th>
              <th>NAME</th>
              <th>AMOUNT</th>
              <th>TNX ID</th>
              <th>DATE/TIME</th>
              <th>STATUS</th>
            </tr>
          </thead>

          <tbody className="orderTableBody">
            {notifications.map((item, index) => (
              <tr key={index}>
                <td>
                  <b>{item.orderId}</b>
                </td>

                <td>
                  <div>
                    {item.product}
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#888",
                        marginTop: "2px",
                      }}
                    >
                      {item.sender}
                    </div>
                  </div>
                </td>

                <td>{item.amount}</td>

                <td>{item.tnxId}</td>

                <td>{item.date}</td>

                <td className={getStatusClass(item.status)}>
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Notification;
