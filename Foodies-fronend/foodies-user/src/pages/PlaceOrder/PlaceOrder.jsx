import { useContext } from 'react';
import {StoreContext} from '../../context/StoreContext';
import { calculateCartTotals } from '../../util/cartUtil';

const PlaceOrder = () => {
    const {foodList , quantities} = useContext(StoreContext);
    const cartItems = foodList.filter(food => quantities[food.id]>0);
    const {subtotal,shipping,tax,total} = calculateCartTotals(cartItems,quantities);
  return (
    <div className='container mt-md-4'>
        <div className="row justify-content-around">
            <div className="order-first col-md-4 col-lg-4 order-md-last"> 
                <h4 className="d-flex justify-content-around align-items-center mb-3">
                <span className="">Order Summary</span> <span className="badge bg-dark rounded-pill fs-6">{cartItems.length}</span>
                </h4> 
                <ul className="list-group mb-3"> 
                    {cartItems.map((item)=>(
                        <li className="list-group-item d-flex justify-content-between lh-sm"> 
                            <div> 
                                <h6 className="my-0">{item.name}</h6> 
                                <small className="text-body-secondary">Qty: {quantities[item.id]}</small> 
                            </div> 
                            <span className="text-body-secondary">&#8377;{(item.price * quantities[item.id]).toFixed(2)}</span> 
                        </li>
                    ))} 
                    <li className="list-group-item d-flex justify-content-between"> 
                        <div> 
                            <span className="my-0">Subtotal</span> 
                        </div> 
                        <span className="text-body-secondary">&#8377;{subtotal>0?subtotal.toFixed(2):0.00}</span> 
                    </li>
                    <li className="list-group-item d-flex justify-content-between"> 
                        <div> 
                            <span className="my-0">Shipping</span> 
                        </div> 
                        <span className="text-body-secondary">&#8377;{shipping>0?shipping.toFixed(2):0.00}</span> 
                    </li> 
                    <li className="list-group-item d-flex justify-content-between"> 
                        <div> 
                            <span className="my-0">Tax (10%)</span> 
                        </div> 
                        <span className="text-body-secondary">&#8377;{tax>0?tax.toFixed(2):0.00}</span> 
                    </li>  
                    <li className="list-group-item d-flex justify-content-between"> 
                        <span>Total (INR)</span> 
                        <strong>&#8377;{total>0?total.toFixed(2):0.00}</strong> 
                    </li> 
                </ul> 
            </div> 
            <div className="col-10 col-md-7 col-lg-7 p-4 p-md-5 card"> 
                <h3 className="mb-3 text-center fw-bold">Billing address</h3> 
                <form className=""> 
                    <div className="row g-2 mb-3"> 
                        <div className="col-sm-6"> 
                            <label htmlFor="firstName" className="form-label">First name</label> 
                            <input type="text" className="form-control" id="firstName" placeholder="Enter your first name..." required/> 
                        </div> 
                        <div className="col-sm-6"> 
                            <label htmlFor="lastName" className="form-label">Last name</label> 
                            <input type="text" className="form-control" id="lastName" placeholder="Enter you last name..." required/>                         
                        </div> 
                        <div className="col-12"> 
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="you@example.com"/> 
                        </div> 
                        <div className="col-12"> 
                            <label htmlFor="address" className="form-label">Address</label> 
                            <input type="text" className="form-control" id="address" placeholder="1234 Main St" required/> 
                        </div> 
                        <div className="col-md-5"> 
                            <label htmlFor="country" className="form-label">Country</label> 
                            <select className="form-select" id="country" required> 
                                <option value="">Choose...</option> 
                                <option>India</option>
                            </select>  
                        </div> 
                        <div className="col-md-4"> 
                            <label htmlFor="state" className="form-label">State</label> 
                            <select className="form-select" id="state" required> 
                                <option value="">Choose...</option> 
                                <option>Karnataka</option>
                            </select> 
                        </div> 
                        <div className="col-md-3"> 
                            <label htmlFor="zip" className="form-label">Zip</label> 
                            <input type="text" className="form-control" id="zip" placeholder="eg. 560064" required/> 
                            <div className="invalid-feedback">Zip code required.</div> 
                        </div> 
                    </div>                     
                    <button className="w-100 btn btn-dark mb-2" type="submit" disabled={cartItems.length===0}>Continue to checkout</button> 
                </form>
            </div>
        </div>  
    </div>
  )
}

export default PlaceOrder;