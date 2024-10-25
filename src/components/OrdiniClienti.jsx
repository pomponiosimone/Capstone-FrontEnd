import React, { useEffect, useState } from 'react';
import { Button, Form, FormControl, InputGroup, Modal } from 'react-bootstrap'; 
import { Link } from 'react-router-dom';
import '../css/OrdiniClienti.css';
import '../css/LoginAdmin.css';

const OrdiniClienti = () => {
    const [ordini, setOrdini] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedOrdine, setSelectedOrdine] = useState(null); 
    const [cliente, setCliente] = useState({ nome: '', cognome: '', email: '' });
    const [indirizzoSpedizione, setIndirizzoSpedizione] = useState('');
    const [metodoPagamento, setMetodoPagamento] = useState('');
    const [totaleOrdine, setTotaleOrdine] = useState('');
    const [tipoSpedizione, setTipoSpedizione] = useState('');
    const [statoOrdine, setStatoOrdine] = useState('');
    const [dataOrdine, setDataOrdine] = useState(''); 

    // GET ALL ORDERS
    useEffect(() => {
        const fetchOrdini = () => {
            setLoading(true); 
            fetch('http://localhost:3002/ordini/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            .then(response => {
                if (!response.ok) throw new Error('Errore nella fetch degli ordini');
                return response.json();
            })
            .then(data => {
                setOrdini(data.content || []); 
            })
            .finally(() => {
                setLoading(false); 
            });
        };

        fetchOrdini(); 
    }, []);

    //Data Ordini
    const fetchOrdiniByData = (data = null) => {
        setLoading(true);
        const url = data ? `http://localhost:3002/ordini/data/${data}` : 'http://localhost:3002/ordini/all';
      
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(response => {
            if (!response.ok) throw new Error('Errore nella fetch degli ordini');
            return response.json();
        })
        .then(data => {
         
            setOrdini(data || []); 
          
        })
        .finally(() => {
            setLoading(false); 
        });
    };

    const handleDateChange = (event) => {
        const selectedDate = event.target.value;
        if (!selectedDate) {
            alert('Please select a date.'); 
            return;
        }
        setDataOrdine(selectedDate); 
        fetchOrdiniByData(selectedDate); 
    };

    // DELETE ORDER
    const handleDelete = (ordineId) => {
        if (window.confirm("Sei sicuro di voler eliminare questo ordine?")) {
            fetch(`http://localhost:3002/ordini/delete/${ordineId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Errore nella cancellazione dell\'ordine');
                }
                setOrdini(prevOrdini => prevOrdini.filter(ordine => ordine.id !== ordineId));
            })
            .catch(error => {
                console.error('Errore:', error);
                alert('Cancellazione fallita: ' + error.message);
            });
        }
    };

    // PUT Ordine
    const handleUpdate = (ordineId) => {
        const updatedOrdine = {
            clienteId: selectedOrdine.cliente.id,
            cliente: { nome: cliente.nome, cognome: cliente.cognome, email: cliente.email },
            indirizzoSpedizione,
            metodoPagamento,
            totaleOrdine,
            tipoSpedizione,
            statoOrdine 
        };

        fetch(`http://localhost:3002/ordini/modifica/${ordineId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(updatedOrdine)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore nella modifica dell\'ordine');
            }
            return response.json();
        })
        .then(data => {
            setOrdini(prevOrdini => prevOrdini.map(ordine => (ordine.id === ordineId ? data : ordine)));
            alert('Ordine modificato con successo!');
            clearForm();
            handleClose();
        })
        .catch(error => {
            console.error('Errore:', error);
            alert('Modifica fallita: ' + error.message);
        });
    };

    const handleEditClick = (ordine) => {
        setSelectedOrdine(ordine);
        setCliente({ nome: ordine.cliente.nome, cognome: ordine.cliente.cognome, email: ordine.cliente.email });
        setIndirizzoSpedizione(ordine.indirizzoSpedizione);
        setMetodoPagamento(ordine.metodoPagamento);
        setTotaleOrdine(ordine.totaleOrdine);
        setTipoSpedizione(ordine.tipoSpedizione);
        setStatoOrdine(ordine.statoOrdine);
        setShowModal(true);
    };

    const clearForm = () => {
        setSelectedOrdine(null);
        setCliente({ nome: '', cognome: '', email: '' });
        setIndirizzoSpedizione('');
        setMetodoPagamento('');
        setTotaleOrdine('');
        setTipoSpedizione('');
        setStatoOrdine('');
    };

    const handleClose = () => {
        clearForm(); 
        setShowModal(false);
    };

    if (loading) {
        return <div>Caricamento ordini...</div>;
    }
    return (
        <div className="ordini-clienti">
            <div className="ordini-titolo d-flex justify-content-center align-items-center mb-5">
                <h1 className="fw-bold fs-2 me-2">Lista Ordini</h1>
            </div>
            <Form className="formDataDash mt-5 ms-5">
                <div className="d-flex justify-content-center ">
                    <Form.Control type="date" className="dataDash" onChange={handleDateChange}  />
                </div>
           
          
               
            </Form>

            <div className="d-flex justify-content-center align-items-center contTab mt-3">
                {/* Tabella Orizzontale per schermi grandi */}
                <table className="table table-white table-striped align-items-center w-75 ms-5 me-5 tableOrrizonta">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Cognome</th>
                            <th scope="col">Email</th>
                            <th scope="col">Data Ordine</th>
                            <th scope="col">Totale Ordine</th>
                            <th scope="col">Metodo Pagamento</th>
                            <th scope="col">Indirizzo Spedizione</th>
                            <th scope="col">Stato Ordine</th>
                            <th scope="col">Articoli</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(ordini) && ordini.length > 0 ? (
                            ordini.map((ordine, index) => (
                                <tr key={ordine.id || index}>
                                    <td>
                                        <button onClick={() => handleDelete(ordine.id)} className="button-gestione secchio me-2">
                                            <i className="bi bi-trash" style={{ fontSize: '20px' }}></i>
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => {
                                            setCliente(ordine.cliente);
                                            setIndirizzoSpedizione(ordine.indirizzoSpedizione);
                                            setMetodoPagamento(ordine.metodoPagamento);
                                            setTotaleOrdine(ordine.totaleOrdine);
                                            setTipoSpedizione(ordine.tipoSpedizione);
                                            setStatoOrdine(ordine.statoOrdine);
                                            setSelectedOrdine(ordine);
                                            setShowModal(true);
                                        }} className="button-gestione matita me-2">
                                            <i className="bi bi-pencil" style={{ fontSize: '20px' }}></i>
                                        </button>
                                    </td>
                                    <td>{index + 1}</td>
                                    <td>{ordine.cliente.nome}</td>
                                    <td>{ordine.cliente.cognome}</td>
                                    <td>{ordine.cliente.email}</td>
                                    <td>{new Date(ordine.dataOrdine).toLocaleDateString()}</td>
                                    <td>{ordine.totaleOrdine} €</td>
                                    <td>{ordine.metodoPagamento}</td>
                                    <td>{ordine.indirizzoSpedizione}</td>
                                    <td>{ordine.statoOrdine}</td>
                                    <td>
                                        {ordine.articoli.map((articolo) => (
                                            <div key={articolo.id}>
                                                <p>
                                                    <strong>{articolo.scarpa.nome}</strong> - 
                                                    Taglia: {articolo.taglia.taglia}, 
                                                    Quantità: {articolo.quantità}
                                                </p>
                                            </div>
                                        ))}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11" className="text-center">Nessun dato disponibile</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Tabella Verticale per schermi piccoli */}
                <div className="d-flex justify-content-center align-items-center contTab mt-5 tableVertical">
                    <div className="row w-75 ms-5 me-5 d-flex justify-content-center">
                    {Array.isArray(ordini) && ordini.length > 0 ? (
            ordini.map((ordine, index) => (
              <div className="col-md-4" key={ordine.id || index}>
                <table className="table table-white table-striped align-items-center">
                  <thead>
                    <tr>
                      <th colSpan="2" className="text-center">
                        Ordine #{index + 1}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Nome</td>
                      <td>{ordine.cliente.nome}</td>
                    </tr>
                    <tr>
                      <td>Cognome</td>
                      <td>{ordine.cliente.cognome}</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>{ordine.cliente.email}</td>
                    </tr>
                    <tr>
                      <td>Data Ordine</td>
                      <td>{new Date(ordine.dataOrdine).toLocaleDateString()}</td>
                    </tr>
                    <tr>
                      <td>Totale Ordine</td>
                      <td>{ordine.totaleOrdine} €</td>
                    </tr>
                    <tr>
                      <td>Metodo Pagamento</td>
                      <td>{ordine.metodoPagamento}</td>
                    </tr>
                    <tr>
                      <td>Indirizzo Spedizione</td>
                      <td>{ordine.indirizzoSpedizione}</td>
                    </tr>
                    <tr>
                      <td>Stato Ordine</td>
                      <td>{ordine.statoOrdine}</td>
                    </tr>
                    <tr>
                      <td>Articoli</td>
                      <td>
                      {ordine.articoli.map((articolo) => (
  <div key={articolo.id}>
    <p>
      <strong>{articolo.scarpa.nome}</strong> - 
      Taglia: {articolo.taglia.taglia}, 
      Quantità: {articolo.quantità}
      
    </p> 
  </div>
                        ))}
                      </td> 
                    </tr>
                    </tbody>
                                    </table>
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center">Nessun dato disponibile</div>
                        )}
               
                    </div>
                </div>
            </div>

            {/* Modal per modificare un ordine */}
            <Modal className="modal1" show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifica Ordine</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formNome">
                            <Form.Label className="mt-2">Nome</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={cliente.nome} 
                                onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCognome">
                            <Form.Label className="mt-2">Cognome</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={cliente.cognome} 
                                onChange={(e) => setCliente({ ...cliente, cognome: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label className="mt-2">Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                value={cliente.email} 
                                onChange={(e) => setCliente({ ...cliente, email: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formIndirizzo">
                            <Form.Label className="mt-2">Indirizzo di Spedizione</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={indirizzoSpedizione} 
                                onChange={(e) => setIndirizzoSpedizione(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formMetodoPagamento">
                            <Form.Label className="mt-2">Metodo di Pagamento</Form.Label>
                            <Form.Select 
                                value={metodoPagamento} 
                                onChange={(e) => setMetodoPagamento(e.target.value)}>
                                <option value="">Seleziona un metodo di pagamento</option>
                                <option value="CONTANTI">CONTANTI</option>
                                <option value="CARTADICREDITO">CARTA DI CREDITO</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="formTotaleOrdine">
                            <Form.Label className="mt-2">Totale Ordine</Form.Label>
                            <Form.Control 
                                type="number" 
                                value={totaleOrdine} 
                                onChange={(e) => setTotaleOrdine(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formTipoSpedizione">
                            <Form.Label className="mt-2">Tipo di Spedizione</Form.Label>
                            <Form.Select
                                value={tipoSpedizione} 
                                onChange={(e) => setTipoSpedizione(e.target.value)}>
                                <option value="">Seleziona il tipo di spedizione</option>
                                <option value="DOMICILIO">DOMICILIO</option>
                                <option value="RITIRO">RITIRO</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="formStatoOrdine">
                            <Form.Label className="mt-2">Stato Ordine</Form.Label>
                            <Form.Select 
                                value={statoOrdine} 
                                onChange={(e) => setStatoOrdine(e.target.value)}>
                                <option value="">Seleziona uno stato dell'ordine</option>
                                <option value="ATTESA">ATTESA</option>
                                <option value="CONFERMATO">CONFERMATO</option>
                                <option value="SPEDITO">SPEDITO</option>
                                <option value="CONSEGNATO">CONSEGNATO</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Chiudi
                    </Button>
                    <Button variant="primary" onClick={() => handleUpdate(selectedOrdine.id)}>
                        Salva Modifiche
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="d-flex justify-content-center mt-5">
                <Link to="/menuAdmin">
                    <Button className="btnFormPrenotazione mb-5">TORNA AL MENU</Button>
                </Link>
            </div>
        </div>
    );
};

export default OrdiniClienti;