import React from 'react'
import { Box ,Container, TextField, Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import bgImg from '../cities/tokyo.jpg'
import '../HomeQuery/fonts.css'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${bgImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "rgba(255,255,255,0.5)",
        backgroundBlendMode: "lighten",
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(6),
        minHeight: 500
    },
    title: {
        fontFamily: ['rubik', 'sans-serif'].join(','),
        paddingLeft: 10,
        paddingRight: 10,
    },
    subtitle: {
        fontSize: 35,
        fontWeight: 'bold'
    },
    paragraph: {
        fontSize: 15,
    },
    subsubtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 15,
    }
}));

function privacyPolicy() {
    const classes = useStyles();

    return (
        <Container maxWidth="fixed" className={classes.root}>
            <Typography className={classes.title} component="div">
                <Box textAlign ='left' m={1} className={classes.subtitle}>
                    Privacy Policy for eTix
                </Box>
                <Box textAlign ='left' m={1}  className={classes.paragraph}>
                    At eTix, accessible from etix.io, one of our main prioritites is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by eTix and how we use it.
                </Box>
                <Box textAlign ='left' m={1} className={classes.paragraph}>
                    If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
                </Box>
                <Box textAlign ='left' m={1} className={classes.subtitle}>
                    Log Files
                </Box>
                <Box textAlign ='left' m={1} className={classes.paragraph}>
                    eTix follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider(ISP), date and time stamp, referring/exit pages, and possily the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for anlyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information. Out Privacy Policy was created with the help of the Privacy Policy Generator.
                </Box>
                <Box textAlign ='left' m={1} className={classes.subtitle}>
                    Cookies and Web Beacons
                </Box>
                <Box textAlign ='left' m={1} className={classes.paragraph}>
                    Like any other website, eTix uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
                </Box>
                <Box textAlign ='left' m={1} className={classes.paragraph}>
                    For more general information on cookies, please read "Cookies" article from the Privacy Policy Generator.
                </Box>
                <Box textAlign ='left' m={1} className={classes.subtitle}>
                    Privacy Policies
                </Box>
                <Box textAlign ='left' m={1} className={classes.paragraph}>
                    You may consult this list to find the Privacy Policy for each of the advertising partners of eTix.
                </Box>
                <Box textAlign ='left' m={1} className={classes.paragraph}>
                    Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on eTix, which are sent directly to uses' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
                </Box>
                <Box textAlign ='left' m={1} className={classes.paragraph}>
                    Note that eTix has no access to or control over these cookies that are used by third-party advertisers.
                </Box>
                <Box textAlign ='left' m={1} className={classes.subsubtitle}>
                    Third Party Privacy Policies
                </Box>
                <Box textAlign ='left' m={1} className={classes.paragraph} style={{paddingLeft: 15}}>
                    eTix's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
                </Box>
                <Box textAlign ='left' m={1} className={classes.paragraph} style={{paddingLeft: 15}}>
                    You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.
                </Box>
                <Box textAlign ='left' m={1} className={classes.subsubtitle}>
                    Children's Information
                </Box>
                <Box textAlign ='left' m={1} className={classes.paragraph} style={{paddingLeft: 15}}>
                    Another part of our priority is adding protectin for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
                </Box>
                <Box textAlign ='left' m={1} className={classes.paragraph} style={{paddingLeft: 15}}>
                    eTix does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
                </Box>
                <Box textAlign ='left' m={1} className={classes.subsubtitle}>
                    Online Privacy Policy Only
                </Box>
                <Box textAlign ='left' m={1} className={classes.paragraph} style={{paddingLeft: 15}}>
                    This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in eTix. This policy is not applicable to any information collected offline or via channels other than this websites.
                </Box>
                <Box textAlign ='left' m={1} className={classes.subsubtitle}>
                    Consent
                </Box>
                <Box textAlign ='left' m={1} className={classes.paragraph} style={{paddingLeft: 15}}>
                    By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
                </Box>
            </Typography>

        </Container>
    )
}

export default privacyPolicy
