import { Outlet, useLocation } from "react-router";
import Header from "../header/header";
import Footer from "../footer/footer";
import Nevbar from "../Nevbar/nevbar";
import { useEffect } from "react";

import './Layout.css'

function Layout({ tab, setTab, product, cart, setToken  }) {
  const location = useLocation(); 
  
  useEffect(() => {
    const currentPath = location.pathname.split("/")[1]; 
    setTab(currentPath || "home"); 
  }, [location, setTab]); 

  return (
    <div className="layout-container">
      <Header />
      <Nevbar tab={tab} setTab={setTab} product={product} cart={cart} setToken={setToken} />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
