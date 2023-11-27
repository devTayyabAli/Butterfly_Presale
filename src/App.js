import logo from './logo.svg';
import './App.css';
import NavBar_header from './Components/NavBar_header/NavBar_header';
import Home_land from './Components/Home_land/Home_land';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [BtTxt, setBtTxt] = useState("Connect");

  return (
    <div className="App">
      <ToastContainer />
    <Home_land BtTxt={BtTxt}  setBtTxt={setBtTxt}  />
    </div>
  );
}

export default App;
