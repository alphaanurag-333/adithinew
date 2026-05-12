import { useRef } from 'react'
import { BsPlusCircleFill } from 'react-icons/bs'
import { HiMiniArrowRight } from 'react-icons/hi2'



function CartRequest() {
  const inputRefFront = useRef()
  const inputRefBack = useRef()

  return (
    <section className="cartRequestSection container">
      <div className="row">
        <div className="col-6">
          <div className="cartRequestCard">
            <h6 className="cartRequestHeading">Products</h6>
            <div className="cartRequestTable">
              <table>
                <thead>
                  <tr>
                    <th>PRODUCTS</th>
                    <th>TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="cartRequestProductDetails">
                        <img src={DummyImg} alt="" />
                        <p className="cartProductDescription">
                          2025 Visiting Card (305 inches x 2 inches, Dark Blue, Golden)
                        </p>
                      </div>
                    </td>
                    <td>₹500</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="cartRequestProductDetails">
                        <img src={DummyImg} alt="" />
                        <p className="cartProductDescription">
                          2025 Visiting Card (305 inches x 2 inches, Dark Blue, Golden)
                        </p>
                      </div>
                    </td>
                    <td>₹500</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="cartRequestForm">
            <form>
              <div className="row g-3">
                <div className="col-lg-6 mt-0">
                  <label>Upload File</label>
                  <div className="upload-box" onClick={() => inputRefFront.current.click()}>
                    <input type="file" className="d-none" ref={inputRefFront} />

                    <div className="upload-content text-center">
                      <div className="upload-icon">
                        <BsPlusCircleFill />
                      </div>
                      <div className="upload-text">Upload File</div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mt-0">
                  <label>Upload Content</label>

                  <div className="upload-box" onClick={() => inputRefBack.current.click()}>
                    <input type="file" className="d-none" ref={inputRefBack} />

                    <div className="upload-content text-center">
                      <div className="upload-icon">
                        <BsPlusCircleFill />
                      </div>
                      <div className="upload-text">Upload File</div>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <label>Remark</label>
                  <textarea className="form-control"></textarea>
                </div>
                <div className="text-center">
                  <button>
                    PROCEED <HiMiniArrowRight />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CartRequest
