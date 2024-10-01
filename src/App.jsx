import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import HomePage from './components/HomePage'
import Contatti from './components/Contatti'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

function App() {


  return (
<>
<BrowserRouter>
       <NavBar/>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/contatti" element={<Contatti/>}/>
          </Routes>
        <Footer/>
      </BrowserRouter>

</>
  )
  
  }
  

export default App
