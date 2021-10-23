import { AppBar, Grid, Container, IconButton,  Typography, Button,} from '@mui/material';
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
import {useHistory} from 'react-router-dom';
import {useCookies} from 'react-cookie';
import APIService from '../../APIService';
import { login } from '../../actions/userActions'
import {useDispatch, useSelector} from 'react-redux'
import Alert from '@mui/material/Alert'

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
    justifyContent: "flex-end"
  }
}));

function LoginForm() {
  const defaultStyle = useStyles();

  const [token, setToken] = useCookies(['mytoken'])
  const [user, setUser] = useState();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });

  const userLogin = useSelector(state => state.userLogin)
  const {error, loading, userInfo} = userLogin
  const dispatch = useDispatch()

  //redirect the user app component if token is valid
  // useEffect(() => {
  //   if(token['mytoken']) {
  //       history.push('/menu')
  //   }
  // },[token])

  let history = useHistory()

  useEffect(() => {
    if(userInfo) {
        history.push('/menu')
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

  // const handleLogin = () => {
  //   console.log(email, password)
  //   APIService.LoginUser(email, password)
  //   .then(resp => resp.token? 
  //     setToken('mytoken', resp.token)
  //      : 
  //     alert("Invalid username or password."))
  //   .catch(e => console.log(e))
  //   //need to check user type
  // }

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }


  

  return (
      <Container>
        {error && <Grid xs={12} container><Alert severity="error">No active account found with the give credentials.</Alert></Grid>}
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
        <Grid item xs={12} className={defaultStyle.loginButton}>
          <Button 
           sx={{ m: 1 }}
           id="new-sumbit"
           type="submit"
           color='primary'
           variant="contained"
           autoFocus
           onClick={handleLogin}
           style={{fontFamily: ['rubik', 'sans-serif'].join(','), backgroundColor: '#F5CB5C'}}
           startIcon={<ArrowForwardIosIcon style={{fontSize: 25, color: "black"}}/>}
           >
            <Typography style={{fontSize: 20, fontFamily: ['rubik', 'sans-serif'].join(','), color: "black"}}>
              Login
            </Typography>
          </Button>
        </Grid>
      </Container>
  );

}

export default LoginForm;