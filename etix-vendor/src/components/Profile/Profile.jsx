import React, {useState, useEffect} from 'react'
import {makeStyles} from '@mui/styles';
import { Container, Grid, Box, Tooltip, Button, TextField} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { getUser } from '../../actions/userActions/userActions';
import { USER_UPDATE_RESET, USER_VENDOR_UPDATE_RESET, USER_DETAIL_RESET } from '../../constants/userConstants/userConstants';
import { updateUser,updateVendor} from '../../actions/userActions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import "../Font/fonts.css"
import S3 from 'react-aws-s3';
import defaultJpg from '../Profile/default.jpg'
import Avatar from '@mui/material/Avatar';
import { useHistory } from 'react-router';
import CircularProgress from '@mui/material/CircularProgress';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import AddIcon from '@mui/icons-material/Add';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: 500,
        fontFamily: ['rubik', 'sans-serif'].join(',')
    },
    box: {
        backgroundColor: "#CFDBD5",
        marginTop: 20,
        marginBottom: 20,
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
    },
    subtitle: {
        paddingLeft:30,
    },
}));

const Profile = ({props}) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    let history = useHistory()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userID = userInfo.userID

    const userDetail = useSelector(state => state.userDetail)
    const {loading, userD} = userDetail

    const usr = useSelector(state => state.userUpdate)
    const {success: successUser, error: errorUsr} = usr

    const ven = useSelector(state => state.vendorUpdate)
    const {success: successVendor, error: errorVen} = ven
    
    const [vendor, setVendor] = useState();
    const [user, setUser] = useState();
    const [uptUser, setUptUser] = useState();
    const [uptVendor, setUptVendor] = useState();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [isActive, setIsActive] = useState();
    const [contact, setContact] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [passStatus, setPassStatus] = useState(false);
    const [role , setRole] = useState("");

    // vendor
    const [status, setStatus] = useState(false);
    const [businessName, setBusinessName] = useState("");
    const [registrationNo, setRegistrationNo] = useState("");
    const [bankName, setBankName] = useState("");
    const [bankAcc, setBankAcc] = useState("");
    
    const [submit, setSubmit] = useState(false);
    const [editing,setEditing] = useState(false);
    const [found, setFound] = useState(true);
    const [picloading, setPloading] = useState(false);

    const handleSubmit = () =>{
        console.log(username);
        setUptUser(
            {
                username: username,
                email: email,
                password: password,
                is_active: isActive,
            }
        )

        if(vendor){
            setUptVendor({
                vendorContact_Number: contact,
                vendorStatus: status,
                vendorName: businessName,
                vendorBankName: bankName,
                vendorBankAcc: bankAcc,
                vendorRegistrationNo: registrationNo,
            })
        }
    }

    useEffect(() =>{
        if(role==="Admin" && uptUser){
            dispatch(updateUser(uptUser, userID));
        }
        else if(role === "Vendor" && uptVendor){
            dispatch(updateVendor(uptUser, uptVendor, userID))
        }
    }, [uptUser, uptVendor])

    useEffect(() => {
        if(successUser){
            alert("Successfully Updated User");
            dispatch({type: USER_UPDATE_RESET});
            setEditing(!editing);
            return;
        }
        else if(successVendor){
            alert("Successfully Updated User");
            dispatch({type: USER_VENDOR_UPDATE_RESET});
            setEditing(!editing);
            return;
        }
        else if(errorUsr || errorVen){
            alert("Fail to Update");
            dispatch({type: USER_VENDOR_UPDATE_RESET});
            dispatch({type: USER_UPDATE_RESET});
        }
    }, [successUser, successVendor, errorUsr, errorVen])

    useEffect(() => {
        if(!userD || userD.userID !== userID){
            dispatch(getUser(userID))
        }else{
            setUser(userD)
            setRole(userD.is_vendor? "Vendor" : userD.is_superuser? "Admin" : "");
            setUsername(userD.username);
            setEmail(userD.email);
            setIsActive(userD.is_active);
            if(userD.is_vendor && userD.vendorInfo){
                setVendor(
                    userD.vendorInfo.data
                )
            }
        }
    }, [userD, userID])

    useEffect(() => {
        if(vendor){
            setContact(vendor.vendorContact_Number)
            setStatus(vendor.vendorStatus)
            setBusinessName(vendor.vendorName)
            setBankName(vendor.vendorBankName)
            setBankAcc(vendor.vendorBankAcc)
            setRegistrationNo(vendor.vendorRegistrationNo)
        }
    }, [vendor])

       //Remember to update database also.
    const changeStatus = () => {
        if(userInfo.is_vendor){
            if(isActive && status){
                setIsActive(!isActive)
                return;
            }
            else if(!isActive && status){
                setIsActive(!isActive)
                return;
            }
            alert("Vendor should be verified first only they can be set active.");
            
        }
        else{
            if(isActive){
                setIsActive(!isActive)
                return;
            }
            else if(!isActive){
                setIsActive(!isActive)
            }
        }
    };

    const file = userInfo.userID + '.jpg'
    
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
    })

    const [imgSrc, setImgSrc] = useState(("https://etixbucket.s3.amazonaws.com/etix/" + file));

    async function PicExist() {
        const url = "https://etixbucket.s3.amazonaws.com/etix/" + file
        await fetch(url).then((res) => {
            if (res.status == 404) {
                setFound(false)
                console.log("found")
            } 
            else {
                console.log("found")
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

    const handleChangeBusinessName = (event) => {
        setBusinessName(event.target.value);
    }

    const handleChangeRegNo = (event) => {
        setRegistrationNo(event.target.value);
    }

    const handleChangebankName = (event) => {
        setBankName(event.target.value);
    }

    const handleChangebankAcc = (event) => {
        setBankAcc(event.target.value);
    }

    const hadleChangePassword = (event) => {
        setPassword(event.target.value);
    }
    
    const handleChangeConfirmPassword = (event) => {
        setConfirmPass(event.target.value);
    }

    const handleBack = () => {
        dispatch({type: USER_DETAIL_RESET});
        history.push('/menu');
    }
    
    return (
        <Container className={classes.root} maxWidth="Fixed">
        <Container >
            {!user? 
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
                :
                <>
                    <Grid container spacing={3} direction="column" style={{marginTop: 10}}>
                        <Grid item xs={12} className={classes.action} container>
                            <Grid item xs={4}>
                                <Tooltip title="Back">
                                    <IconButton onClick={handleBack}>
                                        <ArrowBackIcon fontSize="large" />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={4} textAlign="center" style={{fontSize:20}}>
                                User ID: {userD.vendorInfo.data.vendorID}
                            </Grid>
                            <Grid item xs={4} textAlign="right">
                                <Tooltip title="Edit User">
                                    {/* Set onclick edit here  with props*/}
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
                                            src={found? imgSrc
                                                 :
                                                 (defaultJpg)}
                                            alt="profile"        
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
                                        ><CircularProgress /></Box>):(<Button variant="contained" component="span" >Upload</Button>)}
                                        </label>                            
                                        </div>
                                        )}
                                    </Grid>
                                    <Grid item xs={12} style={{marginTop:10}}>
                                        Status
                                    </Grid>
                                    <Grid item xs={12} style={!isActive? ({color: "red", fontWeight: 'bold'}) : ({color: "green", fontWeight: 'bold'})}>
                                        {isActive? "Active" : "Inactive"}
                                    </Grid>                              
                                    {vendor?
                                        (
                                            <Grid item xs={12} style={{marginTop: 20}} container>
                                                <Grid item xs={5} style={{textAlign:'right', fontWeight: 'bold'}}>
                                                    Verify Status:    
                                                </Grid>
                                                <Grid item xs={5} style={{textAlign:'right'}}style={!isActive? ({color: "red"}) : ({color: "green"})}>
                                                    {status? "Verified" : "Not Verified"}
                                                </Grid>                                               
                                            </Grid>
                                        )
                                        :
                                        (null)
                                    }
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
                                                Company : 
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
                                                            size="small"
                                                            InputProps={{
                                                                style: {fontFamily: ['rubik', 'sans-serif'].join(','),}
                                                            }} 
                                                        />
                                                    </Grid>   
                                                )
                                            }
                                            
                                        </Grid>
                                        {vendor?
                                            (
                                                <>
                                                    <Grid item xs={12} style={{fontWeight:'bold', marginTop: 20}}>
                                                        Business Information
                                                    </Grid>
                                                    <Grid item xs={12} container container style={{marginLeft: 30, marginTop:10}}>
                                                        <Grid item xs={3} style={!editing ? ({fontWeight: 'bold'}) : ({fontWeight: 'bold', marginTop: 13}) }>
                                                            Business Name: 
                                                        </Grid>
                                                        {!editing ?
                                                            (
                                                                <Grid item xs={9} textAlign="left">
                                                                    {businessName}
                                                                </Grid>
                                                            )
                                                            :
                                                            (
                                                                <Grid item xs={9} textAlign="left">
                                                                    <TextField 
                                                                        id="businessName" 
                                                                        variant="outlined"
                                                                        onChange={handleChangeBusinessName}
                                                                        defaultValue={businessName}
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
                                                        Phone Number: 
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
                                                                    id="user_phone" 
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
                                                    <Grid item xs={12} container container style={{marginLeft: 30, marginTop:10}}>
                                                        <Grid item xs={3} style={!editing ? ({fontWeight: 'bold'}) : ({fontWeight: 'bold', marginTop: 13}) }>
                                                            Registration No.: 
                                                        </Grid>
                                                        {!editing ?
                                                            (
                                                                <Grid item xs={9} textAlign="left">
                                                                    {registrationNo}
                                                                </Grid>
                                                            )
                                                            :
                                                            (
                                                                <Grid item xs={9} textAlign="left">
                                                                    <TextField 
                                                                        id="regNo" 
                                                                        variant="outlined"
                                                                        onChange={handleChangeRegNo}
                                                                        defaultValue={registrationNo}
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
                                                            Bank Name: 
                                                        </Grid>
                                                        {!editing ?
                                                            (
                                                                <Grid item xs={9} textAlign="left">
                                                                    {bankName}
                                                                </Grid>
                                                            )
                                                            :
                                                            (
                                                                <Grid item xs={9} textAlign="left">
                                                                    <TextField 
                                                                        id="bankName" 
                                                                        variant="outlined"
                                                                        onChange={handleChangebankName}
                                                                        defaultValue={bankName}
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
                                                    <Grid item xs={12} container container style={{marginLeft: 30, marginTop:10, marginBottom: 20}}>
                                                        <Grid item xs={3} style={!editing ? ({fontWeight: 'bold'}) : ({fontWeight: 'bold', marginTop: 13}) }>
                                                            Bank Account: 
                                                        </Grid>
                                                        {!editing ?
                                                            (
                                                                <Grid item xs={9} textAlign="left">
                                                                    {bankAcc}
                                                                </Grid>
                                                            )
                                                            :
                                                            (
                                                                <Grid item xs={9} textAlign="left">
                                                                    <TextField 
                                                                        id="bankAcc" 
                                                                        variant="outlined"
                                                                        onChange={handleChangebankAcc}
                                                                        defaultValue={bankAcc}
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

export default Profile
