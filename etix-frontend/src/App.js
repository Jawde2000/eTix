import './App.css';
import React from 'react';
import Homepage from './components/Homepage/Homepage';
import NavBar from './components/Navbar/navbar'
import { makeStyles } from "@material-ui/core";

function App() {

  return (
    <div> 
      <div>
        <Homepage />
        <NavBar /> 
      </div>
        
    </div>
  );
}

export default App;
