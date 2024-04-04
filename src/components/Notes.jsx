import React, {useContext, useEffect,useState} from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

function Notes(props) {
  const context = useContext(NoteContext);  /* Initialize the context api that we created in NoteState.jsx */ 

  const { notes, fetchAllNotes, editnotes } = context;  /* Destructuring */

  const [note, setnote] = useState({id:"",etitle: '', edescription: '', etag: ''});  //this is for update notes

  let navigate=useNavigate();

  const updateNote=(currNote)=>{
    setnote({id:currNote._id,etitle : currNote.title, edescription: currNote.description, etag: currNote.tag})
  }


  useEffect(() => {
    if(localStorage.getItem('token'))
      fetchAllNotes();
    else
      navigate('/login');
      //eslint-disable-next-line
    },[]) 

  const handleSubmit=(e)=>{
      e.preventDefault();
      editnotes(note.id, note.etitle,note.edescription,note.etag);
      props.showAlert('Note updated successfully','success');
  }
    
  const handleChange=(e)=>{
      setnote({...note, [e.target.name]: e.target.value}); /* Spread operator keeps the current array of notes without overwriting it and the code after that says whichever property is changed (title/description) be changed accordingly */
  }

  
  return (
    <>
      <div className="row my-3 mx-3">
        <h3>Your notes</h3>
        <div className="container">
          {notes.length===0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
            return <NoteItem key={note._id} note={note} updateNote={updateNote}/>
        })}
      </div>
      <Modal note={note} handleChange={handleChange} handleSubmit={handleSubmit}/>
    </>
  );
}

export default Notes;
