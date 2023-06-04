import React, {useState,useEffect} from 'react'
import ListItem from '../components/ListItem'

const NoteListPage = () => {
    let [notes,setNotes] = useState([]);

    useEffect(()=> {
        getNotes()

    }, [])

    let apiHost = process.env.REACT_APP_BACKEND_URL
    
    let getNotes = async () =>{
        let response = await fetch(apiHost + '/api/note')
        let data =await response.json()
      
        setNotes(data)
    }

    return (
        <div className='container'>
            <div className='p-2'>
                {notes.map((note,index) =>(
                    <div className='mb-3 '>
                        <ListItem key={index} note = {note}/>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default NoteListPage