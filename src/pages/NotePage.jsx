import React , {useState,useEffect} from 'react'
import { useParams , useNavigate} from 'react-router-dom'
import {ReactComponent as ArrowLeft} from '../assests/arrow-left.svg'

const NotePage = (props) => {
    let {id} = useParams();
    let isLoggedIn = props.isLoggedIn;
    let [note,setNote] = useState({"text":'','title':''});
  
    
    const navigate = useNavigate();


    let apiHost =  'https://jam-notes-be.vercel.app' 

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      };
    
    useEffect( () => {
        if(isLoggedIn){
            getNote()    
        }
    },[id])


    let getNote = async () => {
        
        const options = {
            method: 'GET',
            headers: headers,
          };

        let response = await fetch(apiHost + `/api/note/${id}`,options)
        let data = await response.json()
    
        setNote(data)
    }

    let updateNote = async () =>{
        const options = {
            method: 'PATCH',
            headers: headers,
            body:JSON.stringify({
                "title":note.title,
                "text":note.text
            })
          };

        await fetch(apiHost + `/api/note/${id}/`,options)
    }
    
    let deleteNote = async () => {
        if (isLoggedIn){
            const options = {
                method: 'DELETE',
                headers: headers,
            };
            await fetch(apiHost + `/api/note/${id}/`,options)
        }
        navigate(-1);
    }

    let handleSubmit = () =>{
        if (isLoggedIn){
            
            if (note.title === '' && note.text === '' ){
                deleteNote()
            }else {     
                updateNote()         
            }               
        }
        navigate(-1);      
    }
    
    return <>

            <div className='note container my-3'>
                <div className='d-flex'>
                    <input type="text" defaultValue={note?.title} onInput={(e) =>{setNote({...note,'title':e.target.value})}} placeholder='title'/>
                    <h1>
                        <ArrowLeft className='arrow-left' onClick={handleSubmit}  />
                    </h1>
                </div>
                <textarea onInput={(e) =>{setNote({...note,'text':e.target.value})}} defaultValue={note?.text} placeholder='your note'></textarea>

                <button type="button" className="btn btn-outline-danger" onClick={deleteNote} >Delete</button>

            </div>
     
        </>
}

export default NotePage