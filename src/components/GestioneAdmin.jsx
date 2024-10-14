import React, { useEffect, useState } from "react";
import { Container, Row, Col, Modal, Button, Form, } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import '../css/Card.css';
import '../css/LoginAdmin.css';

const GestioneAdmin = () => {
    const [scarpe, setScarpe] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedSneaker, setSelectedSneaker] = useState(null);
    const [newSneaker, setNewSneaker] = useState({
        nome: '',
        marca: '',
        prezzo: '',
        immagine: '',
        taglie: [],
    });
    const [taglia, setTaglia] = useState({ taglia: '', quantita: '' });
    
    //Visualizza tutte le sneakers --GET--
    useEffect(() => {
        fetch(`http://localhost:3002/scarpa/view/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        resetForm();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSneaker((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleTagliaChange = (e) => {
        const { name, value } = e.target;
        setTaglia((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
// da rivedere importazione di immagini (file)
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewSneaker((prev) => ({
                    ...prev,
                    immagine: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const PostTaglia = () => {
        if (taglia.taglia && taglia.quantita) {
            const tagliaNumerica = parseInt(taglia.taglia);
            const quantitaNumerica = parseInt(taglia.quantita);

            const existingTaglia = newSneaker.taglie.find(t => t.taglia === tagliaNumerica);
            if (existingTaglia) {
                existingTaglia.quantità = quantitaNumerica;
            } else {
                setNewSneaker((prev) => ({
                    ...prev,
                    taglie: [...prev.taglie, { taglia: tagliaNumerica, quantità: quantitaNumerica }],
                }));
            }
            setTaglia({ taglia: '', quantita: '' });
        } else {
            alert('Specifica taglia e quantità'); 
        }
    };

    //Creazione sneakers  --POST--
    const PostSneaker = () => {
        fetch('http://localhost:3002/scarpa/creazione', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(newSneaker),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Errore: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            setScarpe(prev => [...prev, data]);
            alert('Sneaker aggiunta!!!!!!!!!'); 
            handleCloseModal();
        })
        .catch(error => {
            console.error("Errore aggiunta della sneaker:", error);
            alert('Errore aggiunta della sneaker.'); 
        });
    };

    //Modifica sneakers  --PUT--
    const PutSneaker = () => {
        fetch(`http://localhost:3002/scarpa/put/${selectedSneaker.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(newSneaker),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Errore: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            setScarpe(prev => prev.map(scarpa => (scarpa.id === selectedSneaker.id ? data : scarpa)));
            alert('Sneaker aggiornata!!!!!!'); 
            handleCloseModal();
        })
        .catch(error => {
            console.error("Errore aggiornamento della sneaker:", error);
            alert('Errore aggiornamento della sneaker.'); 
        });
    };

    //Rimuovi sneakers  --DELETE--
    const DeleteSneaker = (id) => {
        if (window.confirm('Sei SICURISSIMO di voler eliminare questa sneaker?')) {
            fetch(`http://localhost:3002/scarpa/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Errore: ${response.status}`);
                }
                setScarpe(prevScarpe => prevScarpe.filter(scarpa => scarpa.id !== id));
                alert('Sneaker eliminata con successo!'); 
            })
            .catch(error => {
                console.error("Errore eliminazione della sneaker:", error);
                alert('Errore eliminazione della sneaker.'); 
            });
        }
    };

    const EditSneaker = (scarpa) => {
        setSelectedSneaker(scarpa);
        setNewSneaker(scarpa);
        setEditMode(true);
        handleShowModal();
    };

    const resetForm = () => {
        setNewSneaker({
            nome: '',
            marca: '',
            prezzo: '',
            immagine: '',
            taglie: [],
        });
        setTaglia({ taglia: '', quantita: '' });
        setEditMode(false);
        setSelectedSneaker(null);
    };

    return (
        <Container fluid>
            <Row className="pe-5 ps-5 mt-5">
                <Col xs={12} className="mt-5"> 
                    <p className="fw-5 ms-2">Aggiungi sneakers 
                        <i style={{ fontSize: '22px' }} className="bi bi-arrow-down-circle ms-3" onClick={handleShowModal}></i>
                    </p>
                </Col>
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
                                    <button 
                                        className="button-gestione matita ms-3"
                                        onClick={() => EditSneaker(scarpa)} 
                                    >
                                        <i className="bi bi-pencil" style={{ fontSize: '22px'}}></i> 
                                    </button> 
                                    <button 
                                        className="button-gestione secchio me-3"
                                        onClick={() => DeleteSneaker(scarpa.id)} 
                                    >
                                        <i className="bi bi-trash" style={{ fontSize: '22px'}}></i> 
                                    </button> 
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editMode ? 'Modifica Sneaker' : 'Aggiungi Sneaker'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formNome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                name="nome"
                                value={newSneaker.nome}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formMarca">
                            <Form.Label>Marca</Form.Label>
                            <Form.Control
                                type="text"
                                name="marca"
                                value={newSneaker.marca}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPrezzo">
                            <Form.Label>Prezzo</Form.Label>
                            <Form.Control
                                type="number"
                                name="prezzo"
                                value={newSneaker.prezzo}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formImmagine">
                            <Form.Label>Immagine</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={handleImageChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formTaglia">
                            <Form.Label>Taglia</Form.Label>
                            <Form.Control
                                type="number"
                                name="taglia"
                                value={taglia.taglia}
                                onChange={handleTagliaChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formQuantita">
                            <Form.Label>Quantità</Form.Label>
                            <Form.Control
                                type="number"
                                name="quantita"
                                value={taglia.quantita}
                                onChange={handleTagliaChange}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={PostTaglia}>
                            Aggiungi Taglia
                        </Button>
                    </Form>
                    <div className="mt-3">
                        {newSneaker.taglie.map((t, index) => (
                            <div key={index}>
                                <p>Taglia: {t.taglia}, Quantità: {t.quantità}</p>
                            </div>
                        ))}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Chiudi
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={editMode ? PutSneaker : PostSneaker}
                    >
                        {editMode ? 'Aggiorna' : 'Aggiungi'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default GestioneAdmin;