import React, {useState} from 'react'
import {makeStyles} from '@mui/styles';
import { Container, Grid, Box, Tooltip, TextField, Button} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import moscow from '../globalAssets/moscow.jpg';
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from 'react-router';
import { customerRegisterUsers, adminRegisterUsers, vendorRegisterUsers } from '../../actions/userActions';
import { useEffect } from 'react';
import { USER_CUSTOMER_REGISTER_RESET, USER_REGISTER_RESET, USER_VENDOR_REGISTER_RESET } from '../../constants/userConstants';

import "../Font/fonts.css"

const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: ['rubik', 'sans-serif'].join(','),
        backgroundImage: `url(${moscow})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "rgba(255,255,255,0.5)",
        backgroundBlendMode: "lighten",
        minHeight: 750,
        padding: 20,
    },
    box: {
        backgroundColor: "#CFDBD5",
        marginTop: 20,
        marginBottom: 40,
        borderRadius: 5,
        margin: 'auto',
        fontFamily: ['rubik', 'sans-serif'].join(','),
        padding: 20
    },
    action: {
        minHeight: 50,
    },
    functionicon: {
        cursor: 'pointer',
    },
    title: {
        fontWeight: 'bold',
        paddingTop:15,
    },
    subtitle: {
        paddingLeft:30,
    },
}));


const AddUser = ({props}) => {
    
    const classes = useStyles();
    let history = useHistory();
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const cus = useSelector(state => state.customerRegister)
    const {success: successCustomer, error: errorCus} = cus

    const admin = useSelector(state => state.adminRegister)
    const {success: successAdmin, error: errorAdmin} = admin

    const vendorD = useSelector(state => state.vendorRegister)
    const {success: successVendor, error: errorVendor} = vendorD

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("Customer");
    const [isActive, setIsActive] = useState(false);
    const [contact, setContact] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [passStatus, setPassStatus] = useState(false);
    // vendor
    const [status, setStatus] = useState(false);
    const [businessName, setBusinessName] = useState("");
    const [registrationNo, setRegistrationNo] = useState("");
    const [bankName, setBankName] = useState("");
    const [bankAcc, setBankAcc] = useState("");
    // const [createdBy, setCreatedBy] = useState(userInfo.userID);
    
    //customer
    const [birthdate, setBirthDate] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState('');
    const [user, setUser] = useState({});
    const [customer, setCustomer]= useState({});
    const [vendor, setVendor] = useState({});
    const [submit, setSubmit] = useState(false);

    const handleSubmit = () =>{
        if(username && email && contact && password && passStatus){

            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if ( re.test(email) ) {
                
            }
            else {
                alert("Please enter correct email format. Failed to save.");
                return;
            }


            if(role==="Customer"){
                if(birthdate && address && gender){
                    setUser({
                        ...user,
                        "username": username,
                        "email": email,
                        "is_customer": true,
                        "is_vendor": false,
                        "is_staff": false,
                        "is_superuser": false,
                        "is_active": isActive,
                        "password": password
                    })
                    setCustomer({
                        ...customer,
                        "customerBirthday": birthdate,
                        "customerGender": gender,
                        "customerContact_Number": contact,
                        "customerAddress": address,
                    })
                    setSubmit(true)
                    return;
                }
                alert("You mush fill in all the empty field!");
                setSubmit(false)
                return;
            }

            if(role==="Vendor"){
                if(bankName && bankAcc && registrationNo && businessName){
                    setUser({
                        ...user,
                        "username": username,
                        "email": email,
                        "is_customer": false,
                        "is_vendor": true,
                        "is_staff": false,
                        "is_superuser": false,
                        "is_active": isActive,
                        "password": password
                    })
                    setVendor({
                        ...vendor,
                        "vendorContact_Number" : contact,
                        "vendorStatus" : status,
                        "vendorName" : businessName,
                        "vendorBankName": bankName,
                        "vendorBankAcc": bankAcc,
                        "vendorRegistrationNo": registrationNo,
                    })
                    setSubmit(true);
                    return;
                }
                alert("You mush fill in all the empty field!");
                setSubmit(false);
                return
            }

            setUser({
                ...user,
                "username": username,
                "email": email,
                "is_customer": false,
                "is_vendor": false,
                "is_staff": true,
                "is_superuser": true,
                "is_active": isActive,
                "password": password
            })
            setSubmit(true);
            return;
        }

        if(!username || !email || !contact || !password || !passStatus){
            alert("Fill in all the empty field!");
            setSubmit(false)
            return;
        }
        
        if(!passStatus){
            alert("Password and confirm password must match!");
            setSubmit(false)
            return;
        }
    }

    useEffect(() => {
        if(submit){
            if(role==="Customer"){
                console.log("customer");
                dispatch(customerRegisterUsers(user, customer));
            }
            if(role==="Admin"){
                dispatch(adminRegisterUsers(user));
            }
            if(role==="Vendor"){
                console.log(user);
                dispatch(vendorRegisterUsers(user, vendor));
            }
            
        }
    },[user, customer, vendor])

    useEffect(() => {
        
        if(submit){
            if(role==="Customer"){
                if(successCustomer){
                    alert("Successfully Register Customer User");
                    dispatch({type: USER_CUSTOMER_REGISTER_RESET})
                    history.push('/menu/users/')
                }else{
                    alert("Failed to register User");
                    dispatch({type: USER_CUSTOMER_REGISTER_RESET})               
                    setSubmit(false)
                }
            }
            
            if(role==="Admin"){
                if(successAdmin){
                    alert("Successfully Register Admin User");
                    dispatch({type: USER_REGISTER_RESET})
                    history.push('/menu/users/')
                }else{
                    alert("Failed to register User");               
                    dispatch({type: USER_REGISTER_RESET})
                    setSubmit(false)
                }
            }

            if(role==="Vendor"){
                if(successVendor){
                    alert("Successfully Register Vendor User");
                    dispatch({type: USER_VENDOR_REGISTER_RESET})
                    history.push('/menu/users/')
                }else{
                    alert("Failed to register User");               
                    dispatch({type: USER_VENDOR_REGISTER_RESET})
                    setSubmit(false)
                }
            }
            
        }
        
    }, [dispatch, successCustomer, errorCus, successAdmin, errorAdmin, successVendor, errorVendor])

    const handleChangeRole = (e) => {
        setRole(e.target.value);
        //refresh the state
        setIsActive(false);
        setStatus(false);
        setBankName("");
        setBankAcc("");
        setBirthDate("");
        setAddress("")
        setGender("")
    }

    const handleChangeActive = () => {
        if(role==="Vendor"){
            if(status){
                setIsActive(!isActive);
                return;
            }
            alert("Vendor account can only be active once it have been verified!");
            return;
        }
        setIsActive(!isActive);

        
    }

    const handleChangeVerified = () => {
        if(!status){
            setStatus(!status);
            return;
        }
        if(isActive){
            alert("Cannot Un verify account when account is set to active");
            return;
        }
        
        setStatus(!status)
    }

    const handlePassword = (event) => {
        setConfirmPass(event.target.value);
        if(password === event.target.value){
            setPassStatus(true);
            return;
        }
        setPassStatus(false);
    }

    
    
    return (
        <Container className={classes.root} maxWidth="Fixed">
            <Container>
            <Grid container spacing={3} direction="column" style={{marginTop: 10}}>
                <Grid item xs={12} className={classes.action} container>
                    <Grid item xs={4}>
                        <Tooltip title="Back">
                            <Link to="/menu/users/">
                                <IconButton>
                                    <ArrowBackIcon fontSize="large" />
                                </IconButton>
                            </Link>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={4} textAlign="center" style={{fontSize:20}}>
                        Add User
                    </Grid>
                </Grid>
            </Grid>
            <Box sx={{width: '80%'}} className={classes.box}>
                <Grid container spacing={3} direction="column">
                    <Grid item xs={12} container>
                        <Grid item xs={12} sm={5} container textAlign="center">
                            <Grid item xs={12} />
                            <Grid item xs={12}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Role</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-label="role"
                                        name="row-radio-buttons-group"
                                        value={role}
                                        onChange={(e) => handleChangeRole(e)}
                                    >
                                        <FormControlLabel value="Customer" control={<Radio />} label="Customer" />
                                        <FormControlLabel value="Vendor" control={<Radio />} label="Vendor" />
                                        <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} style={!isActive? ({color: "red"}) : ({color: "green"})}>
                                <Tooltip title="Change status">
                                    <IconButton onClick={handleChangeActive}>
                                        <ChangeCircleIcon />
                                    </IconButton>
                                </Tooltip>
                                {isActive? "Active" : "Inactive"}                
                            </Grid>
                            {
                                role==="Vendor" ?
                                (
                                    
                                    <Grid item xs={12} style={!status? ({color: "red"}) : ({color: "green"})}>
                                        <Tooltip title="Vendor status">
                                            <IconButton onClick={handleChangeVerified}>
                                                <ChangeCircleIcon />
                                            </IconButton>
                                        </Tooltip>
                                        {status? "Verified" : "Not Verified"}                  
                                    </Grid>
                                )
                                :
                                null
                            }
                            <Grid item xs={12} />
                            <Grid item xs={12} />
                        </Grid>
                        <Grid item xs={12} sm={7} container textAlign='left' >
                            <Grid item xs={12} container>
                                <Grid item xs={12} style={{fontWeight: 'bold'}}>
                                    Basic Information
                                </Grid>
                            </Grid>
                            <Grid item xs={12} container className={classes.subtitle}>
                                <Grid item xs={12} sm={3} className={classes.title}>
                                    Username: 
                                </Grid>
                                <Grid item xs={12} sm={9} style={{paddingRight: 20}}>
                                    <TextField 
                                        id="username" 
                                        variant="outlined"
                                        onChange={(e) => setUsername(e.target.value)}
                                        defaultValue={username}
                                        margin="dense"
                                        fullWidth
                                        required
                                        size="small"
                                        InputProps={{
                                            style: {fontFamily: ['rubik', 'sans-serif'].join(',')}
                                        }} 
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} container className={classes.subtitle}>
                                <Grid item xs={12} sm={3} className={classes.title}>
                                    email: 
                                </Grid>
                                <Grid item xs={12} sm={9} style={{paddingRight: 20}}>
                                    <TextField 
                                        id="email" 
                                        variant="outlined"
                                        onChange={(e) => setEmail(e.target.value)}
                                        defaultValue={email}
                                        margin="dense"
                                        required
                                        type="email"
                                        fullWidth
                                        size="small"
                                        InputProps={{
                                            style: {fontFamily: ['rubik', 'sans-serif'].join(','),}
                                        }} 
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} container className={classes.subtitle}>
                                <Grid item xs={12} sm={3} className={classes.title}>
                                    Phone Number: 
                                </Grid>
                                <Grid item xs={12} sm={9} style={{paddingRight: 20}}>
                                    <TextField 
                                        id="contact" 
                                        variant="outlined"
                                        onChange={(e) => setContact(e.target.value)}
                                        defaultValue={contact}
                                        margin="dense"
                                        required
                                        fullWidth
                                        size="small"
                                        InputProps={{
                                            style: {fontFamily: ['rubik', 'sans-serif'].join(','),}
                                        }} 
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} container className={classes.subtitle}>
                                <Grid item xs={12} sm={3} className={classes.title}>
                                    Password: 
                                </Grid>
                                <Grid item xs={12} sm={9} style={{paddingRight: 20}}>
                                    <TextField 
                                        id="password" 
                                        variant="outlined"
                                        onChange={(e) => setPassword(e.target.value)}
                                        defaultValue={password}
                                        type="password"
                                        margin="dense"
                                        required
                                        fullWidth
                                        size="small"
                                        InputProps={{
                                            style: {fontFamily: ['rubik', 'sans-serif'].join(','),}
                                        }} 
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} container className={classes.subtitle}>
                                <Grid item xs={12} sm={3} className={classes.title} color={passStatus? "black" : "red"}>
                                    Confirm Password: 
                                </Grid>
                                <Grid item xs={12} sm={9} style={{paddingRight: 20}}>
                                    <TextField 
                                        id="confirmpass" 
                                        variant="outlined"
                                        onChange={(e) => handlePassword(e)}
                                        onChange={(e) => handlePassword(e)}
                                        defaultValue={confirmPass}
                                        type="password"
                                        margin="dense"
                                        required
                                        fullWidth
                                        size="small"
                                        InputProps={{
                                            style: {fontFamily: ['rubik', 'sans-serif'].join(','),}
                                        }} 
                                    />
                                </Grid>
                            </Grid>
                            {role === "Vendor"? 
                                (
                                    <>
                                    <Grid item xs={12} />
                                    <Grid item xs={12} />
                                    <Grid item xs={12} />
                                    <Grid item xs={12} container>
                                        <Grid item xs={12} className={classes.title}>
                                            Business Information
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} container className={classes.subtitle}>
                                        <Grid item xs={12} sm={3} className={classes.title}>
                                            Company Name: 
                                        </Grid>
                                        <Grid item xs={12} sm={9} style={{paddingRight: 20}}>
                                            <TextField 
                                                id="BusinessName" 
                                                variant="outlined"
                                                onChange={(e) => setBusinessName(e.target.value)}
                                                defaultValue={businessName}
                                                margin="dense"
                                                fullWidth
                                                required
                                                size="small"
                                                InputProps={{
                                                    style: {fontFamily: ['rubik', 'sans-serif'].join(','),}
                                                }} 
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} container className={classes.subtitle}>
                                        <Grid item xs={12} sm={3} className={classes.title}>
                                            Registration No: 
                                        </Grid>
                                        <Grid item xs={12} sm={9} style={{paddingRight: 20}}>
                                            <TextField 
                                                id="RegNo" 
                                                variant="outlined"
                                                onChange={(e) => setRegistrationNo(e.target.value)}
                                                defaultValue={registrationNo}
                                                margin="dense"
                                                fullWidth
                                                required
                                                size="small"
                                                InputProps={{
                                                    style: {fontFamily: ['rubik', 'sans-serif'].join(','),}
                                                }} 
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} container className={classes.subtitle}>
                                        <Grid item xs={12} sm={3} className={classes.title}>
                                            Bank Name: 
                                        </Grid>
                                        <Grid item xs={12} sm={9} style={{paddingRight: 20}}>
                                            <TextField 
                                                id="BankName" 
                                                variant="outlined"
                                                onChange={(e) => setBankName(e.target.value)}
                                                defaultValue={bankName}
                                                margin="dense"
                                                fullWidth
                                                required
                                                size="small"
                                                InputProps={{
                                                    style: {fontFamily: ['rubik', 'sans-serif'].join(','),}
                                                }} 
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} container className={classes.subtitle}>
                                        <Grid item xs={12} sm={3} className={classes.title}>
                                            Bank Acc: 
                                        </Grid>
                                        <Grid item xs={12} sm={9} style={{paddingRight: 20}}>
                                            <TextField 
                                                id="BankAcc" 
                                                variant="outlined"
                                                onChange={(e) => setBankAcc(e.target.value)}
                                                defaultValue={bankAcc}
                                                margin="dense"
                                                fullWidth
                                                required
                                                size="small"
                                                InputProps={{
                                                    style: {fontFamily: ['rubik', 'sans-serif'].join(','),}
                                                }} 
                                            />
                                        </Grid>
                                    </Grid>
                                    
                                    </>
                                )
                                :
                                (
                                    role=== "Customer"?
                                    (
                                        <>
                                        <Grid item xs={12} />
                                        <Grid item xs={12} />
                                        <Grid item xs={12} />
                                        <Grid item xs={12} container>
                                            <Grid item xs={12} className={classes.title}>
                                                Personal Information
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} container className={classes.subtitle}>
                                            <Grid item xs={12} sm={3} className={classes.title}>
                                                Birth Date: 
                                            </Grid>
                                            <Grid item xs={12} sm={9} style={{paddingRight: 20}}>
                                                <TextField 
                                                    id="BirthDate" 
                                                    variant="outlined"
                                                    onChange={(e) => setBirthDate(e.target.value)}
                                                    defaultValue={birthdate}
                                                    margin="dense"
                                                    type="date"
                                                    fullWidth
                                                    required
                                                    size="small"
                                                    InputProps={{
                                                        style: {fontFamily: ['rubik', 'sans-serif'].join(','),}
                                                    }} 
                                                />
                                                {console.log(birthdate)}
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} container className={classes.subtitle}>
                                            <Grid item xs={12} sm={3} className={classes.title}>
                                                Address: 
                                            </Grid>
                                            <Grid item xs={12} sm={9} style={{paddingRight: 20}}>
                                                <TextField 
                                                    id="address" 
                                                    variant="outlined"
                                                    onChange={(e) => setAddress(e.target.value)}
                                                    defaultValue={address}
                                                    margin="dense"
                                                    fullWidth
                                                    required
                                                    size="small"
                                                    InputProps={{
                                                        style: {fontFamily: ['rubik', 'sans-serif'].join(','),}
                                                    }} 
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} container className={classes.subtitle}>
                                            <FormControl component="fieldset">
                                                <FormLabel component="legend" style={{fontFamily: ['rubik', 'sans-serif'].join(','), fontWeight: 'bold', color:'black'}}>Gender</FormLabel>
                                                <RadioGroup
                                                    row
                                                    aria-label="Gender"
                                                    name="row-radio-buttons-group"
                                                    value={gender}
                                                    onChange={(e) => setGender(e.target.value)}
                                                >
                                                    <FormControlLabel value='M' control={<Radio />} label="Male" />
                                                    <FormControlLabel value='F' control={<Radio />} label="Female" />
                                                    <FormControlLabel value='P' control={<Radio />} label="Others" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                        </>
                                    )
                                    :
                                    (null)
                                )
                            }
                            <Grid item xs={12} container>
                                <Grid item xs={12} style={{textAlign: 'right', paddingRight: 20}}>
                                    <Button 
                                        variant="outlined"
                                        startIcon={<AddIcon />} 
                                        style={{cursor: 'pointer', backgroundColor: 'red', color: 'black', fontWeight: 'bold', fontFamily: ['rubik', 'sans-serif'].join(',') , marginTop: 20}}
                                        onClick={handleSubmit}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            </Container>
        </Container>
    )
}

export default AddUser