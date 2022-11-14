// STYLE CSS
import "./App.css";

// MES DEPENDANCES
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

/// MES PAGES
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Offerslist from "./pages/Offerslist";

// MES COMPONENTS
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [product, setProduct] = useState("");

  const transferToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token, { expires: 1 });
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };

  return (
    <Router>
      <Header
        token={token}
        transferToken={transferToken}
        product={product}
        setProduct={setProduct}
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home product={product} />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/Offers"
          element={<Offerslist product={product} setProduct={setProduct} />}
        />
        <Route
          path="/login"
          element={<Login transferToken={transferToken} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
