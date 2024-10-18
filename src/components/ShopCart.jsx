import React, { useState, useEffect } from 'react';
import { useCart } from 'react-use-cart';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import CartVuoto from '../assets/carrello-vuoto.gif';
import '../css/ShopCart.css';
import { Container, Row, Col, Modal, Button, Form, Alert } from 'react-bootstrap';

const ShopCart = () => {
    const { 
        isEmpty, 
        totalUniqueItems, 
        items, 
        totalItems, 
        cartTotal, 
        updateItemQuantity,
        emptyCart 
    } = useCart();

    const [isAuthenticated, setIsAuthenticated] = useState(false); 
    const [showModal, setShowModal] = useState(true);  
    const [isLogin, setIsLogin] = useState(true);  
    const [formData, setFormData] = useState({
        nome: '',
        cognome: '',
        dataDiNascita: '',
        email: '',
        indirizzoCompleto: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState(''); 
    const [paymentMethod, setPaymentMethod] = useState('');

   
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
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
                alert('Registrazione avvenuta con successo!');
                setIsAuthenticated(true);
                localStorage.setItem('token', data.token);
                setShowModal(false);
            } else {
                const error = await response.json();
                setErrorMessage(error.message || 'Errore registrazione.');
            }
        } catch (error) {
          
            setErrorMessage('errore durante la registrazione.');
        }
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
                alert('Login avvenuto con successo!!!!!');
                setIsAuthenticated(true);
                localStorage.setItem('token', data.token);
                setShowModal(false);
            } else {
                const error = await response.json();
                setErrorMessage(error.message || 'Errore login.');
            }
        } catch (error) {
            console.error('Errore:', error);
            setErrorMessage('errore login.');
        }
    };

    const clienteId = import.meta.env.VITE_PAYPAL_CLIENT_ID;

   
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    if (isEmpty) return <div className="cart-vuoto"> <img 
        src={CartVuoto} 
        alt="Empty cart" 
        style={{ width: '35vh', height: "25vh", marginTop: '30px' }} 
    /></div>;

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: cartTotal.toFixed(2)
                }
            }]
        });
    };

    const onApprove = (data, actions) => {
        return actions.order.capture().then((details) => {
            alert(`Transazione completata da ${details.payer.name.given_name}`);
            emptyCart();
        });
    };

    const onError = (err) => {
        alert('errore transazione.');
    };

    return (
        <section className="py-4 container">
            <div className="row justify-content-center">
                <div className="col-12">
                    <h5>Carrello: ({totalUniqueItems}) Totale articoli: ({totalItems})</h5>
                    <table className="Table-cart table table-light table-hover mt-5">
                        <thead>
                            <tr className="th-title text-center">
                                <th>Immagine</th>
                                <th>Sneakers</th>
                                <th>Prezzo</th>
                                <th>Taglia</th>
                                <th>Quantità</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr className="text-center" key={index}>
                                    <td>
                                        <img src={item.img} style={{ height: '50px' }} alt={item.title} />
                                    </td>
                                    <td className="fw-bold">{item.title}</td>
                                    <td className="fw-bold">{item.price} €</td>
                                    <td className="fw-bold">{item.size}</td>
                                    <td>
                                        <button className="btn-shop me-2"
                                            onClick={() => updateItemQuantity(item.id, item.quantity - 1)} 
                                            disabled={item.quantity === 1} 
                                        >
                                            -
                                        </button> 
                                        {item.quantity}  
                                        <button className="btn-shop ms-2" onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button> 
                                    </td> 
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    <Container fluid>
                        <Row className="d-flex justify-content-center">
                            <Col xs={3} lg={3}> 
                                <h1 className="fs-5 me-5">Totale: € {cartTotal.toFixed(2)}</h1>
                            </Col>
                            <Col xs={7} lg={8}>
                                {isAuthenticated ? (
                                    <div>
                                        <h5 className='mb-3'>Tipo Pagamento:</h5>
                                        <Form> <div className="d-flex">
                                            <Form.Check 
                                                type="radio"
                                                label="Contanti" 
                                                name="paymentMethod"
                                                value="cash" 
                                                checked={paymentMethod === 'cash'}
                                                onChange={() => setPaymentMethod('cash')}
                                            /> <i class="bi bi-cash ms-2" style={{color:"green"}}></i> </div>
                                            <div className="d-flex">
                                            <Form.Check 
                                                type="radio"
                                                label="PayPal"
                                                name="paymentMethod"
                                                value="paypal"
                                                checked={paymentMethod === 'paypal'}
                                                onChange={() => setPaymentMethod('paypal')}
                                            /> <i class="bi bi-credit-card ms-2" style={{color:"blue"}} ></i> </div>
                                        </Form>

                                        {paymentMethod === 'paypal' && (
                                            <PayPalScriptProvider options={{ "client-id": clienteId }}>
                                                <PayPalButtons 
                                                    createOrder={createOrder}
                                                    onApprove={onApprove}
                                                    onError={onError}
                                                />
                                            </PayPalScriptProvider>
                                        )}

                                        {paymentMethod === 'cash' && (
                                            <Button 
                                                onClick={() => {
                                                    alert('Pagamento completato!'); 
                                                    emptyCart(); 
                                                }} 
                                                className="btn-paypals"
                                            >
                                                Completa il pagamento in contanti
                                            </Button>
                                        )}
                                    </div>
                                ) : (
                                    <Button variant="primary" onClick={() => setShowModal(true)}>Accedi o Registrati</Button>
                                )}
                            </Col>
                            <Col xs={2} lg={1}>
                                <button onClick={emptyCart} className="btn-svuota btn btn-danger"><p>Svuota </p><i className="bi bi-cart ms-2" style={{ fontSize: '15px' }}></i></button>
                            </Col> 
                        </Row>
                    </Container>
                </div>
            </div>

    
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{isLogin ? 'Accedi' : 'Registrati'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                    <Form onSubmit={isLogin ? handleLogin : handleRegister}>
                        {!isLogin && (
                            <>
                                <Form.Group className="mt-1" controlId="formNome">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control type="text" name="nome" placeholder="Inserisci il tuo nome" value={formData.nome} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group className="mt-3" controlId="formCognome">
                                    <Form.Label>Cognome</Form.Label>
                                    <Form.Control type="text" name="cognome" placeholder="Inserisci il tuo cognome" value={formData.cognome} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group className="mt-3" controlId="formDataDiNascita">
                                    <Form.Label>Data di Nascita</Form.Label>
                                    <Form.Control type="date" name="dataDiNascita" value={formData.dataDiNascita} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group className="mt-3" controlId="formIndirizzo">
                                    <Form.Label>Indirizzo Completo</Form.Label>
                                    <Form.Control type="text" name="indirizzoCompleto" placeholder="Inserisci il tuo indirizzo" value={formData.indirizzoCompleto} onChange={handleChange} required />
                                </Form.Group>
                            </>
                        )}
                        <Form.Group className="mt-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Inserisci la tua email" value={formData.email} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mt-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Inserisci la tua password" value={formData.password} onChange={handleChange} required />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">{isLogin ? 'Accedi' : 'Registrati'}</Button>
                    </Form>
                    <p className="mt-2">
                        {isLogin ? "Non hai un account??? " : "Hai già un account? "}
                        <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? 'Registrati' : 'Accedi'}
                        </Button>
                    </p>
                </Modal.Body>
            </Modal>
        </section>
    );
};

export default ShopCart;