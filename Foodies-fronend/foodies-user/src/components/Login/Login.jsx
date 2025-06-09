import {Link, useNavigate} from 'react-router-dom';
import './Login.css';
import { useContext, useState } from 'react';
import { loginUser } from '../../service/authService';
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/StoreContext';

const Login = () => {

    const navigate = useNavigate();
    const {setToken,loadCartData} = useContext(StoreContext);
    const [data,setData] = useState({
        email: '',
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
            const response = await loginUser(data);
            if(response.status==200){
                toast.success("Login Successfull");
                setToken(response.data.token);
                localStorage.setItem('token',response.data.token);
                await loadCartData(localStorage.getItem('token'));
                navigate('/');
            }
            else{
                toast.error("Unable to login. Please try again") 
            }
        } catch(error){
            console.log("Error while login: ",error);
            toast.error("Unable to login. Please try again")
        }
    }
    

    return (
        <div className="container-fluid login-container">
            <div className="row justify-content-center align-items-center h-100">
                <div className="col-10 col-md-7 col-lg-4">
                    <div className="card rounded-3">
                        <div className="card-body p-5">
                            <h5 className="card-title text-center mb-4 fs-4">Login</h5>
                            <form onSubmit={onSubmitHandler}>
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" name='email' value={data.email} onChange={onChangeHandler} id="floatingInput" placeholder="name@example.com"/>
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control" name='password' value={data.password} onChange={onChangeHandler} id="floatingPassword" placeholder="Password"/>
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>
                                <div className="d-grid mb-2">
                                    <button className="col-12 btn btn-dark text-uppercase btn-sm" type="submit">Sign in</button>
                                </div>
                                <div className='fs-6 text-muted fw-light'>Don't have an account? <Link to='/register'>register</Link></div>
                                <hr className="my-4"/>
                                    <div className="d-grid mb-2">
                                        <button className="btn btn-danger btn-login text-uppercase btn-sm" type="submit">
                                            <i className="bi bi-google me-2"></i> Sign in with Google
                                        </button>
                                    </div>
                                    <div className="d-grid">
                                        <button className="btn btn-dark btn-login text-uppercase btn-sm" type="submit">
                                            <i className="bi bi-github me-2"></i> Sign in with Github
                                        </button>
                                    </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;