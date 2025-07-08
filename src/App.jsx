import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from './sections/NavBar/Navbar'
import { Services } from './sections/Services/Services'
import { Footer } from './sections/Footer/Footer'
import { Contact } from './sections/Contact/Contact'
import WhatsAppButton from './components/iu/Whatsappbutton/Whatsappbutton';
// TODO: agregar traducciones al ingles, español, holanreact‑i18next dés
function App() {
  return (
    <div className="App">
      <NavBar />
      <Services />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;