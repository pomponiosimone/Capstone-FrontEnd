import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import "../css/Contatti.css"
const Contatti =  () => {
   const [email, setEmail] = useState('');
   const [nome, setNome] = useState('');
   const [messaggio, setMessaggio] = useState('');
  const [oggetto, setOggetto] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const body = {
      email: email,
      oggetto : oggetto,
      nome : nome,
      messaggio: messaggio
    };

    try {
 
      const response = await fetch('http://localhost:3002/send-email/help', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(body), 
        
      });
      
      const result = await response.text(); 
  

      if (response.ok) {
       
        alert('email inviata con successo ti risponderemo al più presto');
       
      } else {
       
        alert(result.message || 'controlla i dati inseriti');
      }
    } catch (error) {
    
      alert('Riprova più tardi');
    }
  }
    return(
      <Container fluid>
      <Row className="d-flex justify-content-space-between align-items-center">
          <Col xs={12} md={10} lg={5}>
              <Card className="help" style={{ width: '18rem', marginTop: "120px", marginLeft: "5vh" }}>
                  <Card.Body>
                      <Card.Title className="text-center fw-bold"> <i className="bi bi-cash-stack"></i> Politica di Rimborso</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted text-center">Condizioni Per il Rimborso</Card.Subtitle>
                      <Card.Text className="p-4 text-center">
    1-Periodo di rimborso: Hai diritto a richiedere un rimborso entro 30 giorni dalla data di acquisto.
</Card.Text>
<hr />
<Card.Text className="p-4 text-center">
    2-Prodotti idonei: I prodotti devono essere restituiti nella loro condizione originale, non utilizzati e con l'imballaggio originale.
</Card.Text>
                  </Card.Body>
              </Card>
              <Card className="help" style={{ width: '18rem', height: "17vh", marginTop: "50px", marginLeft: "5vh" }} >
                  <Card.Body>
                      <Card.Title className="text-center fw-bold"> <i className="bi bi-chat-right-dots me-2"></i>Contattaci</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted text-center">Hai domande, richieste o desideri maggiori informazioni? </Card.Subtitle>
                      <Card.Text className="p-4">
                      </Card.Text>
                  </Card.Body>
              </Card>
          </Col>
          <Col style={{ marginTop: "100px", marginRight: "50px" }} xs={12} md={12} lg={6}>
              <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicName">
                      <Form.Label>Nome</Form.Label>
                      <Form.Control type="text" placeholder="Inserisci il tuo nome" value={nome} onChange={(e) => setNome(e.target.value)} required/>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" placeholder="Inserisci la tua email" value={email} onChange={(e) => setEmail(e.target.value)}required />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicSubject">
                      <Form.Label>Oggetto</Form.Label>
                      <Form.Control type="text" placeholder="Inserisci l'oggetto" value={oggetto} onChange={(e) => setOggetto(e.target.value)} required/>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicMessage">
                      <Form.Label>Messaggio</Form.Label>
                      <Form.Control as="textarea" rows={5} placeholder="Inserisci il tuo messaggio" value={messaggio} onChange={(e) => setMessaggio(e.target.value)} required />
                  </Form.Group>

                  <Button variant="secondary" type="submit" className="w-100">
                      Invia
                  </Button>
              </Form>
          </Col>
      </Row>
  </Container>
    
    ) 
}
export default Contatti;