import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../css/NavBar.css';
import Logo from '../assets/logo.png';
import Dropdown from 'react-bootstrap/Dropdown';
import Adidas from '../assets/adidas.png';
import Nike from '../assets/nike.png';
import NewBalance from '../assets/newbalance.png';
import { useNavigate } from 'react-router-dom'; 
function NavBar() {
  const [searchTerm, setSearchTerm] = useState(''); 
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm('');
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container className="fixed-navbar">
        <Navbar.Brand className="d-flex">
          <img
            src={Logo}
            className="logo"
            alt="Logo"
            style={{ width: '60px', height: '60px', marginRight: '10px' }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='testo-navbar' />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
          <Nav className="mx-auto d-flex align-items-center nav-links">
        
            <Nav.Link href="/" className="mx-3 navbar-custom-font">Home</Nav.Link>
            <NavDropdown title="Brand" id="basic-nav-dropdown" className="mx-3 navbar-custom-font">
              <NavDropdown.Item href="/Adidas">
                <img
                  src={Adidas}
                  className="logo"
                  alt="Logo"
                  style={{ width: '18px', height: '18px', marginRight: '10px' }}
                /> Adidas
              </NavDropdown.Item>
              <Dropdown.Divider />
              <NavDropdown.Item href="/Nike">
                <img
                  src={Nike}
                  className="logo"
                  alt="Logo"
                  style={{ width: '25px', height: '8px', marginRight: '4px' }} /> Nike
              </NavDropdown.Item>
              <Dropdown.Divider />
              <NavDropdown.Item href="/New Balance">
                <img
                  src={NewBalance}
                  className="logo"
                  alt="Logo"
                  style={{ width: '18px', height: '15px', marginRight: '10px' }} /> New Balance
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/contatti" className="mx-3 navbar-custom-font">Help</Nav.Link>
            <Nav.Link href="/cliente" className="mx-3 navbar-custom-font">Il tuo Profilo</Nav.Link>
          </Nav>

          <Form className="d-flex justify-content-center align-items-center">
            <Form.Control
              type="search"
              placeholder="Cerca la tua scarpa"
              className="me-2 search-input"
              aria-label="Search"
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              style={{
                borderRadius: '25px',
                paddingLeft: '15px',
                width: '250px',
              }}
            />
            <Button
              variant="outline-secondary"
              className="search-btn"
              style={{ borderRadius: '50%' }}
              onClick={handleSearch}
            >
              <i className="bi bi-search" style={{ fontSize: '1.2rem', color: '#000' }}></i>
            </Button>
            <Nav.Link href="/shop">
              <i className="bi bi-cart ms-4" style={{ fontSize: '24px', marginRight: '10px' }}></i>
            </Nav.Link>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;