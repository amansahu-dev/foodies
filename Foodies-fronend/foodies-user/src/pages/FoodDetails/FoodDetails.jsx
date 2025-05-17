import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchFood } from '../../service/foodService';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify';

const FoodDetails = () => {
    const {id} = useParams();
    const [food,setFood] = useState({});
    const {increaseQty, decreaseQty ,quantities} = useContext(StoreContext); 
    const navigate = useNavigate();

    useEffect(()=>{
        const loadFood = async()=>{
            try{
                const food =  await fetchFood(id);
                setFood(food);
            }catch(error){
                console.log("Error displaying the food details.",error);
            }
        }
        loadFood();
    },[id])
  return (
    <section className="">
        <div className="container p-2 p-md-3 w-75 justify-content-center card">
            <div className="row gx-4 gx-lg-5 align-items-center">
                <div className="col-md-6"><img className="card-img-top mb-5 mb-md-0" src={food.imageUrl} alt="..." /></div>
                <div className="col-md-6">
                    <div className='fs-5 mb-1'>Category: <span className='badge text-bg-warning'>{food.category}</span></div>
                    <h1 className="display-5 fw-bolder">{food.name}</h1>
                    <div className="fs-5 mb-2">
                        <span>&#8377; {food.price}</span>
                    </div>
                    <p className="lead">{food.description}</p>
                    {
                        quantities[id] > 0 ? (
                        <div>
                            <div className="d-flex align-items-center gap-2">
                                <button className='btn btn-outline-danger btn-sm' onClick={()=>decreaseQty(id)}><i className="bi bi-dash-circle"></i></button>
                                <span className='fw-bold'>{quantities[id]}</span>
                                <button className='btn btn-outline-success btn-sm' onClick={()=>increaseQty(id)}><i className='bi bi-plus-circle'></i></button>
                                <button className='btn btn-dark btn-sm'onClick={()=> navigate('/cart')}><i className='bi bi-cart'> Go to cart</i></button>
                            </div>
                        </div>
                        ) : (
                        <button className='btn btn-dark' onClick={()=>{
                            increaseQty(id); 
                            toast.dark(`${food.name} added to cart!`);
                            }}>
                            <i className='bi bi-cart'> Add to cart</i>
                        </button>
                        )
                    }
                </div>
            </div>
        </div>
    </section>
  )
}

export default FoodDetails;