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

import "../Font/fonts.css"

const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: ['rubik', 'sans-serif'].join(','),
        backgroundImage: `url(${moscow})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "rgba(255,255,255,0.5)",
        backgroundBlendMode: "lighten",
        minHeight: 600,
    },
    box: {
        backgroundColor: "#CFDBD5",
        marginTop: 20,
        marginBottom: 40,
        borderRadius: 5,
        minHeight: 450,
        margin: 'auto',
        fontFamily: ['rubik', 'sans-serif'].join(',')
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

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("Customer");
    const [isActive, setIsActive] = useState(false);
    const [contact, setContact] = useState("");
    // vendor
    const [status, setStatus] = useState(false);
    const [bankName, setBankName] = useState("");
    const [bankAcc, setBankAcc] = useState("");
    const [createdBy, setCreatedBy] = useState(userInfo.userID);
    
    //customer
    const [birthdate, setBirthDate] = useState(new Date());
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");


    const handleSubmit = () =>{
        if(username && email && contact){
            if(role==="Customer"){
                if(birthdate && address && gender){
                    alert("Successfully Register User");
                    history.push("/menu/users")
                    return;

                }
                alert("You mush fill in all the empty field!");
                return;
            }

            if(role==="Vendor"){
                if(bankName && bankAcc){
                    alert("Successfully Register User");
                    history.push("/menu/users")
                    return;
                }
                alert("You mush fill in all the empty field!");
                return
            }

            alert("Successfully Registered Admin User");
            history.push("/menu/users")
            return;
        }
        alert("Fill in all the empty field!");
    }


    const handleChangeRole = (e) => {
        setRole(e.target.value);
        //refresh the state
        setIsActive(false);
        setStatus(false);
        setBankName("");
        setBankAcc("");
        setBirthDate(new Date());
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

    
    
    return (
        <Container className={classes.root} maxWidth="Fixed">
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
                            <Grid item xs={12} >
                                Profile Image
                            </Grid>
                            <Grid item xs={12}>
                                <img 
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Example_image.svg/600px-Example_image.svg.png"
                                    alt="logo"
                                    style={{marginTop: 10,minHeight: 150, maxWidth:150}}
                                />
                            </Grid>
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
                            {role === "Vendor"? 
                                (
                                    <>
                                    <Grid item xs={12} />
                                    <Grid item xs={12} />
                                    <Grid item xs={12} />
                                    <Grid item xs={12} container>
                                        <Grid item xs={12} className={classes.title}>
                                            Bank Information
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
                                                    <FormControlLabel value="M" control={<Radio />} label="Male" />
                                                    <FormControlLabel value="F" control={<Radio />} label="Female" />
                                                    <FormControlLabel value="P" control={<Radio />} label="Others" />
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
                                        style={{cursor: 'pointer', backgroundColor: 'red', color: 'black', fontWeight: 'bold', fontFamily: ['rubik', 'sans-serif'].join(',') }}
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
    )
}

export default AddUser