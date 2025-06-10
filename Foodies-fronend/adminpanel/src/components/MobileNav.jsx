import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const MobileNav = () => {
  return (
    <div
      className="bg-dark w-100"
      style={{ position: "fixed", bottom: "0", left: "0", height: "10vh" }}
    >
      <ul className="nav nav-pills justify-content-center align-items-center fs-6" style={{height: "100%"}}>
        <li>
          <NavLink to="/list" className="nav-link text-white">
            <i
              className="bi bi-list me-1"
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
              className="bi bi-plus-circle me-1"
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
              className="bi bi-cart me-1"
              width="16"
              height="16"
              aria-hidden="true"
            ></i>
            Orders
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default MobileNav;
