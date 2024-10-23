import React, { useEffect, useState } from "react";
import { Container, Row, Col, Modal, Button, Form, Pagination } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import '../css/Card.css';
import '../css/LoginAdmin.css';

const GestioneAdmin = () => {
    const [scarpe, setScarpe] = useState([]);
    const [totalItems, setTotalItems] = useState(0); 
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedSneaker, setSelectedSneaker] = useState(null);
    const [newSneaker, setNewSneaker] = useState({
        nome: '',
        marca: '',
        prezzo: '',
        descrizione: '',
        immagine: '',
        taglie: [],
    });
    const [taglia, setTaglia] = useState({ taglia: '', quantità: '' });

  
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12; 

    const fetchSneakers = async (page) => {
        try {
            const response = await fetch(`http://localhost:3002/scarpa/view/all?page=${page - 1}&size=${itemsPerPage}&sortBy=id`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                throw new Error(`Errore: ${response.status}`);
            }
            const data = await response.json();
            setScarpe(data.content || []);
            setTotalItems(data.totalElements || 0); 
        } catch (error) {
            console.error("Errore nel caricamento dei dati:", error);
        }
    };

  
    useEffect(() => {
        fetchSneakers(currentPage);
    }, [currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handleShowModal = () => setShowModal(true);

    const handleCloseModal = () => {
        setShowModal(false);
        resetForm();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSneaker(prev => ({ ...prev, [name]: value }));
    };

    const handleTagliaChange = (e) => {
        const { name, value } = e.target;
        setTaglia(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && selectedSneaker) {
            const formData = new FormData();
            formData.append('immagine', file);

            fetch(`http://localhost:3002/scarpa/${selectedSneaker.id}/immagine`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: formData,
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Errore durante il caricamento dell'immagine: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                alert('Immagine caricata con successo!');
                setScarpe(prevScarpe => prevScarpe.map(scarpa =>
                    scarpa.id === selectedSneaker.id ? { ...scarpa, immagine: data.immagine } : scarpa
                ));
            })
            .catch(error => {
                console.error("Errore durante il caricamento dell'immagine:", error);
               
            });
        }
    };

    const postTaglia = () => {
        if (taglia.taglia && taglia.quantità) {
            const tagliaNumerica = parseInt(taglia.taglia);
            const quantitaNumerica = parseInt(taglia.quantità);

            const existingTaglia = newSneaker.taglie.find(t => t.taglia === tagliaNumerica);
            if (existingTaglia) {
                existingTaglia.quantità = quantitaNumerica;
            } else {
                setNewSneaker(prev => ({
                    ...prev,
                    taglie: [...prev.taglie, { taglia: tagliaNumerica, quantità: quantitaNumerica }],
                }));
            }
            setTaglia({ taglia: '', quantità: '' });
        } else {
            alert('Specifica taglia e quantità');
        }
    };

    // Creazione sneakers  --POST--
    const postSneaker = () => {
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
            alert('Sneaker aggiunta con successo!');
            handleCloseModal();
            fetchSneakers(currentPage); 
        })
        .catch(error => {
            console.error("Errore aggiunta della sneaker:", error);
            alert('Errore aggiunta della sneaker.');
        });
    };

    // Modifica sneakers  --PUT--
    const putSneaker = () => {
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
            alert('Sneaker aggiornata con successo!');
            handleCloseModal();
            fetchSneakers(currentPage); 
        })
        .catch(error => {
            console.error("Errore aggiornamento della sneaker:", error);
           
        });
    };

    // Rimuovi sneakers  --DELETE--
    const deleteSneaker = (id) => {
        if (window.confirm('Sei sicuro di voler eliminare questa sneaker?')) {
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
                fetchSneakers(currentPage); 
            })
            .catch(error => {
                console.error("Errore eliminazione della sneaker:", error);
                alert('Errore eliminazione della sneaker.');
            });
        }
    };

    const editSneaker = (scarpa) => {
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
            descrizione: '',
            immagine: '',
            taglie: [],
        });
        setTaglia({ taglia: '', quantità: '' });
        setEditMode(false);
        setSelectedSneaker(null);
    };

    return (
        <Container fluid>
            <Row className="pe-5 ps-5 mt-5">
                <Col xs={12} className="mt-5"> 
                <p className="fw-5 ms-2">Aggiungi sneakers 
                <i class="bi bi-arrow-down-square-fill ms-3" style={{ fontSize: '22px', color: 'green'}} onClick={handleShowModal}></i>
                    </p>
                </Col>
            </Row>

            <Row className="justify-content-center">
                {scarpe.map((scarpa) => (
                    <Col md={4} key={scarpa.id} className="mb-4 mt-5">
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
                                        onClick={() => editSneaker(scarpa)} 
                                    >
                                        <i className="bi bi-pencil" style={{ fontSize: '22px'}}></i> 
                                    </button> 
                                    <button 
                                        className="button-gestione secchio me-3"
                                        onClick={() => deleteSneaker(scarpa.id)} 
                                    >
                                        <i className="bi bi-trash" style={{ fontSize: '22px'}}></i> 
                                    </button> 
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Pagination className="justify-content-center mb-4">
                <Pagination.Prev 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                    disabled={currentPage === 1}
                />
                {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item 
                        key={index + 1} 
                        active={index + 1 === currentPage} 
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                    disabled={currentPage === totalPages}
                />
            </Pagination>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editMode ? 'Modifica Sneaker' : 'Aggiungi Sneaker'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mt-1" controlId="formNome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Nome della sneaker"
                                name="nome" 
                                value={newSneaker.nome} 
                                onChange={handleInputChange} 
                            />
                        </Form.Group>

                        <Form.Group className="mt-2" controlId="formMarca">
                            <Form.Label>Marca</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Marca della sneaker" 
                                name="marca" 
                                value={newSneaker.marca} 
                                onChange={handleInputChange} 
                            />
                        </Form.Group>

                        <Form.Group  className="mt-2" controlId="formPrezzo">
                            <Form.Label>Prezzo</Form.Label>
                            <Form.Control 
                                type="number" 
                                placeholder="Prezzo" 
                                name="prezzo" 
                                value={newSneaker.prezzo} 
                                onChange={handleInputChange} 
                            />
                        </Form.Group>

                        <Form.Group  className="mt-2" controlId="formDescrizione">
                            <Form.Label>Descrizione</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                placeholder="Descrizione" 
                                name="descrizione" 
                                value={newSneaker.descrizione} 
                                onChange={handleInputChange} 
                            />
                        </Form.Group>

                        <Form.Group controlId="formImmagine">
                            <Form.Label  className="mt-2" >Immagine</Form.Label>
                            <Form.Control 
                                type="file" 
                                accept="image/*" 
                                onChange={handleImageChange} 
                            />
                        </Form.Group>

                        <Form.Group  className="mt-2" controlId="formTaglia">
                            <Form.Label>Taglia</Form.Label>
                            <Form.Control 
                                type="number" 
                                placeholder="Taglia" 
                                name="taglia" 
                                value={taglia.taglia} 
                                onChange={handleTagliaChange} 
                            />
                        </Form.Group>

                        <Form.Group  className="mt-2" controlId="formQuantità">
                            <Form.Label>Quantità</Form.Label>
                            <Form.Control 
                                type="number" 
                                placeholder="Quantità" 
                                name="quantità" 
                                value={taglia.quantità} 
                                onChange={handleTagliaChange} 
                            />
                        </Form.Group>

                        <Button variant="primary" onClick={postTaglia} className="mt-2">
                            Aggiungi Taglia
                        </Button>

                        {newSneaker.taglie.length > 0 && (
                            <ul className="mt-3">
                                {newSneaker.taglie.map((t, index) => (
                                    <li key={index}>{`Taglia: ${t.taglia}, Quantità: ${t.quantità}`}</li>
                                ))}
                            </ul>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Chiudi
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={editMode ? putSneaker : postSneaker}
                    >
                        {editMode ? 'Salva Modifiche' : 'Aggiungi Sneaker'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default GestioneAdmin;