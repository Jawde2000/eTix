import React, {useState, useEffect, useReducer, useCallback} from 'react'
import { Grid, Container, Box, Tooltip, IconButton, TextField, Button, Input, Alert} from '@mui/material';
import {makeStyles} from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import CircularProgress from '@mui/material/CircularProgress';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import AddIcon from '@mui/icons-material/Add';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { USER_CUSTOMER_UPDATE_RESET, USER_UPDATE_RESET, USER_DETAIL_RESET } from '../../state/actions/actionConstants';
import { updateUser, customerEdit, passwordChange } from '../../state/actions/actions';
import images from '../globalAssets/scripts/bgchange';
import S3 from 'react-aws-s3';
import Avatar from '@mui/material/Avatar';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${images()})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "rgba(255,255,255,0.5)",
        backgroundBlendMode: "lighten",
        minHeight: 500,
        fontFamily: ['rubik', 'sans-serif'].join(','),
        padding: 20
    },
    box: {
        backgroundColor: "#CFDBD5",
        marginBottom: 20,
        borderRadius: '25px',
        minHeight: 450,
        marginTop: 15,
        margin: 'auto',
        fontFamily: ['rubik', 'sans-serif'].join(','),
        fontSize:18
    },
    action: {
        minHeight: 50,
    },
    functionicon: {
        cursor: 'pointer',
    },
}));

function UserDetail() {
    const classes = useStyles();
    const dispatch = useDispatch();    
    const history = useHistory()
    const ulist = useSelector(state => state.userLogin)
    const clist = useSelector(state => state.customerDetails)
    const {userInfo} = ulist
    const {customerInfo} = clist
    
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    //customer
    const [birthdate, setBirthDate] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    // const [user, setUser]
    const [editing,setEditing] = useState(false);
    const [found, setFound] = useState(true);
    const [picloading, setPloading] = useState(false);
    const [file, setFile] = useState('')
    
    const config = {
        bucketName: 'etixbucket',
        dirName: 'etix', 
        region: 'ap-southeast-1',
        accessKeyId: 'AKIA4TYMPNP6EQNIB7HV',
        secretAccessKey: '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'
    }
    
    const AWS = require('aws-sdk')
    AWS.config.update({
        accessKeyId: "AKIA4TYMPNP6EQNIB7HV",
        secretAccessKey: "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",
        region: "ap-southeast-1",
    });

    const ReactS3Client = new S3(config);
    
    var s3 = new AWS.S3({ apiVersion: '2006-03-01', accessKeyId: 'AKIA4TYMPNP6EQNIB7HV', secretAccessKey: 'Vd8K2yLQrKZermLm4VxV1XJp9k73UPLLwQjfR', region: "ap-southeast-1"});
    
    useEffect(async () => {
        PicExist()

        if (!userInfo){
            history.push('/')
        }
    })

    const [imgSrc, setImgSrc] = useState(("https://etixbucket.s3.amazonaws.com/etix/" + file + ".png"));

    async function PicExist() {
        let url = "https://etixbucket.s3.amazonaws.com/etix/" + file + '.png'
        await fetch(url).then((res) => {
            if (res.status == 404) {
                setFound(false)
            } 
            else {
                setImgSrc(url)
                setFound(true)
            }
        }).catch((err) => {
            setFound(false)
        });
    }

    
    const upload = (e) => {
        const image = URL.createObjectURL(e.target.files[0]);
        setPloading(true);
        setImgSrc(image);
        ReactS3Client.uploadFile(e.target.files[0], file)
        .then(data =>{
            setPloading(false);
            // window.setTimeout(function(){window.location.reload()},3000)
            console.log(data);
        })
        .catch(err => {
            console.error(err)
            setPloading(false);
        })
    }
    
    const handleChangeUserName = (event) => {
        setUsername(event.target.value);
    }

    const handleChangeUserEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleChangeUserPhone = (event) => {
        setContact(event.target.value);
    }

    const hadleChangePassword = (event) => {
        setPassword(event.target.value);
    }
    
    const handleChangeConfirmPassword = (event) => {
        setConfirmPass(event.target.value);
    }

    const handleChangeBirthDate = (event) => {
        setBirthDate(event.target.value);
    }

    const handleChangeAddress = (event) => {
        setAddress(event.target.value);
    }

    const handleChangeGender = (event) => {
        setGender(event.target.value);
    }

    const handleChangefname = (event) => {
        setFname(event.target.value);
    }

    const handleChangelname = (event) => {
        setLname(event.target.value);
    }

    const handleSubmit = () => {
        if (fname != '' && lname != '' && gender != '' && contact != '' && address != '' && birthdate != null){
            dispatch(customerEdit(fname, lname, contact, address, birthdate, gender))
            history.go(0)        
            if (password != '' && confirmPass != '' && password == confirmPass) {
                dispatch(passwordChange(password))
                console.log("password changed")
            }
        } else if (password != '' && confirmPass != '' && password == confirmPass) {
            dispatch(passwordChange(password))
            console.log("password changed")
        } else {
            alert("Please fill in all of the fields!")
            console.log(fname, lname, contact, address, birthdate, gender)
        }

        if (userInfo.username != username){
            dispatch(updateUser(username, userInfo.userID))
        }
    }

    let iiMissing = false

    useEffect(() => {
        if(userInfo) {
            setFile(userInfo.userID)
            setUsername(userInfo.username)
            setEmail(userInfo.email)
        } 

        if(customerInfo) {
            setFname(customerInfo.customerFirstName)
            setLname(customerInfo.customerLastName)
            setGender(customerInfo.customerGender)
            setContact(customerInfo.customerContact_Number)
            setAddress(customerInfo.customerAddress)
            setBirthDate(customerInfo.customerBirthday)
        }
    }, [userInfo, customerInfo])

    if (fname == '' && lname == '' && address == ''){
        iiMissing = true
    }

    return (
        <Container className={classes.root} maxWidth="Fixed">
        <Container >
            {!userInfo? 
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
                :
                <>
                    <Grid container spacing={3} direction="column" style={{marginTop: 10}}>
                        <Grid item xs={12} className={classes.action} container>
                            <Grid item xs={4} textAlign="center" style={{fontSize:20}}>
                                User ID: {userInfo.userID}
                            </Grid>
                            {iiMissing? 
                            <Grid item xs={4} textAlign="center" style={{fontSize:12}}>
                                <Alert severity="warning">Important info is missing</Alert>
                            </Grid>
                            : ''
                            }
                            <Grid item xs={iiMissing? 3 : 7} textAlign="right">
                                <Tooltip title="Edit User">
                                    <IconButton onClick={() => setEditing(!editing)}>
                                        <EditIcon className={classes.functionicon} fontSize="large" />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Box sx={{width:'90%'}} className={classes.box}>
                        <Grid container spacing={3} direction="column">
                            <Grid item xs={12} container>
                                
                                <Grid item xs={12} sm={4} container style={{textAlign:'center'}}>
                                    
                                    <Grid item xs={12} >
                                        Profile Picture
                                    </Grid>
                                    <Grid item xs={12} column > 
                                        <Grid style={{display:'flex', justifyContent:'center', alignItems:'center', paddingBottom:10}}>  
                                        <Avatar
                                        style={{ height: '150px', width: '150px' }}
                                            src={imgSrc}
                                            alt={username}        
                                        />
                                        </Grid>                             
                                        {!editing? "":
                                        (
                                        <div>
                                        <label htmlFor="contained-button-file">
                                        <input type="file"  accept="image/png" id="contained-button-file" onChange={upload}
                                        style={{justifyContent:'center', alignItems:'center', display: 'none'}}
                                        />
                                        {picloading? (<Box sx={{ display: 'flex' }}
                                        style={{justifyContent:'center', alignItems:'center'}}
                                        ><CircularProgress /></Box>):(<Button variant="contained" component="span" >Upload</Button>)}
                                        </label>                            
                                        </div>
                                        )}
                                    </Grid>
                                    <Grid xs={12} item />
                                    <Grid xs={12} item />
                                    <Grid xs={12} item />
                                    <Grid xs={12} item />
                                    <Grid xs={12} item />
                                    <Grid xs={12} item />
                                    <Grid xs={12} item />
                                    <Grid xs={12} item />
                                    <Grid xs={12} item />
                                    <Grid xs={12} item />
                                    <Grid xs={12} item />
                                    <Grid xs={12} item />
                                    <Grid xs={12} item />
                                </Grid>
                                <Grid item xs={12} sm={7} container>
                                    <Grid item xs={12} container>
                                        <Grid item xs={12} style={{fontWeight:'bold'}}>
                                            Basic Information
                                        </Grid>
                                        {/* username */}
                                        <Grid item xs={12} container style={{marginLeft: 30, marginTop:10}}>
                                            <Grid item xs={3} style={!editing ? ({fontWeight: 'bold',}) : ({fontWeight: 'bold', marginTop: 13}) }>
                                                User Name: 
                                            </Grid>
                                            {!editing ?
                                                (
                                                    <Grid item xs={9} textAlign="left">
                                                        {username}
                                                    </Grid>
                                                )
                                                :
                                                (
                                                    <Grid item xs={9} textAlign="left">
                                                        <TextField 
                                                            id="userName" 
                                                            variant="outlined"
                                                            onChange={handleChangeUserName}
                                                            defaultValue={username}
                                                            margin="dense"
                                                            fullWidth
                                                            size="small"
                                                            InputProps={{
                                                                style: {fontFamily: ['rubik', 'sans-serif'].join(','),}
                                                            }} 
                                                        />
                                                    </Grid>   
                                                )
                                            }
                                            
                                        </Grid>
                                        <Grid item xs={12} container container style={{marginLeft: 30, marginTop:10}}>
                                            <Grid item xs={3} style={!editing ? ({fontWeight: 'bold'}) : ({fontWeight: 'bold', marginTop: 13}) }>
                                                Email: 
                                            </Grid>
                                            {!editing ?
                                                (
                                                    <Grid item xs={9} textAlign="left">
                                                        {email}
                                                    </Grid>
                                                )
                                                :
                                                (
                                                    <Grid item xs={9} textAlign="left">
                                                        <TextField 
                                                            id="user_email" 
                                                            variant="outlined"
                                                            onChange={handleChangeUserEmail}
                                                            defaultValue={email}
                                                            margin="dense"
                                                            fullWidth
                                                            disabled
                                                            size="small"
                                                            InputProps={{
                                                                style: {fontFamily: ['rubik', 'sans-serif'].join(','),}
                                                            }} 
                                                        />
                                                    </Grid>   
                                                )
                                            }
                                            
                                        </Grid>
                                        {customerInfo?
                                            (
                                                <>
                                                    <Grid item xs={12} style={{fontWeight:'bold', marginTop: 20}}>
                                                        Personal Information
                                                    </Grid>
                                                    <Grid item xs={12} container container style={{marginLeft: 30, marginTop:10}}>
                                                        <Grid item xs={3} style={!editing ? ({fontWeight: 'bold'}) : ({fontWeight: 'bold', marginTop: 13}) }>
                                                            First Name : 
                                                        </Grid>
                                                        {!editing ?
                                                            (
                                                                <Grid item xs={9} textAlign="left">
                                                                    {fname}
                                                                </Grid>
                                                            )
                                                            :
                                                            (
                                                                <Grid item xs={9} textAlign="left">
                                                                    <TextField 
                                                                        id="regNo" 
                                                                        variant="outlined"
                                                                        onChange={handleChangefname}
                                                                        defaultValue={fname}
                                                                        margin="dense"
                                                                        fullWidth
                                                                        size="small"
                                                                        InputProps={{
                                                                            style: {fontFamily: ['rubik', 'sans-serif'].join(','),}
                                                                        }} 
                                                                    />
                                                                </Grid>   
                                                            )
                                                        }  
                                                    </Grid>
                                                    <Grid item xs={12} container container style={{marginLeft: 30, marginTop:10}}>
                                                        <Grid item xs={3} style={!editing ? ({fontWeight: 'bold'}) : ({fontWeight: 'bold', marginTop: 13}) }>
                                                            Last Name : 
                                                        </Grid>
                                                        {!editing ?
                                                            (
                                                                <Grid item xs={9} textAlign="left">
                                                                    {lname}
                                                                </Grid>
                                                            )
                                                            :
                                                            (
                                                                <Grid item xs={9} textAlign="left">
                                                                    <TextField 
                                                                        id="regNo" 
                                                                        variant="outlined"
                                                                        onChange={handleChangelname}
                                                                        defaultValue={lname}
                                                                        margin="dense"
                                                                        fullWidth
                                                                        size="small"
                                                                        InputProps={{
                                                                            style: {fontFamily: ['rubik', 'sans-serif'].join(','),}
                                                                        }} 
                                                                    />
                                                                </Grid>   
                                                            )
                                                        }  
                                                    </Grid>
                                                    <Grid item xs={12} container container style={{marginLeft: 30, marginTop:10}}>
                                                        <Grid item xs={3} style={!editing ? ({fontWeight: 'bold'}) : ({fontWeight: 'bold', marginTop: 13}) }>
                                                            Phone Number : 
                                                        </Grid>
                                                        {!editing ?
                                                            (
                                                                <Grid item xs={9} textAlign="left">
                                                                    {contact}
                                                                </Grid>
                                                            )
                                                            :
                                                            (
                                                                <Grid item xs={9} textAlign="left">
                                                                    <TextField 
                                                                        id="regNo" 
                                                                        variant="outlined"
                                                                        onChange={handleChangeUserPhone}
                                                                        defaultValue={contact}
                                                                        margin="dense"
                                                                        fullWidth
                                                                        size="small"
                                                                        InputProps={{
                                                                            style: {fontFamily: ['rubik', 'sans-serif'].join(','),}
                                                                        }} 
                                                                    />
                                                                </Grid>   
                                                            )
                                                        }  
                                                    </Grid>
                                                    <Grid item xs={12} container container style={{marginLeft: 30 , marginTop:10}}>
                                                        <Grid item xs={3} style={!editing ? ({fontWeight: 'bold'}) : ({fontWeight: 'bold', marginTop: 13}) }>
                                                            Birth Date: 
                                                        </Grid>
                                                        {!editing ?
                                                            (
                                                                <Grid item xs={9} textAlign="left">
                                                                    {birthdate}
                                                                </Grid>
                                                            )
                                                            :
                                                            (
                                                                <Grid item xs={9} textAlign="left">
                                                                    <TextField 
                                                                        id="businessName" 
                                                                        variant="outlined"
                                                                        onChange={handleChangeBirthDate}
                                                                        defaultValue={birthdate}
                                                                        margin="dense"
                                                                        type="date"
                                                                        fullWidth
                                                                        size="small"
                                                                        InputProps={{
                                                                            style: {fontFamily: ['rubik', 'sans-serif'].join(','),}
                                                                        }} 
                                                                    />
                                                                </Grid>   
                                                            )
                                                        }  
                                                    </Grid>
                                                    <Grid item xs={12} container container style={{marginLeft: 30, marginTop:10}}>
                                                        <Grid item xs={3} style={!editing ? ({fontWeight: 'bold'}) : ({fontWeight: 'bold', marginTop: 13}) }>
                                                            Address : 
                                                        </Grid>
                                                        {!editing ?
                                                            (
                                                                <Grid item xs={9} textAlign="left">
                                                                    {address}
                                                                </Grid>
                                                            )
                                                            :
                                                            (
                                                                <Grid item xs={9} textAlign="left">
                                                                    <TextField 
                                                                        id="regNo" 
                                                                        variant="outlined"
                                                                        onChange={handleChangeAddress}
                                                                        defaultValue={address}
                                                                        margin="dense"
                                                                        fullWidth
                                                                        size="small"
                                                                        InputProps={{
                                                                            style: {fontFamily: ['rubik', 'sans-serif'].join(','),}
                                                                        }} 
                                                                    />
                                                                </Grid>   
                                                            )
                                                        }  
                                                    </Grid>
                                                    <Grid item xs={12} container container style={{marginLeft: 30, marginTop:10}}>
                                                        
                                                        {!editing ?
                                                            (
                                                                <FormControl component="fieldset">
                                                                    <FormLabel component="legend" style={{fontFamily: ['rubik', 'sans-serif'].join(','), fontWeight: 'bold'}}>Gender</FormLabel>
                                                                    <RadioGroup
                                                                        row
                                                                        aria-label="gender"
                                                                        name="gender-radio-buttons-group"
                                                                        value={gender}
                                                                        disabled
                                                                    >
                                                                        <FormControlLabel value="M" control={<Radio />} label="Male" />
                                                                        <FormControlLabel value="F" control={<Radio />} label="Female" />
                                                                        <FormControlLabel value="P" control={<Radio />} label="Others" />
                                                                    </RadioGroup>
                                                                </FormControl>
                                                            )
                                                            :
                                                            (
                                                                <FormControl component="fieldset">
                                                                    <FormLabel component="legend">Gender</FormLabel>
                                                                    <RadioGroup
                                                                        row
                                                                        aria-label="gender"
                                                                        name="gender-radio-buttons-group"
                                                                        value={gender}
                                                                        onChange={(e) => handleChangeGender(e)}
                                                                    >
                                                                        <FormControlLabel value="M" control={<Radio />} label="Male" />
                                                                        <FormControlLabel value="F" control={<Radio />} label="Female" />
                                                                        <FormControlLabel value="P" control={<Radio />} label="Others" />
                                                                    </RadioGroup>
                                                                </FormControl> 
                                                            )
                                                        }  
                                                    </Grid>
                                                </>
                                            )
                                            :
                                            (
                                               null
                                            )
                                        }
                                        {editing?
                                            (
                                                <>
                                                <Grid item xs={12} container style={{marginLeft: 30, marginTop:10}}>
                                                    <Grid item xs={3} style={!editing ? ({fontWeight: 'bold',}) : ({fontWeight: 'bold', marginTop: 13}) }>
                                                        Password: 
                                                    </Grid>
                                                    <Grid item xs={9} textAlign="left">
                                                        <TextField 
                                                            id="password" 
                                                            variant="outlined"
                                                            onChange={hadleChangePassword}
                                                            defaultValue={password}
                                                            margin="dense"
                                                            type='password'
                                                            fullWidth
                                                            size="small"
                                                            InputProps={{
                                                                style: {fontFamily: ['rubik', 'sans-serif'].join(','),}
                                                            }} 
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} container style={{marginLeft: 30, marginTop:10}}>
                                                    <Grid item xs={3} style={!editing ? ({fontWeight: 'bold',}) : ({fontWeight: 'bold', marginTop: 13}) }>
                                                        Confirm Password: 
                                                    </Grid>
                                                    <Grid item xs={9} textAlign="left">
                                                        <TextField 
                                                            id="confirmPass" 
                                                            variant="outlined"
                                                            onChange={handleChangeConfirmPassword}
                                                            defaultValue={confirmPass}
                                                            type='password'
                                                            margin="dense"
                                                            fullWidth
                                                            size="small"
                                                            InputProps={{
                                                                style: {fontFamily: ['rubik', 'sans-serif'].join(','),}
                                                            }} 
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} container>
                                                    <Grid item xs={12} style={{textAlign: 'right', paddingRight: 20}}>
                                                        {password!==confirmPass?
                                                            (
                                                                <Button 
                                                                    variant="outlined"
                                                                    startIcon={<AddIcon />}
                                                                    onClick={()=> alert("Password Not Match")}
                                                                    style={{cursor: 'pointer', backgroundColor: 'green', color: 'black', fontWeight: 'bold', fontFamily: ['rubik', 'sans-serif'].join(',') , marginTop: 20, marginBottom: 20}}
                                                                >
                                                                    Save
                                                                </Button>
                                                            )
                                                            :
                                                            (
                                                                <Button 
                                                                    variant="outlined"
                                                                    startIcon={<AddIcon />}
                                                                    style={{cursor: 'pointer', backgroundColor: 'green', color: 'black', fontWeight: 'bold', fontFamily: ['rubik', 'sans-serif'].join(',') , marginTop: 20, marginBottom: 20}}
                                                                    onClick={handleSubmit}
                                                                >
                                                                    Save
                                                                </Button>
                                                            )
                                                        }
                                                        
                                                    </Grid>
                                                </Grid>
                                                </>
                                            )
                                            :
                                            (
                                                null
                                            )
                                        }
                                    </Grid>    
                                </Grid>
                                <Grid item xs={12} sm={1} />
                            </Grid>
                        </Grid>
                    </Box>
                </>
            }
        </Container>
        </Container>
            
    )
}

export default UserDetail