import { Grid, Container, IconButton,  Typography, Button,} from '@mui/material';
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
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import Alert from '@mui/material/Alert'
import { register } from '../../state/actions/actions'

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

function RegisterForm() {
    const defaultStyle = useStyles();

    let re = /^(([^<>()[]\.,;:\s@"]+(.[^<>()[]\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [username, setUsername] = useState("");
    const [values, setValues] = useState({
      password: '',
      showPassword: false,
    });
    const userLogin = useSelector(state => state.register)
    const {errorRegister,  userInfo} = userLogin
    const dispatch = useDispatch()
    let history = useHistory()
  
    useEffect(() => {
      if(userInfo) {
          history.push('/')
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

    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
    }
  
    const handleChangeHP = (event) => {
        setPhonenumber(event.target.value);
    }
    const handleLogin = (e) => {
        e.preventDefault()
        dispatch(register(email, password, username, phonenumber))
        history.push('/')
    }  

    return (
        <Container>
        {errorRegister && <Grid sx={{maxWidth: 290, maxHeight: 30, marginBottom: 1.5}} item><Alert severity="error">User with this email already exist</Alert></Grid>}
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
        <Grid xs={12} container>
            <TextField sx={{ m: 1, width: '35ch' }} className={defaultStyle.inputbackground} type="text"
            label={'Username'} variant="filled" InputProps={{ disableUnderline: true }}
            value={username} onChange={handleChangeUsername}
            ></TextField>
        </Grid>
        <Grid xs={12} container>
            <TextField sx={{ m: 1, width: '35ch' }} className={defaultStyle.inputbackground} type="text"
            label={'Phone Number'} variant="filled" InputProps={{ disableUnderline: true }}
            value={phonenumber} onChange={handleChangeHP}
            ></TextField>
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
                Register
            </Typography>
            </Button>
        </Grid>
        </Container>
    );

}

export default RegisterForm;