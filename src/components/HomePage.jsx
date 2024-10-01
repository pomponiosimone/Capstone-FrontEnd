import { Container, Row, Col } from "react-bootstrap";
import fotohome from '../assets/fotohome.jpg';
import Card from "./Card";
import '../css/HomePage.css';

function HomePage() {
    return ( 
        <Container>
            <Row>
                <Col xs={12} style={{ padding: 0, position: 'relative' }}>
                    <div className="Bottone">
                        <p className="fs-5 mb-3">Back to School</p>
                        <h1>Scoprite la nostra selezione di sneakers per il back-to-school !</h1>
                        <a href="#back-to-school" className="bg-dark text-light btn mt-2"> 
                            Scoprire
                        </a>
                    </div>
                    <img 
                        src={fotohome} 
                        alt="Descrizione dell'immagine" 
                        className="mt-4"
                        style={{ 
                            width: '100%', 
                            height: 'auto', 
                            display: 'block' 
                        }} 
                    />
                </Col>
                <p className="fs-3 mt-5">Back to school</p>
                <Card/> <Card/> <Card/> <Card/>
                <p className="fs-3 mt-5">Back to school</p>
                <Card/> <Card/> <Card/> <Card/>
                <p id="back-to-school" className="fs-3 mt-5">Back to school</p> 
                <Card/> <Card/> <Card/> <Card/>
            </Row>
        </Container>
    )
}

export default HomePage;