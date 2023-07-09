import React, {useState,useEffect} from 'react'
import ListItem from '../components/ListItem'


const NoteListPage = (props) => {
    let [notes,setNotes] = useState([]);
    let isLoggedIn = props.isLoggedIn;

    useEffect(()=> {
        if (isLoggedIn){
            getNotes()
        }else {
            setNotes( [ {
                    "id": 1,
                    "title": "Dummy note , please login to add your notes.",
                    "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. \nLorem Ipsum has been the industry's standard dummy text ever since the 1500s, \nwhen an unknown printer took a galley of type and scrambled it to make a type specimen book\n. It has survived not only five centuries,If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.",
                    "theme": "",
                    "created_at": "2023-07-09T11:08:16.748149Z",
                    "updated_at": "2023-07-09T11:18:01.008729Z",
                    "user": 1
                }]
            )
        }
    }, [])

    let apiHost =  'https://jam-notes-be.vercel.app'
    
    let getNotes = async () =>{

        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          };
    
        const options = {
            method: 'GET',
            headers: headers,
          };
        let response = await fetch(apiHost + '/api/note',options)
        let data = await response.json()
      
        setNotes(data)
    }

    return (
        <div className='container my-3'>
            <div className="notes-header">
                <h4 className="notes-title">&#9782; Notes</h4>
                <p className="notes-count">{notes.length}</p>
            </div>
            
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