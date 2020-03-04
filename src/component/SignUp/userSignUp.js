import React from 'react'
import { Dialog, DialogTitle, Button, DialogContentText, DialogContent, ListItemText, Slide } from '@material-ui/core'
import { Form, Icon, Input, Checkbox, message } from 'antd';
import { auth, db } from '../../firebaseConfige';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
class UserSignUp extends React.Component {
    constructor() {
        super()
        this.state = {
            Name: "",
            SignUpemail: "",
            SignUppassword: "",
            number: "",
            SignUpConfopassword: ""
        }
    }
    getValue = (ev, name) => {
        this.setState({
            [name]: ev.target.value
        })

    }
    UserSignup = () => {
        if (this.state.Name && this.state.SignUpemail && this.state.SignUppassword) {
            if (this.state.number.length == 11) {
                auth.createUserWithEmailAndPassword(this.state.SignUpemail, this.state.SignUppassword).then(() => {
                    auth.onAuthStateChanged((user) => {
                        if (user) {
                            var obj = {
                                id: user.uid,
                                fullname: this.state.Name,
                                email: this.state.SignUpemail,
                                password: this.state.SignUppassword,
                                number: this.state.number,
                                category: 'user'
                            }
                            db.ref().child('wholeData').child('user').child(user.uid).set(obj).then(() => {
                                this.setState({
                                    number: "",
                                    Name: "",
                                    SignUpemail: "",
                                    SignUpConfopassword:"",
                                    SignUppassword: "",
                                })
                                message.success('your account is created succesfully')
                                this.props.close()
                                // auth.signOut()
                            })

                        }
                    })
                }).catch((err) => {
                    message.error(err.message)
                })
            } else {
                message.error('please check number limit')
            }
        } else {
            message.warning('please filled all fields')
        }
    }
    render() {
        return (
            <Dialog TransitionComponent={Transition}
                keepMounted
                maxWidth="sm"
                fullWidth={true}
                onClose={this.props.close}
                aria-labelledby="form-dialog-title"
                open={this.props.open}>
                <DialogTitle style={{ textAlign: "center" }} id="simple-dialog-title">account SignUP Form</DialogTitle>
                <DialogContent>
                    <Form className="login-form">
                        <Form.Item>
                            <Input
                                value={this.state.Name}
                                onChange={(ev) => { this.getValue(ev, 'Name') }}
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Full Name"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                value={this.state.SignUpemail}
                                onChange={(ev) => { this.getValue(ev, 'SignUpemail') }}
                                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="email"
                                placeholder="email"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input.Password
                                value={this.state.SignUppassword}
                                onChange={(ev) => { this.getValue(ev, 'SignUppassword') }}
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item
                            help={this.state.SignUppassword == this.state.SignUpConfopassword ? '' : 'please check your password'}
                            validateStatus={ this.state.SignUppassword == this.state.SignUpConfopassword ? 'success' : 'error'}>
                            <Input.Password
                                value={this.state.SignUpConfopassword}
                                onChange={(ev) => { this.getValue(ev, 'SignUpConfopassword') }}
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="ConForm Password"
                            />
                        </Form.Item>
                        <Form.Item
                            help={this.state.number.length > 11 ? 'check number limit' : ''}
                            validateStatus={this.state.number.length > 11 ? 'error' : 'validating'}>
                            <Input
                                value={this.state.number}
                                onChange={(ev) => { this.getValue(ev, 'number') }}
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="number"
                                placeholder="number"
                            />
                        </Form.Item>
                        <Form.Item>

                            <Button variant="contained" color = "secondary" onClick={this.UserSignup} type="primary" htmlType="submit" className="login-form-button">
                                SignUp
                             </Button>
                        </Form.Item>

                    </Form>

                </DialogContent>
            </Dialog>
        )
    }
}
export default UserSignUp