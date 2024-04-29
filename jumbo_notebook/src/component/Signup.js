import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const url = "http://localhost:5000/auth/create-user";
  const headers = {
    'Content-Type': 'application/json'
  }
  const navigate = useNavigate();
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Here you can perform validation and submit the data to your backend
    const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({ first_name:firstName,last_name:lastName,username,email, password }), // Add the closing parenthesis
      });
    if(response.ok){
        const json = await response.json();
        console.log(json);
        localStorage.setItem('token',json.auth_token);
        
        navigate('/');
    }
    else{
        console.log("Sign up  failed Babua")
        alert("some error occured maybe user already exist try with another username.");
    }
    // Reset form fields after submission if needed
    setFirstName('');
    setLastName('');
    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="container my-3">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center">Signup</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">First Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    value={firstName}
                    onChange={handleFirstNameChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">Last Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    value={lastName}
                    onChange={handleLastNameChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username:</label>
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
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password:</label>
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
                  <button type="submit" className="btn btn-success">Signup</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
