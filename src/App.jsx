import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from './components/Navbar'
import { Services } from './components/Services'
import { Footer } from './components/Footer'
import { Contact } from './components/Contact'
import WhatsAppButton from './components/iu/Whatsappbutton/Whatsappbutton';

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