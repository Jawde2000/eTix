import React, {useState, useEffect} from 'react';
import { AppBar, Grid, IconButton, Link, Typography, Badge } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import etixLogo from '../../globalAssets/eTixLogo.png'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { viewCartData, cartDispatch } from '../../../state/actions/actions';

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
        paddingRight: '75px',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        justify: 'center',
        cursor: 'pointer',
    },
    auxContainer: {
        paddingTop: '25px',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent:'center',
    },
    hover: {
        "&:hover": {
          Color: '#F5CB5C'
        }
    },
}));

function Nav() {
    const defaultStyle = useStyles();
    let history = useHistory();
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;
    const cartD = useSelector(state => state.viewCartData);
    const {cartData} = cartD;
    const removeItem = useSelector(state => state.removeItem);
    const {success: removeSuccess} = removeItem;
    const cartAdd = useSelector(state => state.cartAdd);
    const {success: addcartSuccess} = cartAdd;
    const payment = useSelector(state => state.payment);
    const {success: paymentSuccess} = payment;
    const [cartItemPax, setcartItemPax] = useState("0");
    const [isHome, setHome] = useState(true);
    const [isAttract, setAttract] = useState(false);
    const [isServ, setServ] = useState(false);
    const [isCart, setCart] = useState(false);

    useEffect(() => {
        if(userInfo){
            dispatch(viewCartData());
        }
    }, [userInfo, addcartSuccess, removeSuccess, paymentSuccess])

    useEffect(() => {
        if(typeof(cartData) !== 'undefined' && cartData !== null){
            console.log(cartData);
            if(cartData || addcartSuccess || removeSuccess || paymentSuccess){
                let cartpax = Object.keys(cartData).length;
                if(cartpax > 0){
                    setcartItemPax(cartpax);
                }else if (cartpax < 0){
                    setcartItemPax('0');
                }else{
                    setcartItemPax('0');
                }
            }   
        }
        
        console.log(cartItemPax);
    }, [addcartSuccess, removeSuccess, cartData, paymentSuccess])

    useEffect(() => {
        if(paymentSuccess){
            setcartItemPax('0');
            dispatch(cartDispatch());
        }
    }, [paymentSuccess])

    function cartOnClick() {
        setCart(true);
        setHome(false);
        setServ(false);
        setAttract(false);
        history.push('/cart')
    }

    const handleHome = () => {
        setHome(true);
        setServ(false);
        setCart(false);
        setAttract(false);
    }

    const handleService = () => {
        setHome(false);
        setServ(true);
        setCart(false);
        setAttract(false);
        history.push('/services');
    }

    const handleAttract = () => {
        setHome(false);
        setServ(false);
        setCart(false);
        setAttract(true);
        history.push('/attractions');
    }

    return (
        <Grid className={defaultStyle.customizeAppbar} container justify="center" direction="row" alignItems="center" display="flex">
            <Grid item xs={2}>
                <Link href='http://localhost:3000/'         
                    style={{ textDecorationLine: 'none', display: "flex",}}>        
                    <img src={etixLogo} className={defaultStyle.resizePic} alt="eTix Logo"/>
                    <Typography className={defaultStyle.resizeLogo} variant="h2" sx={{ flexGrow: 1 }} style={{fontFamily: ['rubik', 'sans-serif'].join(',')}}>
                        eTix 
                    </Typography>
                </Link>
            </Grid>
   
            <Grid onClick={handleHome} item xs={3} className={defaultStyle.menuItems}><Link className={defaultStyle.hover} href='http://localhost:3000/' style={isHome?{ textDecorationLine: 'none', color: '#f5cb5c', display: "flex",}:{ textDecorationLine: 'none', color: 'white', display: "flex",}}>HOME</Link></Grid>
            <Grid onClick={handleAttract} item xs={3} className={defaultStyle.menuItems}><Link className={defaultStyle.hover} style={isAttract?{ textDecorationLine: 'none', color: '#f5cb5c', display: "flex",}:{ textDecorationLine: 'none', color: 'white', display: "flex",}}>ATTRACTIONS</Link></Grid>
            <Grid onClick={handleService} item xs={3} className={defaultStyle.menuItems}><Link className={defaultStyle.hover} style={isServ?{ textDecorationLine: 'none', color: '#f5cb5c', display: "flex",}:{ textDecorationLine: 'none', color: 'white', display: "flex",}}>SERVICE</Link>
            </Grid>     
            <Grid item xs={1} className={defaultStyle.auxContainer} justify="space-between">
                {userInfo?<IconButton><Badge badgeContent={cartItemPax} color="primary">
                    <ShoppingCartIcon sx={!isCart?{color: 'white', fontSize: '35px'}:{color: '#f5cb5c', fontSize: '35px'}} onClick={cartOnClick} />
                </Badge></IconButton>:null}
             </Grid>
        </Grid>
    );

}

export default Nav;
