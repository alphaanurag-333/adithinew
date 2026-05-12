import React from 'react'
import { instagram, mainLogo, Search, cartImg, userImg, Facebook, youtube, twitter } from '../Image'

const Header = () => {
  return (
    <>
      <header>
        <div className="container">
          {/* <div className="topbar">
            <h6>Welcome to Printing Online store. </h6>
            <div className="socialMedia">
              <span>Follow us:</span>
              <ul>
                <a href="#">
                  <img src={instagram} />
                </a>
                <a href="#">
                  <img src={Facebook} />
                </a>
                <a href="#">
                  <img src={youtube} />
                </a>
                <a href="#">
                  <img src={twitter} />
                </a>
              </ul>
            </div>
          </div> */}
          <div className="customNavbar">
            <a href="#">
              <img className="mainLogo" src={mainLogo} />
            </a>
            <div className="customSearch">
              <input type="text" />
              <img src={Search} />
            </div>
            <div className="profileSide">
               {/* <a href="#">
                Stay
              </a>
               <a href="#">
                Ride
              </a>
               <a href="#">
                Food
              </a> */}

              <a href="#">
                <img src={cartImg} />
              </a>
              <a href="#">
                <img src={userImg} />
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
