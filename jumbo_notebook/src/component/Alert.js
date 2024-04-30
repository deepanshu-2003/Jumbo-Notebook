import React, { useContext } from "react";
import NoteContext from "../context/notes/noteContext";

const Alert = (props) => {
  const {clearAlert} = useContext(NoteContext);

  return (
    <>
      {(props.message !== '')?
        <div
          className={`alert alert-${props.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{props.message}</strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={()=>{clearAlert(props.message);}}
          ></button>
        </div>:<></>
      }
    </>
  );
};
Alert.defaultProps = {
  type: "info",
  message: "",
};

export default Alert;
