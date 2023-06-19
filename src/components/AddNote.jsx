import React,{useState} from 'react'
import {ReactComponent as ArrowLeft} from '../assests/arrow-left.svg'
import { useNavigate} from 'react-router-dom'

const AddNote = () => {
    let [note,setNote] = useState({'title':'','text':''});
    let apiHost =  'https://jam-notes-be.vercel.app' 
    const navigate = useNavigate();
    
    let createNote = async () => {

        if (note.title !== '' || note.text !== '' ){
            await fetch(apiHost + `/api/note/`,{
                method:'POST',
                headers:{
                    "Content-type":'application/json'
                },
                body:JSON.stringify(note)
            })
        }   
        navigate('/');
    }
    
    return <>
            <div className='note'>
                <div className='d-flex'>
                    <input type="text" onChange={(e) =>{setNote({...note,'title':e.target.value})}} placeholder='title'/>
                    <h1>
                        
                        <ArrowLeft className='arrow-left' onClick={createNote} />
                        
                    </h1>
                </div>
                <textarea onChange={(e) =>{setNote({...note,'text':e.target.value})}}  placeholder='your note'></textarea>
                <button type="button" className="btn btn-outline-success" onClick={createNote} >Done</button>
            </div>
                
            </>
}

export default AddNote