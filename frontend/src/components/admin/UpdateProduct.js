import axios from "axios";
import "./css/UpdateProduct.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBarAdmin from "./NavBar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
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

  useEffect(() => {
    protectedRoute();
  }, []);

  const protectedRoute = async () => {
    await axios
      .get("http://localhost:8000/protected")
      .then((response) => {
        if (response.data.protected) {
          setUser(response.data.user);
          loadProduct();
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        navigate("/");
        console.error(error);
      });
  };

  const onInputChange = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const loadProduct = async () => {
    await axios
      .get(`http://localhost:8000/get_product/${id}`)
      .then((response) => {
        if (response.data.success) {
          setProductDetails(response.data.product);
        }
      })
      .catch((error) => {
        setMessage(error);
      });
  };

  const submit = async (e) => {
    e.preventDefault();

    await axios
      .put(`http://localhost:8000/update_product/${id}`, productDetails)
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
        <h2>Update Product</h2>

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
              onChange={(e) => onInputChange(e)}
              placeholder=""
            />
            <Form.Control
              type="text"
              name="createdDate"
              value={productDetails.createdDate}
              placeholder=""
              required
              disabled
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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

export default UpdateProduct;
