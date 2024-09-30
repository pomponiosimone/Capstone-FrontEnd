import { Container, Row, Col, Nav, NavLink, Image } from 'react-bootstrap';
import Logo from '../assets/logo.png';
import { FaInstagram, FaFacebook, FaTiktok, FaTwitter } from 'react-icons/fa';
import '../css/Footer.css';

function Footer() {
    return (
        <footer>
            <Container fluid>
                <Row className="bg-secondary text-white pt-5 ps-5 pe-5 justify-content-center">
                    <Col xs={4} md={4} lg={2} className="d-flex align-items-center mb-3">
                        <Image
                            src={Logo}
                            alt="company logo"
                            rounded
                            width={140}
                            height={140}
                        />
                    </Col>

                    <Col xs={8} md={5} lg={4} className="mb-5">
                        <Nav className="flex-column fs-5">
                            <p className="titoli-footer mb-3 ms-3">
                                <i className="bi bi-bank me-2"></i> Dove sono i nostri store?
                            </p>
                            <NavLink href="#" className="text-white">Roma, Via delle Vigne Nuove, 45</NavLink>
                            <NavLink href="#" className="text-white">Milano, Via Ostiense, 30</NavLink>
                            <NavLink href="#" className="text-white">Torino, Corso Vittorio Emanuele II, 50</NavLink>
                            <NavLink href="#" className="text-white">Napoli, Via Toledo, 80</NavLink>
                        </Nav>
                    </Col>

                    <Col xs={6} md={5} lg={3} className="mb-5">
                        <Nav className="NavLink flex-column fs-5">
                            <p className="titoli-footer mb-3 ms-3">
                            <i className="bi bi-calendar-date me-2"></i> Nostri Orari
                            </p>
                            <NavLink href="#" className="text-white">-Lunedi/Venerdi</NavLink>
                            <NavLink href="#" className="text-white">8:00/13:00 & 14:00/18:00</NavLink>
                            <NavLink href="#" className="text-white">-Sabato/Domenica</NavLink>
                            <NavLink href="#" className="text-white">8:00/14:00</NavLink>
                        </Nav>
                    </Col>

                    <Col xs={6} md={4} lg={3} className="mb-5">
                        <p className="titoli-footer mb-3 ">
                            <i className="bi bi-briefcase me-2"></i> Contattaci
                        </p>
                        <h1 className="mb-3 ms-2 fs-5">Email: shoes@gmail.com</h1>
                        <h1 className="mb-4 ms-2 fs-5">Telefono: 06 20752030</h1>
                        <p className="titoli-footer mb-4 mt-5 ">
                        <i class="bi bi-chat me-2"></i> Seguici anche sui social
                        </p>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram size={30} style={{ color: '#E1306C' }} />
                        </a>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook size={30} style={{ marginLeft: '15px', color: '#3b5998' }} />
                        </a>
                        <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
                            <FaTiktok size={30} style={{ marginLeft: '15px', color: '#000' }} />
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaTwitter size={30} style={{ marginLeft: '15px', color: '#1DA1F2' }} />
                        </a>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;