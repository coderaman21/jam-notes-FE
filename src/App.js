import {Route,Routes} from 'react-router-dom'

import {useState} from 'react'
import './css/App.css';
import './css/flatly.css'
// import './sketchy.css'
import AddNote from './components/AddNote'
import Header from './components/Header'
import NoteListPage from './pages/NoteListPage'
import NotePage from './pages/NotePage'
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
  const [stylesheet, setStylesheet] = useState('flatly.css');
  const [isLoggedIn , setIsLoggedIn] = useState(Boolean(localStorage.getItem('access_token')))
 
  let changeTheme = (selectedTheme) =>{
    setStylesheet(selectedTheme)
  }
  

  return <>
      <div className='main'>

        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        <div >         
            <Routes>
                
                <Route path='/' element={<NoteListPage isLoggedIn={isLoggedIn} />} /> 
                <Route path='/note/:id' element={<NotePage isLoggedIn={isLoggedIn} />}  />
                <Route path='/note/add' element={<AddNote isLoggedIn={isLoggedIn} />}  />
                <Route path='/login' element={<LoginPage setIsLoggedIn={setIsLoggedIn}/>} />
                <Route path='/signup' element={<SignupPage setIsLoggedIn={setIsLoggedIn}/>} />
            
            </Routes>
        </div>
          {/* <link rel="stylesheet" href={'flatly.css'}/> */}
      </div>

     

  </>
}

export default App;
