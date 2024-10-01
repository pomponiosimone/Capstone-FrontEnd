import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import jordan from '../assets/jordan.jpg';

function CardShoes() {
  return (
    <Col md={3} style={{ marginTop: '10px' }}>
      <Card style={{ width: '100%' }}>
   
        <Card.Img 
          variant="top" 
          src={jordan} 
          style={{ height: '200px', objectFit: 'contain' }} // Limita l'altezza e mantiene le proporzioni
        />
        <Card.Body>
          <Card.Title>Jordan</Card.Title>
          <Card.Text>
            Scarpe sportive, comode e molto acquistate
          </Card.Text>
       
          <Button variant="danger mt-5" className="me-2">Elimina</Button>
    
          <Button variant="success mt-5">$150.00</Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default CardShoes;