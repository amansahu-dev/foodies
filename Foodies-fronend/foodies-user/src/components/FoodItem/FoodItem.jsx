import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify';

const FoodItem = ({name,description,id,imageUrl,price}) => {
    const {increaseQty, decreaseQty ,quantities} = useContext(StoreContext); 
  return (
    <div className="col-6 col-md-3 col-lg-3 mb-4 d-flex justify-content-center ">
        <div className="card flex-grow-1">
            <Link to={`/food/${id}`}>
                <img src={imageUrl} className="card-img-top object-fit-contain"  alt="Product Image"/>
            </Link>
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{description}</p>
                <div className="d-flex justify-content-between align-items-center">
                    <span className="h5 mb-0">&#8377; {price}</span>
                    <div>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-half text-warning"></i>
                        <small className="text-muted">(4.5)</small>
                    </div>
                </div>
            </div>
        <div className="card-footer d-flex justify-content-between bg-light">
            <Link className="btn btn-dark btn-sm" to={`/food/${id}`}><i className='bi bi-eye'></i></Link>
            {
                quantities[id] > 0 ? (
                    <div className="d-flex align-items-center gap-2">
                        <button className='btn btn-outline-danger btn-sm' onClick={()=>decreaseQty(id)}><i className="bi bi-dash-circle"></i></button>
                        <span className='fw-bold'>{quantities[id]}</span>
                        <button className='btn btn-outline-success btn-sm' onClick={()=>increaseQty(id)}><i className='bi bi-plus-circle'></i></button>
                    </div>
                ) : (
                    <button className='btn btn-dark btn-sm' onClick={()=>{
                        increaseQty(id); 
                        toast.dark(`${name} added to cart!`);
                        }}>
                        <i className='bi bi-cart-plus'></i>
                    </button>
                )
            }
        </div>
        </div>
    </div>
  )
}

export default FoodItem;