import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Alert} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

const ClientiPage = () => {
    const [cliente, setCliente] = useState(null);
    const [ordini, setOrdini] = useState([]); // State for orders
    const [showModal, setShowModal] = useState(true);
    const [isLogin, setIsLogin] = useState(true); 
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        nome: '',
        cognome: '',
        dataDiNascita: '',
        indirizzoCompleto: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        const clienteId = localStorage.getItem('clienteId');
        const savedToken = localStorage.getItem('token');
        if (clienteId) {
            fetchClienteData(clienteId);
            fetchOrdiniData(clienteId); 
        } else {
            setShowModal(true); 
        }
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    const fetchClienteData = async (clienteId) => {
        try {
            const response = await fetch(`http://localhost:3002/clienti/${clienteId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setCliente(data); 
            } else {
                throw new Error('Errore nel caricamento del profilo');
            }
        } catch (error) {
            console.error('Errore:', error);
        }
    };

    const fetchOrdiniData = async (clienteId) => {
        try {
            const response = await fetch(`http://localhost:3002/clienti/${clienteId}/ordini`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setOrdini(data); 
            } else {
                throw new Error('Errore nel caricamento degli ordini');
            }
        } catch (error) {
            console.error('Errore:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const response = await fetch('http://localhost:3002/clienti/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: formData.email, password: formData.password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('clienteId', data.cliente.id);
                localStorage.setItem('token', data.token); 
                setToken(data.token);
                setCliente(data.cliente);
                setShowModal(false);
                fetchOrdiniData(data.cliente.id); 
            } else {
                const error = await response.json();
                setErrorMessage(error.message || 'Errore login.');
            }
        } catch (error) {
            setErrorMessage('Errore durante il login.');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const response = await fetch('http://localhost:3002/clienti/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('clienteId', data.cliente.id); 
                localStorage.setItem('token', data.token); 
                setToken(data.token);
                setCliente(data.cliente);
                setShowModal(false);
                fetchOrdiniData(data.cliente.id); 
            } else {
                const error = await response.json();
                setErrorMessage(error.message || 'Errore registrazione.');
            }
        } catch (error) {
            setErrorMessage('Errore durante la registrazione.');
        }
    };
return (
    <div className="containerCentrales">
    {cliente ? (
      
        <>    <div className="d-flex justify-content-center align-items-center ">
      
            <Card style={{ width: '100%', height:"auto", marginTop:'100px' }} className=" border-0 shadow  text-center">
                <Card.Body>
                    <Card.Subtitle className="text-center mt-3">
                        <h2>Benvenuto, {cliente.nome}!</h2>
                    </Card.Subtitle>
                    <Card.Title className="text-center mt-3">
                        <p>Email:  {cliente.email}</p>
                        <p>Indirizzo:  {cliente.indirizzoCompleto}</p>
                        <p>Data di nascita:  {cliente.dataDiNascita}</p>
                    </Card.Title>
                </Card.Body>
            </Card>
</div>
            <h3 className="text-center mt-4 fs-3">I tuoi ordini</h3>

            {ordini.length > 0 ? (
                <>
                    {/* Tabella Orizzontale per schermi grandi */}
                    <div className="d-flex justify-content-center align-items-center contTab mt-3">
                        <table className="table table-white table-striped align-items-center w-75 ms-5 me-5 tableOrrizonta">
                            <thead>
                                <tr>
                                    <th>Data Ordine</th>
                                    <th>Totale Ordine</th>
                                    <th>Stato Ordine</th>
                                    <th>Metodo Pagamento</th>
                                    <th>Tipo Spedizione</th>
                                    <th>Indirizzo Spedizione</th>
                                    <th>Nome - Taglia - Quantità</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ordini.map((ordine) => (
                                    <tr key={ordine.id}>
                                        <td>{new Date(ordine.dataOrdine).toLocaleString()}</td>
                                        <td>{ordine.totaleOrdine.toFixed(2)} €</td>
                                        <td>{ordine.statoOrdine}</td>
                                        <td>{ordine.metodoPagamento}</td>
                                        <td>{ordine.tipoSpedizione}</td>
                                        <td>{ordine.indirizzoSpedizione}</td>
                                        <td>
                                            {ordine.articoli.map((articolo) => (
                                                <div key={articolo.id}>
                                                    <strong>{articolo.scarpa.nome}</strong> -
                                                    {articolo.taglia.taglia},
                                                    Q: {articolo.quantità}
                                                </div>
                                            ))}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Tabella Verticale per schermi piccoli */}
                    <div className="d-flex justify-content-center align-items-center contTab h-75 mt-5 tableVertical" >
                        <div className="row w-75  d-flex justify-content-center">
                            {ordini.map((ordine, index) => (
                                <div className="col-md-4" key={ordine.id}>
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
                                                <td>Data Ordine</td>
                                                <td>{new Date(ordine.dataOrdine).toLocaleString()}</td>
                                            </tr>
                                            <tr>
                                                <td>Totale Ordine</td>
                                                <td>{ordine.totaleOrdine.toFixed(2)} €</td>
                                            </tr>
                                            <tr>
                                                <td>Stato Ordine</td>
                                                <td>{ordine.statoOrdine}</td>
                                            </tr>
                                            <tr>
                                                <td>Metodo Pagamento</td>
                                                <td>{ordine.metodoPagamento}</td>
                                            </tr>
                                            <tr>
                                                <td>Tipo Spedizione</td>
                                                <td>{ordine.tipoSpedizione}</td>
                                            </tr>
                                            <tr>
                                                <td>Indirizzo Spedizione</td>
                                                <td>{ordine.indirizzoSpedizione}</td>
                                            </tr>
                                            <tr>
                                                <td>Articoli</td>
                                                <td>
                                                    {ordine.articoli.map((articolo) => (
                                                        <div key={articolo.id}>
                                                            <strong>{articolo.scarpa.nome}</strong> -
                                                            {articolo.taglia.taglia},
                                                            Q: {articolo.quantità}
                                                        </div>
                                                    ))}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <p>Nessun ordine trovato.</p>
            )}
        </>
    ) : (
        <p>Caricamento profilo...</p>
    )}

    <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
            <Modal.Title>{isLogin ? 'Accedi' : 'Registrati'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={isLogin ? handleLogin : handleRegister}>
                {!isLogin && (
                    <>
                        <Form.Group className="mb-3" controlId="nome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                name="nome"
                                value={formData.nome}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="cognome">
                            <Form.Label>Cognome</Form.Label>
                            <Form.Control
                                type="text"
                                name="cognome"
                                value={formData.cognome}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="dataDiNascita">
                            <Form.Label>Data di nascita</Form.Label>
                            <Form.Control
                                type="date"
                                name="dataDiNascita"
                                value={formData.dataDiNascita}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="indirizzoCompleto">
                            <Form.Label>Indirizzo completo</Form.Label>
                            <Form.Control
                                type="text"
                                name="indirizzoCompleto"
                                value={formData.indirizzoCompleto}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </>
                )}
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}
                <Button variant="primary" type="submit">
                    {isLogin ? 'Accedi' : 'Registrati'}
                </Button>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Registrati' : 'Hai già un account? Accedi'}
            </Button>
        </Modal.Footer>
    </Modal>
</div>
);
};

export default ClientiPage;