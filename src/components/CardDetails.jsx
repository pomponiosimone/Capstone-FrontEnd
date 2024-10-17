import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import { Container, Row, Col } from 'react-bootstrap';
import { useCart } from 'react-use-cart';
import '../css/Card.css';

const CardDetails = () => {
    const { id } = useParams(); 
    const [scarpe, setScarpa] = useState(null);
    const [selectedSizes, setSelectedSizes] = useState({});
    const { addItem } = useCart(); 
    
    useEffect(() => {
       
        fetch(`http://localhost:3002/scarpa/view/details/${id}`, {
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
            setScarpa(data);
        })
        .catch(error => console.error("Errore nel caricamento dei dati:", error));
    }, [id]);

    const handleSizeChange = (scarpaId, size) => {
        const selectedSize = scarpe.taglie.find(taglia => taglia.taglia === parseInt(size));

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

    if (!scarpe) return <div>Caricamento...</div>;

    return (
        <Container style={{minHeight:'62vh'}}>
            <Row className="d-flex justify-content-center align-items-center mt-5 mb-5">
                <Col xs={12} md={12} lg={6} className="mt-5">
                    <img src={scarpe.immagine} className="img-card-details" alt={scarpe.nome} />
                </Col>
                <Col xs={12} md={12} lg={6} className="mt-5">
                    <h1 className="fw-bold fs-1">{scarpe.nome}</h1>
                    <h1 className="mt-3 fs-5">{scarpe.prezzo} €</h1>
                    <hr />
                    <h1 className="mt-3 fs-5 mb-5 mt-5" style={{lineHeight: '35px'}}>{scarpe.descrizione}</h1>
                    <select 
                        id={`size-select-${scarpe.id}`}
                        value={selectedSizes[scarpe.id]?.size || ''}  
                        onChange={(e) => handleSizeChange(scarpe.id, e.target.value)}
                        className="form-select"
                    >
                        <option value="">Taglia</option>
                        {scarpe.taglie.map((size) => (
                            <option key={size.id} value={size.taglia}>
                                {size.taglia} - {size.quantità} disponibili
                            </option>
                        ))}
                    </select>
                    
                    <button 
                        className="btn-carrello-card-details mt-3 mb-3" 
                        onClick={() => handleAddToCart(scarpe)}
                    >
                        Aggiungi al carrello 
                    </button> 
                    <hr />
                    <h1 className="mt-4 fs-5">
                        <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '24px' }}></i> 
                        Ritiro disponibile in tutti i nostri store
                    </h1>
                    <h1 className="mt-2 fs-5">
                        <i className="bi bi-car-front me-2"></i>Spedizione 
                        <span style={{ fontWeight:"bold", color: '#198754'}}> GRATUITA </span> 
                        entro 24/48h in tutta Italia.
                    </h1>
                    <h1 className="mt-2 fs-5">
                        <i className="bi bi-cash-stack text-success" style={{ fontSize: '24px' }}></i> 
                        Reso o rimborso per qualsiasi tipo di sneakers
                    </h1>
                </Col>
            </Row>
        </Container>
    );
};

export default CardDetails;