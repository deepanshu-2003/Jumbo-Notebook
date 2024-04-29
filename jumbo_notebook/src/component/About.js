import React,{ useContext } from "react";
import NoteContext from "../context/notes/noteContext";
const About = () => {
  const a = useContext(NoteContext);
  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="card my-3" style={{ width: "40rem" }}>
        <div className="card-body">
          <h5 className="card-title text-center">About Jumbo Notebook {a.desc}</h5>
          <hr/>

          <h6 className="card-subtitle mb-2 text-body-secondary">
            Jumbo Notebook: Simple, secure note-taking web app. Organize, edit
            notes with ease. Accessible, collaborative, and intuitive. Your
            notes, your way.
          </h6>
          <hr/>
          <p className="card-text">
            Jumbo Notebook is a dynamic digital platform engineered to redefine
            the art of note-taking. Seamlessly blending simplicity with robust
            functionality, our user-centric application empowers individuals and
            teams to capture, organize, and share ideas effortlessly. With
            intuitive features such as customkkmizable categories, rich text
            editing, and real-time collaboration, Jumbo Notebook offers a
            tailored note-taking experience for every user. Our commitment to
            security is unwavering, employing advanced encryption techniques to
            safeguard sensitive information. Whether you're a student,
            professional, or creative thinker, Jumbo Notebook adapts to your
            unique needs, providing a reliable companion for brainstorming
            sessions, project planning, and daily tasks. Embrace the future of
            note-taking with Jumbo Notebook—where innovation meets simplicity,
            and productivity knows no bounds.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
