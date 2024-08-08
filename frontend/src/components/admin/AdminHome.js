import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

axios.defaults.withCredentials = true;

function AdminHome() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    protectedRoute();
  }, []);

  const protectedRoute = async () => {
    await axios
      .get("http://localhost:8000/protected")
      .then((response) => {
        if (response.data.protected) {
          loadProducts();
          setUser(response.data.user);
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
          <label className="inline-flex items-center mb-5 cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              onChange={() => checkboxChange(row._id, row.activeStatus)}
              defaultChecked={row.activeStatus === "Active"}
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
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
          <Link
            to={`/update_product/${row._id}`}
            type="button"
            className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 font-medium rounded-lg px-2.5 py-1.5 text-sm text-center mr-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400"
          >
            Update
          </Link>

          <button
            type="button"
            onClick={() => deleteProduct(row._id)}
            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 font-medium rounded-lg px-2.5 py-1.5 text-sm text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600"
          >
            Delete
          </button>
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
      <NavBar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <nav className="flex mb-4" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <a
                  href="/products"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                  </svg>
                  Home
                </a>
              </li>
            </ol>
          </nav>
          <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-gray-700">
            Products
          </h2>
          <p className="text-xl text-gray-900 font-extralight dark:text-white">
            Manage and Add New Product
          </p>

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
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    value={searchText}
                    onChange={handleSearch}
                    type="search"
                    id="search"
                    className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-50 dark:border-gray-300 dark:placeholder-gray-500 dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search"
                  />
                </div>
              </div>
            }
          ></DataTable>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
