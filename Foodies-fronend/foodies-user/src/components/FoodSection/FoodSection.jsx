import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "../../pages/Home/Home";
import Contact from "../../pages/ContactUs/Contact";
import Explore from "../../pages/ExploreFood/Explore";
import FoodDetails from "../../pages/FoodDetails/FoodDetails";
import Cart from "../../pages/Cart/Cart";

const FoodSection = () => {
  return (
    <>
      <div style={{marginTop:"12vh"}}>
        <ToastContainer/>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/home" element={<Home/>}></Route>
            <Route path="/contact" element={<Contact/>}></Route>
            <Route path="/explore" element={<Explore/>}></Route>
            <Route path="/food/:id" element={<FoodDetails/>}></Route>
            <Route path="/cart" element={<Cart/>}></Route>
        </Routes>
      </div>
    </>
  );
};

export default FoodSection;
