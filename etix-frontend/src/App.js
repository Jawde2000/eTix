import './App.css';
import React from 'react';
import Homepage from './components/Homepage/Homepage';
import Header from './components/Homepage/Header/header'
import NavBar from './components/Navbar/navbar'
import Footer from './components/Footer/Footer'
import Verification from './components/verification_form/Verification';

import { makeStyles } from "@material-ui/core";


function App() {

  return (

    <div> 
      <div>
        <Header/>
        <NavBar/>
        <Verification />
        <Footer />
      </div>

        
    </div>

    
    
  );
}

export default App;
