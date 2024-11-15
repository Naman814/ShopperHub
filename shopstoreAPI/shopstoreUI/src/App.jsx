import React from "react";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { useSelector } from "react-redux";
import{
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import Success from "./pages/Success";

const App=()=>{
    const user = useSelector((state) => state.user.currentUser);
    return  (
        <Router>
        <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success/>} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/login" element={user ? <Navigate to="/" />:<Login />} />
        </Routes>
        </Router>
    );
}

export default App;