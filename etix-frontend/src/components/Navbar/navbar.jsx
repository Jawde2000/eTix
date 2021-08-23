import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container';
import etixLogo from 'C:/Users/User/eTix-fyp/eTix/etix-frontend/src/components/Navbar/etixLogo.png';
import './navbar.css';

class NavBar extends Component {
  state = {}
  render() {
    return (
      <>
        <Navbar style={{ backgroundColor: "#0077B6" }}>
          <Container>
            <Navbar.Brand href="#home">
              <div className="_193wCc _3cVWns">
                <div className="etixTop etixTopSticky">
                  <div className="navbar-wrapper">
                    <div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </Navbar.Brand>
          </Container>
        </Navbar>
      </>
    );
  }
}



export default NavBar;