import React from 'react'
import { Link } from 'react-router-dom'
import TextSlicer from './TextSlicer'

const ListItem = ({note}) => {
  const GetTime = (time)=>{
    return new Date(time).toLocaleDateString()
  }
  return <>
        <Link to={`/note/${note.id}`} style={{ textDecoration:'none' }}>
          <div className="list-group list-items">
            <div  className="list-group-item list-group-item-action flex-column align-items-start list-item " style={{backgroundColor:'honeydew'}}>
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{note.title}</h5>
                <p>{GetTime(note.updated_at)}</p>
              </div>
              <p className="mb-1"><TextSlicer text={note.text} maxLength={387}/></p>
              
            </div>
          </div>
            
        </Link>
      </>
  
}

export default ListItem