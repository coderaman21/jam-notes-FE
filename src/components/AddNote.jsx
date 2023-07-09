import React,{useState} from 'react'
import {ReactComponent as ArrowLeft} from '../assests/arrow-left.svg'
import { useNavigate} from 'react-router-dom'

const AddNote = (props) => {
    let [note,setNote] = useState({'title':'','text':''});
    let isLoggedIn = props.isLoggedIn;
    let apiHost =  'https://jam-notes-be.vercel.app'

    const navigate = useNavigate();
 
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      };
    
    let createNote = async () => {
        const options = {
            method: 'POST',
            headers: headers,
            body:JSON.stringify(note)
          };

    
        await fetch(apiHost + `/api/note/`,options)
    }

    const  handleSubmit = () => {
        if (isLoggedIn){
            if (note.title !== '' || note.text !== '' ){
                createNote()
            }
        }
        navigate('/');
    }
    
    return <>
            <div className='note container my-3'>
                <div className='d-flex'>
                    <input type="text" value={note?.title} onChange={(e) =>{setNote({...note,'title':e.target.value})}} placeholder='title'/>
                    <h1>
                        
                        <ArrowLeft className='arrow-left' onClick={handleSubmit} />
                        
                    </h1>
                </div>
                <textarea onChange={(e) =>{setNote({...note,'text':e.target.value})}}  placeholder='your note'></textarea>
                <button type="button" className="btn btn-outline-success" onClick={handleSubmit} >Done</button>
            </div>
                
            </>
}

export default AddNote