import React, { useEffect, useRef, useState } from 'react'
import { PiNotebook } from 'react-icons/pi'
import { PiPackage } from 'react-icons/pi'
import { BsCheck } from 'react-icons/bs'
import { PiTruck } from 'react-icons/pi'
import { PiHandshakeLight } from 'react-icons/pi'





function ProgressBar({ status }) {
  const steps = [
    {
      key: 'placed',
      label: 'Order Placed',
      icon: <PiNotebook />,
      activeIcon: <img src={Notebook} />,
    },
    {
      key: 'packaging',
      label: 'Packaging',
      icon: <PiPackage />,
      activeIcon: <img src={Package} />,
    },
    {
      key: 'onTheRoad',
      label: 'On The Road',
      icon: <PiTruck />,
      activeIcon: <img src={Truck} />,
    },
    {
      key: 'delivered',
      label: 'Delivered',
      icon: <PiHandshakeLight />,
      activeIcon: <img src={handshake} />,
    },
  ]

  const activeIndex = steps.findIndex((s) => s.key === status)
  const fillWidth = (activeIndex / (steps.length - 1)) * 100

  return (
    <div className="progressTrackWrapper">
      <div className="trackBg">
        <div className="trackFill" style={{ width: `${fillWidth}%` }} />
      </div>

      <div className="stepsRow">
        {steps.map((step, i) => (
          <div key={i} className="stepBlock" style={{ left: `${(i / (steps.length - 1)) * 100}%` }}>
            <div className={`dot ${i <= activeIndex ? 'dotActive' : 'dotInActive'}`}>
              {i <= activeIndex && (
                <span className="dotIcon">
                  <BsCheck />
                </span>
              )}
            </div>

            <div className={`stepIcon ${i <= activeIndex ? 'activeIcon' : 'inactiveIcon'}`}>
              {i <= activeIndex ? step.activeIcon : step.icon}
            </div>

            <div className={`stepLabel ${i <= activeIndex ? 'activeText' : 'inactiveText'}`}>
              {step.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProgressBar
