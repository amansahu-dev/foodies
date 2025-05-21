import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "../../pages/Home/Home";
import Contact from "../../pages/ContactUs/Contact";
import Explore from "../../pages/ExploreFood/Explore";
import FoodDetails from "../../pages/FoodDetails/FoodDetails";
import Cart from "../../pages/Cart/Cart";
import PlaceOrder from "../../pages/PlaceOrder/PlaceOrder";
import Login from "../Login/Login";
import Register from "../Register/Register";

const FoodSection = () => {
  return (
    <>
      <div style={{marginTop:"10vh"}}>
        <ToastContainer/>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/home" element={<Home/>}></Route>
            <Route path="/contact" element={<Contact/>}></Route>
            <Route path="/explore" element={<Explore/>}></Route>
            <Route path="/food/:id" element={<FoodDetails/>}></Route>
            <Route path="/cart" element={<Cart/>}></Route>
            <Route path="/order" element={<PlaceOrder/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
        </Routes>
      </div>
    </>
  );
};

export default FoodSection;
