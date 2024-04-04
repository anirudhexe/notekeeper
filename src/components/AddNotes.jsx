import React, { useContext, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';


function AddNotes(props) {
    const context = useContext(NoteContext);  /* Initialize the context api that we created in NoteState.jsx */ 

    const { addnotes } = context;  /* Destructuring */

    const [note, setnote] = useState({title: '', description: '', tag: ''});    

    const handleSubmit=(e)=>{
        e.preventDefault();
        addnotes(note.title,note.description);
        props.showAlert("Note added succesfully",'success');
    }
      
    const handleChange=(e)=>{
        setnote({...note, [e.target.name]: e.target.value}); /* Spread operator keeps the current array of notes without overwriting it and the code after that says whichever property is changed (title/description) be changed accordingly */
    }
  return (
    <div >
        <div className="container my-4 mx-3">
      <h3>Add a note</h3>
      <div class="mb-3">
        <label for="title" class="form-label">
          Title
        </label>
        <input
          type="text"
          class="form-control"
          id="title"
          name='title'
          placeholder="Enter title here"
          onChange={handleChange}
        />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">
          Note
        </label>
        <div class="form-floating" >
          <textarea class="form-control" type="text" id="description" name="description" onChange={handleChange} style={{height:'100px'}}></textarea>
          <label for="floatingTextarea2">Enter note here</label>
        </div>
      </div>
      <div class="mb-3">
        <label for="title" class="form-label">
          Tag(optional)
        </label>
        <input
          type="text"
          class="form-control"
          id="tag"
          name='tag'
          placeholder="Enter tag here"
          onChange={handleChange}
        />
      </div>
      <button className="btn btn-primary" onClick={handleSubmit} disabled={note.title.length<3 || note.description.length<3}>Add note</button>
      </div>
    </div>
  )
}

export default AddNotes