import {Link} from 'react-router-dom';
import './Register.css';

const Register = () => {
  return (
        <div className="container-fluid register-container">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-10 col-md-7 col-lg-4">
              <div className="card rounded-3">
                  <div className="card-body p-5">
                      <h5 className="card-title text-center mb-4 fs-4">Sign Up</h5>
                      <form>
                        <div className="form-floating mb-3">
                              <input type="text" className="form-control" id="floatingName" placeholder="Enter your name" required/>
                              <label htmlFor="floatingNam">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingEmail" placeholder="name@example.com" required/>
                            <label htmlFor="floatingEmail">Email address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" required/>
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