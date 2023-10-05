import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './screen/Home';
import Auth from './screen/Auth';

function App() {
  return (
    <div className="App">
      <BrowserRouter >
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Auth />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
