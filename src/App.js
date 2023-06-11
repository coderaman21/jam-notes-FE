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

function App() {
  const [stylesheet, setStylesheet] = useState('flatly.css');
  const [isLoggedIn , setIsLoggedIn] = useState(false)
 
  let changeTheme = (selectedTheme) =>{
    setStylesheet(selectedTheme)
  }

  return <>

      <div>

        <Header changeThemeFunc={changeTheme} isLoggedIn={isLoggedIn} setloggedIn={setIsLoggedIn}/>
        <div className='container my-3'>
         
            <Routes>
              
              <Route path='/' element={<NoteListPage />} /> 
              <Route path='/note/:id' element={<NotePage/>}  />
              <Route path='/note/add' element={<AddNote/>}  />
           
              <Route path='/login' element={<LoginPage/>}/>

            </Routes>
           
        
        </div>
          {/* <link rel="stylesheet" href={'flatly.css'}/> */}
      </div>

  </>
}

export default App;
