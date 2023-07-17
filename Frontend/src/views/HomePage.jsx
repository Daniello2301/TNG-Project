import { NavLink } from "react-router-dom";
import { useEffect } from "react";

import NavBar from "../components/Navbar"
import Footer from "../components/Footer"

import './styles/HomePage.css'
import HomePageImage from '../assets/home_page_image.jpg'
function HomePage() {

    useEffect(() => {
        document.title = "Home";
    },[]);

    return (
        <>
            <NavBar />
            <main className="home-page-main">
                <article className="home-page-content">
                    <section className="info-content">
                        <h1>Better Experiences For Your Home</h1>
                        <p>We are the store whit the most pupular 
                            and beautiful articles for your home
                        </p>
                        <NavLink to={"/products"}>Products</NavLink>
                    </section>
                    <section className="image-content">
                        <img src={HomePageImage} alt="Home Page Image"/>
                    </section>
                </article>
            </main>
            <Footer />
        </>
    )
}
export default HomePage