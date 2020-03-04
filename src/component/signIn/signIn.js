import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Paper, Button, Slide } from '@material-ui/core';
import { Form, Icon, Input, Checkbox, message, Alert } from 'antd';
// import img1 from './backgorund.png'
import img1 from './img2.jpg'
import img2 from './logo.png'
import SignUp from '../SignUp/infoDailog';
import { auth } from '../../firebaseConfige';
import { connect } from 'react-redux'
import { getdata } from '../../action';
import { withRouter } from 'react-router-dom'
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import RiderSignUp from '../RiderSignUp/RiderSignUp';
import CloseIcon from '@material-ui/icons/Close';
import Div2 from './Div2';
import ResturentSignUp from '../SignUp/resturentSignUp';
import UserSignUp from '../SignUp/userSignUp';
const Styles = theme => ({
    root: {
        padding: theme.spacing(3, 2),
        height: "100vh",
        background: "rgba(0,0,0,0.4)",
        display: 'flex'
    },
    form: {
        marginRight: "auto",
        marginLeft: "auto",
        border: "none",
        height: "58vh",
        [theme.breakpoints.down('lg')]: {
            background: 'transparent',
            boxShadow: 'none',
        },
        [theme.breakpoints.up('sm')]: {
            background: 'white',
            position: 'relative',
            top: '10%',
            width: "65%",
        }
    },
    div3: {
        width: "100%",
        border: "none",
        [theme.breakpoints.up('md')]: {
            width: "50%",
            backgroundColor: 'transparent',

        }
    },
    riderInfoDiv: {
        [theme.breakpoints.up('sm')]: {
            padding: "10px",
            paddingRight: '20px',
            paddingLeft: '20px',
            display: 'flex'
        },
        justifyContent: 'space-between',
        position: "absolute",
        top: "0%",
        width: "100%",
        background: 'mediumvioletred',
        transition: "0.6s ease-in-out"
    },
    riderInfoDivfalse: {
        [theme.breakpoints.up('sm')]: {
            display: 'flex'
        },
        justifyContent: 'space-between',
        position: "absolute",
        top: "-15%",
        width: "100%",
        background: 'mediumvioletred',
        transition: "0.6s ease-in-out"

    },
    div2: {
        display: "none",
        [theme.breakpoints.up('md')]: {
            display: 'block',
            width: "50%",
            backgroundColor: 'transparent'
        }
    },
    detail: {
        position: "relative",
        top: "2%",
        background: 'transparent',
        boxShadow: 'none',

    },
    main: {
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "100% 100vh",
    },
    center: {
        // [theme.breakpoints.up('sm')]: {
        width: "100%",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        // }
    }
});
class SignIn extends React.Component {
    constructor() {
        super()
        this.state = {
            signup: false,
            email: "",
            password: "",
            select: false,
            Rider: false,
            selectedSignUp: ""
        }
    }
    handlechange = (value) => {
        if (value === 'user' || value === 'Resturent' ) {
            console.log(value)
            this.setState({
                signup: !this.state.signup,
                selectedSignUp: value
            })
        } else {
            this.setState({
                signup: !this.state.signup,
                selectedSignUp: ""
            })
        }
    }
    handlechange2 = () => {
        this.setState({
            Rider: !this.state.Rider
        })
    }
    getValue = (ev, name) => {
        this.setState({
            [name]: ev.target.value
        })
    }
    SignIN = () => {
        if (this.state.email && this.state.password) {

            auth.signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
                this.props.getdata()
                auth.onAuthStateChanged((user) => {
                    if (user) {
                        var data = Object.values(this.props.data)
                        for (var i = 0; i < data.length; i++) {
                            for (var j = 0; j < Object.keys(data[i]).length; j++) {
                                if (Object.keys(data[i])[j] == user.uid) {
                                    console.log(Object.values(data[i])[j])
                                    if (Object.values(data[i])[j].category == 'user') {
                                        this.props.history.push('/mainpage')
                                        message.success('logIN Succesfully')

                                    } else if (Object.values(data[i])[j].category == 'resturant') {
                                        this.props.history.push('/Home')
                                        message.success('logIN Succesfully')

                                    } else if (Object.values(data[i])[j].category == 'Rider') {
                                        this.props.history.push('/Orders')
                                        message.success('logIN Succesfully')

                                    }
                                }
                            }
                        }
                        this.setState({
                            email: "",
                            password: ""
                        })
                    }
                })
            }).catch((err) => {
                message.error(err.message)
            })
        }
    }
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.props.getdata()
            }
        })
    }
    componentWillUpdate() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                var data = Object.values(this.props.data)
                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < Object.keys(data[i]).length; j++) {
                        if (Object.keys(data[i])[j] == user.uid) {
                            console.log(Object.values(data[i])[j])
                            if (Object.values(data[i])[j].category == 'user') {
                                this.props.history.push('/mainpage')
                            } else if (Object.values(data[i])[j].category == 'resturant') {
                                this.props.history.push('/Home')
                            } else if (Object.values(data[i])[j].category == 'Rider') {
                                this.props.history.push('/Orders')
                            }
                        }
                    }
                }

            }
        })
    }
    componentWillMount() {
        var select = localStorage.getItem('Rider')
        this.setState({
            select
        })
    }
    storage = () => {
        this.setState({ select: true })
        localStorage.setItem('Rider', this.state.select)
    }
    // componentWillMount() {

    // }
    render() {

        const { classes } = this.props
        return (
            <Paper>

                <Paper className={this.state.select ? classes.riderInfoDivfalse : classes.riderInfoDiv}>
                    <div className="rider-banner">
                        <div className="text">Join Our Delevery Team!</div>
                        <Button className="button-apply" variant="outlined" color="inherit" onClick={() => this.setState({ Rider: true })}>Apply Now</Button>
                        <CloseIcon className="close-button" onClick={() => this.storage()} />
                    </div>
                </Paper>
                <Paper className={classes.main} style={{ backgroundImage: `url(${img1})` }}>
                    <Paper className={classes.root}>
                        <Paper className={classes.div2}>
                            <Paper className={classes.detail}>
                                <img style={{ height: '65vh' }} src={img2} />
                            </Paper>
                        </Paper>
                        <Paper className={classes.div3}>
                            <Paper className={classes.form}>
                                <div className={classes.center}>
                                    <h1 style={{ textAlign: 'center' }}>Online Food Order App</h1>
                                    <h2 style={{ textAlign: 'center' }}>SignIn</h2>
                                    <Form className="login-form">
                                        <Form.Item>
                                            <Input
                                                value={this.state.email}
                                                onChange={(ev) => { this.getValue(ev, 'email') }}
                                                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                placeholder="email"
                                            />
                                        </Form.Item>
                                        <Form.Item>
                                            <Input.Password
                                                value={this.state.password}
                                                onChange={(ev) => { this.getValue(ev, 'password') }}
                                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                type="password"
                                                placeholder="Password"
                                            />
                                        </Form.Item>
                                        <Form.Item>

                                            <Button variant="contained" color="primary" onClick={this.SignIN} type="primary" htmlType="submit" className="login-form-button">
                                                Log in
                                </Button>
                                            Or <Button color="secondary" onClick={() => this.handlechange('user')}>register now!</Button>
                                        </Form.Item>
                                    </Form>
                                </div>

                            </Paper>
                        </Paper>
                    </Paper>


                    {/* {
                        this.state.signup ?
                            <SignUp close={this.handlechange} open={this.state.signup} />
                            : null
                    } */}
                    {
                        this.state.Rider ?
                            <RiderSignUp close={this.handlechange2} open={this.state.Rider} />
                            : null
                    }
                    {this.state.selectedSignUp == 'Resturent' ?
                        <ResturentSignUp close={this.handlechange} open={this.state.signup} />
                        : null}
                    {this.state.selectedSignUp == 'user' ?
                        <UserSignUp close={this.handlechange} open={this.state.signup} />
                        : null}
                </Paper>
                <Div2 model = {this.handlechange}/>
            </Paper>

        )
    }
}
const mapStateToProps = (state) => {
    return {
        data: state
    }
}
const mapDispatchToProps = { getdata }
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(Styles)(withRouter(SignIn)))