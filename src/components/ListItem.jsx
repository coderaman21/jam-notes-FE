import React from 'react'
import { Link } from 'react-router-dom'

const ListItem = ({note}) => {
  
  return <>
        <Link to={`/note/${note.id}`}>
          <div className="list-group">
            <div  className="list-group-item list-group-item-action flex-column align-items-start ">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{note.title}</h5>
                {/* <small>{note.updated_at}</small> */}
              </div>
              <p className="mb-1">{note.text}</p>
             
            </div>
          </div>
            
        </Link>
      </>
  
}

export default ListItem