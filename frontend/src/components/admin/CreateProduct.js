import "./css/CreateProduct.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBarAdmin from "./NavBar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function CreateProduct() {
  const navigate = useNavigate();

  useEffect(() => {
    protectedRoute();
  }, []);

  const protectedRoute = async () => {
    await axios
      .get("http://localhost:8000/protected")
      .then((response) => {
        if (response.data.protected) {
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        navigate("/");
        console.error(error);
      });
  };

  const [message, setMessage] = useState("");
  const [productDetails, setProductDetails] = useState({
    productName: "",
    sku: "",
    createdDate: "",
    retailPrice: "",
    salePrice: "",
    lowestPrice: "",
    activeStatus: "",
  });

  const onInputChange = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:8000/new_product", productDetails)
      .then((response) => {
        if (response.data.success) {
          setMessage(response.data.message);
        } else {
          setMessage(response.data.message);
        }
      })
      .catch((error) => {
        setMessage(error);
      });
  };

  return (
    <div>
      <NavBarAdmin />
      <div className="product-form">
        <h2>Create New Product</h2>
        <h6>Add New Product</h6>

        <div>{message}</div>
        <br />

        <Form onSubmit={(e) => submit(e)}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="productName"
              id="productName"
              value={productDetails.productName}
              onChange={(e) => onInputChange(e)}
              placeholder=""
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>SKU</Form.Label>
            <Form.Control
              type="text"
              name="sku"
              id="sku"
              value={productDetails.sku}
              onChange={(e) => onInputChange(e)}
              placeholder=""
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Retail Price (Rs.)</Form.Label>
            <Form.Control
              type="text"
              name="retailPrice"
              id="retailPrice"
              value={productDetails.retailPrice}
              onChange={(e) => onInputChange(e)}
              placeholder=""
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Sale Price (Rs.)</Form.Label>
            <Form.Control
              type="text"
              name="salePrice"
              id="salePrice"
              value={productDetails.salePrice}
              onChange={(e) => onInputChange(e)}
              placeholder=""
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Lowest Price (Rs.)</Form.Label>
            <Form.Control
              type="text"
              name="lowestPrice"
              id="lowestPrice"
              value={productDetails.lowestPrice}
              onChange={(e) => onInputChange(e)}
              placeholder=""
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Created Date</Form.Label>
            <Form.Control
              type="date"
              name="createdDate"
              id="createdDate"
              value={productDetails.createdDate}
              onChange={(e) => onInputChange(e)}
              placeholder=""
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Product Status</Form.Label>
            <Form.Select
              name="activeStatus"
              id="activeStatus"
              value={productDetails.activeStatus}
              onChange={(e) => onInputChange(e)}
              aria-label="Default select example"
              required
            >
              <option>Open this select menu</option>
              <option value="Active">Active</option>
              <option value="Not Active">Inactive</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default CreateProduct;
