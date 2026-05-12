import React, { useEffect, useRef, useState } from 'react'
import API from '../../../api'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { State, City } from 'country-state-city'
import { Spinner } from 'react-bootstrap'

function Address() {
  const { userToken } = useSelector((state) => state.auth)
  const updateFormRef = useRef(null)

  const [selectedAddress, setSelectedAddress] = useState(null)
  const [editState, setEditState] = useState(null)
  const [editCity, setEditCity] = useState(null)

  const [updateId, setUpdateId] = useState(null)
  const [updateAddress, setUpdateAddress] = useState(false)
  const [userAddress, setUserAddress] = useState([])
  const [loading, setLoading] = useState(true)
  const [addMode, setAddMode] = useState(false)

  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'India',
  })

  const [addState, setAddState] = useState(null)
  const [addCity, setAddCity] = useState(null)

  useEffect(() => {
    if (userToken) GetUserAddress()
  }, [userToken])

  const GetUserAddress = async () => {
    try {
      const res = await API.get(`/user/addresses`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      setUserAddress(res.data.addresses || [])
    } catch (err) {

    } finally {
      setLoading(false)
    }
  }



  const handleAddAddress = async (e) => {
    e.preventDefault()

    try {
      await API.post('/user/address', newAddress, {
        headers: { Authorization: `Bearer ${userToken}` },
      })

      Swal.fire('Success!', 'Address added successfully', 'success')

      setNewAddress({
        street: '',
        city: '',
        state: '',
        zip: '',
        country: 'India',
      })

      setAddState(null)
      setAddCity(null)
      setAddMode(false)
      GetUserAddress()
    } catch (err) {
      Swal.fire('Error', 'Failed to add address', 'error')
    }
  }



  const handleEditAddress = (address, index) => {
    setSelectedAddress({ ...address })
    setUpdateId(index)
    setUpdateAddress(true)

    const stateObj = State.getStatesOfCountry("IN").find(
      s => s.name.trim().toLowerCase() === address.state.trim().toLowerCase()
    )

    if (stateObj) {
      setEditState(stateObj)

      const cityObj = City.getCitiesOfState("IN", stateObj.isoCode).find(
        c => c.name.trim().toLowerCase() === address.city.trim().toLowerCase()
      )

      setEditCity(cityObj || null)
    } else {
      setEditState(null)
      setEditCity(null)
    }

    setTimeout(() => {
      updateFormRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }



  const UpdatedAddress = async (e) => {
    e.preventDefault()

    try {
      await API.put(`/user/address/${updateId}`, selectedAddress, {
        headers: { Authorization: `Bearer ${userToken}` },
      })

      Swal.fire('Success', 'Address Updated', 'success')
      setUpdateAddress(false)
      GetUserAddress()
    } catch (err) {
      Swal.fire('Error', 'Update Failed', 'error')
    }
  }



  const DeleteAddress = async (index) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
    })

    if (!confirm.isConfirmed) return

    try {
      await API.delete(`/user/address/${index}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })

      Swal.fire('Deleted!', 'Address deleted successfully', 'success')
      GetUserAddress()
    } catch (err) {
      Swal.fire('Error', 'Something went wrong', 'error')
    }
  }

  const sortedAddresses = [...userAddress].sort(
    (a, b) => b.isDefault - a.isDefault
  )

  return (
    <section>
      <div className="d-flex justify-content-between profileHeading">
        <h6>SHIPPING ADDRESS</h6>
        <button className="themeBtn" onClick={() => setAddMode(!addMode)}>
          + Add Address
        </button>
      </div>
 {/* ================= EDIT FORM ================= */}

      {updateAddress && selectedAddress && (
        <div className="updatAddressDiv" ref={updateFormRef}>
          <h6 className="profileHeading">UPDATE ADDRESS</h6>

          <div className="updateAddressFormDiv customTabBorder pt-0">
            <form className="updateAddForm" onSubmit={UpdatedAddress}>
              <div className="row g-3">

                <div className="col-lg-12">
                  <label>Street Address</label>
                  <input
                    className="form-control"
                    value={selectedAddress.street || ''}
                    onChange={(e) =>
                      setSelectedAddress({
                        ...selectedAddress,
                        street: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="col-lg-6 mb-2">
                  <label>Country</label>
                  <input
                    type="text"
                    value="India"
                    className="form-control"
                    disabled
                  />
                </div>

                <div className="col-lg-6 mb-2">
                  <label>State</label>
                  <select
                    className="form-control"
                    value={editState?.isoCode || ''}
                    onChange={(e) => {
                      const stateObj = State.getStatesOfCountry("IN").find(
                        s => s.isoCode === e.target.value
                      )

                      setEditState(stateObj)
                      setEditCity(null)

                      setSelectedAddress(prev => ({
                        ...prev,
                        state: stateObj.name,
                        city: ''
                      }))
                    }}
                    required
                  >
                    <option value="">Select State</option>
                    {State.getStatesOfCountry("IN").map(state => (
                      <option key={state.isoCode} value={state.isoCode}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-lg-6 mb-2">
                  <label>City</label>
                  <select
                    className="form-control"
                    value={editCity?.name || ''}
                    onChange={(e) => {
                      const cityObj = City.getCitiesOfState(
                        "IN",
                        editState?.isoCode
                      ).find(c => c.name === e.target.value)

                      setEditCity(cityObj)

                      setSelectedAddress(prev => ({
                        ...prev,
                        city: cityObj.name
                      }))
                    }}
                    disabled={!editState}
                    required
                  >
                    <option value="">Select City</option>
                    {editState &&
                      City.getCitiesOfState("IN", editState.isoCode).map(
                        city => (
                          <option key={city.name} value={city.name}>
                            {city.name}
                          </option>
                        )
                      )}
                  </select>
                </div>

                <div className="col-lg-6">
                  <label>Pin Code</label>
                  <input
                    type="text"
                    className="form-control"
                    maxLength={6}
                    value={selectedAddress.zip || ''}
                    onChange={(e) =>
                      setSelectedAddress({
                        ...selectedAddress,
                        zip: e.target.value.replace(/\D/g, ''),
                      })
                    }
                    required
                  />
                </div>

                <div className="col-md-12">
                  <button className="themeBtn" type="submit">
                    Update Address
                  </button>
                </div>

              </div>
            </form>
          </div>
        </div>
      )}
      {/* ================= ADD FORM ================= */}

      {addMode && (
        <div className="updateAddressFormDiv customTabBorder mt-3">
          <h6>Add New Address</h6>

          <form className="updateAddForm" onSubmit={handleAddAddress}>
            <div className="row g-3">
              <div className="col-lg-12">
                <input
                  className="form-control mb-2"
                  placeholder="Street Address"
                  value={newAddress.street}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, street: e.target.value })
                  }
                  required
                />
              </div>

              <div className="col-lg-6 mb-2">
                <input
                  type="text"
                  value="India"
                  className="form-control"
                  disabled
                />
              </div>

              <div className="col-lg-6 mb-2">
                <select
                  className="form-control"
                  value={addState?.isoCode || ''}
                  onChange={(e) => {
                    const stateObj = State.getStatesOfCountry("IN").find(
                      s => s.isoCode === e.target.value
                    )

                    setAddState(stateObj)
                    setAddCity(null)

                    setNewAddress(prev => ({
                      ...prev,
                      state: stateObj.name,
                      city: ''
                    }))
                  }}
                  required
                >
                  <option value="">Select State</option>
                  {State.getStatesOfCountry("IN").map(state => (
                    <option key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-lg-6 mb-2">
                <select
                  className="form-control"
                  value={addCity?.name || ''}
                  onChange={(e) => {
                    const cityObj = City.getCitiesOfState(
                      "IN",
                      addState?.isoCode
                    ).find(c => c.name === e.target.value)

                    setAddCity(cityObj)

                    setNewAddress(prev => ({
                      ...prev,
                      city: cityObj.name
                    }))
                  }}
                  disabled={!addState}
                  required
                >
                  <option value="">Select City</option>
                  {addState &&
                    City.getCitiesOfState("IN", addState.isoCode).map(city => (
                      <option key={city.name} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="col-lg-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Pin Code"
                  maxLength={6}
                  value={newAddress.zip}
                  onChange={(e) =>
                    setNewAddress({
                      ...newAddress,
                      zip: e.target.value.replace(/\D/g, ''),
                    })
                  }
                  required
                />
              </div>
            </div>

            <button className="themeBtn mt-3" type="submit">
              Save Address
            </button>
          </form>
        </div>
      )}

      {/* ================= ADDRESS LIST ================= */}

      {loading ? (
        <div className="text-center py-5">
            <Spinner variant="primary" />
          </div>
      ) : sortedAddresses.length === 0 ? (
        <p className="text-center mt-3">No Address Found</p>
      ) : (
        sortedAddresses.map((address, index) => {
          const originalIndex = userAddress.findIndex(
            item => item === address
          )

          return (
            <div key={index} className="addressDetailDiv customTabBorder mb-3">
              <h6 className="addName">
                {address?.type?.toUpperCase()} Address
                {address?.isDefault && (
                  <span className="badge bg-success ms-2">Default</span>
                )}
              </h6>

              <div className="addInfo">
                <p className="detailAddress">
                  {address?.street}, <br />
                  {address?.city}, {address?.state} - {address?.zip}, <br />
                  {address?.country}
                </p>
              </div>

              <div className="editAddBtn gap-2 d-flex">
                <button
                  className="editAddressBtn"
                  onClick={() =>
                    handleEditAddress(address, originalIndex)
                  }
                >
                  Edit Address
                </button>

                <button
                  className="deleteAddressBtn"
                  onClick={() => DeleteAddress(originalIndex)}
                >
                  Delete
                </button>
              </div>
            </div>
          )
        })
      )}


    </section>
  )
}

export default Address
