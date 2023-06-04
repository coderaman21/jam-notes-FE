import './App.css';
import Header from './components/Header'
import NoteListPage from './pages/NoteListPage'
import NotePage from './pages/NotePage'
import { BrowserRouter,Route,Routes} from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
        
        <Header/>
        
          <div className='container my-3'>
            <Routes>

              <Route path='/' element={<NoteListPage/>} /> 
              <Route path='/note/:id' element={<NotePage/>}  />

            
            </Routes>
          </div>
   

    </BrowserRouter>
  );
}

export default App;
