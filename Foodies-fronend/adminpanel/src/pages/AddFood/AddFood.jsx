import React, { useState, useRef } from "react";
import { assets } from "../../assets/assets";
import { addFood } from "../../services/foodservice";
import { toast } from "react-toastify";

const AddFood = () => {
  const [image, setImage] = useState(false);
  const fileInputRef = useRef(null); // ✅ File input ref
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!image) {
      toast.error("Please select an image.");
      return;
    }
    try {
      await addFood(data, image);
      toast.success("Food added Successfully.");
       setData({ name: '', price: '', category: '', description: '' });
      setImage(null);
      fileInputRef.current.value = null; // ✅ Reset file input
    } catch (error) {
      toast.error('Error adding food');
    }
  };

  return (
    <>
      <div className="container-fluid d-flex align-items-center justify-content-center mt-3">
        <form className="card w-100 p-3" style={{ backgroundColor: "#f8f9fb" }} onSubmit={onSubmitHandler}>
          <div className="mb-2">
            <label htmlFor="name" className="form-label">Food Name</label>
            <input type="text" className="form-control" placeholder="Chicken Biryani" name="name" id="name" required value={data.name} onChange={onChangeHandler} />
          </div>
          <div className="mb-2">
            <label htmlFor="price" className="form-label">Food Price</label>
            <input type="number" className="form-control" placeholder="₹ 200" name="price" id="price" required value={data.price} onChange={onChangeHandler} />
          </div>
          <div className="mb-2">
            <label htmlFor="category" className="form-label">Food Category</label>
            <select className="form-select" name="category" id="category" required value={data.category} onChange={onChangeHandler}>
              <option value='' disabled> Select Category</option>
              <option value="Burger">Burger</option>
              <option value="Pizza">Pizza</option>
              <option value="Biryani">Biryani</option>
              <option value="Cakes">Cakes</option>
              <option value="Ice-cream">Ice-cream</option>
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="description" className="form-label">Food Description</label>
            <textarea className="form-control" placeholder="Write food description here..." name="description" id="description" required value={data.description} onChange={onChangeHandler} />
          </div>
          <div className="mb-3 d-flex gap-2 align-items-center">
            <label htmlFor="image" className="form-label mx-1">
              <img src={image ? URL.createObjectURL(image) : assets.upload} alt="" height={40} />
            </label>
            <input
              className="form-control"
              type="file"
              id="image"
              name="image"
              ref={fileInputRef} // ✅ Attach ref
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <button type="submit" className="btn btn-dark w-100">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddFood;
