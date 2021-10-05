import React, {useState} from 'react'
import {makeStyles} from '@mui/styles';
import { Container, Grid, Box, Tooltip, Button, TextField} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "../Font/fonts.css"

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
    const [vendor, setVendor] = useState({
        "vendorID" : "VDR123",
        "vendorName" : "koee",
        "vendorContact": "+60123456789",
        "vendorEmail" : "test1@gmail.com",
        "bussinessName": "EyeSec",
        "bussinessBankAcc": "1235467687698",
    });
    const [editing, setEditing] = useState(false);
    
    const handleChangeUserName = (e) => {
        setVendor({...vendor, vendorName: e.target.value});
    }

    const handleChangeEmail = (e) => {
        setVendor({...vendor, vendorEmail: e.target.value});
    }

    const handleChangeContact = (e) => {
        setVendor({...vendor, vendorContact: e.target.value});
    }

    const handleChangeBusinessName = (e) => {
        setVendor({...vendor, bussinessName: e.target.value});
    }

    const handleChangeBankAcc = (e) => {
        setVendor({...vendor, bussinessBankAcc: e.target.value});
    }
    
    return (
        <Container className={classes.root}>
            <Grid container spacing={3} direction="column" style={{marginTop: 10}}>
                <Grid item xs={12} className={classes.action} container>
                    <Grid item xs={4}>
                        <Tooltip title="Back">
                            {/* Should change it to Link after having the router setting */}
                            <IconButton  href="/menu">
                                <ArrowBackIcon fontSize="large" />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={4} textAlign="center" style={{fontSize:20}}>
                        User ID: {vendor.vendorID}
                    </Grid>
                    <Grid item xs={4} textAlign="right">
                        <Tooltip title="Edit Profile">
                            {/* Set onclick edit here  with props*/}
                            <IconButton onClick={() => setEditing(!editing)}>
                                <EditIcon className={classes.functionicon} fontSize="large" />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Grid>
            <Box sx={{width: '80%'}} className={classes.box}>
                <Grid container spacing={3} direction="column">
                    
                    
                        {!editing?
                            (
                                <>
                                    {/* Top part container: containing profile img, user information */}
                                    <Grid item xs={12} container>
                                        {/* image column container */}
                                        <Grid item xs={4} container style={{textAlign:"center"}}>
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
                                            <Grid item xs={12}/>
                                        </Grid>
                                    {/* user information column container */}
                                        <Grid item xs={8} container>
                                            <Grid item xs={12} container>
                                                <Grid item xs={12} className={classes.title}>
                                                    User Information
                                                </Grid>
                                                <Grid item xs={12} className={classes.subtitle} container>
                                                    <Grid item xs={4}>
                                                        User Name: 
                                                    </Grid>
                                                    <Grid item xs={8} style={{textAlign: "left"}}>
                                                        {vendor.vendorName}
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} className={classes.subtitle} container>
                                                    <Grid item xs={4}>
                                                        Email: 
                                                    </Grid>
                                                    <Grid item xs={8} style={{textAlign: "left"}}>
                                                        {vendor.vendorEmail}
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} className={classes.subtitle} container>
                                                    <Grid item xs={4}>
                                                        Contact Number: 
                                                    </Grid>
                                                    <Grid item xs={8} style={{textAlign: "left"}}>
                                                        {vendor.vendorContact}
                                                    </Grid>
                                                </Grid>
                                                
                                                
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    {/* Bottom part container: containing business information */}
                                    <Grid item xs={12} container style={{marginTop:10}}>
                                        <Grid item xs={12} container>
                                            <Grid item xs={12} className={classes.title} style={{marginLeft: 40}}>
                                                Business Information
                                            </Grid> 
                                            <Grid item xs={12}  container style={{paddingTop: 30, paddingLeft: 100}}>
                                                <Grid item xs={4}>
                                                    Organization Name:
                                                </Grid>
                                                <Grid item xs={8} style={{textAlign: "left"}}>
                                                    {vendor.bussinessName}
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}  container style={{paddingTop: 30, paddingLeft: 100}}>
                                                <Grid item xs={4}>
                                                    Bank Account:
                                                </Grid>
                                                <Grid item xs={8} style={{textAlign: "left"}}>
                                                    {vendor.bussinessBankAcc}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    {/* Reset password button container */}
                                    <Grid item xs={12}  style={{textAlign:'right', paddingRight: 30, marginTop:15, marginBottom: 20}}>
                                        <Button href="/ResetPassword" variant="text" color="warning" style={{fontWeight:'bold', fontFamily: ['rubik', 'sans-serif'].join(',')}}>
                                            Click here to reset your password
                                        </Button>
                                    </Grid>
                                </>
                            )
                            :
                            // When editing
                            (
                                <>
                                    {/* Top part container: containing profile img, user information */}
                                    <Grid item xs={12} container>
                                        {/* image column container */}
                                        <Grid item xs={4} container style={{textAlign:"center"}}>
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
                                            <Grid item xs={12}/>
                                        </Grid>
                                        {/* user information column container */}
                                        <Grid item xs={8} container>
                                            <Grid item xs={12} container>
                                                <Grid item xs={12} className={classes.title}>
                                                    User Information
                                                </Grid>
                                                <Grid item xs={12} className={classes.subtitle} container>
                                                    <Grid item xs={4} style={{paddingTop: 20}}>
                                                        User Name: 
                                                    </Grid>
                                                    <Grid item xs={8} style={{textAlign: "left"}}>
                                                        <TextField 
                                                            id="user_name" 
                                                            variant="outlined"
                                                            onChange={handleChangeUserName}
                                                            defaultValue={vendor.vendorName}
                                                            margin="dense"
                                                            fullWidth
                                                            size="small"
                                                            InputProps={{
                                                                style: {fontFamily: ['rubik', 'sans-serif'].join(','), maxWidth: 300,}
                                                            }} 
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} className={classes.subtitle} container>
                                                    <Grid item xs={4} style={{paddingTop: 20}}>
                                                        Email: 
                                                    </Grid>
                                                    <Grid item xs={8} style={{textAlign: "left"}}>
                                                        <TextField 
                                                            id="user_email" 
                                                            variant="outlined"
                                                            onChange={handleChangeEmail}
                                                            defaultValue={vendor.vendorEmail}
                                                            margin="dense"
                                                            fullWidth
                                                            size="small"
                                                            InputProps={{
                                                                style: {fontFamily: ['rubik', 'sans-serif'].join(','), maxWidth: 300,}
                                                            }} 
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} className={classes.subtitle} container>
                                                    <Grid item xs={4} style={{paddingTop: 20}}>
                                                        Contact Number: 
                                                    </Grid>
                                                    <Grid item xs={8} style={{textAlign: "left"}}>
                                                        <TextField 
                                                            id="contact_no" 
                                                            variant="outlined"
                                                            onChange={handleChangeContact}
                                                            defaultValue={vendor.vendorContact}
                                                            margin="dense"
                                                            fullWidth
                                                            size="small"
                                                            InputProps={{
                                                                style: {fontFamily: ['rubik', 'sans-serif'].join(','), maxWidth: 300,}
                                                            }} 
                                                        />
                                                    </Grid>
                                                </Grid>
                                                
                                                
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    {/* Bottom part container: containing business information */}
                                    <Grid item xs={12} container style={{marginTop:10}}>
                                        <Grid item xs={12} container>
                                            <Grid item xs={12} className={classes.title} style={{marginLeft: 40}}>
                                                Business Information
                                            </Grid> 
                                            <Grid item xs={12}  container style={{marginTop: 10, paddingLeft: 100}}>
                                                <Grid item xs={4} style={{paddingTop: 20}}>
                                                   Organization Name: 
                                                </Grid>
                                                <Grid item xs={8} style={{textAlign: "left"}}>
                                                    <TextField 
                                                        id="organization_name" 
                                                        variant="outlined"
                                                        onChange={handleChangeBusinessName}
                                                        defaultValue={vendor.bussinessName}
                                                        margin="dense"
                                                        fullWidth
                                                        size="small"
                                                        InputProps={{
                                                            style: {fontFamily: ['rubik', 'sans-serif'].join(','), maxWidth: 500,}
                                                        }} 
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}  container style={{paddingTop: 30, paddingLeft: 100}}>
                                                <Grid item xs={4} style={{paddingTop: 20}}>
                                                   Bank Account: 
                                                </Grid>
                                                <Grid item xs={8} style={{textAlign: "left"}}>
                                                    <TextField 
                                                        id="bank_acc" 
                                                        variant="outlined"
                                                        onChange={handleChangeBankAcc}
                                                        defaultValue={vendor.bussinessBankAcc}
                                                        margin="dense"
                                                        fullWidth
                                                        size="small"
                                                        InputProps={{
                                                            style: {fontFamily: ['rubik', 'sans-serif'].join(','), maxWidth: 500,}
                                                        }} 
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    {/* Reset password button container */}
                                    <Grid item xs={12}  style={{textAlign:'right', paddingRight: 30, marginTop:5, marginBottom: 20}}>
                                        <Button href="/ResetPassword" variant="text" color="warning" style={{fontWeight:'bold', fontFamily: ['rubik', 'sans-serif'].join(',')}}>
                                            Click here to reset your password
                                        </Button>
                                    </Grid>
                                </>
                            )
                        }
                        
                    
                </Grid>
            </Box>
        </Container>
    )
}

export default Profile
