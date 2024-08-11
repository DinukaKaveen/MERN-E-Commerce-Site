import axios from "axios";
import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavBarAdmin() {
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
        }
      })
      .catch((error) => {
        console.error(error);
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

  const signout = async () => {
    await axios
      .get("http://localhost:8000/sign_out")
      .then((response) => {
        if (response.data.signout) {
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/admin/products">Products</Nav.Link>
              <Nav.Link href="/admin/create_product">Create Product</Nav.Link>
            </Nav>
            <NavDropdown title={user.firstName} id="basic-nav-dropdown">
                <NavDropdown.Item href="/admin/user_profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#" onClick={signout}>
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBarAdmin;
