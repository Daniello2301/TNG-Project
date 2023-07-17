import { useState } from 'react';
import { Link } from 'react-router-dom'
import Cookies from "universal-cookie";
import Swal from 'sweetalert2'
import {BsFillKeyFill} from 'react-icons/bs'

const cookies = new Cookies();

import * as API from "../services/user.service";

import './styles/Login.css';

function Register() {

    const [clicked, setCliked] = useState('')

    const handleClickRegister = () => {
        clicked == 'wrapper-login active-popup' ? setCliked('wrapper-login active-popup active') : setCliked('wrapper-login active-popup');
    }

    const [formLogin, setFormLogin] = useState({
        email: "",
        password: "",
    });

    const [formSignup, setFormSignup] = useState({
        identification: "",
        name: "",
        email: "",
        password: "",
    });

    const onUpdateFieldLogin = (e) => {
        const nextFormState = {
            ...formLogin,
            [e.target.name]: e.target.value,
        };
        setFormLogin(nextFormState);
    };

    const onUpdateFieldSignup = (e) => {
        const nextFormStateSignup = {
            ...formSignup,
            [e.target.name]: e.target.value,
        };
        setFormSignup(nextFormStateSignup);
    };

    const dataLogin = {
        email: formLogin.email,
        password: formLogin.password,
    };

    const dataSignUp = {
        identification: formSignup.identification,
        name: formSignup.name,
        email: formSignup.email,
        password: formSignup.password,
    };

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        try {
            await API.login(dataLogin)
                .then((response) => {
                    Swal.fire({
                        title: 'Login Success',
                        icon: 'success',
                        text: `${response.data?.msg}`,
                        showClass: { popup: 'animate__animated animate__fadeInDown' },
                        hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                    }).then((result) => {
                        if (result.isConfirmed) {
                            /* console.log(response?.data.userTokens?.accessToken); */
                            cookies.set("TIME", response?.data.userTokens?.expirationTime);
                            cookies.set("TOKEN", response?.data.userTokens?.accessToken);
                            localStorage.setItem("dataLogin", JSON.stringify(response));
                            window.location.href = '/'
                        }
                    })
                })
                .catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: `${error}`,
                        showClass: { popup: 'animate__animated animate__fadeInDown' },
                        hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                    })
                });
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmitSignup = async (e) => {
        e.preventDefault();
        try {
            await API.register(dataSignUp)
                .then((response) => {
                    console.log(response);
                    Swal.fire({
                        title: 'Register',
                        icon: 'success',
                        text: `${response.data?.msg}`,
                        showClass: { popup: 'animate__animated animate__fadeInDown' },
                        hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                    }).then((result) => {
                        if (result.isConfirmed) {
                            cookies.set("TOKEN", response.data?.userTokens?.accessToken);
                            localStorage.setItem("dataLogin", JSON.stringify(response.data));
                            window.location.href = '/'
                        }
                    })
                })
                .catch((error) => {
                    console.log(error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: `${error}`,
                        showClass: { popup: 'animate__animated animate__fadeInDown' },
                        hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                    })
                });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <main className="main-login" >
                <div className={clicked || 'wrapper-login active-popup'}>
                    <span className="icon-close">
                        <Link to={'/'}>
                            <ion-icon name="close"></ion-icon>
                        </Link>
                    </span>

                    {/* <!-- Login Form  --> */}
                    <div className="form-box login">
                        <h2>Login</h2>
                        <form onSubmit={(e) => handleSubmitLogin(e)}>

                            <div className="input-box">
                                <span className="icon"><ion-icon name="mail"></ion-icon></span>
                                <input type="email"
                                    id="email"
                                    name="email"
                                    value={formLogin.email}
                                    onChange={onUpdateFieldLogin}
                                    required />
                                <label>Email</label>
                            </div>

                            <div className="input-box">
                                <span className="icon"><ion-icon name="lock-closed"></ion-icon></span>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formLogin.password}
                                    onChange={onUpdateFieldLogin}
                                    required />
                                <label>Password</label>
                            </div>
                            <button type="submit" className="btn" onClick={(e) => handleSubmitLogin(e)}>Login</button>
                            <div className="login-register">
                                <p>Do not have an account? <a onClick={handleClickRegister} >Register</a></p>
                            </div>
                        </form>
                    </div>

                    {/* <!-- Register Form --> */}
                    <div className="form-box register">
                        <h2>Registration</h2>
                        <form onSubmit={handleSubmitSignup}>
                            <div className="input-box">
                                <span className="icon"><BsFillKeyFill/></span>
                                <input type="text"
                                    id="identification"
                                    name="identification"
                                    value={formSignup.identification}
                                    onChange={onUpdateFieldSignup}
                                    required />
                                <label>Identification</label>
                            </div>
                            <div className="input-box">
                                <span className="icon"><ion-icon name="person"></ion-icon></span>
                                <input type="text"
                                    id="name"
                                    name="name"
                                    value={formSignup.name}
                                    onChange={onUpdateFieldSignup}
                                    required />
                                <label>Username</label>
                            </div>
                            <div className="input-box">
                                <span className="icon"><ion-icon name="mail"></ion-icon></span>
                                <input type="email"
                                    id="email"
                                    name="email"
                                    value={formSignup.email}
                                    onChange={onUpdateFieldSignup}
                                    required />
                                <label>Email</label>
                            </div>
                            <div className="input-box">
                                <span className="icon"><ion-icon name="lock-closed"></ion-icon></span>
                                <input type="password"
                                    id="password"
                                    name="password"
                                    value={formSignup.password}
                                    onChange={onUpdateFieldSignup}
                                    required />
                                <label>Password</label>
                            </div>
                            <div className="remember-forgot">
                                <label> <input type="checkbox" />I agree to the terms & conditions</label>
                            </div>
                            <button type="submit" className="btn" onClick={(e) => handleSubmitSignup(e)}>Register</button>
                            <div className="login-register">
                                <p>Already have an account? <a  onClick={handleClickRegister}>Login</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Register;