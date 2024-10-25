import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import React, { useEffect } from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import Contatti from './components/Contatti';
import ShopCart from './components/ShopCart';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from 'react-use-cart'; 
import CardDetails from './components/CardDetails';
import Brand from './components/Brand'
import LoginAdmin  from './components/LoginAdmin';
import MenuAdmin from './components/MenuAdmin'
import GestioneAdmin from './components/GestioneAdmin';
import PrivateAdmin from './components/PrivateAdmin'; 
import ShoeSearch from './components/ShoeSearch';
import OrdiniClienti from './components/OrdiniClienti';
import ClientiPage from'./components/ClientiPage';
function App() {
  useEffect(() => {
    localStorage.removeItem('accessToken'); 
}, []);
  return (
    <CartProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contatti" element={<Contatti />} />
          <Route path="/:marca" element={<Brand />} />
          <Route path="/shop" element={<ShopCart />} />
          <Route path="/card-details/:id" element={<CardDetails/>}/>
          <Route path="/loginAdmin" element={<LoginAdmin/>}/>
          <Route path="/menuAdmin" element={<PrivateAdmin><MenuAdmin/></PrivateAdmin>}/>
          <Route path="/gestione-admin" element={<PrivateAdmin><GestioneAdmin/></PrivateAdmin>}/>
          <Route path="/search/:nome" element={<ShoeSearch/>}/>
          <Route path="/ordini-clienti" element={<PrivateAdmin><OrdiniClienti/></PrivateAdmin>}/>
         <Route path="/cliente" element={<ClientiPage/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;