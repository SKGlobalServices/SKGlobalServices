import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from './components/Navbar'
import { Services } from './components/Services'
import { Footer } from './components/Footer'
import { Contact } from './components/Contact'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;