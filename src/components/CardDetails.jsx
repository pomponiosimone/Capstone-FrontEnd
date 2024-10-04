import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import { Container, Row, Col } from 'react-bootstrap';
import { useCart } from 'react-use-cart';
import '../css/Card.css';

const CardDetails = () => {
    const { id } = useParams(); 
    const [scarpa, setScarpa] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const { addItem, updateItemQuantity, items } = useCart(); 

    useEffect(() => {
        
        fetch(`/shoes.json`)
            .then(response => response.json())
            .then(data => {
                const foundShoe = data.find(item => item.id === parseInt(id));
                setScarpa(foundShoe);
            })
            .catch(error => console.error("Errore nel caricamento dei dati:", error));
    }, [id]);

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Seleziona una taglia prima di aggiungere al carrello!');
            return;
        }

      
        const existingItem = items.find(item => item.id === scarpa.id && item.size === selectedSize);

        if (existingItem) {
          
            updateItemQuantity(existingItem.id, existingItem.quantity + 1);
        } else {
       
            const item = {
                id: scarpa.id,
                title: scarpa.nome,
                price: scarpa.prezzo,
                img: scarpa.immagine,
                size: selectedSize,
                quantity: 1
            };

            addItem(item);
        }
    };

    if (!scarpa) return <div>Caricamento...</div>;

    return (
        <Container>
            <Row className="d-flex justify-content-center align-items-center mt-5 mb-5">
                <Col xs={12} md={12} lg={6} className="mt-5">
                    <img src={scarpa.immagine} style={{ height: '250px' }} alt={scarpa.nome} />
                </Col>
                <Col xs={12} md={12} lg={6} className="mt-5">
                    <h1 className="fw-bold fs-1">{scarpa.nome}</h1>
                    <h1 className="mt-3 fs-5">{scarpa.prezzo} €</h1>
                    <hr />
                    <h1 className="mt-3 fs-5 mb-5 mt-5">{scarpa.descrizione}</h1>
                    
                    <select
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className="form-select"
                    >
                        <option value="">Seleziona una taglia</option>
                        {scarpa.taglie.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>

                    <button 
                        className="btn-carrello-card-details mt-3" 
                        onClick={handleAddToCart}
                    >
                        Aggiungi al carrello
                    </button>

                   
                    {items.some(item => item.id === scarpa.id && item.size === selectedSize) && (
                        <div className="mt-3">
                            <button
                                className="btn-shop"
                                onClick={() => {
                                    const existingItem = items.find(item => item.id === scarpa.id && item.size === selectedSize);
                                    updateItemQuantity(existingItem.id, existingItem.quantity + 1);
                                }}
                            >
                                +
                            </button>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default CardDetails;