import React,{useState,useEffect}  from "react";
import { Link,useNavigate} from 'react-router-dom'

const SignUpPage = (props) => {

  let setIsLoggedIn = props.setIsLoggedIn;
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  let apiHost =  'http://127.0.0.1:8000'

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  
  
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);

    if (confirmPassword !== ''){
      setPasswordsMatch(password === confirmPassword);
    }

  }
  
  useEffect(() => {
    if (password === '' || confirmPassword === '') {
      setError('');
    } else if (password !== confirmPassword) {
      setError('Passwords does not match');
    }else if (password.length < 5){
      setError('Password is too short')
    }else {
      setError('');
      setPasswordsMatch(true)
    }
  }, [password,confirmPassword]);

  let handleSubmit = async (e) => {
      e.preventDefault();
      let body = {
        username,email,password
      }
    
      let response = await fetch(apiHost + '/auth/register/',{
                    method : 'POST',
                    headers:{
                      "Content-type":'application/json'
                    },
                    body:JSON.stringify(body)

                  })
    const data = await response.json();
    if (response.ok){
   
      let accessToken = data['tokens']['access'];
      let refreshToken = data['tokens']['refresh'];
      
      localStorage.setItem('access_token',accessToken);
      localStorage.setItem('refresh_token',refreshToken);
      
      setIsLoggedIn(true);
      
      navigate('/');

    }else {
      setError(data['email']);
      // Clear the error message after 3 seconds
      setTimeout(() => {
        setError('');
      }, 5000);
      
    }
  }
  return <>
        <section className="vh-100" style={{backgroundColor: "#508bfc"}}>
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-4">
                <div className="card shadow-2-strong" style={{borderRadius: ".5rem"}}>
                  <div className="card-body p-5 text-center">

                    <h3 className="mb-5">Sign Up</h3>
                 
                    <form onSubmit={handleSubmit}>
                        <div className="form-outline mb-4">
                          {/* <label className="form-label" for="typeEmailX-2">Email</label> */}
                          <input type="text" onChange={handleUsernameChange} value={username} className="form-control form-control-lg" placeholder="username" required/>
                        </div>
                        <div className="form-outline mb-4">
                          {/* <label className="form-label" for="typeEmailX-2">Email</label> */}
                          <input type="email"  onChange={handleEmailChange} value={email} className="form-control form-control-lg" placeholder="Email" required/>
                        </div>

                        <div className="form-outline mb-4">
                          {/* <label className="form-label" for="typePasswordX-2">Password</label> */}
                          <input type="password" onChange={handlePasswordChange} value={password} className="form-control form-control-lg" placeholder="password" required/>
                        </div>
                        <div className="form-outline mb-4">
                          {/* <label className="form-label" for="typePasswordX-2">Password</label> */}
                          <input type="password" onChange={handleConfirmPassword} value={confirmPassword} className="form-control form-control-lg" placeholder="confirm password" required/>
                        {error && <span className="text-danger">{error}</span>}
                        </div>

                        {/* <!-- Checkbox --> */}
                        {/* <div className="form-check d-flex justify-content-start mb-4">
                          <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
                          <label className="form-check-label" for="form1Example3"> Remember password </label>
                        </div> */}
                        <div class="d-grid gap-2">
                          <button className="btn  btn-lg bg-primary text-white" disabled={!passwordsMatch} id="submitBtn" type="submit">Sign Up</button>
                        </div>
                    </form>
                   
                    
                    <div>
                      <p class="mt-2">Already have an account? 
                        <Link to='/login' style={{ textDecoration:'none' }}>
                          <span class="fw-bold">     Sign In</span>
                        </Link>
                      </p>
                    </div>

                    {/* <button class="btn btn-lg btn-block btn-primary" style="background-color: #dd4b39;"
                      type="submit"><i class="fab fa-google me-2"></i> Sign in with google</button>
                    <button class="btn btn-lg btn-block btn-primary mb-2" style="background-color: #3b5998;"
                      type="submit"><i class="fab fa-facebook-f me-2"></i>Sign in with facebook</button> */}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  </>
}

export default SignUpPage;
