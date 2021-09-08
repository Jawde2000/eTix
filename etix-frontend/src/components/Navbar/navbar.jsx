import React, { Component } from 'react'
import {Link, AppBar, Toolbar, Typography, Button, IconButton, MenuIcon, makeStyles, colors, Tooltip, Input} from "@material-ui/core"
import './navbar.css'
import eTixLogo from './NavAssets/eTixLogo.png'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

const useStyles = makeStyles((theme) => ({
  liAButton: {
    fontFamily: 'robo',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#CFDBD5',
    textDecoration: 'none',
    paddingLeft: 50,
    paddingRight: 50,
    alignContent: "center"
  },
  resizePic: {
    width: 79,
    height: 38.25,
    paddingLeft: 20
  },
  resizeLogo: {
    fontSize: 50,
    fontWeight: 15,
    color: '#CFDBD5',
  },
  iconSize: {
    fontSize: 35,
    color: '#CFDBD5',
    paddingRight: 30,
    paddingLeft: 30,
  }
}));

function NavBar() {
  const defaultStyle = useStyles();
  var searchBox = document.querySelectorAll('.search-box input[type="text"] + span');

  searchBox.forEach(elm => {
    elm.addEventListener('click', ()=> {
      elm.previousElementSibling.value = '';
    });
  });

  return (
      <div className="nav">
          <header className="head">
            <div>
            <Link href="#" style={{ textDecoration: 'none' }}>
            <IconButton>
            <img src={eTixLogo} className={defaultStyle.resizePic}/>
            <Typography className={defaultStyle.resizeLogo}>
              eTix 
            </Typography>
            </IconButton>
            </Link>
            </div>

            <div>
            <Link style={{ textDecoration: 'none' }}>          
            <Button className={defaultStyle.liAButton}>
              HOME
            </Button>
            </Link>
            </div>

            <div>
            <Link style={{ textDecoration: 'none' }}>
            <Button className={defaultStyle.liAButton}>
              ATTRACTIONS
            </Button>
            </Link>
            </div>

            <div>
            <Link style={{ textDecoration: 'none' }}>
            <Button className={defaultStyle.liAButton}>
              SERVICES
            </Button>
            </Link>
            </div>

            <Tooltip title="searchbar">
            <div className="search-box" >
              <input type="text" placeholder="Search" id="reset"></input>
              <span></span>
            </div>
            </Tooltip>

            <div>
            <Tooltip title="cart">
            <IconButton >
              <ShoppingCartIcon className={defaultStyle.iconSize}/>
            </IconButton>
            </Tooltip>
            </div>
          </header>
      </div>
  );

}

export default NavBar;