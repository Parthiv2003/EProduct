import logo from './logo.svg';
import './App.css';
import react from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Product from './Components/Product';
import Cart from './Components/Cart';
import Navbar from './Components/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/product" element={<Product />}> </Route>
          <Route path="/cart" element={<Cart />}> </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
