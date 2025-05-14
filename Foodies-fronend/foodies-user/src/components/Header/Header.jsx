import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
  return (
    <>
    <div className="py-3 mb-4 bg-secondary-subtle rounded-5 bgImage">
        <div className="container-fluid p-5 text-center">
            <h1 className='display-5 fw-bold'>Order your favourite food here</h1>
            <p className='fs-4'>Discover the best food & drinks in Bengaluru</p>
            <Link to={"/explore"} className="btn btn-dark">Explore</Link>
        </div>
    </div>
    </>
  )
}

export default Header