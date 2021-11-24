import React, {useState, useEffect, useReducer, useCallback} from 'react'
import { Grid, Container, Box, Tooltip, IconButton, TextField, Button, Toolbar, Alert, Typography} from '@mui/material';
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
import { updateUser, customerEdit, passwordChange, customerDetails } from '../../state/actions/actions';
import images from '../globalAssets/scripts/bgchange';
import S3 from 'react-aws-s3';
import Avatar from '@mui/material/Avatar';
import moment from "moment";
import Backdrop from '@mui/material/Backdrop';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import SecurityTwoToneIcon from '@mui/icons-material/SecurityTwoTone';
import PersonTwoToneIcon from '@mui/icons-material/PersonTwoTone';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${images()})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "rgba(255,255,255,0.5)",
        minHeight: 500,
        fontFamily: ['rubik', 'sans-serif'].join(','),
        padding: 20
    },
    box: {
        backgroundColor: "#FFFEF7",
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
        color: 'black',
    },
}));

function UserDetail() {
    const classes = useStyles();
    const dispatch = useDispatch();    
    const history = useHistory();
    const ulist = useSelector(state => state.userLogin);
    const clist = useSelector(state => state.customerDetails);
    const cEdit = useSelector(state => state.customerEdit);
    const passwordChanges = useSelector(state => state.passwordChanges)
    const userUpdate = useSelector(state => state.userUpdate);
    const {userInfo} = ulist;
    const {customerInfo} = clist;
    const {success: editSuccess, loading: editLoading} = cEdit;
    const {success: updateSuccess, loading: updateLoading} = userUpdate;
    const {success:  changeSuccess, loading: changeLoading} = passwordChanges;
    
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    //customer
    const [customerID, setID] = useState("");
    const [birthdate, setBirthDate] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    // const [user, setUser]
    const [editing,setEditing] = useState(false);
    const [found, setFound] = useState(true);
    const [picloading, setPloading] = useState(false);
    const [file, setFile] = useState('');
    const [openUp, setOpenUp] = useState(false);
    const [openPasWar, setOpenPasWar] = useState(false);
    const [openEmpty, setEmpty] = useState(false);
    const [openPasNot, setOpenPasNot] = useState(false);
    const [openPas, setOpenPas] = useState(false);
    const [openPer, setOpenPer] = useState(false);
    
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
    

    useEffect(() => {
        if(userInfo){
            dispatch(customerDetails())
        }
    }, [userInfo, editSuccess, updateSuccess, changeSuccess])

    useEffect(() => {
        if(editSuccess){
            setOpenUp(true);
            setEditing(false);
        }
    }, [editSuccess])

    useEffect(() => {
        if(picloading){
            if(openPer === true){
                setOpenPasWar(!openPasWar);
                setOpenPer(!openPasWar);
            }
        }
    }, [picloading])

    // useEffect(() => {
    //     if(!editing){
    //         setOpenPasWar(false);
    //         setOpenPer(true);
    //     }
    // }, [editing])

    useEffect(() => {
        if(changeSuccess){
            setOpenPas(true);
            setEditing(false);
        }
    }, [changeSuccess])

    useEffect(async () => {
        PicExist()

        if (!userInfo){
            history.push('/')
        }
    })

    const [imgSrc, setImgSrc] = useState(("https://etixbucket.s3.amazonaws.com/etix/" + file + ".jpeg"));

    async function PicExist() {
        let url = "https://etixbucket.s3.amazonaws.com/etix/" + file + '.jpeg'
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
            console.log(err)
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
        if (!openPer && fname != '' && lname != '' && gender != '' && contact != '' && address != '' && birthdate != null){          
            dispatch(customerEdit(fname, lname, contact, address, birthdate, gender))
            // history.go(0)
        }

        if (openPasWar && password != '' && confirmPass != ''){
            console.log("pass");
            dispatch(passwordChange(password));
        } else if (openPasWar && password == '' && confirmPass == '') {
            setEmpty(true);
        }
    }

    const handleEdit = () => {
        if(editing){
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
                setID(customerInfo.customerID)
            }
            setEditing(!editing);
        } else {
            setEditing(!editing);
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
            setID(customerInfo.customerID)
        }
    }, [userInfo, customerInfo])

    if (fname == '' && lname == '' && address == ''){
        iiMissing = true
    }

    const DialogEmpty = () => {
        const handleClose = () => {
          setEmpty(false);
          setEditing(false);
        };
  
        return (
          <Toolbar>
            <Dialog
              open={openEmpty}
              onClose={handleClose}
            >
              <DialogTitle id="alert-dialog-title">
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <Typography>Password is empty</Typography>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} autoFocus style={{color: 'green'}}>
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          </Toolbar>
        );
    }

    const DialogUpdate = () => {
        const handleClose = () => {
          setOpenUp(false);
          history.go(0);
        };
  
        return (
          <Toolbar>
            <Dialog
              open={openUp}
              onClose={handleClose}
            >
              <DialogTitle id="alert-dialog-title">
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <Typography>Profile Updated</Typography>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} autoFocus style={{color: 'green'}}>
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          </Toolbar>
        );
    }

    const DialogPas = () => {
        const handleClose = () => {
          setOpenPas(false);
          history.go(0);
        };
  
        return (
          <Toolbar>
            <Dialog
              open={openPas}
              onClose={handleClose}
            >
              <DialogTitle id="alert-dialog-title">
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <Typography>Password Updated</Typography>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} autoFocus>
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          </Toolbar>
        );
    }

    const DialogPasNotMat = () => {
        const handleClose = () => {
          setOpenPasNot(false);
        };
  
        return (
          <Toolbar>
            <Dialog
              open={openPasNot}
              onClose={handleClose}
            >
              <DialogTitle id="alert-dialog-title">
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <Typography>Password Not Match</Typography>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} autoFocus style={{color: 'red'}}>
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          </Toolbar>
        );
    }

    const handleSecurity = () => {
        setOpenPasWar(!openPasWar);
        setOpenPer(!openPasWar);
    }

    return (
        <Container className={classes.root} maxWidth="Fixed">
        <Container >
            {!userInfo? 
                <Box sx={{ display: 'flex' }}>
                    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                    <CircularProgress  style={{color: '#F5CB5C'}}/>
                    {/* <img src={JumpingDot}/> */}
                    </Backdrop>
                </Box>
                :
                <>
                    <Grid container spacing={3} direction="column" style={{marginTop: 10}}>
                        <Typography paddingRight="12" textAlign="center" style={{fontSize:25, fontWeight: 'bolder'}}>My Profile</Typography>
                    </Grid>
                    <Grid container spacing={3} direction="column" style={{marginTop: 10}}>
                        <Grid item xs={12} className={classes.action} container>
                            <Grid item xs={4} textAlign="center" style={{fontSize:25, fontWeight: 'bolder'}}>
                                User ID: {customerID}
                            </Grid>
                            {iiMissing? 
                            <Grid item xs={4} textAlign="center" style={{fontSize:12}}>
                                <Alert severity="warning">Important info is missing</Alert>
                            </Grid>
                            : ''
                            }
                            <Grid item xs={iiMissing? 3 : 7} textAlign="right">
                                <Tooltip title="Edit profile">
                                    <IconButton onClick={handleEdit} style={{bottom: '15px'}}>
                                        <EditIcon className={classes.functionicon} fontSize="large" />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Box sx={{width:'90%'}} className={classes.box}>
                    {!userInfo?
                    <Box sx={{ display: 'flex' }}>
                    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                    <CircularProgress  style={{color: '#F5CB5C'}}/>
                    {/* <img src={JumpingDot}/> */}
                    </Backdrop>
                    </Box>:
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
                                        <input type="file"  accept="image/*" id="contained-button-file" onChange={upload}
                                        style={{justifyContent:'center', alignItems:'center', display: 'none'}}
                                        />
                                        {picloading? (<Box sx={{ display: 'flex' }}
                                        style={{justifyContent:'center', alignItems:'center'}}
                                        ><CircularProgress /></Box>):(<Button variant="contained" component="span" style={{color: 'gray', backgroundColor: 'white'}}>Upload Image</Button>)}
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
                                                            disabled
                                                            size="small"
                                                            InputProps={{
                                                                style: {fontFamily: ['rubik', 'sans-serif'].join(','), backgroundColor: "white"}
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
                                                                style: {fontFamily: ['rubik', 'sans-serif'].join(','), backgroundColor: "white"}
                                                            }} 
                                                        />
                                                    </Grid>   
                                                )
                                            }
                                            
                                        </Grid>
                                        {customerInfo?
                                            (
                                                <>  {
                                                    !editing?
                                                    <Grid item xs={5} style={{fontWeight:'bold', marginTop: 20}}>                                               
                                                        Personal Information   
                                                    </Grid>    
                                                    :
                                                    <Grid item xs={5} color={openPer?'black':'red'} style={{fontWeight:'bold', marginTop: 20}}>                                               
                                                        Personal Information
                                                    <Tooltip title="Click here to change personal information" placement="right-start">
                                                    <IconButton onClick={handleSecurity}>
                                                        <PersonTwoToneIcon /> 
                                                    </IconButton>
                                                    </Tooltip>                       
                                                    </Grid>    
                                                    }
                                                    <Grid item xs={12} container container style={{marginLeft: 30, marginTop:10}}>
                                                        <Grid item xs={3} color={!openPer?'black':'gray'} style={!editing ? ({fontWeight: 'bold'}) : ({fontWeight: 'bold', marginTop: 13}) }>
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
                                                                        disabled={openPer}
                                                                        fullWidth
                                                                        size="small"
                                                                        InputProps={{
                                                                            style: {fontFamily: ['rubik', 'sans-serif'].join(','), backgroundColor: "white"}
                                                                        }} 
                                                                    />
                                                                </Grid>   
                                                            )
                                                        }  
                                                    </Grid>
                                                    <Grid item xs={12} container container style={{marginLeft: 30, marginTop:10}}>
                                                        <Grid item color={!openPer?'black':'gray'} xs={3} style={!editing ? ({fontWeight: 'bold'}) : ({fontWeight: 'bold', marginTop: 13}) }>
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
                                                                        disabled={openPer}
                                                                        fullWidth
                                                                        size="small"
                                                                        InputProps={{
                                                                            style: {fontFamily: ['rubik', 'sans-serif'].join(','), backgroundColor: "white"}
                                                                        }} 
                                                                    />
                                                                </Grid>   
                                                            )
                                                        }  
                                                    </Grid>
                                                    <Grid item xs={12} container container style={{marginLeft: 30, marginTop:10}}>
                                                        <Grid item color={!openPer?'black':'gray'} xs={3} style={!editing ? ({fontWeight: 'bold'}) : ({fontWeight: 'bold', marginTop: 13}) }>
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
                                                                        disabled={openPer}
                                                                        fullWidth
                                                                        size="small"
                                                                        InputProps={{
                                                                            style: {fontFamily: ['rubik', 'sans-serif'].join(','), backgroundColor: "white"}
                                                                        }} 
                                                                    />
                                                                </Grid>   
                                                            )
                                                        }  
                                                    </Grid>
                                                    <Grid item xs={12} container container style={{marginLeft: 30 , marginTop:10}}>
                                                        <Grid item color={!openPer?'black':'gray'} xs={3} style={!editing ? ({fontWeight: 'bold'}) : ({fontWeight: 'bold', marginTop: 13}) }>
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
                                                                        inputProps={{
                                                                            max: (moment().subtract(13, "years")).format('YYYY-MM-DD'),
                                                                        }}                                                                       
                                                                        margin="dense"
                                                                        type="date"
                                                                        fullWidth
                                                                        disabled={openPer}
                                                                        size="small"
                                                                        InputProps={{
                                                                            style: {fontFamily: ['rubik', 'sans-serif'].join(','), backgroundColor: "white"}
                                                                        }} 
                                                                    />
                                                                </Grid>   
                                                            )
                                                        }  
                                                    </Grid>
                                                    <Grid item xs={12} container container style={{marginLeft: 30, marginTop:10}}>
                                                        <Grid item color={!openPer?'black':'gray'} xs={3} style={!editing ? ({fontWeight: 'bold'}) : ({fontWeight: 'bold', marginTop: 13}) }>
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
                                                                        disabled={openPer}
                                                                        size="small"
                                                                        InputProps={{
                                                                            style: {fontFamily: ['rubik', 'sans-serif'].join(','), backgroundColor: "white"}
                                                                        }} 
                                                                    />
                                                                </Grid>   
                                                            )
                                                        }  
                                                    </Grid>
                                                    <Grid item color={!openPer?'black':'gray'} xs={12} container container style={{marginLeft: 30, marginTop:10}}>
                                                        
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
                                                            :!openPer?
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
                                                            ):
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
                                                
                                                <Grid item xs={5} color={!openPasWar?'black':'red'} style={{fontWeight:'bold', marginTop: 20}}>                                               
                                                    Change Password
                                                    <Tooltip title="Click here to change password" placement="right-start">
                                                    <IconButton onClick={handleSecurity}>
                                                        <SecurityTwoToneIcon /> 
                                                    </IconButton>
                                                    </Tooltip>                       
                                                </Grid>      
                                                <Grid item xs={12} container style={{marginLeft: 30, marginTop:10}}>
                                                    <Grid item xs={3} style={!editing ? ({fontWeight: 'bold',}) : ({fontWeight: 'bold', marginTop: 13}) } color={!openPasWar?'gray':'black'}>
                                                        New Password: 
                                                    </Grid>
                                                    <Grid item xs={9} textAlign="left">
                                                        <TextField 
                                                            id="password" 
                                                            variant="outlined"
                                                            onChange={hadleChangePassword}
                                                            margin="dense"
                                                            fullWidth
                                                            autoComplete='off'
                                                            disabled={!openPasWar}
                                                            size="small"
                                                            InputProps={{
                                                                style: {fontFamily: ['rubik', 'sans-serif'].join(','), backgroundColor: "white"},
                                                                autoComplete: 'new-password',
                                                                form: {
                                                                    autocomplete: 'off',
                                                                },
                                                                type: 'password',
                                                            }} 
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} container style={{marginLeft: 30, marginTop:10}}>
                                                    <Grid item xs={3} style={!editing ? ({fontWeight: 'bold',}) : ({fontWeight: 'bold', marginTop: 13}) } color={!openPasWar?'gray':'black'}>
                                                        Confirm Password: 
                                                    </Grid>
                                                    <Grid item xs={9} textAlign="left">
                                                        <TextField 
                                                            id="confirmPass" 
                                                            variant="outlined"
                                                            onChange={handleChangeConfirmPassword}
                                                            type='password'
                                                            margin="dense"
                                                            fullWidth
                                                            disabled={!openPasWar}
                                                            size="small"
                                                            InputProps={{
                                                                style: {fontFamily: ['rubik', 'sans-serif'].join(','), backgroundColor: "white"},
                                                                autoComplete: 'new-password',
                                                                form: {
                                                                    autocomplete: 'off',
                                                                },
                                                                type: 'password',
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
                                                                    onClick={()=> setOpenPasNot(true)}
                                                                    style={{cursor: 'pointer', backgroundColor: '#F5CB5C', color: 'black', fontWeight: 'bolder', fontFamily: ['rubik', 'sans-serif'].join(',') , marginTop: 20, marginBottom: 20}}
                                                                >
                                                                    Save
                                                                </Button>
                                                            )
                                                            :
                                                            (
                                                                <Button 
                                                                    variant="outlined"
                                                                    startIcon={<AddIcon />}
                                                                    style={{cursor: 'pointer', backgroundColor: '#F5CB5C', color: 'black', fontWeight: 'bolder', fontFamily: ['rubik', 'sans-serif'].join(',') , marginTop: 20, marginBottom: 20}}
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
                    }
                    </Box>
                </>
            }
            {
                openPas?<DialogPas />:null
            }
            {
                openUp?<DialogUpdate />:null
            }
            {
                openEmpty?<DialogEmpty />:null
            }
            {
                openPasNot?<DialogPasNotMat />:null
            }
            {
                editLoading?
                <Box sx={{ display: 'flex' }}>
                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                <CircularProgress  style={{color: '#F5CB5C'}}/>
                {/* <img src={JumpingDot}/> */}
                </Backdrop>
                </Box>
                :
                null
            }
            {
                updateLoading?
                <Box sx={{ display: 'flex' }}>
                    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                    <CircularProgress  style={{color: '#F5CB5C'}}/>
                    {/* <img src={JumpingDot}/> */}
                    </Backdrop>
                </Box>
                :
                null
            }
        </Container>
        </Container>
            
    )
}

export default UserDetail