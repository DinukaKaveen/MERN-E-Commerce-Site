import './css/UserLogin.css';
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

axios.defaults.withCredentials = true;

function UserLogin() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const onInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:8000/login", loginData)
      .then((response) => {
        if (response.data.success) {
          window.location.href = "/admin/products";
          /*
          const decodeToken = jwtDecode(response.data.token);
          const userRole = decodeToken.role;
          switch (userRole) {  
            case 'admin':
                navigate('/getAll');
                break;
            case 'user':
                navigate('/createPost');
                break;
            default:
                console.error('Unknown role');
                setMessage('Invalid role');
          */
        } else {
          setMessage(response.data.message);
        }
      })
      .catch((error) => {
        const errorMessage = error.response
          ? error.response.data.message
          : "Network error";
        setMessage(errorMessage);
      });
  };

  return (
    <div className='form'>
      <div className='message'>{message}</div>

      <Form onSubmit={(e) => submit(e)}>
        <h2 className="form-title">Admin Login</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            id="email"
            value={loginData.email}
            onChange={(e) => onInputChange(e)}
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            id="password"
            value={loginData.password}
            onChange={(e) => onInputChange(e)}
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      
    </div>
  );
}

export default UserLogin;
