import './App.css';
import React from 'react';
import Homepage from './components/Homepage/Homepage';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="Customer">
      <div className="Customer-Homepage">
        <Homepage />
      </div>
      <footer>
        <Footer />
      </footer>
        
    </div>

    
    
  );
}

export default App;
