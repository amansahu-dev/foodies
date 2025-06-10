import React from "react";
import { NavLink } from "react-router-dom";
import {assets} from '../../assets/assets'

const Sidebar = () => {
  return (
    <>
      <div
        className="d-none d-md-flex flex-column flex-shrink-0 p-3 text-bg-dark"
        style={{ width: "15vw", height: "100vh", position:"sticky", left:"0", top: "0" }}
      >
        <NavLink
          to="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <img
            className="me-2 rounded-circle"
            src={assets.logo}
            width="35"
            height="35"
            aria-hidden="true"
          />
          <span className="fs-4">Foodies</span>
        </NavLink>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
        <li>
            <NavLink to="/list" className="nav-link text-white">
              <i
                className="bi bi-list me-2"
                width="16"
                height="16"
                aria-hidden="true"
              ></i>
              Food List
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/add"
              className="nav-link text-white"
              aria-current="page"
            >
              <i
                className="bi bi-plus-circle me-2"
                width="16"
                height="16"
                aria-hidden="true"
              ></i>
              Add Food
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders" className="nav-link text-white">
              <i
                className="bi bi-cart me-2"
                width="16"
                height="16"
                aria-hidden="true"
              ></i>
              Orders
            </NavLink>
          </li>
        </ul>
        <hr />
        <div>
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
    </>
  );
};

export default Sidebar;
