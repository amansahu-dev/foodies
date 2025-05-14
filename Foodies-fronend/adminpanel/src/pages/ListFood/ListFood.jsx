import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./ListFood.css";
import { deleteFood, getFoodList } from "../../services/foodservice";

const ListFood = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const data = await getFoodList();
      setList(data);
    } catch (error) {
      toast.error("Error while fetching foods.");
    }
  };

  const removeFood = async (foodId) => {
    try {
      const success = await deleteFood(foodId);
      if (success) {
        toast.success("Food Removed.");
        await fetchList();
      } else {
        toast.error("Error occured while removing the food.");
      }
    } catch (error) {
      toast.error("Error occured while removing the food.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
    <div className="container-fluid py-5 d-none d-md-block">
      <div className="row justify-content-center">
        <div className="col-10 col-md-12 card">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <img
                          className="rounded-1 object-fit-cover"
                          src={item.imageUrl}
                          alt=""
                          height={48}
                          width={48}
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>{item.description}</td>
                      <td>&#8377; {item.price}</td>
                      <td>
                        <span role="button" tabindex="0"><i className="bi bi-pencil-square text-success fs-4 me-2"></i></span>
                        <span role="button" tabindex="0"><i className="bi bi-trash text-danger fs-4" onClick={() => removeFood(item.id)}></i></span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
      <div className="w-100 gap-4 d-md-none py-4 d-flex flex-column justify-content-center align-items-center">
        {list.map((item, index) => {
          return (
            <div className="col-12 col-md-4 card py-2" key={index}>              
              <img className="card-img-top rounded-1" style={{height:"12rem",width:"100%", objectFit:"cover"}} src={item.imageUrl} alt="" />
              <div className="card-body">
                <h5 className="card-title fs-4">{item.name}</h5>
                <h6 className="card-subtitle fs-6 mb-2 text-body-secondary">
                  {item.category}
                </h6>
                <p className="card-text">{item.description}</p>

                <div className="row justify-content-around">
                  <button type="button" className="btn btn-outline-success" style={{width:"49%"}}>
                    Update
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger" 
                    onClick={() => removeFood(item.id)}
                    style={{width:"49%"}}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ListFood;
