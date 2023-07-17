import { useEffect } from 'react';

import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

import about_us from '../assets/about_us.jpg';
import './styles/About.scss';

function About() {

    useEffect(() =>{document.title = "About";},[])

    return (
        <>
            <NavBar />
            <main className="about-main">
                <section className='about-section'>
                    <h1>About Us</h1>
                    <div className='info-container'>
                        <img src={about_us} alt="about-image" />
                        <div className='info-text'>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Fusce in nulla quis leo posuere laoreet eu ut metus.
                                Maecenas malesuada consectetur velit, sed efficitur ipsum congue ac.
                                In nec ante at sapien aliquam imperdiet consequat lobortis sem.
                                Suspendisse blandit est ac turpis ultricies feugiat. Ut nec tortor quis
                                justo dictum placerat. Mauris id sapien eget nunc venenatis feugiat vitae
                                sit amet orci. Sed eget mollis ex, in cursus urna. Cras ut nunc sapien.
                                Proin eu mauris at tortor sodales bibendum. Duis pharetra eleifend dictum.
                                Aliquam scelerisque venenatis sapien a rutrum.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default About;