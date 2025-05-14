import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchFood } from '../../service/foodService';

const FoodDetails = () => {
    const {id} = useParams();
    const [food,setFood] = useState({});

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
                    <div className="d-flex">
                        <input className="form-control text-center me-3" id="inputQuantity" type="num" style={{maxWidth: "3rem"}} />
                        <button className="btn btn-outline-dark flex-shrink-0" type="button">
                            <i className="bi-cart-fill me-1"></i>
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default FoodDetails;