import { AppBar, Grid, Box, Container, IconButton, Link, Typography, Button, Icon, Toolbar, Divider} from '@mui/material';
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
import MuiPhoneNumber from "material-ui-phone-number";
import Autocomplete from '@mui/material/Autocomplete';
import { register } from '../../actions/registerActions/registerActions'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import Alert from '@mui/material/Alert';
import {USER_REGISTER_RESET} from '../../constants/registerConstants/registerConstants';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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
  const [wEmail, setwEmail] = useState(false);
  const [passDiff, setpassDiff] = useState(false);
  const [isEmailExist, setEmailX] = useState();
  const [valid, setValid] = useState(false);

  const userRegister = useSelector(state => state.userRegister)
  const {success, loading} = userRegister
  const dispatch = useDispatch()
  let history = useHistory()

  useEffect(() => {
    if(success) {
      dispatch({type: USER_REGISTER_RESET});
      history.push('/register/registersuccess');
    }
  }, [success])

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
      setpassDiff(true);
    }
    else {
      const httpGetAsync = (url) => {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200){
              var json = JSON.parse(xmlHttp.responseText);
              var results = json.is_free_email.value;
              var delivery = json.is_smtp_valid.value;
              var deliveribility = json.deliverability;
              var mx_found = json.is_mx_found.value;
              var quality_score = json.quality_score;
              console.log(xmlHttp.responseText);
              if(deliveribility === 'UNDELIVERABLE'){
                setValid(true);
                // console.log(valid);
              }else{
                // console.log(delivery);
                if(delivery === true){
                  if(mx_found === true){
                    setValid(false);
                    dispatch(register(values.email, values.password, values.businessId, values.bank, bankBrand, phone, values.username));
                  }else{
                    setValid(true);
                  }
                }else{
                  setValid(true);
                }
              }
            }
        }
        xmlHttp.open("GET", url, true); // true for asynchronous
        console.log(url);
        xmlHttp.send(null);
      }
      var url = "https://emailvalidation.abstractapi.com/v1/?api_key=6f9323c274554881a997cc90a8e34c1f&email=" + values.email;
      httpGetAsync(url);
    }
  }

  const DialogWrongEmail = () => {
      const handleClose = () => {
        setwEmail(false);
      };

      return (
        <Toolbar>
          <Dialog
            open={wEmail}
            onClose={handleClose}
          >
            <DialogTitle id="alert-dialog-title">
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Username or email must be unique. Please try again
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
              <Typography color="red">OK</Typography>
              </Button>
            </DialogActions>
          </Dialog>
        </Toolbar>
      );
  }

  const DialogValidEmail = () => {
    const handleClose = () => {
      setValid(false);
    };

    return (
      <Toolbar>
        <Dialog
          open={valid}
          onClose={handleClose}
        >
          <DialogTitle id="alert-dialog-title">
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This is not a valid email. Please enter a valid email
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
            <Typography color="red">OK</Typography>
            </Button>
          </DialogActions>
        </Dialog>
      </Toolbar>
    );
}

  const DialogDifferentPass = () => {
    const handleClose = () => {
      setpassDiff(false);
    };

    return (
      <Toolbar>
        <Dialog
          open={passDiff}
          onClose={handleClose}
        >
          <DialogTitle id="alert-dialog-title">
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              The password doesn't match. Please try again
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus >
              <Typography color="red">OK</Typography>
            </Button>
          </DialogActions>
        </Dialog>
      </Toolbar>
    );
}

  const banks = [
    "Maybank", "OCBC", "CIMB", "Affin", "RHB", "HSBC", "AmBank", 'Public Bank Berhad', "Hong Leong Bank", "UOB",
    "Bank Islam Malaysia", "Affin Bank", "	Alliance Bank", "Standard Chartered Bank", 
    "MBSB Bank Berhad", "Citibank", "BSN", "Bank Muamalat Malaysia Berhad", "	Agrobank", "Al-Rajhi Malaysia", 
    "Co-op Bank Pertama", "Bank of Singapore"
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
          label={'Company'} variant="filled" InputProps={{ disableUnderline: true }}
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
        <Grid>
          {loading? 
          <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
          <CircularProgress  style={{color: '#F5CB5C'}}/>
          </Backdrop>
          :null
          }
        </Grid>
        </form>
        {
          wEmail?<DialogWrongEmail />:null
        }
        {
          passDiff?<DialogDifferentPass />:null
        }
        {
          valid?<DialogValidEmail />:null
        }
      </Container>
  );

}

export default RegisterForm;