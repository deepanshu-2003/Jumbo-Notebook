import React, { useContext} from "react";
import NoteContext from "../context/notes/noteContext";

const noteCardStyle = {
  marginBottom: "20px",
};

const cardStyle = {
  borderLeft: "5px solid #b270db",
  transition: "all 0.3s ease",
};

const tagStyle = {
  fontSize: "1.0rem",
  backgroundColor: "#b270db",
  color: "#fff",
  padding: "3px 6px",
  borderRadius: "6px",
  minWidth: "12px", // Ensures minimum width
  maxWidth: "150px", // Limits maximum width
};

const dateStyle = {
  fontSize: "0.8rem",
  color: "#777",
};

const NoteItem = ({ note , updateNote}) => {
  const {deleteNote} = useContext(NoteContext);
  // const navigate = useNavigate();
  const handle_del = ()=>{
    deleteNote(note._id);
  };
  
  return (
    <div className="col-md-4">
      <div className="note-card" style={noteCardStyle}>
        <div className="card" style={cardStyle}>
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.note}</p>
            <div className="tag fw-bold" style={tagStyle}>
              {note.tag}
            </div>
            <div className="date" style={dateStyle}>
              {note.date}
            </div>
            <div className="container">
              <div className="row g-3">
                <div className="col-4"></div>
                <div className="col-6 d-flex justify-content-end">
                  <div className="col-2 px-0 text-right">
                    <button
                      className="d-flex px-0 me-0 justify-content-end btn fa-solid fa-pen-to-square"
                      onClick={()=>{updateNote(note)}}
                    ></button>
                  </div>
                  <div className="col-2 px-0 text-right">
                    <button
                      className="d-flex px-0 ms-5 justify-content-end btn fa-solid fa-trash"
                      onClick={handle_del}
                    ></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
