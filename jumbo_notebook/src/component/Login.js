import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/noteContext";
import Alert from "./Alert";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const url = "http://localhost:5000/auth/login";
  const navigate = useNavigate();
  const { setUser, fetchUsername, addAlert, alerts } = useContext(NoteContext);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      fetchUsername();
    } else {
      setUser("user");
    }
    
  });
  const headers = {
    "Content-Type": "application/json",
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ username, password }), // Add the closing parenthesis
    });
    if (response.ok) {
      const json = await response.json();
      console.log(json);
      localStorage.setItem("token", json.auth_token);
      navigate("/");
      addAlert("Welcome user", "success");
    } else {
      addAlert("Invalid credentials", "danger");
      console.log("Login failed Babua");
    }
    // Reset form fields after submission if needed
    setUsername("");
    setPassword("");
  };

  return (
    <>
      {alerts.map((alert) => {
        return <Alert message={alert.message} type={alert.type} />;
      })}
      <div className="container my-3">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header text-center">Login</div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={username}
                      onChange={handleUsernameChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password:
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-success">
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
