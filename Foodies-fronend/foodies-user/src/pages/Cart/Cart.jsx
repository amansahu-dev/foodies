import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { calculateCartTotals } from '../../util/cartUtil';

const Cart = () => {
    const {foodList ,increaseQty, decreaseQty ,quantities, removeFromCart} = useContext(StoreContext); 
    const cartItems = foodList.filter(food => quantities[food.id]>0);
    const navigate = useNavigate();
    const {subtotal,shipping,tax,total} = calculateCartTotals(cartItems,quantities);
    return (
    <>
        <div className="cart-wrapper mt-3">
            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-8">                    
                    {
                            cartItems.length === 0? (
                                <p>Your cart is empty!</p>
                            ): (
                        <div>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h4 className="mb-0">Shopping Cart</h4>
                                <span className="text-muted">{cartItems.length} items</span>
                            </div>
                            <div className="d-flex flex-column gap-3">
                                <div className="card p-2 shadow-sm">
                                {
                                    cartItems.map((food)=>(
                                        <div key={food.id} className="row align-items-center">
                                            <div className="col-md-2">
                                                <img src={food.imageUrl} alt={food.name} className="card-img-top img-fluid"/>
                                            </div>
                                            <div className="col-md-4">
                                                <h6 className="mb-1">{food.name}</h6>
                                                <p className="text-muted mb-0">{food.description}</p>
                                                <div className='text-muted'>
                                                    category: <span className="bg-warning badge text-dark">{food.category}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="d-flex align-items-center input-group">
                                                    <button className="btn btn-outline-danger" onClick={() => decreaseQty(food.id)}><i className='bi bi-dash-circle'></i></button>
                                                    <input type="text" className="form-control text-center" value={quantities[food.id]} readOnly/>
                                                    <button className="btn btn-outline-success" onClick={() => increaseQty(food.id)}><i className='bi bi-plus-circle'></i></button>
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <span className="fw-bold">&#8377; {(food.price * quantities[food.id]).toFixed(2)}</span>
                                            </div>
                                            <div className='col-md-1'>
                                                <button className="btn btn-sm btn-outline-danger" onClick={()=>removeFromCart(food.id)}>
                                                    <i className="bi bi-trash fs-5"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                }
                                </div>
                            </div>
                        </div>
                            )
                        }
                    </div>
                    
                    <div className="col-lg-4">
                        <div className="card p-4 shadow-sm">
                            <h5 className="mb-4">Order Summary</h5>
                            
                            <div className="d-flex justify-content-between mb-3">
                                <span className="text-muted">Subtotal</span>
                                <span>&#8377;{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span className="text-muted">Shipping</span>
                                <span>&#8377;{subtotal === 0 ? 0.0 : shipping.toFixed(2)}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span className="text-muted">Tax</span>
                                <span>&#8377;{tax.toFixed(2)}</span>
                            </div>
                            <hr/>
                            <div className="d-flex justify-content-between mb-4">
                                <span className="fw-bold">Total</span>
                                <span className="fw-bold">&#8377;{subtotal === 0 ? 0.0 :total.toFixed(2)}</span>
                            </div>

                            {/* <div className="mb-4">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Promo code"/>
                                    <button className="btn btn-dark" type="button">Apply</button>
                                </div>
                            </div> */}

                            <button className="btn btn-dark w-100 mb-3" disabled={cartItems.length === 0}
                                onClick={()=>navigate('/order')}
                            >
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