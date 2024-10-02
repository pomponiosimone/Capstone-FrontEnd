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

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contatti" element={<Contatti />} />
          <Route path="/shop" element={<ShopCart />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;