import {Link} from 'react-router-dom';
import './Login.css';

const Login = () => {
    return (
        <div className="container-fluid login-container">
            <div className="row justify-content-center align-items-center h-100">
                <div className="col-10 col-md-7 col-lg-4">
                    <div className="card rounded-3">
                        <div className="card-body p-5">
                            <h5 className="card-title text-center mb-4 fs-4">Login</h5>
                            <form>
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
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