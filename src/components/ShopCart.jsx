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
    const [address, setAddress] = useState(''); 
    const [shippingCost, setShippingCost] = useState(0.00); 
    const [shippingType, setShippingType] = useState('DOMICILIO'); 
    const [orderTotal, setOrderTotal] = useState(cartTotal + shippingCost);
    const [clienteId, setClienteId] = useState(null);
    const [nomeCliente, setNomeCliente] = useState(null)
    const clientePayPalId = import.meta.env.VITE_PAYPAL_CLIENT_ID;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, [cartTotal, shippingCost]);

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
                setClienteId(data.id);
                setNomeCliente(data.nome)
                setAddress(data.indirizzoCompleto); 
                setShowModal(false);
            } else {
                const error = await response.json();
                setErrorMessage(error.message || 'Errore registrazione.');
            }
        } catch (error) {
            setErrorMessage('Errore durante la registrazione.');
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
                console.log(data.nome)
                alert('Login avvenuto con successo!');
                setIsAuthenticated(true);
                setNomeCliente(data.nome)
                setClienteId(data.id);
                setAddress(data.indirizzoCompleto); 
                setShowModal(false);
            } else {
                const error = await response.json();
                setErrorMessage(error.message || 'Errore login.');
            }
        } catch (error) {
            setErrorMessage('Errore login.');
        }
    };

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
            handleOrderSubmission();
        });
    };

    const onError = (err) => {
        alert('Errore nella transazione.');
    };
    
    const handleOrderSubmission = async () => { 
        if (!clienteId) {
            alert("accedi o registrati prima di acquistare");
            setShowModal(true)
            return;
        } 
        const ordine = {
            articoli: items.map(item => {
                
                return {
                    scarpaId: item.id.includes('_') ? item.id.split('_')[0] : item.id,
                    tagliaId: item.sizeId,
                    quantità: item.quantity,
                };
            }),
            clienteId: clienteId,
            indirizzoSpedizione: address,
            metodoPagamento: paymentMethod === 'cash' ? 'CONTANTI' : 'CARTA',
            speseSpedizione: shippingCost,
            tipoSpedizione: shippingType,
            totaleOrdine: orderTotal,
            statoOrdine: "ATTESA"
        };
    
        try {
            const response = await fetch('http://localhost:3002/ordini/crea/all', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ordine),
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Risposta dal server:', data);
                alert('Ordine inviato con successo!');
                emptyCart(); 
            } else {
                const error = await response.json();
                alert('Errore nell\'invio dell\'ordine: ' + error.message);
            }
        } catch (error) {
            console.error('Errore durante l\'invio dell\'ordine:', error);
            alert('Errore di connessione durante l\'invio dell\'ordine.');
            
        }
    }
 
    if (isEmpty) return (
        <div className="cart-vuoto">
            <img src={CartVuoto} alt="Empty cart" style={{ width: '35vh', height: "25vh", marginTop: '30px' }} />
        </div>
    );

    return (
        <section className="py-4 container">
             
            <div className="row justify-content-center">
      
                <div className="col-12">
                <div style={{ marginTop: '60px' }}>
  {clienteId ? (
    <p className="fs-5 mt-2" >Bentornato {nomeCliente} 🥳!!!</p> 
  ) : (
    <>
      <p className="fs-5 mb-2">Benvenuto </p>
      <div>
        <a href="#" onClick={() => { setShowModal(true); setIsLogin(true); }}>
          Accedi
        </a>
        {' o '}
        <a href="#" onClick={() => { setShowModal(true); setIsLogin(false); }}>
          Registrati
       
        </a>    {' per continuare !!! '}
      </div>
    </>
  )}
</div>
                    <table className="Table-cart table table-light table-hover mt-3">
                        <thead>
                            <tr className="th-title text-center">
                                <th>Immagine</th>
                                <th>Articolo</th>
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
                                        <button className="btn-shop me-2" onClick={() => updateItemQuantity(item.id, item.quantity - 1)} disabled={item.quantity === 1}>-</button>
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
                                <h1 className="fs-5 me-5">Totale: € {orderTotal.toFixed(2)}</h1>  
                            </Col>
                            <Col xs={7} lg={8}>
                                {isAuthenticated ? (
                                    <div>
                                        <div >
                                        <Form>
                                           
                                               <div >
                                            <Form.Group className="mt-3">
                                                <Form.Label >Tipo di spedizione:</Form.Label>
                                                <Form.Check  className="mt-2"
                                                    type="radio"
                                                    label="Domicilio"
                                                    name="shippingType"
                                                    value="DOMICILIO"
                                                    checked={shippingType === 'DOMICILIO'}
                                                    onChange={() => setShippingType('DOMICILIO')}
                                                />
                                                <Form.Check  className="mt-2 mb-2"
                                                    type="radio"
                                                    label="Ritiro in negozio"
                                                    name="shippingType"
                                                    value="RITIRO"
                                                    checked={shippingType === 'RITIRO'}
                                                    onChange={() => setShippingType('RITIRO')}
                                                /> 
                                            </Form.Group> </div>
                                            <div className="border1">
                                            <h5 className="fs-6 text-start  mt-2 mb-3">Tipo di pagamento:</h5>
                                            <Form.Check
                                                type="radio"
                                                label="Contanti"
                                                name="paymentMethod"
                                                value="cash"
                                                checked={paymentMethod === 'cash'}
                                                onChange={() => setPaymentMethod('cash')}
                                            />
                                            <Form.Check className="mt-2 mb-2"
                                                type="radio"
                                                label="PayPal"
                                                name="paymentMethod"
                                                value="paypal"
                                                checked={paymentMethod === 'paypal'}
                                                onChange={() => setPaymentMethod('paypal')}
                                            />
                                            </div>
                                           
                                        </Form>
                                        </div> 
                                       
                                        <div className="mt-3">
                                            {paymentMethod === 'paypal' && (
                                                <PayPalScriptProvider options={{ "client-id": clientePayPalId }}>
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
                                                   
                                                    handleOrderSubmission();
                                                }} 
                                                className="btn-paypals mt-3 button-cash"
                                            >
                                                Completa pagamento
                                            </Button>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <a href="#" onClick={() => { setShowModal(true); setIsLogin(true); }}>Accedi</a> / 
                                        <a href="#" onClick={() => { setShowModal(true); setIsLogin(false); }}>Registrati</a>
                                    </div>
                                )}
                            </Col>
                            <Col xs={1} lg={1}>
                                <button onClick={emptyCart} className="btn-svuota btn btn-danger">
                                    <p>Svuota</p><i className="bi bi-cart ms-2 icona" style={{ fontSize: '15px' }}></i>
                                </button>
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
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="cognome">
                                    <Form.Label>Cognome</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="cognome"
                                        value={formData.cognome}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="dataDiNascita">
                                    <Form.Label>Data di nascita</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="dataDiNascita"
                                        value={formData.dataDiNascita}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="indirizzoCompleto">
                                    <Form.Label>Indirizzo completo</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="indirizzoCompleto"
                                        value={formData.indirizzoCompleto}
                                        onChange={handleChange}
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
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}
                        <Button variant="primary" type="submit">
                            {isLogin ? 'Accedi' : 'Registrati'}
                        </Button>
                        <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Registrati' : 'Hai già un account? Accedi'}
                    </Button>
                </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </section>
    );
};

export default ShopCart;