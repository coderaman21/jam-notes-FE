import React , {useState,useEffect} from 'react'
import { useParams , useNavigate} from 'react-router-dom'
import {ReactComponent as ArrowLeft} from '../assests/arrow-left.svg'

const NotePage = () => {
    let {id} = useParams();
    let [note,setNote] = useState(null);
    const navigate = useNavigate();
    
    useEffect( () => {
        getNote()
    },[id])

    let apiHost =  'https://jam-notes-be.vercel.app' 

    let getNote = async () => {
        
        let response = await fetch(apiHost + `/api/note/${id}`)
        let data = await response.json()
    
        setNote(data)
    }

    let updateNote = async () =>{
        await fetch(apiHost + `/api/note/${id}/`,{
            method:'PATCH',
            headers:{
                "Content-type":'application/json'
            },
            body:JSON.stringify({
                "title":note.title,
                "text":note.text
            })
        })
    }
    
    let deleteNote = async () => {
        await fetch(apiHost + `/api/note/${id}/`,{
            method:'DELETE',
          
        })
        navigate(-1);
    }
    let handleSubmit = () =>{
   
        if (note.title === '' && note.text === '' ){
            deleteNote()
        }
        else {
            updateNote()
            navigate(-1);
        }
    }
    
    return <>
            <div className='note'>
                <div className='d-flex'>
                    <input type="text" defaultValue={note?.title} onInput={(e) =>{setNote({...note,'title':e.target.value})}} placeholder='title'/>
                    <h1>
                        <ArrowLeft className='arrow-left' onClick={handleSubmit} />
                    </h1>
                </div>
                <textarea onInput={(e) =>{setNote({...note,'text':e.target.value})}} defaultValue={note?.text} placeholder='your note'></textarea>

                <button type="button" className="btn btn-outline-danger" onClick={deleteNote} >Delete</button>

            </div>
                
        </>
}

export default NotePage