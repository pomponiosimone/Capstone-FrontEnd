import { Container, Row, Col } from "react-bootstrap";
import fotohome from '../assets/fotohome.jpg';
import Card from "./Card"; // Make sure to import CardShoes
import '../css/HomePage.css';
import "react-multi-carousel/lib/styles.css";

function HomePage() {
    return ( 
        <Container fluid>
            <Row className="pe-5 ps-5">
                <Col xs={12} style={{ padding: 0, position: 'relative', marginTop: 80 }}>
                    <div className="Bottone">
                        <p className="title-school fs-5 mb-3">Back to School</p>
                        <h1 className="test-school">Scoprite la nostra selezione di sneakers per il back-to-school!</h1>
                        <a href="#back-to-school" className="bottone-scoprire bg-dark text-light btn mt-2"> 
                            Scoprire
                        </a>
                    </div>
                    <img 
                        src={fotohome} 
                        alt="Descrizione dell'immagine" 
                        style={{ 
                            width: '100%', 
                            height: 'auto', 
                            display: 'block' 
                        }} 
                    />
                </Col>
                <p id="Alte" className="fs-3 mt-5">Nuovi Arrivi</p>
                <Card descrizione="sneaker" /> {/* Call with the description for new arrivals */}
                
                <p id="Travis" className="fs-3 mt-5">Più acquistate</p>
                <Card descrizione="Travis" /> {/* Call with the description for best sellers */}
                
                <p id="back-to-school" className="fs-3 mt-5">Back to School</p> 
                <Card descrizione="Back" /> {/* Call with the description for back-to-school */}
            </Row>
        </Container>
    );
}

export default HomePage;