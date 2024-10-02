import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from "react";
import { useCart } from 'react-use-cart';

const CardShoes = () => {
    const [scarpe, setScarpe] = useState([]);
    const { addItem } = useCart();

    useEffect(() => {
        fetch('/shoes.json') 
            .then(response => response.json())
            .then(data => setScarpe(data))
            .catch(error => console.error("Errore nel caricamento dei dati:", error));
    }, []);

    const handleAddToCart = (scarpa) => {
        
        const item = {
            id: scarpa.id,           
            title: scarpa.nome,      
            price: scarpa.prezzo,    
            img: scarpa.immagine,     
            quantity: 1               
        };

        addItem(item); 
    };

    return (
        <>
            {scarpe.slice(0, 4).map((scarpa) => (
                <Col md={6} lg={3} style={{ marginTop: '10px' }} key={scarpa.id}>
                    <Card style={{ width: '100%' }}>
                        <Card.Img
                            variant="top"
                            src={scarpa.immagine}
                            alt={scarpa.nome}
                            style={{ height: '200px', objectFit: 'contain' }}
                        />
                        <Card.Body>
                            <Card.Title>{scarpa.nome}</Card.Title>
                            <Card.Text>{scarpa.descrizione}</Card.Text>
                            <div className="d-flex justify-content-end mt-3">
                                <Button 
                                    variant="success" 
                                    onClick={() => handleAddToCart(scarpa)} 
                                >
                                    {`$${scarpa.prezzo}`}
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </>
    );
};

export default CardShoes;