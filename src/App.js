import './App.css';
import Home from './Screens/Home';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Signin from './Screens/Signin';
import Register from './Screens/Register';
import Navbar from './Components/Navbar';
import Main from './Screens/Main';
import { ContextProvised } from './Context/ChatContext';


function App() {
  return (
    
    <BrowserRouter>
    <ContextProvised>
    <div className="App">
      <Navbar />
      <Routes>
      <Route path='/' element={<Home />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/register' element={<Register />} />
        <Route path='/main' element={<Main />} />
      </Routes>
    </div>
    </ContextProvised>
    </BrowserRouter>
    
  );
}

export default App;
