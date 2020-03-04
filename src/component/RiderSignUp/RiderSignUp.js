import React from 'react'
import { Modal, Checkbox } from 'antd'
import { Form, Icon, Input, message, Button } from 'antd';
import { auth, db } from '../../firebaseConfige';


class RiderSignUp extends React.Component {
    constructor() {
        super()
        this.state = {
            Name: "",
            email: "",
            password: "",
            city: "",
            number: "",
            checked: "abc",
            Age: ""
        }
    }
    getValue = (ev, name) => {
        this.setState({
            [name]: ev.target.value
        })
    }
    submit = () => {
        let { Name } = this.state
        let { email } = this.state
        let { password } = this.state
        let { city } = this.state
        let { number } = this.state
        let { license } = this.state
        let { Age } = this.state
        if (Name && email && password && city && number && Age) {
            if (license) {
                if (Age == 'no') {
                    message.error('sorry your age is not capabile')
                    this.props.close()
                } else {
                    if (number.length === 11) {

                        auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then(() => {
                            auth.onAuthStateChanged((user) => {
                                if (user) {
                                    var obj = {
                                        id: user.uid,
                                        name: Name,
                                        email: email,
                                        password: password,
                                        number: number,
                                        license: license,
                                        Age: Age,
                                        category: 'Rider'
                                    }
                                    db.ref().child('wholeData').child('Riders').child(user.uid).set(obj).then(() => {
                                        message.success('your account is created succesfully')
                                        this.setState({
                                            Name: "",
                                            email: "",
                                            password: "",
                                            city: "",
                                            number: "",
                                            license: "",
                                            Age: "",
                                        })
                                        this.props.close()
                                        auth.signOut()
                                    })
                                }
                            })
                        }).catch((err) => {
                            message.error(err.message)
                        })
                    } else {
                        message.error('Please check numbwer limit')
                    }
                }
            } else {
                message.error('Sorry License is Required ')
            }
        } else {
            message.error('Please fill all fileds')
        }
    }
    render() {

        return (
            <Modal
                title="Registretion Form"
                visible={this.props.open}
                onCancel={() => this.props.close('Rider')}
            >
                <Form className="login-form">
                    <Form.Item>
                        <Input
                            value={this.state.Name}
                            onChange={(ev) => { this.getValue(ev, 'Name') }}
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Name"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            value={this.state.email}
                            onChange={(ev) => { this.getValue(ev, 'email') }}
                            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="email"
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
                        <Input
                            value={this.state.city}
                            onChange={(ev) => { this.getValue(ev, 'city') }}
                            prefix={<Icon type="flag" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Enter yor city"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            value={this.state.number}
                            onChange={(ev) => { this.getValue(ev, 'number') }}
                            prefix={<Icon type="hash" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="number"
                            placeholder="number"
                        />
                    </Form.Item>
                    <Form.Item label="Do You Have A Driving license">
                        <Checkbox
                            checked={this.state.license ? true : false}
                            onClick={() => this.setState({
                                license: true
                            })}>Yes</Checkbox>
                        <Checkbox
                            checked={this.state.license == false ? true : false}
                            onClick={() => this.setState({
                                license: false
                            })}>No</Checkbox>
                    </Form.Item>
                    <Form.Item label="Are you 18 year old">
                        <Checkbox
                            checked={this.state.Age == 'above' ? true : false}
                            onClick={() => this.setState({
                                Age: 'above'
                            })}>Above</Checkbox>
                        <Checkbox checked={this.state.Age == 'yes' ? true : false}
                            onClick={() => this.setState({
                                Age: 'yes'
                            })}>Yes</Checkbox>
                        <Checkbox checked={this.state.Age == 'no' ? true : false}
                            onClick={() => this.setState({
                                Age: 'no'
                            })}>No</Checkbox>
                    </Form.Item>
                    <Form.Item>

                        <Button variant="contained" color="primary" onClick={this.submit} type="primary" htmlType="submit" className="login-form-button">
                            SignUp
                             </Button>
                    </Form.Item>

                </Form>
            </Modal>
        )
    }
}
export default RiderSignUp