import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
/* import Login2 from './views/Login2'; */
import Login from './views/Login';
import HomePage from './views/HomePage';
import Products from './views/Products';
import About from './views/About';
import Contact from './views/Contact';
import Register from "./views/Login";
import Users from "./views/Users";
import EditProduct from "./views/EditProduct";


function App() {

  const checkForInactivity = () => {
    const expireTime = localStorage.getItem("expireTime");

    const timeRemaining = (expireTime - (Date.now() / 1000)) * 1000

    if(timeRemaining < Date.now()) {
      localStorage.removeItem("dataLogin");
      cookies.remove("TOKEN");
      cookies.remove("TIME");
    }    
  }


  const updateExpireTime  = () => {
    const expireTime = cookies.get('TIME') ? cookies.get('TIME') : null;
    localStorage.setItem("expireTime", expireTime);
  }

  useEffect(() => {
    
    if(!cookies.get('TOKEN')){
      localStorage.removeItem('dataLogin');
    }

    const interval = setInterval(() => {
      checkForInactivity();
    }, 2000);

    return () => clearInterval(interval);
  },[])

  useEffect(() => {
    updateExpireTime();

    window.addEventListener("scroll", updateExpireTime);
    window.addEventListener("mousemove", updateExpireTime);
    window.addEventListener("click", updateExpireTime);
    window.addEventListener("keypress", updateExpireTime);
    
    return () => {
      window.removeEventListener("scroll", updateExpireTime);
      window.removeEventListener("mousemove", updateExpireTime);
      window.addEventListener("click", updateExpireTime);
      window.addEventListener("keypress", updateExpireTime);
    }
  },[])

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/auth" element={<Login2 />} /> */}
          <Route path="/auth" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/edit/:id" element={<EditProduct />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
