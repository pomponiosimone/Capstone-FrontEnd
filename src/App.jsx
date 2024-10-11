import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import Contatti from './components/Contatti';
import ShopCart from './components/ShopCart';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from 'react-use-cart'; 
import CardDetails from './components/CardDetails';
import Brand from './components/Brand'
import LoginAdmin  from './components/loginAdmin';
import MenuAdmin from './components/MenuAdmin'
import GestioneAdmin from './components/GestioneAdmin';

function App() {
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
          <Route path="/menuAdmin" element={<MenuAdmin/>}/>
          <Route path="/gestione-admin" element={<GestioneAdmin/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;