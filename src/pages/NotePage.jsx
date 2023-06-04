import React , {useState,useEffect} from 'react'
import { useParams} from 'react-router-dom'

const NotePage = ( ) => {
    let {id} = useParams();
    let [note,setNote] = useState(null);
    
    useEffect( () => {
        getNote()

    },[id])

    let apiHost = process.env.REACT_APP_BACKEND_URL 

    let getNote = async () => {
        let response = await fetch(apiHost + `/api/note/${id}`)
        let data = await response.json()
    
        setNote(data)
    }

    return <>
            <div className='note'>
                <textarea defaultValue={note?.text}></textarea>
            </div>
                
        </>
}

export default NotePage