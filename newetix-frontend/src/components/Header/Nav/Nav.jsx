import React, {useState, useEffect} from 'react';
import { AppBar, Grid, IconButton, Link, Typography, Badge } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'

import etixLogo from '../../globalAssets/eTixLogo.png'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const useStyles = makeStyles((theme) => ({
    customizeAppbar: {
        minHeight: 130,
        background: 'linear-gradient(to right, #0f0c29, #302b63, #24243e)',
        position: 'relative',
        paddingRight: 150,
        fontFamily: ['rubik', 'sans-serif'].join(','),
        boxShadow: 'none'
    },
    resizePic: {
        width: 118.5,
        height: 57.375,
        paddingLeft: 40,
        paddingTop: 30,
    },
    resizeLogo: {
        color: '#CFDBD5',
        fontFamily: ['rubik', 'sans-serif'].join(','),
        fontWeight: "bold",
        paddingTop: 30,
    },
    display: {
        display: "flex",
        align: "center"
    },
    rightClock: {
        float: "right"
    },
    menuContainer: {
        paddingLeft: '250px',
        paddingRight: '250px',
        paddingTop: '25px'
    },
    menuItems: {
        fontSize: '20px',
        paddingLeft: '125px',
        paddingRight: '75px'
    },
    auxContainer: {
        paddingTop: '25px',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent:'center',
    },
}));

function Nav() {
    const defaultStyle = useStyles();
    let history = useHistory()
    const cartD = useSelector(state => state.viewCartData)
    const {cartData} = cartD
    const [cartItemPax, setcartItemPax] = useState("");
    let cartpax = 0;

    useEffect(() => {
        for (let i in cartData){
            cartpax = cartpax + 1
        }
        
        setcartItemPax(cartpax)
    }, [cartData])

    function cartOnClick() {
        history.push('/cart')
    }

    return (
        <Grid className={defaultStyle.customizeAppbar} container justify="center" direction="row" alignItems="center" display="flex">
            <Grid item>
                <Link href='http://localhost:3000/'         
                    style={{ textDecorationLine: 'none', display: "flex",}}>        
                    <img src={etixLogo} className={defaultStyle.resizePic} alt="eTix Logo"/>
                    <Typography className={defaultStyle.resizeLogo} variant="h2" sx={{ flexGrow: 1 }} style={{fontFamily: ['rubik', 'sans-serif'].join(',')}}>
                        eTix 
                    </Typography>
                </Link>
            </Grid>
   
            <Grid item className={defaultStyle.menuItems}><Link href='http://localhost:3000/' style={{ textDecorationLine: 'none', color: 'white', display: "flex",}}>HOME</Link></Grid>
            <Grid item className={defaultStyle.menuItems}><Link href='http://localhost:3000/attractions' style={{ textDecorationLine: 'none', color: 'white', display: "flex",}}>ATTRACTIONS</Link></Grid>
            <Grid item className={defaultStyle.menuItems}><Link href='http://localhost:3000/services' style={{ textDecorationLine: 'none', color: 'white', display: "flex",}}>SERVICE</Link></Grid>
            {cartItemPax? 
                <Grid item className={defaultStyle.auxContainer} justify="space-between">
                    <IconButton><Badge badgeContent={cartItemPax} color="primary">
                        <ShoppingCartIcon sx={{color: 'white', fontSize: '35px'}} color="inherit" onClick={cartOnClick} />
                    </Badge></IconButton>
                </Grid>
                :
                ''
            }
        </Grid>
    );

}

export default Nav;
