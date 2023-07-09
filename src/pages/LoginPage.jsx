import React,{useState} from "react";
import { useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom'

const LoginPage = (props) => {
  
  let setIsLoggedIn = props.setIsLoggedIn;
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  let apiHost =  'https://jam-notes-be.vercel.app'

  const headers = {
    'Content-Type': 'application/json',
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  let handleSubmit = async (e) => {
      e.preventDefault();
      
      let body = {
        email,password
      }
      const options = {
        method: 'POST',
        headers: headers,
        body:JSON.stringify(body)
      };

      let response = await fetch(apiHost + '/auth/login/',options)

    if (response.ok){
      const data = await response.json();

      let accessToken = data['access'];
      let refreshToken = data['refresh'];

      localStorage.setItem('access_token',accessToken);
      localStorage.setItem('refresh_token',refreshToken);
      
      setIsLoggedIn(true);
      navigate('/');

    }else {
      setError('Invalid credentials');
      // Clear the error message after 3 seconds
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  }
  
  return <>
        <section className="vh-100" style={{backgroundColor: "#508bfc"}}>
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-4">
                <div className="card shadow-2-strong" style={{borderRadius: ".5rem"}}>
                  <div className="card-body p-5 text-center">

                    <h3 className="mb-5">Sign in</h3>
                   
                    <form onSubmit={handleSubmit}>
                        
                        <div className="form-outline mb-4">
                          {/* <label className="form-label" for="typeEmailX-2">Email</label> */}
                          <input type="email" value={email} onChange={handleEmailChange} className="form-control form-control-lg" placeholder="Email" required/>
                        </div>

                        <div className="form-outline mb-4">
                          {/* <label className="form-label" for="typePasswordX-2">Password</label> */}
                          <input type="password" value={password} onChange={handlePasswordChange} className="form-control form-control-lg" placeholder="password" required/>
                        </div>

                        {/* <!-- Checkbox --> */}
                        {/* <div className="form-check d-flex justify-content-start mb-4">
                          <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
                          <label className="form-check-label" for="form1Example3"> Remember password </label>
                        </div> */}
                        {error && <span className="text-danger">{error}</span>}
                        <div class="d-grid gap-2">
                          <button className="btn  btn-lg bg-primary text-white" type="submit">Login</button>
                        </div>
                     
                    </form>
                   

                    {/* <button class="btn btn-lg btn-block btn-primary" style={{backgroundColor: "#dd4b39"}}
                      type="submit"><i class="fab fa-google me-2"></i> Sign in with google</button>
                      <button class="btn btn-lg btn-block btn-primary mb-2" style={{backgroundColor: "#3b5998"}}
                    type="submit"><i class="fab fa-facebook-f me-2"></i>Sign in with facebook</button> */}


                    <div>
                      <p class="mt-2">Don't have an account? 
                        <Link to='/signup' style={{ textDecoration:'none' }}>
                          <span class="fw-bold">     Sign Up</span>
                        </Link>
                      </p>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
  </>
}

export default LoginPage;
