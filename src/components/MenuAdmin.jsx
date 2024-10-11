import { Container, Row, Col} from 'react-bootstrap';
import '../css/LoginAdmin.css';
import {Link} from 'react-router-dom'
const MenuAdmin = () => {
    return (<Container className="menu-admin" fluid>
        <Row>
    <Col xs={12} className="d-flex justify-content-center">
    <button  className="button-admin me-4">Lista ordini</button>
    <Link to="/gestione-admin">
    <button className="button-admin me-4">Gestione Shoes</button> </Link>
    </Col>
   <Col xs={12} className='d-flex justify-content-center mt-5'>
   <Link to="/">
   <button className="button-admin logout">Logout</button>
   </Link>
   </Col>
    </Row>
    </Container>)
}
export default MenuAdmin;