import { Link } from 'react-router-dom';

import './styles/Footer.css'


function Footer() {
    return (
        <>
            <footer>
                <div className="footer-menu">

                    <Link to={"/"}>Home</Link>
                    <a href="#">Cookies Policy</a>
                    <a href="#">Terms Of Service</a>
                    <a href="#">Support</a>

                </div>
                <p>Copyright &copy; 2022</p>
            </footer>
        </>
    )
}

export default Footer;