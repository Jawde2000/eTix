import { Grid, Box, Container, IconButton, Link, Typography, Button, Paper} from '@mui/material';
import { makeStyles, styled} from '@mui/styles';
import React, {useState, useEffect} from 'react';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import '../Header/header.css';
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';
import APIService from '../../APIService'
import { login } from '../../actions/userActions/userActions'
import {useDispatch, useSelector} from 'react-redux'
import Alert from '@mui/material/Alert'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles((theme) => ({
  text: {
    fontFamily: ['rubik', 'sans-serif'].join(','),
  },
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
    justifyContent: "flex-end"
  },
  forgot: {
    display: "flex",
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

  let history = useHistory()

  const userLogin = useSelector(state => state.userLogin)
  const {error,  userInfo, loading} = userLogin
  const [isLoading, setLoad] = useState(false);
  const [seconds, setSeconds] = useState(5);
  const dispatch = useDispatch()

  useEffect(() => {
    if(userInfo) {
        history.push('/menu')
    }
  }, [userInfo])

  useEffect(() => {
    if(loading) {
      setLoad(true);
    }
  }, [loading, isLoading])

  useEffect(() => {
    if(isLoading){
      setLoad(true);
      if (seconds > 0) {
        setTimeout(() => setSeconds(seconds - 1), 1000);
      } else {
        setLoad(false);
      }
    }
  });

  const [values, setValues] = useState({
    password: '',
    email: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = (event) => {
    event.preventDefault();
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const loginBtn = (e) => {
    e.preventDefault();
    console.log(values.email, values.password)
    dispatch(login(values.email, values.password))
  }


  return (
      <Container>
        <form onSubmit={loginBtn}>
        {!isLoading? error && <Grid xs={12} container><Alert severity="error">No active account found with the give credentials.</Alert></Grid>:null}
        <Grid xs={12} container>
          <TextField sx={{ m: 1, width: '35ch' }} className={defaultStyle.inputbackground}
          label={'Email'} variant="filled" InputProps={{ disableUnderline: true }}
          type="email" value={values.email} onChange={handleChange('email')}
          ></TextField>
        </Grid>
        <Grid container  xs={12} >        
        <FormControl sx={{ m: 1, width: '35ch' }} variant="filled" className={defaultStyle.inputbackground}>
          <InputLabel htmlFor="filled-adornment-password" >Password</InputLabel>
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
            <Link className={defaultStyle.forgot} style={{textDecoration: "none", textShadow: '1px 1px 2px black', fontSize: 20}} href="/forgetpass">
              Forgot Password?
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Box>
            <Link className={defaultStyle.create} style={{textDecoration: "none", textShadow: '1px 1px 2px black', fontSize: 20}} href="/register">
              Create a new account?
            </Link>
            </Box>
          </Grid>
        </Grid>
        <Grid>
          {isLoading?
          <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
          <CircularProgress  style={{color: '#F5CB5C', fontSize: 10}}/>
          </Backdrop>:null
          }
        </Grid>
        </form>
      </Container>
  );

}

export default LoginForm;