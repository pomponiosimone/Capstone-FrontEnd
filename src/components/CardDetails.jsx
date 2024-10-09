import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import { Container, Row, Col } from 'react-bootstrap';
import { useCart } from 'react-use-cart';
import '../css/Card.css';

const CardDetails = () => {
    const { id } = useParams(); 
    const [scarpa, setScarpa] = useState(null);
    const [selectedSizes, setSelectedSizes] = useState({});
    const { addItem, updateItemQuantity, items } = useCart(); 
    const token = import.meta.env.VITE_TOKEN
    useEffect(() => {
        
        fetch('http://localhost:3002/scarpa/view', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' 
            }
        })
       
            .then(response => response.json())
            .then(data => {  
                const foundShoe = data.content.find(item => item.id === id);
                setScarpa(foundShoe);
            })
            .catch(error => console.error("Errore nel caricamento dei dati:", error));
    }, [id]);

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
    

    if (!scarpa) return <div>Caricamento...</div>;

    return (
        <Container style={{minHeight:'62vh'}}>
            <Row className="d-flex justify-content-center align-items-center mt-5 mb-5">
                <Col xs={12} md={12} lg={6} className="mt-5">
                    <img src={scarpa.immagine} className="img-card-details" alt={scarpa.nome} />
                </Col>
                <Col xs={12} md={12} lg={6} className="mt-5">
                    <h1 className="fw-bold fs-1">{scarpa.nome}</h1>
                    <h1 className="mt-3 fs-5">{scarpa.prezzo} €</h1>
                    <hr />
                    <h1 className="mt-3 fs-5 mb-5 mt-5" style={{lineHeight: '35px'}}>{scarpa.descrizione}</h1>
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
            
                    
                    <button 
                        className="btn-carrello-card-details mt-3 mb-3" 
                        onClick={() => handleAddToCart(scarpa)}
                        >
                        Aggiungi al carrello 
                    </button> <hr></hr>       
<h1 className="mt-4 fs-5"> <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '24px' }}></i> Ritiro disponibile in tutti i nostri store</h1>
<h1 className="mt-2 fs-5"> <i className="bi bi-car-front me-2"></i>Spedizione <span style={{ fontWeight:"bold", color: '#198754'}}> GRATUITA </span> entro 24/48h in tutta Italia.</h1>
<h1 className="mt-2 fs-5"> <i className="bi bi-cash-stack text-success" style={{ fontSize: '24px' }}></i> Reso o rimborso per qualsiasi tipo di sneakers</h1> 
                 
                </Col>
            </Row>
        </Container>
    );
};

export default CardDetails;