import { Link } from "react-router-dom";
import "./nevbar.css";

function Nevber({ tab, setTab, product, cart, setToken }) {
  return (
    <div className="Nev-container">
      <Link to="/home">
        <button
          className={`btn ${
            tab === "home" ? "btn-primary" : "btn-outline-primary"
          }`}
        >
          Home
        </button>
      </Link>

      <Link to="/calculator">
        <button
          className={`btn ${
            tab === "calculator" ? "btn-primary" : "btn-outline-primary"
          }`}
        >
          Calculator
        </button>
      </Link>

      <Link to="/components">
        <button
          className={`btn ${
            tab === "components" ? "btn-primary" : "btn-outline-primary"
          }`}
        >
          Components
        </button>
      </Link>

      <Link to="/todo">
        <button
          className={`btn ${
            tab === "todo" ? "btn-primary" : "btn-outline-primary"
          }`}
        >
          Todo
        </button>
      </Link>

      <Link to="/products">
        <button
          className={`btn ${
            tab === "products" ? "btn-primary" : "btn-outline-primary"
          }`}
        >
          Products ({product.length})
        </button>
      </Link>

      <Link to="/carts">
        <button
          className={`btn position-relative ${
            tab === "carts" ? "btn-primary" : "btn-outline-primary"
          }`}
        >
          Carts
          {cart.length > 0 && (
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cart.length < 10 ? cart.length : '9+' }
              <span class="visually-hidden">unread messages</span>
            </span>
          )}
        </button>
      </Link>

      <button className="btn btn-outline-danger" onClick={()=>{
        setToken('')
      }}>Logout</button>
    </div>
  );
}

export default Nevber;
