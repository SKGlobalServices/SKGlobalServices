import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { ServicePage } from './pages/ServicePage/ServicePage';
import {ScrollToTop} from './components/iu/ScrollToTop';

function App() {
  return (
    <Router basename="/">
      <ScrollToTop />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/service/:id" element={<ServicePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;