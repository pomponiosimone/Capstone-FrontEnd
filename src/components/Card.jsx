import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from "react";
import { useCart } from 'react-use-cart';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import '../css/Card.css';
import { Link } from 'react-router-dom';

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 4
    },
    desktop: {
        breakpoint: { max: 3000, min: 1300 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1300, min: 600 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 600, min: 0 },
        items: 1
    }
};

const CardShoes = ({ descrizione }) => {
    const [scarpe, setScarpe] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState({});
    const { addItem } = useCart();

    useEffect(() => {
        
        fetch(`http://localhost:3002/scarpa/view/filtro?descrizione=${descrizione}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            if (!response.ok) throw new Error(`Errore: ${response.status}`);
            return response.json();
        })
        .then(data => {
            
            setScarpe(data.content || []);
        })
        .catch(error => console.error("Errore nel caricamento dei dati:", error));
    }, [descrizione]);

    const handleSizeChange = (scarpaId, size) => {
        const selectedSize = scarpe.find(scarpa => scarpa.id === scarpaId)
            ?.taglie.find(taglia => taglia.taglia === parseInt(size));

        if (selectedSize) {
            setSelectedSizes(prevState => ({
                ...prevState,
                [scarpaId]: {
                    size: selectedSize.taglia,
                    id: selectedSize.id
                }
            }));
        } else {
            console.error('Taglia selezionata non trovata:', size);
        }
    };

    const handleAddToCart = (scarpa) => {
        const selectedSizeInfo = selectedSizes[scarpa.id];

        if (!selectedSizeInfo) {
            alert('Seleziona una taglia prima di aggiungere al carrello!');
            return;
        }

        const item = {
            id: `${scarpa.id}_${selectedSizeInfo.size}`,
            title: scarpa.nome,
            price: scarpa.prezzo,
            img: scarpa.immagine,
            size: selectedSizeInfo.size,
            sizeId: selectedSizeInfo.id,
            quantity: 1
        };

        addItem(item);
        alert(`Scarpa "${scarpa.nome}" (Taglia: ${selectedSizeInfo.size}) aggiunta al carrello!`);
    };

    return (
        <Carousel responsive={responsive}>
            {scarpe.map((scarpa) => (
                <Col key={scarpa.id} style={{ marginTop: '10px', marginLeft: "10px", marginRight: "30px", marginBottom: '10px' }}>
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
                                <h1 className="prezzo me-4">{`€${scarpa.prezzo.toFixed(2)}`}</h1>
                                <label htmlFor={`size-select-${scarpa.id}`}></label>
                                <select 
                                    id={`size-select-${scarpa.id}`}
                                    value={selectedSizes[scarpa.id]?.size || ''}
                                    onChange={(e) => handleSizeChange(scarpa.id, e.target.value)}
                                    className="form-select"
                                >
                                    <option value="">Taglia</option>
                                    {scarpa.taglie
                                        .filter(size => size.quantità > 0)
                                        .map((size) => (
                                            <option key={size.id} value={size.taglia}>
                                                {size.taglia} - {size.quantità} disponibili
                                            </option>
                                        ))}
                                </select>
                            </div>
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