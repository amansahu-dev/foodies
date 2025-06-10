import React, { useContext } from "react";
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
import MyOrders from "../../pages/MyOrders/MyOrders";
import { StoreContext } from "../../context/StoreContext";

const FoodSection = () => {

  const {token} = useContext(StoreContext);

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
            <Route path="/order" element={token ? <PlaceOrder/>: <Login/>}></Route>
            <Route path="/login" element={token ? <Home/> :<Login/>}></Route>
            <Route path="/register" element={token ? <Home/> : <Register/>}></Route>
            <Route path="/myorders" element={token ? <MyOrders/> : <Login/>}></Route>
        </Routes>
      </div>
    </>
  );
};

export default FoodSection;
