import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
// import { useNavigate } from "react-router-dom";

const Notes = () => {
  const { notes, fetchAllNotes,editNote,fetchUsername,setUser,addAlert,setNotes } = useContext(NoteContext);
  const [enote,setEnote] = useState({_id:'',title:'',note:'',tag:''})
  // const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('token')===null){
      addAlert("Please Login with an account first","danger");
    }
  },[]);
  useEffect(() => {
    if(localStorage.getItem('token')!==null){
      fetchAllNotes();
      fetchUsername();
      
    }
    else{
      // navigate('/login');
      setUser('user');
      setNotes([]);
    }
  });

  const uref = useRef('null');
  const handleChange = (event) => {
    setEnote({ ...enote, [event.target.name]: event.target.value });
  };
  const handleEditNote = (event)=>{
    event.preventDefault();
    editNote(enote._id,enote.title,enote.note,enote.tag);
  }
  const updateNote = (note) => {
    uref.current.click();
    setEnote({_id:note._id,title:note.title,note:note.note,tag:note.tag});
  };
  return (
    <>
      <div className="container">
        {/* Button to trigger modal */}
        <button
          ref={uref}
          className="btn btn-outline-dark mb-2 d-none"
          data-bs-toggle="modal"
          data-bs-target="#EditNoteModal"
        ></button>

        {/* Modal */}
        <div
          className="modal fade"
          id="EditNoteModal"
          tabIndex="-1"
          aria-labelledby="EditNoteModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="EditNoteModalLabel">
                  Edit Note
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {/* Form inside modal */}
                <form onSubmit={handleEditNote}>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      onChange={handleChange}
                      value={enote.title}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="note" className="form-label">
                      Note:
                    </label>
                    <textarea
                      className="form-control"
                      id="note"
                      name="note"
                      rows="4"
                      onChange={handleChange}
                      value={enote.note}
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tag" className="form-label">
                      Tag (optional):
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="tag"
                      name="tag"
                      value={enote.tag}
                      onChange={handleChange}
                    />
                  </div>
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-success"
                  >
                    Add Note
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {notes.map((note) => {
            return (
              <NoteItem key={note._id} note={note} updateNote={updateNote} />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
