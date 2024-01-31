import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './Pages/Login';
import Home from './Pages/Home';
import Cart from './Pages/Cart';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
