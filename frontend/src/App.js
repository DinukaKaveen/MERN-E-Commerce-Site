import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/buyer/Home";
import About from "./components/buyer/About";
import Contact from "./components/buyer/Contact";
import UserLogin from "./components/admin/UserLogin";
import AdminHome from "./components/admin/AdminHome";
import CreateProduct from "./components/admin/CreateProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import UserProfile from "./components/admin/UserProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="admin/" element={<UserLogin />} />
        <Route path="admin/products" element={<AdminHome />} />
        <Route path="admin/create_product" element={<CreateProduct />} />
        <Route path="admin/update_product/:id" element={<UpdateProduct />} />
        <Route path="admin/user_profile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
