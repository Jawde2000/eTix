import React, {useState, useEffect, useReducer, useCallback} from 'react'
import { Grid, Container, Box, Tooltip, IconButton, TextField, Button, Input} from '@mui/material';
import {makeStyles} from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getUser } from '../../actions/userActions';
import CircularProgress from '@mui/material/CircularProgress';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import AddIcon from '@mui/icons-material/Add';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { USER_CUSTOMER_UPDATE_RESET, USER_UPDATE_RESET, USER_LOGIN_SUCCESS,USER_VENDOR_UPDATE_RESET, USER_DETAIL_RESET } from '../../constants/userConstants';
import { updateUser, updateCustomer, updateVendor, deleteUsers } from '../../actions/userActions';
import moscow from '../globalAssets/moscow.jpg';
import S3 from 'react-aws-s3';
import defaultJpg from '../User/default.jpg'
import Avatar from '@mui/material/Avatar';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${moscow})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "rgba(255,255,255,0.5)",
        backgroundBlendMode: "lighten",
        minHeight: 700,
        fontFamily: ['rubik', 'sans-serif'].join(','),
        padding: 20
    },
    box: {
        backgroundColor: "#CFDBD5",
        marginBottom: 20,
        borderRadius: 5,
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

const UserDetail = ({props}) => {
    const classes = useStyles();
    const { id } = useParams();

    const dispatch = useDispatch();
    
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    
    let history = useHistory()
    
    const userDetail = useSelector(state => state.userDetail)
    const {loading, userD} = userDetail

    const usr = useSelector(state => state.userUpdate)
    const {success: successUser, error: errorUsr} = usr

    const cus = useSelector(state => state.customerUpdate)
    const {success: successCustomer, error: errorCus} = cus

    const ven = useSelector(state => state.vendorUpdate)
    const {success: successVendor, error: errorVen} = ven

    const useForceUpdate = () => {
        const [, updateState] = useState();
        return useCallback(() => updateState({}), []);
    }
    
    const [user, setUser] = useState();
    const [uptUser, setUptUser] = useState();
    const [uptVendor, setUptVendor] = useState();
    const [uptCustomer, setUptCustomer] = useState();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [isActive, setIsActive] = useState();
    const [role , setRole] = useState("");
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
    
    //customer
    const [birthdate, setBirthDate] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState('');
    // const [user, setUser]
    const [customer, setCustomer]= useState();
    const [vendor, setVendor] = useState();
    const [submit, setSubmit] = useState(false);
    const [editing,setEditing] = useState(false);
    const [found, setFound] = useState(true);
    const [picloading, setPloading] = useState(false);

    const handleSubmit = () =>{

        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if ( re.test(email) ) {
            
        }
        else {
            alert("Please enter correct email format. Failed to save.");
            return;
        }

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
                vendorEmail: email,
            })
        }

        if(customer){
            setUptCustomer({
                customerGender: gender,
                customerContact_Number: contact,
                customerAddress: address,
                customerBirthday: birthdate,
            })
        }
    }

    useEffect(() =>{
        if(role==="Admin" && uptUser){
            dispatch(updateUser(uptUser, id));
        }
        else if(role === "Customer" && uptCustomer){
            dispatch(updateCustomer(uptUser, uptCustomer, id))
        }
        else if(role === "Vendor" && uptVendor){
            dispatch(updateVendor(uptUser, uptVendor, id))
        }
    }, [uptUser, uptCustomer, uptVendor])

    useEffect(() => {
        if(successUser){
            alert("Successfully Updated User");
            dispatch({type: USER_UPDATE_RESET});
            setEditing(!editing);
            history.push(`/user/${id}`);
            return;
        }
        else if(successCustomer){
            alert("Successfully Updated User");
            dispatch({type: USER_CUSTOMER_UPDATE_RESET});
            setEditing(!editing);
            return;
        }
        else if(successVendor){
            alert("Successfully Updated User");
            dispatch({type: USER_VENDOR_UPDATE_RESET});
            setEditing(!editing);
            return;
        }
        else if(errorUsr || errorCus || errorVen){
            alert("Fail to Update");
            dispatch({type: USER_VENDOR_UPDATE_RESET});
            dispatch({type: USER_CUSTOMER_UPDATE_RESET});
            dispatch({type: USER_UPDATE_RESET});
        }
    }, [successUser, successCustomer, successVendor, errorUsr, errorCus, errorVen])


    useEffect(() => {
        if(!userD || userD.userID !== id){
            dispatch(getUser(id))
        }else{
            setUser(userD)
            setRole(userD.is_customer? "Customer" : userD.is_vendor? "Vendor" : userD.is_superuser? "Admin" : "");
            setUsername(userD.username);
            setEmail(userD.email);
            setIsActive(userD.is_active);
            if(userD.is_customer && userD.customerInfo){
                setCustomer(
                    userD.customerInfo.data
                )

            }
            else if(userD.is_vendor && userD.vendorInfo){
                setVendor(
                    userD.vendorInfo.data
                )
            }
        }
    }, [userD, id])

    useEffect(() => {
        if(customer){
            setContact(customer.customerContact_Number)
            setAddress(customer.customerAddress)
            setBirthDate(customer.customerBirthday)
            setGender(customer.customerGender)
        }
        else if(vendor){
            setContact(vendor.vendorContact_Number)
            setStatus(vendor.vendorStatus)
            setBusinessName(vendor.vendorName)
            setBankName(vendor.vendorBankName)
            setBankAcc(vendor.vendorBankAcc)
            setRegistrationNo(vendor.vendorRegistrationNo)
        }
    }, [customer, vendor])
    
    

    
    //Remember to update database also.
    const changeStatus = () => {
        if(role==="Vendor"){
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

    const handleDelete = () => {

        if(id === userInfo.userID){
            alert("You can't delete The account that you are currently logged in!");
            return;
        }
        else{
            let dlt = window.confirm("All data related with this user will be deleted. Are you sure to delete instead of setting the status to inactive?")
            if(dlt){
                dispatch(deleteUsers(id));
            }
            else {
                return;
            }
            
        }

        alert("Sucessfully Deleted");
        history.push("/menu/users");
    }

    const file = id + '.jpg'
    
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
                console.log("not found")
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

    const handleVarified = () => {
        if(status && isActive){
            alert("You can't unverify user when it is active.")
            return
        }
        setStatus(!status)
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

    const handleBack = () => {
        dispatch({type: USER_DETAIL_RESET});
        history.push('/menu/users/');
    }

    const handleEditing = () => {
        if(editing){
            dispatch(getUser(id));
            setEditing(!editing);
            return;
        }

        setEditing(!editing);

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
                                User ID: {user.userID}
                            </Grid>
                            <Grid item xs={4} textAlign="right">
                                <Tooltip title="Edit User">
                                    {/* Set onclick edit here  with props*/}
                                    <IconButton onClick={handleEditing}>
                                        <EditIcon className={classes.functionicon} fontSize="large" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete User">
                                    {/* Set onclick delete here, *create a delete function* */}
                                    <IconButton>
                                        <DeleteIcon onClick={handleDelete} className={classes.functionicon} fontSize="large" style={{color: 'red'}}/>
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
                                    {!editing ?
                                        (<Grid item xs={12} style={!isActive? ({color: "red"}) : ({color: "green"})}>
                                            {isActive? "Active" : "Inactive"}
                                        </Grid>) 
                                        : 
                                        (<Grid item xs={12} style={!isActive? ({color: "red"}) : ({color: "green"})}>                                    
                                            <Tooltip title="Change status">
                                                <IconButton onClick={()=>changeStatus()}>
                                                    <ChangeCircleIcon />
                                                </IconButton>
                                            </Tooltip>
                                            {isActive? "Active" : "Inactive"}
                                        </Grid>)
                                    }
                                    <Grid item xs={12} style={{marginTop: 20}} container>
                                        <Grid item xs={5} style={{textAlign:'right', fontWeight: 'bold'}}>
                                            Role:    
                                        </Grid>
                                        <Grid item xs={1}/>
                                        <Grid item xs={6} style={{textAlign:'left'}}>
                                            {role}
                                        </Grid>
                                        
                                    </Grid>
                                    {vendor?
                                        (
                                            <Grid item xs={12} style={{marginTop: 20}} container>
                                                <Grid item xs={5} style={{textAlign:'right', fontWeight: 'bold'}}>
                                                    Verify Status:    
                                                </Grid>
                                                <Grid item xs={5} style={{textAlign:'right'}}>
                                                    {status? "Verified" : "Not Verified"}
                                                </Grid>
                                                {editing?
                                                    (
                                                        <Grid item xs={2}>
                                                            <Tooltip title="Verify Account">
                                                                <IconButton onClick={()=>handleVarified()} style={!status? ({color: "red"}) : ({color: "green"})}>
                                                                    <ChangeCircleIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Grid>
                                                    )
                                                    :
                                                    (null)
                                                }

                                                
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
                                                            size="small"
                                                            InputProps={{
                                                                style: {fontFamily: ['rubik', 'sans-serif'].join(','),}
                                                            }} 
                                                        />
                                                    </Grid>   
                                                )
                                            }
                                            
                                        </Grid>
                                        {role==="Admin"?
                                            (null)
                                            :
                                            (
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
                                            )
                                        }
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
                                        {customer?
                                            (
                                                <>
                                                    <Grid item xs={12} style={{fontWeight:'bold', marginTop: 20}}>
                                                        Personal Information
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