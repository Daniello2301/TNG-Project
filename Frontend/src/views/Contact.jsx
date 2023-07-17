import { useEffect } from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

import './styles/Contact.scss';
import contact from '../assets/contact.jpg'

function Contact() {

    useEffect(() => {document.title = "Contact";},[]);

    return (
        <>
            <NavBar />
            <main className="main-contact">
                <section className="form-content">
                    <div className="lef-side">
                        <h1>Contact</h1>
                        <form action="#">
                            <div className="form-group">
                                <label htmlFor="name">Nombre</label>
                                <input type="text" name="name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input type="email" name="email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="mesage">Mesage</label>
                                <textarea name="mesage" />
                            </div>
                            <div className="form-group">
                                <button>
                                    Send
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="right-side">
                        <img src={contact} alt="contact-image"/>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default Contact;