// STYLE CSS
import "./App.css";

// MES DEPENDANCES
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";

/// MES PAGES
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Offerslist from "./pages/Offerslist";
import Publish from "./pages/Publish";
import OfferPay from "./pages/OfferPay";

// MES COMPONENTS
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const stripePromise = loadStripe(
    "pk_test_51M4MDxA8Ul5iUrmk1XQfbXmRypvDS8nbtKRULjHO4jCBWHUIKMZoElkbUUbGdQlQdBbDfyTw3vzzR8R4LNFxYRSV00VcdfdYbN"
  );

  const [token, setToken] = useState(Cookies.get("token") || null);
  const [product, setProduct] = useState("");

  const transferToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token, { expires: 1 });
    } else {
      Cookies.remove("token");
      setToken(null);
    }
  };

  const DemoLog = async () => {
    try {
      const response = await axios.post(
        "https://site--backend-vinted--6qn7tv96v7tt.code.run/user/login",
        {
          email: "demouser@demo",
          password: "password",
        }
      );
      const token = response.data.token;
      transferToken(token);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Router>
      <Header
        token={token}
        transferToken={transferToken}
        product={product}
        setProduct={setProduct}
        setToken={setToken}
      />
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              product={product}
              setProduct={setProduct}
              DemoLog={DemoLog}
              token={token}
            />
          }
        />
        <Route path="/offer/:id" element={<Offer />} />
        <Route
          path="/offer/pay"
          element={
            token ? (
              <Elements stripe={stripePromise}>
                <OfferPay token={token} />
              </Elements>
            ) : (
              <Signup />
            )
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/Offers"
          element={<Offerslist product={product} setProduct={setProduct} />}
        />
        <Route
          path="/publish"
          element={token ? <Publish token={token} /> : <Signup />}
        />
        <Route
          path="/login"
          element={<Login transferToken={transferToken} token={token} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
