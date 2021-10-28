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
import Autocomplete from '@mui/material/Autocomplete';

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
  const [phone, setPhone] = useState();
  const [bankBrand, setBank] = useState();

  const [values, setValues] = useState({
    username: '',
    email: '',
    businessId: '',
    bank: '',
    password: '',
    confirmPassword: '',
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

  const submit = (event) => {
    event.preventDefault();
    if (values.password !== values.confirmPassword) {
      alert("Password doesnt match")
    }
    else {
      console.log(values.username);
      console.log(values.email);
      console.log(values.businessId);
      console.log(bankBrand);
      console.log(phone);
      console.log(values.password);
      console.log(values.confirmPassword);
    }
    
  }

  const banks = [
    "Maybank", "OCBC", "CIMB", "Affin", "RHB", "HSBC", "AmBank"
  ]

  return (
      <Container>
        <form onSubmit={submit}>
        <Grid xs={12} container padding={2} justifyContent="center" justifyItems="center">
            <Typography style={{fontSize: 15, fontFamily: ['rubik', 'sans-serif'].join(','), color: "black"}}>
                Create your eTix business account 
            </Typography>
        </Grid>
        <Grid xs={12} container padding={2}>
          <TextField sx={{ m: 1, width: '40ch', height: "5.6ch"}} className={defaultStyle.inputbackground}
          label={'Username'} variant="filled" InputProps={{ disableUnderline: true }}
          value={values.username} onChange={handleChange('username')} required
          ></TextField>
        </Grid>
        <Grid xs={12} container padding={2}>
          <TextField sx={{ m: 1, width: '40ch', height: "5.6ch"}} className={defaultStyle.inputbackground}
          label={'email'} variant="filled" InputProps={{ disableUnderline: true }} type="email"
          value={values.email} onChange={handleChange('email')} required
          ></TextField>
        </Grid>  
        <Grid xs={12} container padding={2}>
          <TextField sx={{ m: 1, width: '40ch', height: "5.6ch"}} className={defaultStyle.inputbackground}
          label={'Business Number'} variant="filled" InputProps={{ disableUnderline: true }}
          value={values.businessId} onChange={handleChange('businessId')} required 
          inputProps={{
            maxLength: 15,
            minLength: 7,
          }}
          ></TextField>
        </Grid>  
        <Grid xs={12} container padding={2} direction="row">
          <Grid xs={4} item>
            <Autocomplete 
            disablePortal
            options={banks} required  getOptionLabel={option => option} onChange={(event, value) => setBank(value)}
            sx={{ width: '10ch', height: "5.6ch"}}
            className={defaultStyle.inputbackground} InputProps={{ disableUnderline: true }}
            renderInput={(params) => 
            <TextField variant="filled" {...params} label="bank" />}
            />
          </Grid>
          <Grid xs={8} item>
          <TextField sx={{ m: 1, width: '26.5ch', height: "5.6ch"}} className={defaultStyle.inputbackground}
          label={'Bank Number'} variant="filled" InputProps={{ disableUnderline: true }}
          value={values.bank} onChange={handleChange('bank')} required
          inputProps={{
            maxLength: 16,
            minLength: 6,
          }}
          ></TextField>
          </Grid>
        </Grid>  
        <Grid xs={12} container direction="column" padding={2}>   
        <MuiPhoneNumber 
        name="phone"
        label="Phone Number"
        data-cy="user-phone"
        defaultCountry={"my"}
        onlyCountries={["my", "sg"]}
        value={phone} required
        onChange={setPhone}
        sx={{ m: 1, width: '39ch', height: "5.6ch"}} className={defaultStyle.phonebackground}
          label={'Phone Number'} variant="filled" InputProps={{ disableUnderline: true }}
        />
        </Grid>
        <Grid container  xs={12} padding={2}>        
        <FormControl sx={{ m: 1, width: '40ch', height: "5.6ch"}} variant="filled" className={defaultStyle.inputbackground}>
          <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
          <FilledInput         
            disableUnderline="true"
            variant="filled" required
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
        <FormControl sx={{ m: 1, width: '40ch', height: "5.6ch"}} variant="filled" className={defaultStyle.inputbackground}>
          <InputLabel htmlFor="filled-adornment-password">Confirm your password</InputLabel>
          <FilledInput         
            disableUnderline="true"
            variant="filled" required
            id="filled-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.confirmPassword}
            onChange={handleChange('confirmPassword')}
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
          //  href="/registrationsuccess"
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
        </form>
      </Container>
  );

}

export default RegisterForm;