import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";

const AddNote = () => {
  const navigate = useNavigate();
  const { addNote } = useContext(NoteContext);
  const [note, setNote] = useState({ title: "", note: "", tag: "General" });

  const handleAddNote = (event) => {
    event.preventDefault();
    addNote(note.title, note.note, note.tag);
    setNote({ title: "", note: "", tag: "General" });
    navigate("/");
  };

  const handleChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };

  return (
    <div className="container">
      {/* Button to trigger modal */}
      <button
        className="btn btn-outline-dark mb-2"
        data-bs-toggle="modal"
        data-bs-target="#AddNoteModal"
      >
        + Add Note
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id="AddNoteModal"
        tabIndex="-1"
        aria-labelledby="AddNoteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="AddNoteModalLabel">
                Add a Note
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
              <form onSubmit={handleAddNote}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={note.title}
                    onChange={handleChange}
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
                    value={note.note}
                    onChange={handleChange}
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
                    value={note.tag}
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
  );
};

export default AddNote;
