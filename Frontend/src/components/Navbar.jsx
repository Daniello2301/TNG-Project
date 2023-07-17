import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaUserAlt } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import Cookies from "universal-cookie";

const cookies = new Cookies();

import LogoHD from '../assets/Logo_bg.png';
import './styles/Navbar.css';
function NavBar() {

    const [dataLogin, setDataLogin] = useState({});
    const [role, setRole] = useState("");

    const logout = () => {
        cookies.remove('TOKEN');
        cookies.remove('TIME');
        localStorage.removeItem('dataLogin');
        localStorage.setItem('expireTime',null)
        window.location.href = '/';
    }

    useEffect(() => {
        setDataLogin(JSON.parse(localStorage.getItem('dataLogin')));
    },[]);


    useEffect(() => {
        setRole(dataLogin?.data?.user?.role)
    },[dataLogin]);

    return (
        <>
            <nav>
                <div className="logo">
                    <img src={LogoHD} alt="Logo" />
                </div>
                <ul>
                    <li>
                        <NavLink to={"/"} >Home</NavLink>
                        <NavLink to={"/products"} end> Products</NavLink>
                        {
                            role == "ADMIN" ? <NavLink to={"/users"}> Users </NavLink> : null
                        }
                        <NavLink to={"/about"} end> About Us</NavLink>
                        <NavLink to={"/contact"} end> Contact</NavLink>
                    </li>
                </ul>
                <div className="link-session">
                    {
                        dataLogin
                            ?
                            <div className="profile-actions">
                                <Link to={"#"}>
                                    <span> <FaUserAlt /></span>
                                    {dataLogin.data?.user.name || dataLogin.userData?.name}
                                </Link>
                                <button onClick={logout}><BiLogOut /></button>
                            </div>
                            :
                            <NavLink className="btn-login" to={'/auth'}>Login</NavLink>
                    }
                </div>
            </nav>
        </>
    )
}

export default NavBar