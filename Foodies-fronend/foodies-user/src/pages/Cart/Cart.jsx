import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const Cart = () => {
    const {foodList ,increaseQty, decreaseQty ,quantities} = useContext(StoreContext); 

    const cartItems = foodList.filter(food => quantities[food.id]>0);

    //calculations
    const subtotal = cartItems.reduce((acc,food)=> acc + food.price * quantities[food.id] , 0)
    return (
    <>
        <div className="cart-wrapper">
            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-8">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4 className="mb-0">Shopping Cart</h4>
                            <span className="text-muted">3 items</span>
                        </div>

                        <div className="d-flex flex-column gap-3">
                            <div className="card p-2 shadow-sm">
                                <div className="row align-items-center">
                                    <div className="col-md-2">
                                        <img src={assets.logo} alt="Product" className="card-img-top"/>
                                    </div>
                                    <div className="col-md-4">
                                        <h6 className="mb-1">Wireless Headphones</h6>
                                        <p className="text-muted mb-0">Black | Premium Series</p>
                                        <span className="bg-warning badge text-dark">20% OFF</span>
                                    </div>
                                    <div className="col-md-3">
                                        <form className="d-flex align-items-center input-group">
                                            <button className="btn btn-outline-danger" onClick=""><i className='bi bi-dash-circle'></i></button>
                                            <input type="text" className="form-control text-center"/>
                                            <button className="btn btn-outline-success" onClick=""><i className='bi bi-plus-circle'></i></button>
                                        </form>
                                    </div>
                                    <div className="col-md-2">
                                        <span className="fw-bold">&#8377; 129.99</span>
                                    </div>
                                    <div className="col-md-1">
                                        <i className="bi bi-trash remove-btn text-danger fs-4"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card p-4 shadow-sm">
                            <h5 className="mb-4">Order Summary</h5>
                            
                            <div className="d-flex justify-content-between mb-3">
                                <span className="text-muted">Subtotal</span>
                                <span>$479.97</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span className="text-muted">Shipping</span>
                                <span className="text-success">-$26.00</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span className="text-muted">Tax</span>
                                <span>$5.00</span>
                            </div>
                            <hr/>
                            <div className="d-flex justify-content-between mb-4">
                                <span className="fw-bold">Total</span>
                                <span className="fw-bold">$458.97</span>
                            </div>

                            {/* <div className="mb-4">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Promo code"/>
                                    <button className="btn btn-dark" type="button">Apply</button>
                                </div>
                            </div> */}

                            <button className="btn btn-dark w-100 mb-3">
                                Proceed to Checkout
                            </button>
                            
                            <div className="d-flex justify-content-center gap-2">
                                <i className="bi bi-shield-check text-success"></i>
                                <small className="text-muted">Secure checkout</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Cart;