import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom"; 
import { Container, Row, Col } from 'react-bootstrap';
import { useCart } from 'react-use-cart';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import '../css/Card.css';

const ShoeSearch = () => {
    const { nome } = useParams(); 
    const [selectedSizes, setSelectedSizes] = useState({});
    const { addItem } = useCart();
    const navigate = useNavigate();
    const [scarpe, setScarpe] = useState([]);
    const [error, setError] = useState(null); 

    useEffect(() => {
        if (!nome) return;
    
        
        const nomeGrande = primaGrande(nome);
        fetch(`http://localhost:3002/scarpa/view/nome/${nomeGrande}`, {
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
            setScarpe(data|| []);
            if (data.length === 0) {
                alert("Scarpe non trovate.");
                navigate('/');
                setError("Nessuna scarpa trovata. Prova a cercare un altro nome."); 
            } else {
                setError(null);
            }
        })
        .catch(error => {
            console.error("Errore nel caricamento dei dati:", error);
            setError("Si è verificato un errore durante il caricamento dei dati."); 
        });
    }, [nome,navigate]);

    const handleSizeChange = (scarpaId, size) => {
        setSelectedSizes(prevState => ({
            ...prevState,
            [scarpaId]: size 
        }));
    };

    const handleAddToCart = (scarpa) => {
        const selectedSize = selectedSizes[scarpa.id]; 

        if (!selectedSize) {
            alert('Seleziona una taglia prima di aggiungere al carrello!');
            return;
        }

        const item = {
            id: scarpa.id,           
            title: scarpa.nome,      
            price: scarpa.prezzo,    
            img: scarpa.immagine,    
            size: selectedSize,      
            quantity: 1              
        };

        addItem(item); 
    };

    return (
        <Container fluid className="containerCentrale">
            {error && <div className="alert alert-danger">{error}</div>} 
            <Row className="pe-5 ps-5 mt-5">
                {scarpe.map((scarpa) => (
                    <Col key={scarpa.id} xs={12} sm={6} md={4} lg={3} style={{ marginTop: '40px' }}>
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
                                <div className="d-flex justify-content-center align-items-center">
                                    <h1 className="prezzo me-4">{`€${scarpa.prezzo}`}</h1>
                                    <label htmlFor={`size-select-${scarpa.id}`}></label>
                                    <select 
                                        id={`size-select-${scarpa.id}`}
                                        value={selectedSizes[scarpa.id] || ''}
                                        onChange={(e) => handleSizeChange(scarpa.id, e.target.value)}
                                        className="form-select"
                                    >
                                        <option value="">Taglia</option>
                                        {scarpa.taglie.map((size) => (
                                            <option key={size.id} value={size.taglia}>
                                                {size.taglia} - {size.quantità} disponibili
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="d-flex justify-content-end mt-3">
                                    <button className="btn-carrello-card" onClick={() => handleAddToCart(scarpa)}>
                                        <i className="bi bi-cart" style={{ fontSize: '20px' }}></i> 
                                    </button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};const primaGrande = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();}

export default ShoeSearch;