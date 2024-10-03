import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from "react";
import { useCart } from 'react-use-cart';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import '../css/Card.css'
const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 4 
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2 
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1 
    }
};

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
        <Carousel responsive={responsive}>
        {scarpe.map((scarpa) => (
            <Col key={scarpa.id} style={{ marginTop: '10px', marginLeft: "10px", marginRight: "30px", marginBottom:'10px'}}>
                <Card style={{ width: '100%'  }} className="border-0 shadow"> 
                    <Card.Img
                        variant="top"
                        src={scarpa.immagine}
                        alt={scarpa.nome}
                        style={{ height: '200px', objectFit: 'contain' }}
                    />
                    <Card.Body>
                        <Card.Title className="text-center">{scarpa.nome}</Card.Title>
                        <h1 className="prezzo">{`€${scarpa.prezzo}`}</h1>
                        <div className="d-flex justify-content-end mt-3">
                            <button className="btn-carrello-card"
                               
                                onClick={() => handleAddToCart(scarpa)} 
                            >
                                 <i className="bi bi-cart" style={{ fontSize: '20px'}}></i> 
                            </button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        ))}
    </Carousel>
    );
};

export default CardShoes;