import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
const Contatti =  () => {
    return(
<Container>
<Row className="d-flexjustify-content-center align-items-center">
<Col xs={12} md={8} lg={5}>
<Card style={{ width: '18rem', marginTop:"120px", marginLeft:"100px"}}>
      <Card.Body> 
        <Card.Title className="text-center fw-bold"> <i class="bi bi-cash-stack"></i> Politica di Rimborso</Card.Title>
        <Card.Subtitle className="mb-2 text-muted text-center">Condizioni Per il Rimborso</Card.Subtitle>
        <Card.Text className="p-4">
1-Periodo di rimborso: Hai diritto a richiedere un rimborso entro 30 giorni dalla data di acquisto. <br></br> <hr></hr>
2-Prodotti idonei: I prodotti devono essere restituiti nella loro condizione originale, non utilizzati e con l'imballaggio originale.
        </Card.Text>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem', marginTop:"50px", marginLeft:"100px"}} >
      <Card.Body> 
        <Card.Title className="text-center fw-bold"> <i class="bi bi-chat-right-dots me-2"></i>Contattaci</Card.Title>
        <Card.Subtitle className="mb-2 text-muted text-center">Hai domande, richieste o desideri maggiori informazioni? </Card.Subtitle>
        <Card.Text className="p-4">
        </Card.Text>
      </Card.Body>
    </Card>
    </Col>
    <Col style={{marginTop:"100px"}} xs={12} md={9} lg={5}>
    <Form>
        
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" placeholder="Inserisci il tuo nome" />
        </Form.Group>

      
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Inserisci la tua email" />
        </Form.Group>

     
        <Form.Group className="mb-3" controlId="formBasicSubject">
          <Form.Label>Oggetto</Form.Label>
          <Form.Control type="text" placeholder="Inserisci l'oggetto" />
        </Form.Group>

        
        <Form.Group className="mb-3" controlId="formBasicMessage">
          <Form.Label>Messaggio</Form.Label>
          <Form.Control as="textarea" rows={5} placeholder="Inserisci il tuo messaggio" />
        </Form.Group>

       
        <Button variant="primary" type="submit" className="w-100">
          Invia
        </Button>
      </Form>
    </Col>
    </Row>
  </Container>
    
    ) 
}
export default Contatti;