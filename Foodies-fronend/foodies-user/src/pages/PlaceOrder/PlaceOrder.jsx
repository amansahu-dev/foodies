import { useContext, useState } from 'react';
import {StoreContext} from '../../context/StoreContext';
import { calculateCartTotals } from '../../util/cartUtil';
import axios from 'axios';
import { toast } from 'react-toastify';
import {RAZORPAY_KEY} from '../../util/constant';
import {useNavigate} from 'react-router-dom';
//import Razorpay from 'razorpay';

const PlaceOrder = () => {
    const {foodList , quantities,setQuantities,token} = useContext(StoreContext);
    const cartItems = foodList.filter(food => quantities[food.id]>0);
    const {subtotal,shipping,tax,total} = calculateCartTotals(cartItems,quantities);
    const navigate = useNavigate();

    const [data,setData] = useState({
        firstName : "",
        lastName : "",
        email: "",
        phone:"",
        address:"",
        state:"Karnataka",
        city:"",
        zip:""
    });

    const onChangeHandler = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data, [name]: value}));
    }

    const onSubmitHandler = async (event)=>{
        event.preventDefault();
        const orderData = {
            userAddress :  `${data.firstName} ${data.lastName} ${data.address} ${data.city} ${data.state} ${data.zip}`,
            phoneNumber : data.phone,
            email: data.email,
            amount : total.toFixed(2),
            orderStatus: "Preparing",
            orderedItems: cartItems.map(item=> ({
                foodId: item.fooId,
                quantity : quantities[item.id],
                price : item.price * quantities[item.id],
                category : item.category,
                imageUrl: item.imageUrl,
                description: item.description,
                name: item.name
            }))
        };

        try {
            const response = await axios.post("https://foodeeshub.up.railway.app/api/orders/create",orderData,{headers:{"Authorization":`Bearer ${token}`}});
            console.log("response: ",response);
            if(response.status === 201 && response.data.razorpayOrderId){
                //intitate the payment
                initiateRazorpayPayment(response.data);
            }else{
                toast.error("Unable to place order. Please try again.");
            }
        } catch (error) {
            console.log("Error while creating order: ",error)
            toast.error("Unable to place order. Please try again.");
        }
    }

    const initiateRazorpayPayment = (order) =>{
        console.log("Initiating Payment!!",order);
        const options = {
            key: RAZORPAY_KEY,
            amount: order.amount,// Convert to Paise
            currency: "INR",
            name: "Food Land",
            description: "Food order payment",
            order_id: order.razorpayOrderId,
            handler: async function(razorpayResponse){
                console.log("handler function called...")
                await verifyPayment(razorpayResponse);
            },
            prefill: {
                name: `${data.firstName} ${data.lastName}`,
                email: `${data.email}`,
                contact: `${data.phone}`,
            },
            theme: {color: "#3399cc"},
            modal: {
                ondismiss: async function(){
                    toast.error("Payment Cancelled");
                    await deleteOrder(order.id);
                }
            } 
        };
        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };

    const verifyPayment = async (razorpayResponse) =>{
        console.log("Start verfiying payment",razorpayResponse);
        const paymentData = {
            razorpayOrderId:  razorpayResponse.razorpay_order_id,
            razorpayPaymentId: razorpayResponse.razorpay_payment_id,
            razorpaySignature: razorpayResponse.razorpay_signature
        };
        console.log(paymentData);

        try {
            const response = await axios.post("https://foodeeshub.up.railway.app/api/orders/verify", paymentData,{headers:{"Authorization": `Bearer ${token}`}});
            console.log("Verify response: ",response);
            if(response.status === 200){
                toast.success("Payment Successfull.");
                await clearCart();
                navigate("/myorders");
            }else{
                toast.error("Payment Failed. Please try again.");
                navigate("/");
            }
        } catch (error) {
            toast.error("Payment Failed. Please try again.");
            console.log("Error while making payment.", error);
        }
    }

    const deleteOrder = async(orderId) =>{
        try{
            await axios.delete("https://foodeeshub.up.railway.app/api/orders/"+orderId, {headers:{"Authorization":`Bearer ${token}`}});
        } catch(error){
            toast.error("Something went wrong!");
            console.log("Error while deleting orders",error);
        }
    }

    const clearCart = async () =>{
        try {
            await axios.delete("https://foodeeshub.up.railway.app/api/cart", {headers:{"Authorization":`Bearer ${token}`}});
            setQuantities({});
        } catch (error) {
            toast.error("Error while clearing the cart.");
        }
    }

  return (
    <div className='container mt-md-4'>
        <div className="row justify-content-around">
            <div className="order-first col-md-4 col-lg-4 order-md-last"> 
                <h4 className="d-flex justify-content-around align-items-center mb-3">
                <span className="">Order Summary</span> <span className="badge bg-dark rounded-pill fs-6">{cartItems.length}</span>
                </h4> 
                <ul className="list-group mb-3"> 
                    {cartItems.map((item)=>(
                        <li className="list-group-item d-flex justify-content-between lh-sm" key={item.id}> 
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
                <form className="" onSubmit={onSubmitHandler}> 
                    <div className="row g-2 mb-3"> 
                        <div className="col-sm-6"> 
                            <label htmlFor="firstName" className="form-label">First name</label> 
                            <input type="text" className="form-control" name='firstName' onChange={onChangeHandler} value={data.firstName} id="firstName" placeholder="Enter your first name..." required/> 
                        </div> 
                        <div className="col-sm-6"> 
                            <label htmlFor="lastName" className="form-label">Last name</label> 
                            <input type="text" className="form-control" name='lastName' onChange={onChangeHandler} value={data.lastName} id="lastName" placeholder="Enter you last name..." required/>                         
                        </div> 
                        <div className="col-6"> 
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" name='email' onChange={onChangeHandler} value={data.email} id="email" placeholder="you@example.com"/> 
                        </div>
                        <div className="col-6"> 
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <input type="text" className="form-control" name='phone' onChange={onChangeHandler} value={data.phone} id="phone" placeholder="+91 012-3456-7890"/> 
                        </div> 
                        <div className="col-12"> 
                            <label htmlFor="address" className="form-label">Address</label> 
                            <input type="text" className="form-control" name='address' onChange={onChangeHandler} value={data.address} id="address" placeholder="1234 Main St" required/> 
                        </div> 
                        <div className="col-md-5"> 
                            <label htmlFor="state" className="form-label">State</label> 
                            <select className="form-select" name='state' onChange={onChangeHandler} value={data.state} id="state" required> 
                                <option value="">Choose...</option> 
                                <option>Karnataka</option>
                            </select>  
                        </div> 
                        <div className="col-md-4"> 
                            <label htmlFor="city" className="form-label">City</label> 
                            <select className="form-select" name='city' onChange={onChangeHandler} value={data.city} id="city" required> 
                                <option value="">Choose...</option> 
                                <option>Banglore</option>
                            </select> 
                        </div> 
                        <div className="col-md-3"> 
                            <label htmlFor="zip" className="form-label">Zip</label> 
                            <input type="text" className="form-control" name='zip' onChange={onChangeHandler} value={data.zip} id="zip" placeholder="eg. 560064" required/> 
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