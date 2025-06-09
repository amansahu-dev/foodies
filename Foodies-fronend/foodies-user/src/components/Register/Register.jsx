import {Link, useNavigate} from 'react-router-dom';
import './Register.css';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { registerUser } from '../../service/authService';

const Register = () => {
  const navigate = useNavigate();

  const [data,setData] = useState({
    name:'',
    email:'',
    password:''
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data,[name]:value}));
  }

  const onSubmitHandler = async (event) =>{
    event.preventDefault();
    try{
      const response = await registerUser(data);
      if(response.status==201){
        toast.success("Registration completed. Please login.");
        navigate("/login")
      }
      else{
       toast.error("Unable to register. Please try again") 
      }
    } catch(error){
       toast.error("Unable to register. Please try again")
    }
  }

  return (
        <div className="container-fluid register-container">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-10 col-md-7 col-lg-4">
              <div className="card rounded-3">
                  <div className="card-body p-5">
                      <h5 className="card-title text-center mb-4 fs-4">Sign Up</h5>
                      <form onSubmit={onSubmitHandler}>
                        <div className="form-floating mb-3">
                              <input type="text" className="form-control" name='name' value={data.name} onChange={onChangeHandler} id="floatingName" placeholder="Enter your name" required/>
                              <label htmlFor="floatingNam">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" name='email' value={data.email} onChange={onChangeHandler} id="floatingEmail" placeholder="name@example.com" required/>
                            <label htmlFor="floatingEmail">Email address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" name='password' value={data.password} onChange={onChangeHandler} id="floatingPassword" placeholder="Password" required/>
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <div className="d-grid mb-2">
                            <button className="col-12 btn btn-dark text-uppercase btn-sm" type="submit">Register</button>
                            <button className="col-12 btn btn-danger text-uppercase btn-sm mt-2" type="reset">Reset</button>
                        </div>
                        <div className='fs-6 text-muted fw-light'>Already have an account? <Link to='/login'>login</Link></div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Register;