import React,{useState,useEffect} from 'react'
import {ReactComponent as ArrowLeft} from '../assests/arrow-left.svg'
import { useNavigate} from 'react-router-dom'

const AddNote = (props) => {
    let [note,setNote] = useState({'title':'','text':''});
    let isLoggedIn = props.isLoggedIn;
    let apiHost =  'http://127.0.0.1:8000'

    let [notLoggedInMsg,setNotLoggedInMsg] = useState('')

    const navigate = useNavigate();
    useEffect ( () =>{
        if (!isLoggedIn){
            setNotLoggedInMsg('You are not Logged in , please login to view your notes')
        }

    })

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
                    <input type="text" value={notLoggedInMsg} onChange={(e) =>{setNote({...note,'title':e.target.value})}} placeholder='title'/>
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