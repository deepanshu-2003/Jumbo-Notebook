import NoteContext from "./noteContext";
import React, {  useState} from "react";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const [notes,setNotes] = useState([]);
  const fetchAllNotes = async()=>{
    // API calls
    const url = `${host}/notes`;
    const headers = {
      'auth_token': localStorage.getItem('token'),
      'Content-Type': 'application/json'
    }
    const response = await fetch(url, {
      method: 'GET',
      headers
    })
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };
  const addNote = async(title,note,tag) =>{
    // API calls
    const url = `${host}/notes/create-note`;
    const headers = {
      "auth_token": localStorage.getItem('token'),
      "Content-Type": "application/json"
    };
    if(tag === ''){
      tag = 'General';
    }
    try{

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({title,note,tag})
      });
      if(!response.ok){
        console.log(response.status);
      }
    }catch(error){
      console.log(error)
    }
  };

  const editNote =async (_id,title,note,tag)=>{
    // API calls
    const url = `${host}/notes/update/${_id}`;
    const headers = {
      'auth_token': localStorage.getItem('token'),
      'Content-Type': 'application/json'
    }
    const newNote = {title,note,tag};
    await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(newNote)
  })
    // Logic to edit the note
    for (let i = 0; i < notes.length; i++) {
      let element = notes[i];
      if(element._id === _id){
        element.title=title;
        element.note = note;
        element.tag = tag;
      }
    }
  };

  const deleteNote = async(_id)=>{
    const url = `${host}/notes/delete/${_id}`;
    const headers = {
      'auth_token': localStorage.getItem('token'),
      'Content-Type': 'application/json'
    }
    await fetch(url, {
      method: 'POST',
      headers,
      body:null
  })
  };

  return (
    <NoteContext.Provider value={{notes,setNotes,addNote,editNote,deleteNote,fetchAllNotes}}>{props.children}</NoteContext.Provider>
  );
};

export default NoteState;