import { AppBar, Grid, Box, Container, IconButton, Link, Typography, Button, Icon, createMuiTheme, Divider} from '@mui/material';
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

  const [token, setToken] = useCookies(['mytoken'])
  const [isLogin, setLogin] = useState(true)
  let history = useHistory()

  useEffect(() => {
    if(token['mytoken']) {
        history.push('/menu')
    }
  }, [token])

  const [values, setValues] = useState({
    password: '',
    email: '',
    showPassword: false,
  });

  const loginBtn = () => {
    console.log("login passed")
    console.log(values.email, values.password)
    APIService.LoginUser(values.email, values.password)
    .then(resp => resp.token? 
      setToken('mytoken', resp.token)
       : 
      alert("Invalid username or password."))
    .catch(e => console.log(e))
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
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

  const handleSubmit = e => {
    e.preventDefault();
    console.log(values.email);
    console.log(values.password);
    console.log("submitted");
  };

  return (
      <Container>
        <form >
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
           onclick={loginBtn}
          //  href="/menu"
           style={{fontFamily: ['rubik', 'sans-serif'].join(','),}}
           startIcon={<ArrowForwardIosIcon style={{fontSize: 25, color: "black"}}/>}
           >
          <Typography style={{fontSize: 20, fontFamily: ['rubik', 'sans-serif'].join(','), color: "black"}} >
            Login
          </Typography>
          </Button>
          </Grid>
          <Grid item xs={12} >
            <Link className={defaultStyle.forgot} style={{textDecoration: "none",}} href="/forgotpassword">
              Forgot Password?
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Box>
            <Link className={defaultStyle.create} style={{textDecoration: "none",}} href="/register">
              Create a new account?
            </Link>
            </Box>
          </Grid>
        </Grid>
        </form>
      </Container>
  );

}

export default LoginForm;