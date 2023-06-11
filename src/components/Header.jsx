import React,{useState} from 'react'
import { Link } from 'react-router-dom'



const Header = (props) => {
  let isLoggedIn = props.isLoggedIn;
  let setIsLoggedIn = props.setIsLoggedIn

  const BeforeSignin = () => {
    return <div>
      
        <button className='btn btn-success me-sm-2' type='button'>Sign In</button>
      </div>

  }
  const AfterSignin = () => {
    return <div>
      <button className='btn btn-danger mr-2'>Log Out</button>
    </div>
  }
  return <>
    
        <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
          <div className="container-fluid">
            <Link to={'/'} style={{ textDecoration:'none' }}>
              <span className="navbar-brand" >Jam Notes</span>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarColor01">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link to={'/'} style={{ textDecoration:'none' }}>
                    <span className="nav-link active" >Home</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={'/note/add'} style={{ textDecoration:'none' }}>
                    <span className="nav-link" href="#">New Note</span>
                  </Link>
                </li>
                  {/*......................... code to change themes................. */}
                  {/* <li className="nav-item ">
                    <select className="nav-link " onChange={(e) => props.changeThemeFunc(e.target.value)}>
                          
                        <option className="" value="flatly.css" selected >Flatly </option>
                        <option className="" value="sketchy.css" >Sketchy</option>
                  
                    </select>

                  </li> */}
              </ul>
              {/* sign in / logout buttons */}
              {/* <div className="d-flex">
                {
                  isLoggedIn ?
                  <AfterSignin/>
                  :
                  <BeforeSignin/> 
                }
              </div> */}
            
            </div>
          </div>
        </nav>
  
  </>
}

export default Header