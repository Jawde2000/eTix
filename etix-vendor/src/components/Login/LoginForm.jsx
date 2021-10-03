import { AppBar, Grid, Box, Container, IconButton, Link, Typography, Button, Icon, createMuiTheme, Divider} from '@mui/material';
import { makeStyles, styled} from '@mui/styles';
import React, {useState} from 'react';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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
  },
  forgot: {
    display: "flex",
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

  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });

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

  return (
      <Container>
        <Grid xs={12} container>
          <TextField sx={{ m: 1, width: '35ch' }} className={defaultStyle.inputbackground}
          label={'Username/Email'} variant="filled" InputProps={{ disableUnderline: true }}
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
           id="new-sumbit"
           type="submit"
           color='primary'
           variant="contained"
           href="/menu"
           style={{fontFamily: ['rubik', 'sans-serif'].join(','), backgroundColor: '#F5CB5C'}}
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
      </Container>
  );

}

export default LoginForm;