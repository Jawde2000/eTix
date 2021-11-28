import { Grid, Container, IconButton,  Typography, Button, Box, CircularProgress, } from '@mui/material';
import { makeStyles} from '@mui/styles';
import React, {useState, useEffect} from 'react';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import Alert from '@mui/material/Alert'
import { login } from '../../state/actions/actions'
import Backdrop from '@mui/material/Backdrop';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

const useStyles = makeStyles((theme) => ({
  inputbackground: {
    backgroundColor: 'white',
    borderRadius: 10,
    textUnderline: "none",
    '& label.Mui-focused': {
      color: '#F5CB5C',
      border: 'bold',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#F5CB5C',
      border: 'bold',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
        border: 'bold',
      },
      '&:hover fieldset': {
        borderColor: '#F5CB5C',
        border: 'bold',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#F5CB5C',
        border: 'bold',
      },
    },
  },
  loginButton: {
    display: "flex",
    justifyContent: "flex-end",
    spacing: 3
  },
  forgot: {
    display: "flex",
    color: 'white',
    fontFamily: ['rubik', 'sans-serif'].join(','),
    padding: 10,
    justifyContent: "flex-start",
    '&:hover': {
      textDecorationLine: 'underline',
      color: '#F5CB5C'
    },
    cursor: "pointer"
  },
  create: {
    display: "flex",
    color: 'white',
    fontFamily: ['rubik', 'sans-serif'].join(','),
    padding: 10,
    justifyContent: "flex-start",
    '&:hover': {
      textDecorationLine: 'underline',
      color: '#F5CB5C'
    },
    cursor: "pointer"
  }
}));

function LoginForm() {
    const defaultStyle = useStyles();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [values, setValues] = useState({
      password: '',
      showPassword: false,
    });
  
    const userLogin = useSelector(state => state.userLogin)
    const {errorLogin,  userInfo, success: loginSuccess, loading: loadingSuccess} = userLogin
    const dispatch = useDispatch()
  
    let history = useHistory()
  
    useEffect(() => {
      if(userInfo) {
        history.push('/')
        history.go(0)
      } 
    },[userInfo])
  
    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
      setPassword(event.target.value);
    };
  
    const handleClickShowPassword = () => {
      setValues({
        ...values,
        showPassword: !values.showPassword,
      });
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    const handleChangeEmail = (event) => {
      setEmail(event.target.value);
    }
  
    const handleLogin = (e) => {
      e.preventDefault()
      dispatch(login(email, password))
    }  

  //   const DialogResetSuccess = () => {
  //     const handleClose = () => {
  //       setPaymentFail(false);
  //     };

  //     return (
  //       <Toolbar>
  //         <Dialog
  //           open={paymentFailure}
  //           onClose={handleClose}
  //         >
  //           <DialogTitle id="alert-dialog-title">
  //           </DialogTitle>
  //           <DialogContent>
  //             <DialogContentText id="alert-dialog-description">
  //               {total <= 0?<Typography>You didn't have anything in the cart yet/Your cart is expired</Typography>:
  //               <Typography>
  //                   Payment failure, this is most likely to be a problem with your banking details, kindly check with PayPal
  //               </Typography>
  //               }
  //             </DialogContentText>
  //           </DialogContent>
  //           <DialogActions>
  //             <Button onClick={handleClose} autoFocus style={{color: 'red'}}>
  //               OK
  //             </Button>
  //           </DialogActions>
  //         </Dialog>
  //       </Toolbar>
  //     );
  // }

    return (
        <Container>
        {errorLogin && <Grid sx={{maxWidth: 290}} container><Alert severity="error">No active account found with the give credentials.</Alert></Grid>}
        <form onSubmit={handleLogin}>
        <Grid xs={12} container>
            <TextField sx={{ m: 1, width: '35ch' }} className={defaultStyle.inputbackground} type="email"
            label={'Email'} variant="filled" InputProps={{ disableUnderline: true }}
            value={email} onChange={handleChangeEmail}
            ></TextField>
        </Grid>
        <Grid container  xs={12} >        
        <FormControl sx={{ m: 1, width: '35ch' }} variant="filled" className={defaultStyle.inputbackground}>
            <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
            <FilledInput         
            disableUnderline="true"
            variant="filled"
            id="filled-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
                <InputAdornment position="end">
                <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
                </InputAdornment>
            }
            />
        </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} className={defaultStyle.loginButton}>
          <Button 
           sx={{ m: 1 }}
           type="submit"
           color='success'
           position="center"
           variant="contained"
          //  href="/menu"
           style={{fontFamily: ['rubik', 'sans-serif'].join(','), backgroundColor: '#F5CB5C'}}
           startIcon={<ArrowForwardIosIcon style={{fontSize: 25, color: "black", textShadow: '1px 1px 2px white'}}/>}
           >
          <Typography style={{fontSize: 20, fontFamily: ['rubik', 'sans-serif'].join(','), color: "black",}} >
            Login
          </Typography>
          </Button>
          </Grid>
          <Grid item xs={12} >
            <Link to="/forgotpass" className={defaultStyle.forgot} style={{textDecoration: "none", textShadow: '1px 1px 2px black', fontSize: 20}}>
              Forgot Password?
            </Link>
          </Grid>
          <Grid item xs={12} >
            <Box>
            <Link className={defaultStyle.create} style={{textDecoration: "none", textShadow: '1px 1px 2px black', fontSize: 20}} to="/register">
              Create a new account?
            </Link>
            </Box>
          </Grid>
        </Grid>
        </form>
        {
          loadingSuccess?
          <Box sx={{ display: 'flex' }}>
          <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
          <CircularProgress  style={{color: '#F5CB5C'}}/>    
          </Backdrop>
          </Box>
          :
          null
        }
        </Container>
    );

}

export default LoginForm;