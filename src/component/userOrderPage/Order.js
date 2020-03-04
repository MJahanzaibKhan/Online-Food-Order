import React from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { Form, Input, Button, Radio, message, Empty, Divider, Modal } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { auth, db, storage } from '../../firebaseConfige';
import { datefn } from '../../action';
import { Dialog, DialogTitle } from '@material-ui/core';
const Styles = theme => ({

    OrderForm: {
        // left: "39%",
        width: "100%",

        [theme.breakpoints.up('sm')]: {
            width: "77%",
            // position: "relative",
            // left: "25%",
            // transform: "translate(-50%, 10px)",
        }
    },
    imgDiv: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        }
    },
    mainDiv: {
        display: 'block',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        }
    }
});

class OrderPage extends React.Component {
    constructor() {
        super();
        this.state = {
            formLayout: 'horizontal',
            data: "",
            order: "",
            address: "",
            number: "",
            imageurl: "",
            description: false
        };
    }
    componentWillMount() {
        if (this.props.data) {
            Object.values(this.props.data).map((value) => {
                if (this.props.match.params.id == value.ResturentName) {
                    this.setState({
                        data: value
                    })
                    console.log(value)
                }
            })
        } else {
            this.props.history.push('/mainpage')
        }

    }
    chnage = (ev, val) => {
        this.setState({ [val]: ev.target.value })
    }
    addOrder = () => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                if (this.state.number.length == 11) {

                    var obj = {
                        entrynumber: datefn(),
                        name: this.props.user[user.uid].fullname,
                        id: user.uid,
                        resturentName: this.props.match.params.id,
                        resturentId: this.state.data.id,
                        order: this.props.order,
                        address: this.state.address,
                        number: this.state.number
                    }

                    db.ref().child('wholeData').child('resturents').child(this.state.data.id).child('newOrder').child(obj.entrynumber).set(obj).then(() => {
                        db.ref().child('wholeData').child('user').child(user.uid).child('AcceptedOrders').child(obj.entrynumber).set(obj).then(() => {
                            db.ref().child('wholeData').child('RiderNewOrders').child(obj.entrynumber).set(obj).then(() => {
                                message.success('your order send ThankYou!')
                                this.setState({
                                    order: "",
                                    address: "",
                                    number: ""
                                })
                                this.props.history.push('/mainpage')
                            })
                        })
                    })
                } else {
                    message.error('please check number limit')
                }
            }
        })
    }
    componentDidMount() {
        console.log(this.props)
        if (this.props.images) {
            for (var i = 0; i < this.props.images.length; i++) {
                if (this.props.match.params.id === this.props.imagesName[i]) {
                    this.setState({
                        imageurl: this.props.images[i]
                    }, () => {
                        console.log(this.state.imageurl)
                    })
                }
            }
        }
    }
    render() {
        const { formLayout } = this.state;
        const { classes } = this.props;
        const formItemLayout =
            formLayout === 'horizontal'
                ? {
                    labelCol: { span: 10 },
                    wrapperCol: { span: 14 },
                }
                : null;
        const buttonItemLayout =
            formLayout === 'horizontal'
                ? {
                    wrapperCol: { span: 14, offset: 10 },
                }
                : null;
        return (
            <Modal
                title="Order Form"
                visible={this.props.open}
                onOk={this.addOrder}
                okText="Submit"
                onCancel={this.props.close}
            >
                <div className={classes.mainDiv} style={{ display: 'flex', }}>
                    <Form className={classes.OrderForm} layout={formLayout}>
                        <Form.Item label="Resturant Name" {...formItemLayout}>
                            <Input value={this.props.match.params.id} disabled={true} />
                        </Form.Item>
                        <Form.Item label="Branch Name" {...formItemLayout}>
                            <Input value={this.state.data ? this.state.data.area + " " + this.state.data.city : ""} disabled={true} />
                        </Form.Item>
                        <Form.Item label="Your address" {...formItemLayout}>
                            <Input value={this.state.address} onChange={(ev) => this.chnage(ev, 'address')} />
                        </Form.Item>
                        <Form.Item label="Your Phone Number" {...formItemLayout}>
                            <Input value={this.state.number} onChange={(ev) => this.chnage(ev, 'number')} />
                        </Form.Item>
                        <Form.Item label="Delivery charges" {...formItemLayout}>
                            <Input value={this.state.data ? this.state.data.cash : ""} disabled={true} />
                        </Form.Item>
                        {/* <Form.Item {...buttonItemLayout}>
                            <Button onClick={} type="primary" {...formItemLayout}>Submit</Button>
                        </Form.Item> */}
                    </Form>

                </div>
            </Modal>

        )
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.resturents,
        user: state.user,
        images: state.ProfileImages,
        imagesName: state.ProfileImagesName
    }
}
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(Styles)(withRouter(OrderPage)))