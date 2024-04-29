import React from "react";
import Notes from "./Notes";
import AddNote from "./AddNote";
const Home = () => {
  return (
    <div>
      {/* <hr /> */}
      <h1 className="text-center mt-4">Hi Welcome to Jumbo Notes</h1>
      <h6 className="text-center  mt-2 mb-4">
        Keep your notes secure and easily accessible and managed.
      </h6>
      <hr />
      <AddNote/>
      <Notes />
    </div>
  );
};

export default Home;
