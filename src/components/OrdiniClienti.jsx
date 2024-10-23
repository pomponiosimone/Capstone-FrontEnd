import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap'; 
import { Link } from 'react-router-dom'
import '../css/OrdiniClienti.css'
import '../css/LoginAdmin.css';
import { Form , FormControl, InputGroup } from 'react-bootstrap';

const OrdiniClienti = () => {
        const [ordini, setOrdini] = useState([]);
        const [loading, setLoading] = useState(true);
      
       
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
          console.log(data);
          setOrdini(data.content || []); 
        })
        
     
        .finally(() => {
          setLoading(false); 
        });
    };

    fetchOrdini(); 
  }, []);

  if (loading) {
    return <div>Caricamento ordini...</div>; 
  }
return (
    
    <div className="ordini-clienti">
    <div className="ordini-titolo d-flex justify-content-center align-items-center  mb-5 "><h1 className="fw-bold fs-2">Lista Ordini</h1></div>
<Form className="formDataDash mt-5">
      <div className="d-flex justify-content-between">
      <Form.Control type="date" className="dataDash"></Form.Control>
      </div>
      <div>
      <InputGroup className="searchDash">
        <InputGroup.Text id="basic-addon1">
          
        </InputGroup.Text>
        <FormControl
          type="search"
          placeholder="Cerca"
          aria-label="Cerca"
        />
      </InputGroup>
      </div>
    </Form>
      <div className="d-flex justify-content-center align-items-center contTab mt-3 ">
        <table className="table table-white table-striped align-items-center w-75 ms-5 me-5 tableOrrizonta">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">#</th>
              <th scope="col">N°</th>
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
                <td><button  className="button-gestione secchio me-2"  >
                   <i className="bi bi-trash" style={{ fontSize: '20px'}}></i> 
                                                </button></td><td>
                     <button 
                                        className="button-gestione matita me-2"
                                        
                                    > 
                                        <i className="bi bi-pencil" style={{ fontSize: '20px'}}></i> 
                                    </button> </td>                           
                  <td>  {index + 1} </td>
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
                <td colSpan="10" className="text-center">
                  Nessun dato disponibile
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    
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
            <div className="col-12">
              <p className="text-center">Nessun dato disponibile</p>
            </div>
          )}
        </div>
      </div>

      <div className="d-flex justify-content-center mt-5">
        <Link to="/menuAdmin">
          <Button className="btnFormPrenotazione mb-5">TORNA AL MENU</Button>
        </Link>
      </div>
    </div>
  );
};

export default OrdiniClienti;