import React, { useState } from "react"
import NoteContext from "./NoteContext"

const Notestate=(props)=>{
    const host='http://localhost:5000/api';
    const [notes, setnotes] = useState([]); /*In this case We want to to provide the (notes and a functions that will update the notes) to the rest of the components so the state of the components is unified*/

    //fetch notes
    const fetchAllNotes=async()=>{
        //API call (copy syntax from net)
        const response=await fetch(`${host}/notes/fetchallnotes`,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            }
        });
        const json = await response.json();
        console.log(json);
        setnotes(json);
    }

    //Add notes
    const addnotes=async(title,description,tag)=>{
        //API call (copy syntax from net)
        const response=await fetch(`${host}/notes/addnotes`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            },
            body:JSON.stringify({title,description,tag})
        });
        const json = await response.json();
        setnotes(notes.concat(json));
    }

    //Edit notes
    const editnotes=async(id, title, description,tag)=>{
        //API call (copy syntax from net)
        const response=await fetch(`${host}/notes/updatenote/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            },
            body:JSON.stringify({title,description,tag})
        });
        const json = await response.json();
        

        //logic to edit in client side
        let newNotes=JSON.parse(JSON.stringify(notes));
        for (let i = 0; i < newNotes.length; i++) {
            const element = newNotes[i];
            if(element._id===id){
                element.title=title;
                element.description=description;
                element.tag=tag;
                break;
            }
        }
        setnotes(newNotes)
    }
    //Delete notes
    const deletenotes=async(id)=>{
        //API call (copy syntax from net)
        const response=await fetch(`${host}/notes/deletenote/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            },
        });
        const newNotes=notes.filter((note)=>{return note._id!==id}) //newNotes is an array of notes containing all the notes except the note with the matching id as the parameter
        setnotes(newNotes);
    }

    return(
        /*value means the thing that we want to provide to the other components, refer to the above comment line*/
        <NoteContext.Provider value={{notes, addnotes,deletenotes,editnotes, fetchAllNotes}}> 
            {props.children}
        </NoteContext.Provider>
    )
}

export default Notestate;