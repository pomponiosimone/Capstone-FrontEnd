import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import { Container, Row, Col } from 'react-bootstrap';
import { useCart } from 'react-use-cart';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import '../css/Card.css';


const Brand = () => {
    const {marca} = useParams();
    const [selectedSizes, setSelectedSizes] = useState({}); 
    const { addItem } = useCart();
    const [scarpe, setScarpe] = useState([]);
    useEffect(()=> {

        fetch( `http://localhost:3002/scarpa/view/${marca} `, {
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
}, [marca]); 
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
    <Container fluid>
            <Row className="pe-5 ps-5">
    {scarpe.map((scarpa) => (
        <Col key={scarpa.id} style={{ marginTop: '100px', marginLeft: "10px", marginRight: "30px", marginBottom:'10px'}}>
            <Card style={{ width: '100%'  }} className="border-0 shadow"> 
            <Link to={`/card-details/${scarpa.id}`}>
                <Card.Img
                    variant="top"
                    src={scarpa.immagine}
                    alt={scarpa.nome}
                    style={{ height: '200px', objectFit: 'contain' }}
                /> </Link>
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
       </Row>
       </Container>
)}


export default Brand