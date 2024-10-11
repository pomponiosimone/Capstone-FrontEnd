import React, { useEffect, useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import '../css/Card.css';
import '../css/LoginAdmin.css'

const GestioneAdmin = () => {
    const [scarpe, setScarpe] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3002/scarpa/view/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json' 
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Errore: ${response.status}`); 
            }
            return response.json(); 
        })
        .then(data => {
            setScarpe(data.content || []); 
        })
        .catch(error => console.error("Errore nel caricamento dei dati:", error));
    }, []); 

    return (
        <Container fluid>
            <Row className="pe-5 ps-5 mt-5">
                <Col xs={12} className="mt-5"> <p className="fw-5 ms-2">Aggiungi sneakers <i  style={{ fontSize: '22px'}} className="bi bi-arrow-down-circle ms-3 mb-5"></i></p></Col>
                {scarpe.map((scarpa) => (
                    <Col key={scarpa.id} xs={12} sm={6} md={4} lg={3} className="mb-5 mt-5">
                        <Card style={{ width: '100%' }} className="border-0 shadow"> 
                            <Link to={`/card-details/${scarpa.id}`}>
                                <Card.Img
                                    variant="top"
                                    src={scarpa.immagine}
                                    alt={scarpa.nome}
                                    style={{ height: '200px', objectFit: 'contain' }}
                                />
                            </Link>
                            <Card.Body>
                                <Card.Title className="text-center">{scarpa.nome}</Card.Title>
                                <h1 className="prezzo text-center">{`€${scarpa.prezzo}`}</h1>        
                                <div className="d-flex justify-content-between mt-3">
                                <button className="button-gestione matita ms-3 "
                                    onClick={() => handleAddToCart(scarpa)}
                                >
                                    <i className="bi bi-pencil" style={{ fontSize: '22px'}}></i> 
                                   
                                </button> <button className="button-gestione secchio me-3">
                                <i className="bi bi-trash" style={{ fontSize: '22px'}}></i> </button>
                            </div>                    


                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default GestioneAdmin;