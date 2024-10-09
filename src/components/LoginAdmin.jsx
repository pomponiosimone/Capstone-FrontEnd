import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/LoginAdmin.css';
const LoginAdmin = () => {

  /*const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault(); 

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
       
        alert('Login successful!');
       
      } else {
       
        alert(result.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
    
      alert('An error occurred. Please try again later.');
    }
  };*/
  return (
    <div className="containers">
        <div className="wrapper">
            <form>
                <h1>Login</h1>

                <div className="input-box">
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        placeholder="Enter email" 
                        required
                    />
                </div>

                <div className="input-box">
                    <input 
                        type="password" 
                        placeholder="Password" 
                        required
                    />
                    <i className="bx bxs-lock-alt"></i>
                </div>

                <div className="remember-forgot">
                    <label>
                        <input type="checkbox" /> Remember me
                    </label>
                    <a href="#">Forgot password?</a>
                </div>

                <button type="submit" className="btn">Login</button>

                <div className="register-link">
                    <p>Don't have an account? <a href="#">Register</a></p>
                </div>
            </form>
        </div>
    </div>
);}

export default LoginAdmin;


