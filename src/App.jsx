import { useEffect, useState } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { fetchProducts } from "./data/products";
import Layout from "./layout/layouts/Layout";
import Home from "./Page/Home/Home";
import Todo from "./Page/Todo/Todo";
import Calculator from "./Page/Calculator/Calculator";
import Components from "./Page/components/components";
import Products from "./Page/Products/Product";
import Carts from "./Page/Cart/Cart";
import Login from "./Page/Login/login";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";

function App() {
  const [tab, setTab] = useState("");
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState([]);
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    async function importProduct() {
      let fetchedProduct = await fetchProducts();

      setProduct(fetchedProduct);
    }

    importProduct();
  }, []);

  if (token === "") {
    return <Login setToken={setToken} setRole={setRole} />;
  } else {
    return (
      <div className="app-container">
        <HashRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route
              element={
                <Layout
                  tab={tab}
                  setTab={setTab}
                  product={product}
                  cart={cart}
                  setToken={setToken}
                />
              }
            >
              <Route path="/home" element={<Home />} />
              <Route path="/todo" element={<Todo />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/components" element={<Components />} />
              <Route
                path="/products"
                element={
                  <Products product={product} cart={cart} setCart={setCart} />
                }
              />
              <Route
                path="/carts"
                element={<Carts cart={cart} setCart={setCart} />}
              />
            </Route>
          </Routes>
        </HashRouter>
      </div>
    );
  }
}

export default App;
