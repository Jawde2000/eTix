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
import MuiPhoneNumber from "material-ui-phone-number";

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
  phonebackground: {
    backgroundColor: 'white',
    borderRadius: 10,
    textUnderline: "none",
    '& label.Mui-focused': {
      color: '#F5CB5C',
      border: 'bold',
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

function RegisterForm() {
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
        <Grid xs={12} container padding={2} justifyContent="center" justifyItems="center">
            <Typography style={{fontSize: 15, fontFamily: ['rubik', 'sans-serif'].join(','), color: "black"}}>
                Create your eTix business account 
            </Typography>
        </Grid>
        <Grid xs={12} container padding={2}>
          <TextField sx={{ m: 1, width: '35ch', height: "5.8ch"}} className={defaultStyle.inputbackground}
          label={'Username'} variant="filled" InputProps={{ disableUnderline: true }}
          ></TextField>
        </Grid>
        <Grid xs={12} container padding={2}>
          <TextField sx={{ m: 1, width: '35ch', height: "5.8ch"}} className={defaultStyle.inputbackground}
          label={'email'} variant="filled" InputProps={{ disableUnderline: true }}
          ></TextField>
        </Grid>  
        <Grid xs={12} container padding={2}>
          <TextField sx={{ m: 1, width: '35ch', height: "5.8ch"}} className={defaultStyle.inputbackground}
          label={'Business Number'} variant="filled" InputProps={{ disableUnderline: true }}
          ></TextField>
        </Grid>  
        <Grid xs={12} container direction="column" padding={2}>   
        <MuiPhoneNumber 
        name="phone"
        label="Phone Number"
        data-cy="user-phone"
        defaultCountry={"my"}
        onlyCountries={["my", "sg"]}
        sx={{ m: 1, width: '35ch', height: "5.8ch"}} className={defaultStyle.phonebackground}
          label={'Phone Number'} variant="filled" InputProps={{ disableUnderline: true }}
        />
        </Grid>
        <Grid container  xs={12} padding={2}>        
        <FormControl sx={{ m: 1, width: '35ch', height: "5.8ch"}} variant="filled" className={defaultStyle.inputbackground}>
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
        <Grid container  xs={12} padding={2}>        
        <FormControl sx={{ m: 1, width: '35ch', height: "5.8ch"}} variant="filled" className={defaultStyle.inputbackground}>
          <InputLabel htmlFor="filled-adornment-password">Confirm your password</InputLabel>
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
        <Grid item xs={12} padding={2}>
          <Grid item xs={12} className={defaultStyle.loginButton}>
          <Button 
           sx={{ m: 1 }}
           id="new-sumbit"
           type="submit"
           href="/registrationsuccess"
           variant="contained"
           style={{fontFamily: ['rubik', 'sans-serif'].join(','), backgroundColor: '#F5CB5C'}}
           startIcon={<ArrowForwardIosIcon style={{fontSize: 25, color: "black"}}/>}
           >
          <Typography style={{fontSize: 20, fontFamily: ['rubik', 'sans-serif'].join(','), color: "black"}}>
            Sign Up
          </Typography>
          </Button>
          </Grid>
        </Grid>
      </Container>
  );

}

export default RegisterForm;