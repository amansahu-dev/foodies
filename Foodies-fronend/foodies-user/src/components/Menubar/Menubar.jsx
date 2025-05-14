import React from 'react'
import { NavLink } from "react-router-dom";
import {assets} from '../../assets/assets'

const Menubar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-secondary px-3 position-fixed w-100" style={{zIndex:"100"}}>
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img
              className="me-2 rounded-circle"
              src={assets.logo}
              width="35"
              height="35"
              aria-hidden="true"
            />
            <span className="fs-4">Foodies</span>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/home">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/explore">
                  Explore
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contact Us
                </NavLink>
              </li>
            </ul>
            <div className='d-flex align-items-center gap-3'>
              <NavLink className="nav-link" to="/cart">
                <div className="position-relative me-2">
                    <img src={assets.cart} alt="" className='positon-relative' height={35} width={35}  />
                    <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning'>5</span>
                </div>
              </NavLink>
                <button className='btn btn-outline-primary'>Login</button>
                <button className='btn btn-outline-success'>SignUp</button>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Menubar