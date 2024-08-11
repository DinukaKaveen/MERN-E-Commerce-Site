import axios from "axios";
import Form from "react-bootstrap/Form";
import "./css/UserProfile.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBarAdmin from "./NavBar";

function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  useEffect(() => {
    protectedRoute();
  }, []);

  const protectedRoute = async () => {
    await axios
      .get("http://localhost:8000/protected")
      .then((response) => {
        if (response.data.protected) {
          getUser(response.data.user._id);
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error(error);
        navigate("/");
      });
  };

  const getUser = async (id) => {
    await axios
      .get(`http://localhost:8000/get_user/${id}`)
      .then((response) => {
        if (response.data.getUser) {
          setUser(response.data.user);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <NavBarAdmin />
      <div className="profile-form">
        <h2>User Details</h2>
        <br />

        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              id="firstName"
              value={user.firstName}
              placeholder=""
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              id="lastName"
              value={user.lastName}
              placeholder=""
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              id="email"
              value={user.email}
              placeholder=""
            />
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default UserProfile;
