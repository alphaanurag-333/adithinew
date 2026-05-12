import { useEffect, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa6'
import api from '../../../api'
import { useSelector } from 'react-redux'
import API from '../../../api'
import Swal from 'sweetalert2'

function SupportTicket() {
  const [tickets, setTickets] = useState([])
  const [limit] = useState(10)
  const [offset, setOffset] = useState(0)
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [type, setType] = useState('')
  const [descriptions, setDescriptions] = useState()
  const [subject, setSubject] = useState()
  const { userToken } = useSelector((state) => state.auth)

  useEffect(() => {
    fetchTickets()
  }, [offset])

  const fetchTickets = async () => {
    try {
      const res = await api.get(`/user/misc/support-tickets?limit=${limit}&offset=${offset}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })

      setTickets(res.data.data)
      setTotal(res.data.total)
      setTotalPages(res.data.totalPages)
    } catch (err) {
      console.error(err)
    }
  }

  const handleNext = () => {
    if (offset + limit < total) {
      setOffset(offset + limit)
    }
  }

  const handlePrev = () => {
    if (offset > 0) {
      setOffset(offset - limit)
    }
  }

  const currentPage = Math.floor(offset / limit) + 1

  const handleSubmitTicket = async (e) => {
    e.preventDefault()

    try {
      const data = {
        subject: subject,
        category: type,
        description: descriptions,
      }

      const response = await API.post('/user/misc/support-tickets', data, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })

      Swal.fire({
        icon: 'success',
        title: 'Ticket Submit',
        text: 'Ticket submit successfully!',
      })
      fetchTickets()

      setSubject('')
      setType('')
      setDescriptions('')
    } catch (error) {}
  }

  return (
   <section className="orderHistorySection customTabBorder">
    <div className='supportTicketHeader p-0 colortex'>
      <h6 className="profileTabTitle ">SUPPORT TICKET</h6>

        {/* <h6 className="supportTicketTitle">SUPPORT TICKET</h6> */}
        <div className="editAddBtn me-2">
          <button
            className="createSupportTicketBtn"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <span>Create</span>
          </button>
        </div>
      </div>

      <div className="orderHistoryTable">
        <table className="table">
          <thead className="orderTableHeader">
            <tr>
              <th>TOPIC</th>
              <th>SUBMISSION DATE</th>
              <th>TYPE</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody className="orderTableBody">
            {tickets?.length > 0 ? (
              tickets?.map((ticket) => (
                <tr key={ticket?._id}>
                  <td>
                    <b>{ticket?.subject}</b>
                  </td>
                  <td>{new Date(ticket.createdAt).toLocaleString()}</td>
                  <td>{ticket?.category}</td>
                  <td
                    className={ticket?.status === 'RESOLVED' ? 'statusComplete' : 'statusPending'}
                  >
                    {ticket?.status}
                  </td>
                  <td className="orderTabAction" data-bs-toggle="modal"
            data-bs-target="#detailsModal">
                    View Details <FaArrowRight />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No tickets found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔹 Pagination (minimal UI) */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <button className="themeBtn" onClick={handlePrev} disabled={offset === 0}>
            Prev
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button className="themeBtn" onClick={handleNext} disabled={offset + limit >= total}>
            Next
          </button>
        </div>
      )}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog supportTicketModal">
          <div className="modal-content ticketModalContent">
            <h6 className="modal-title ticketModalTitle">SUBMIT NEW TICKET</h6>
            <div className="modal-body ticketModalBody">
              <p>You will get response.</p>
              <form onSubmit={handleSubmitTicket}>
                <div className="mb-3">
                  <label>Type</label>
                  <select
                    className="form-control"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                  >
                    <option value="">Select please</option>
                    <option value="ORDER">ORDER</option>
                    <option value="PAYMENT">PAYMENT</option>
                    <option value="DELIVERY">DELIVERY</option>
                    <option value="REFUND">REFUND</option>
                    <option value="ACCOUNT">ACCOUNT</option>
                    <option value="TECHNICAL">TECHNICAL</option>
                    <option value="OTHER">OTHER</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label>Subject</label>
                  <input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="form-control"
                    type="text"
                    placeholder="Enter subject please"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Describe your issue</label>
                  <textarea
                    rows={2}
                    placeholder="Enter description please"
                    value={descriptions}
                    onChange={(e) => setDescriptions(e.target.value)}
                    className="form-control"
                    type="text"
                    required
                  />
                </div>
                <button type="submit" className="themeBtn modalSubBtn">
                  Submit
                </button>{' '}
                <button
                  className="themeBtn modalCloseBtn createSupportTicketBtn"
                  data-bs-dismiss="modal"
                >
                  <span>Close</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
       <div className="modal fade" id="detailsModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog supportTicketModal">
          <div className="modal-content ticketModalContent">
            <h6 className="modal-title ticketModalTitle">TICKET DETAILS</h6>
            <div className="modal-body ticketModalBody">
              <p>We are working on this, You will get response shortly.</p>
              <form>
                <div className="mb-3">
                  <label>Type</label>
                  <select
                    className="form-control"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                  >
                    <option value="">Select please</option>
                    <option value="ORDER">ORDER</option>
                    <option value="PAYMENT">PAYMENT</option>
                    <option value="DELIVERY">DELIVERY</option>
                    <option value="REFUND">REFUND</option>
                    <option value="ACCOUNT">ACCOUNT</option>
                    <option value="TECHNICAL">TECHNICAL</option>
                    <option value="OTHER">OTHER</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label>Subject</label>
                  <input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="form-control"
                    type="text"
                    placeholder="Enter subject please"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Describe your issue</label>
                  <textarea
                    rows={2}
                    placeholder="Enter description please"
                    value={descriptions}
                    onChange={(e) => setDescriptions(e.target.value)}
                    className="form-control"
                    type="text"
                    required
                  />
                </div>

                <button
                  className="themeBtn modalCloseBtn createSupportTicketBtn"
                  data-bs-dismiss="modal"
                >
                  <span>Close</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SupportTicket
