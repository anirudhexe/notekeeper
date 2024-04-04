import {React,useEffect}  from "react";
import {Link, useLocation, useNavigate
} from 'react-router-dom';

export const Navbar = (props) => {
  let location=useLocation();
  useEffect(() => {
    console.log(location);
  }, [location]);

  let navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate('/login');
    props.showAlert('Logged out','success')
  }
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            NoteKeeper
          </Link>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">
                  About
                </Link>
              </li>
            </ul>
            
          </div>
          {!localStorage.getItem('token')?<form class="d-flex" role="search">
              <Link class="btn btn-outline-primary mx-3" to="/login" role="button">Login</Link>
              <Link class="btn btn-outline-primary" to="/register" role="button">Register</Link>
            </form>: <button class="btn btn-outline-primary" onClick={handleLogout} role="button">Sign out</button>}
        </div>
      </nav>
    </div>
  );
};
