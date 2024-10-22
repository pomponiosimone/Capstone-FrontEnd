import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import '../css/LoginAdmin.css';
import { Link, useNavigate } from 'react-router-dom';

const MenuAdmin = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/'); 
    };

    return (
        <Container className="menu-admin" fluid>
            <Row>
                <Col xs={12} className="d-flex justify-content-center">
                    <Card style={{ width: '100%' }} className="border-0 shadow me-3"> 
                        <Card.Body>
                            <Card.Subtitle className="text-center mt-3">
                                <button className="button-admin me-4">Lista ordini</button>
                            </Card.Subtitle>
                            <Card.Title className="text-center mt-3">
                                Qui puoi vedere la lista ordini di qualsiasi cliente
                            </Card.Title>
                        </Card.Body>
                    </Card>

                    <Card style={{ width: '100%' }} className="border-0 shadow"> 
                        <Card.Body>
                            <Card.Subtitle className="text-center mt-3">
                                <Link to="/gestione-admin">
                                    <button className="button-admin me-4">Gestione Shoes</button>
                                </Link>
                            </Card.Subtitle>
                            <Card.Title className="text-center mt-3">
                                AGGIUNGI SCARPE <i className="bi bi-arrow-down-square-fill" style={{ fontSize: '22px', color: 'green' }}></i>
                            </Card.Title>
                            <Card.Title className="text-center">
                                MODIFICA SCARPE <i className="bi bi-pencil button-gestione matita" style={{ fontSize: '22px' }}></i>
                            </Card.Title>
                            <Card.Title className="text-center">
                                ELIMINA SCARPE <i className="bi bi-trash button-gestione secchio" style={{ fontSize: '22px' }}></i>
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} className='d-flex justify-content-center mt-5'>
                    <button className="button-admin logout" onClick={handleLogout}>
                        Logout
                    </button>
                </Col>
            </Row>
        </Container>
    );
}

export default MenuAdmin;