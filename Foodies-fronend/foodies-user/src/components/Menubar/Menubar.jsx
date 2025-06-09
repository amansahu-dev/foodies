import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import {assets} from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';
import './Menubar.css';

const Menubar = () => {
  const {quantities,token,setToken,setQuantities} = useContext(StoreContext);
  const itemCount = Object.values(quantities).filter(qty => qty>0).length;
  const [active,setActive] = useState('home');
  const navigate = useNavigate();

  const logout = () => {
    console.log("logout called");
    localStorage.removeItem('token');
    setToken("");
    navigate('/home')
    setQuantities({})
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-secondary px-3 position-fixed w-100" style={{zIndex:"100"}}>
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <img
              className="me-2 rounded-circle"
              src={assets.logo}
              width="35"
              height="35"
              aria-hidden="true"
              onClick={()=> setActive('home')}
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
                <NavLink className={active === 'home'? "nav-link fw-bold" : "nav-link"} to="/home" onClick={()=> setActive('home')}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={active === 'explore'? "nav-link fw-bold" : "nav-link"} aria-current="page" to="/explore" onClick={()=> setActive('explore')}>
                  Explore
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={active === 'contact'? "nav-link fw-bold" : "nav-link"} to="/contact" onClick={()=> setActive('contact')}>
                  Contact Us
                </NavLink>
              </li>
            </ul>
            <div className='d-flex align-items-center gap-3'>
              <NavLink className="nav-link" to="/cart">
                <div className="position-relative me-2">
                    <img src={assets.cart} alt="" className='positon-relative' height={35} width={35}  />
                    <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning'>{itemCount}</span>
                </div>
              </NavLink>
                {
                  !token ?
                    ( <>
                        <button className='btn btn-outline-primary' onClick={()=> navigate('/login')}>Login</button>
                        <button className='btn btn-outline-success' onClick={()=> navigate('/register')}>SignUp</button>
                      </> 
                    )
                  : <div className='dropdown'>
                      <a href="" className='d-block link-body-emphasis text-decoration-none dropdown-toggle' data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={assets.user} alt="" height={32} width={32} className='rounded-circle'/>
                      </a>
                    <ul className='dropdown-menu' style={{left:"-100%"}}>
                      <li className='dropdown-item cursor-pointer' onClick={()=>{navigate("/myorders")}}>Orders</li>
                      <li className='dropdown-item cursor-pointer' onClick={logout}>Logout</li>
                    </ul>
                  </div>
                } 
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Menubar