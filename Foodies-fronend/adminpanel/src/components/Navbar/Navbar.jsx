import React from "react";
import { NavLink } from "react-router-dom";
import {assets} from '../../assets/assets'

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img
              className="me-2 rounded-circle"
              src={assets.logo}
              width="30"
              height="30"
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
                <NavLink className="nav-link" to="/list">
                  Food List
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/add">
                  Add Food
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/orders">
                  Orders
                </NavLink>
              </li>
            </ul>
            <div className="dropdown">
              <a
                href="#"
                className="d-flex align-items-center text-white text-decoration-none"
                aria-expanded="false"
              >
                <img
                  src="https://github.com/mdo.png"
                  alt=""
                  width="32"
                  height="32"
                  className="rounded-circle me-2"
                />
                <strong>Aman Sahu</strong>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
