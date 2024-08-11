import "./css/AdminHome.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import NavBarAdmin from "./NavBar";

axios.defaults.withCredentials = true;

function AdminHome() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    protectedRoute();
  }, []);

  const protectedRoute = async () => {
    await axios
      .get("http://localhost:8000/protected")
      .then((response) => {
        if (response.data.protected) {
          loadProducts();
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        navigate("/");
        console.error(error);
      });
  };

  const checkboxChange = async (id, currentStatus) => {
    await axios
      .put(`http://localhost:8000/update_product_status/${id}`, {
        activeStatus: currentStatus === "Active" ? "Not Active" : "Active",
      })
      .then((response) => {
        if (response.data.success) {
          alert(response.data.message);
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const loadProducts = async () => {
    const result = await axios.get("http://localhost:8000/view_products");
    setProducts(result.data.products);
  };

  const deleteProduct = async (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (shouldDelete) {
      await axios.delete(`http://localhost:8000/delete_product/${id}`);
      loadProducts();
    }
  };

  const columns = [
    {
      name: "Active",
      sortable: false,
      selector: (row) => (
        <div>
          <label>
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              onChange={() => checkboxChange(row._id, row.activeStatus)}
              defaultChecked={row.activeStatus === "Active"}
            />
          </label>
        </div>
      ),
    },
    {
      name: "Product Name",
      selector: (row) => row.productName,
      sortable: true,
    },
    {
      name: "SKU",
      selector: (row) => row.sku,
      sortable: true,
    },
    {
      name: "Created Date",
      selector: (row) => row.createdDate,
      sortable: true,
    },
    {
      name: "Retail Price",
      selector: (row) => row.retailPrice,
      sortable: true,
    },
    {
      name: "Sale Price",
      sortable: true,
      selector: (row) => row.salePrice,
    },
    {
      name: "Lowest Price",
      sortable: true,
      selector: (row) => row.lowestPrice,
    },
    {
      name: "Action",
      width: "180px",
      selector: (row) => (
        <div>
         <Button
            className="update-btn"
            href={`/admin/update_product/${row._id}`}
            variant="warning"
            size="sm"
          >
            Update
          </Button>

          <Button
            className="delete-btn"
            onClick={() => deleteProduct(row._id)}
            variant="danger"
            size="sm"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const [searchText, setSearchText] = useState("");

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredData = products.filter(
    (item) =>
      item.productName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchText.toLowerCase()) ||
      item.createdDate.toLowerCase().includes(searchText.toLowerCase()) ||
      item.retailPrice.toLowerCase().includes(searchText.toLowerCase()) ||
      item.salePrice.toLowerCase().includes(searchText.toLowerCase()) ||
      item.lowestPrice.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <NavBarAdmin />
      <div className="products-table">
        <h2>Products</h2>
        <h6>Manage Products</h6>

        <DataTable
          columns={columns}
          data={filteredData}
          fixedHeader
          responsive
          highlightOnHover
          pagination
          subHeader
          subHeaderComponent={
            <div>
              <input
                value={searchText}
                onChange={handleSearch}
                type="search"
                id="search"
                placeholder="Search"
              />
            </div>
          }
        ></DataTable>
      </div>
    </div>
  );
}

export default AdminHome;
