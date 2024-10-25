import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/LoginAdmin.css';

const LoginAdmin = () => {  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
   

    const payload = {
      email: email,
      password: password
    };

    try {
      const response = await fetch('http://localhost:3002/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      

      if (response.ok) {
        localStorage.setItem('accessToken', result.accessToken); 
       
        navigate('/menuAdmin');
        alert('Login successful!');
      } else {
        alert(result.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Errore durante il login:', error); 
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="containers">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>

          <div className="input-box">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i className="bx bxs-lock-alt"></i>
          </div>


          <button type="submit" className="btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;