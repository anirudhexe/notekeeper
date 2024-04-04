import React, { useContext } from 'react';
import NoteContext from "../context/notes/NoteContext";

function NoteItem(props) {
    const context=useContext(NoteContext);
    const{deletenotes}=context;
    const {note, updateNote}=props;
  return (
    <div className='col-md-3'>
        <div className="card my-3"> 
            <div className="card-body">
                <h5 class="card-title">{note.title}</h5>
                <p class="card-text">{note.description}</p>
                <i class="fa-regular fa-trash-can " style={{color: '#000000', cursor:'pointer'}} onClick={()=>{deletenotes(note._id)}}></i>
                <i class="fa-regular fa-pen-to-square mx-3" style={{color: '#000000', cursor:'pointer'}} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{updateNote(note)}}></i>
            </div>
        </div>
    </div>
  )
}

export default NoteItem;

        
