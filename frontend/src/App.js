import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarSeller from "./components/seller/Navbar";
import Home from "./components/seller/Home";
import About from "./components/seller/About";
import Contact from "./components/seller/Contact";

function App() {
  return (
    <BrowserRouter>
      <NavbarSeller />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
