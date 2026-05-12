import React, { useEffect, useState } from 'react'

import API from '../../../api'
import { useSelector } from 'react-redux'
import { Spinner } from 'react-bootstrap'

function Wallet() {
  const { userToken } = useSelector((state) => state.auth)
  const [getusertransaction, setGetusertransaction] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [limit] = useState(10)

  const [getwallet, setGetwallet] = useState()
  useEffect(() => {
    getData()
  }, [])
  const getData = () => {
    API.get(`/user/misc/wallet`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }).then((res) => {
      setGetwallet(res.data.data)
    })
  }

  useEffect(() => {
    getUserTransicationData(page)
  }, [userToken, page])

  const getUserTransicationData = async (currentPage) => {
    try {
      setLoading(true)

      const offset = (currentPage - 1) * limit

      const res = await API.get(`/user/misc/wallet/transactions?limit=${limit}&offset=${offset}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })

      setGetusertransaction(res?.data?.data || [])
      setTotalPages(res?.data?.totalPages || 0)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  return (

    <div class="walletSection profileCard">
      <h6 className="profileHeading">WALLET</h6>
      <div class="walletCard">
        <img src={walletImg} alt="wallet" class="walletIcon" />
        <p class="walletLabel">Available Balance</p>
        <h2 class="walletAmount">
          {getwallet?.currency} {getwallet?.balance}
        </h2>
        <div class="blurShape blurLeft"></div>
        <div class="blurShape blurRight"></div>
      </div>
      <div className="walletTransactionDiv customTabBorder mt-4">
        <h6 className="profileTabTitle">TRANSACTION HISTORY</h6>
        <div className="orderHistoryTable">
          <table className="table">
            <thead className="orderTableHeader">
              <tr>
                <th scope="col">SL</th>
                <th scope="col">TRANSACTION TYPE</th>
                <th scope="col">AMOUNT</th>
                {/* <th scope="col">DEBIT</th> */}
                <th scope="col">BALANCE</th>
                <th scope="col">DATE</th>
                <th scope="col">REASON</th>
                <th scope="col">REMARK</th>
              </tr>
            </thead>

            <tbody className="walletTransactionTableBody ">
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                     <div className="text-center py-5">
            <Spinner variant="primary" />
          </div>
                  </td>
                </tr>
              ) : getusertransaction.length > 0 ? (
                getusertransaction.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <b>{(page - 1) * limit + index + 1}</b>
                    </td>
                    <td className="text-capitalize">{item?.type || '-'}</td>
                    <td className={item.type === 'debit' ? 'text-danger' : 'text-success'}>
                      {item.type ? `₹${item.amount}` : '-'}
                    </td>
                    {/* <td className="text-danger">
          {item.type === 'debit' ? `₹${item.amount}` : "-"}
        </td> */}
                    <td>
                      <b>₹{item?.balanceAfter || 0}</b>
                    </td>
                    <td>
                      {item.createdAt ? new Date(item.createdAt).toLocaleString('en-IN') : '-'}
                    </td>
                    <td>{item?.reason}</td>
                    <td>{item?.remark}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    <b>No Transaction Found</b>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-3">
              <button
                className="btn btn-sm btn-outline-primary me-2"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </button>

              {[...Array(totalPages)]?.map((_, i) => (
                <button
                  key={i}
                  className={`btn btn-sm ${
                    page === i + 1 ? 'btn-primary mx-1' : 'btn-outline-primary mx-1'
                  }`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}

              <button
                className="btn btn-sm btn-outline-primary ms-2"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Wallet
