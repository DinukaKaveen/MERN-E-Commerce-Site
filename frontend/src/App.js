import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarSeller from "./components/buyer/Navbar";
import Home from "./components/buyer/Home";
import About from "./components/buyer/About";
import Contact from "./components/buyer/Contact";

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
