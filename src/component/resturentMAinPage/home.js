import React from 'react'
import { Popover, Empty } from 'antd';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import MoreIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
import { getdata } from '../../action';
import { Button, Badge, Table, TableHead, TableCell, TableBody, TableRow } from '@material-ui/core';
import MenuDailog from './addmenuDailog';
import { connect } from 'react-redux'
import { auth, db } from '../../firebaseConfige';
import { withRouter } from 'react-router-dom'
import AddItemsDailog from './additemsDailog';
import { Modal } from 'antd';
const Styles = theme => ({
    text: {
        color: 'white',
        padding: theme.spacing(2, 2, 0),
    },
    paper: {
        paddingBottom: 50,
        height: '90vh',
        // backgroundColor: '#3f51b5',
        background: 'linear-gradient(to right, #457fca, #5691c8)'
    },
    margin: {
        margin: theme.spacing(2),
    },
    btn: {
        border: '1px solid coral',
    },
    list: {
        padding: '25px',
        marginBottom: theme.spacing(2),
    },
    subheader: {
        backgroundColor: theme.palette.background.paper,
    },
    appBar1: {
        background: 'linear-gradient(to right, #457fca, #5691c8)',
        top: 'auto',
        bottom: 0,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    appBar2: {
        background: 'linear-gradient(to right, #457fca, #5691c8)',
        top: 'auto',
        bottom: 0,
        display: 'block',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    grow: {
        flexGrow: 1,
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
    root: {
        width: 500,
    },
    typography: {
        padding: theme.spacing(2),
    },
    active: {
        background: 'linear-gradient(to top left, #ffcc66 -1%, #ff66cc 100%)'
    }
})

class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            menu: false,
            poper: false,
            items: false,
            data: "",
            newOrder: true,
            val: "",
            infoDailog: false,
            key: "",
            map: "newOrder"
        }
    }
    menu = () => {
        this.setState({
            menu: !this.state.menu
        })
    }
    componentDidMount() {
        // if (!this.props.data) {
        this.props.getdata()
        // }
    }
    componentWillReceiveProps() {
        // if (this.props.data) {
        auth.onAuthStateChanged((user) => {
            if (user) {
                var data = Object.values(this.props.data)
                var key = Object.keys(this.props.data)
                for (var i = 0; i < data.length; i++) {
                    if (key[i] == user.uid) {
                        this.setState({
                            data: data[i]
                        })
                    }
                }
            }
        })
        // }

    }
    content2 = () => {

        return (
            <div>
                <p>
                    <Badge color="secondary" badgeContent={this.state.data.pendingOrder ? Object.values(this.state.data.pendingOrder).length : 0} >

                        <Button onClick={() => { this.setState({ map: "pendingOrder" }) }}>
                            pending Orders
                    </Button>
                    </Badge>
                </p>
                <p> <Button onClick={() => { this.setState({ map: "deliveredOrders" }) }}>
                    Deleverd Orders
                    </Button></p>
                <p> <Button onClick={this.addItems}>
                    Add Menu Items
                            </Button></p>
                <p> <Button onClick={this.signout}>
                    Sign Out
                    </Button></p>
            </div>
        )
    };
    signout = () => {
        auth.signOut().then(() => {
            this.props.history.push('/')
        })
    }
    addItems = () => {
        this.setState({
            items: !this.state.items
        })
    }
    content = () => {
        return (
            <div>
                <p> <Button onClick={this.signout}>
                    Sign Out
                            </Button></p>
                <p> <Button onClick={this.addItems}>
                    Add Menu Items
                            </Button></p>
            </div>
        )
    };
    Accept = () => {

        auth.onAuthStateChanged((user) => {
            if (user) {
                db.ref().child('wholeData').child('resturents').child(user.uid).child('pendingOrder').child(this.state.key).set(this.state.val).then(() => {
                    // db.ref().child('wholeData').child('user').child(this.state.val.id).child('AcceptedOrders').child(this.state.key).set(this.state.val).then(() => {
                    db.ref().child('wholeData').child('resturents').child(user.uid).child('newOrder').child(this.state.key).remove().then(() => {
                        this.setState({
                            infoDailog: false
                        })
                    })
                    // })
                })
            }
        })
    }
    render() {
        const text = <span>Title</span>;

        const { classes } = this.props
        return (
            <div>
                <CssBaseline />
                <Paper square className={classes.paper}>
                    <Typography className={classes.text} variant="h5" gutterBottom>
                        {this.state.map} Inbox
                        </Typography>
                    <List className={classes.list}>
                        {this.state.data[this.state.map] ? Object.values(this.state.data[this.state.map]).map((value, index) => {
                            return (
                                <Paper>

                                    <React.Fragment key={index}>
                                        <ListItem onClick={() => { this.setState({ infoDailog: true, key: Object.keys(this.state.data[this.state.map])[index], val: value }) }} button>
                                            <ListItemText primary={value.name} />
                                        </ListItem>
                                    </React.Fragment>
                                </Paper>
                            )
                        }) : <Empty />}
                    </List>
                </Paper>

                <AppBar position="fixed" color="primary" className={classes.appBar1}>
                    <Toolbar>
                        <Badge color="secondary" badgeContent={this.state.data.newOrder ? Object.values(this.state.data.newOrder).length : 0} className={classes.margin}>
                            <Button className={this.state.map === 'newOrder' ? classes.active : classes.btn} onClick={() => { this.setState({ map: "newOrder" }) }}>
                                new orders
                        </Button>
                        </Badge>
                        <Fab color="secondary" onClick={this.menu} aria-label="add" className={classes.fabButton}>
                            <AddIcon />
                        </Fab>
                        <div className={classes.grow} />
                        <Badge color="secondary" badgeContent={this.state.data.pendingOrder ? Object.values(this.state.data.pendingOrder).length : 0} className={classes.margin}>
                            <Button className={this.state.map === 'pendingOrder' ? classes.active : classes.btn} onClick={() => { this.setState({ map: "pendingOrder" }) }}>
                                pending Orders
                        </Button>
                        </Badge>
                        <Button className={this.state.map === 'deliveredOrders' ? classes.active : classes.btn} onClick={() => { this.setState({ map: "deliveredOrders" }) }}>
                            Deleverd Orders
                        </Button>

                        <Popover style={{ zIndex: 8000 }} placement='leftBottom' content={this.content()} trigger="click">
                            <IconButton edge="end" color="inherit">
                                <MoreIcon />
                            </IconButton>
                        </Popover>
                    </Toolbar>
                </AppBar>
                <AppBar position="fixed"  className={classes.appBar2}>
                    <Toolbar>
                        <Badge color="secondary" badgeContent={this.state.data.newOrder ? Object.values(this.state.data.newOrder).length : 0} className={classes.margin}>
                            <Button onClick={() => { this.setState({ map: "newOrder" }) }}>
                                new orders
                        </Button>
                        </Badge>

                        <Fab color="secondary" onClick={this.menu} aria-label="add" className={classes.fabButton}>
                            <AddIcon />
                        </Fab>
                        <div className={classes.grow} />


                        <Popover style={{ zIndex: 8000 }} placement="leftBottom" content={this.content2()} trigger="click">
                            <IconButton edge="end" color="inherit">
                                <MoreIcon />
                            </IconButton>
                        </Popover>
                    </Toolbar>
                </AppBar>
                {this.state.menu ?
                    <MenuDailog open={this.state.menu} close={this.menu} />
                    : null}
                {this.state.items ?
                    <AddItemsDailog open={this.state.items} close={this.addItems} />
                    : null}
                {this.state.infoDailog ?
                    <Modal
                        title={this.state.val.name + " " + "Order"}
                        visible={this.state.infoDailog}
                        onOk={() => (
                            this.state.map === "newOrder" ?
                                this.Accept()
                                : this.setState({ val: "", infoDailog: false }))}
                        okText={this.state.map === "newOrder" ? "Aceept" : "ok"}
                        cancelText="Decline"
                        onCancel={() => this.setState({ val: "", infoDailog: false })}
                    >
                        <p>Address : {this.state.val.address}</p>
                        <p>Number : {this.state.val.number}</p>
                        <h1>order</h1>
                        <Table>
                            <TableHead>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Item</TableCell>
                                <TableCell>description</TableCell>
                            </TableHead>
                            <TableBody>
                                {this.state.val.order.length ?
                                    this.state.val.order.map((value) => {
                                        return (
                                            <TableRow>
                                                <TableCell>{value.description.quantity}</TableCell>
                                                <TableCell>{value.name}</TableCell>
                                                <TableCell>{value.description.extra}</TableCell>
                                            </TableRow>
                                        )
                                    })
                                    : null}
                            </TableBody>
                        </Table>
                        {/* <p>Order : {this.state.val.order}</p> */}
                    </Modal>
                    : null}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.resturents,

    }
}
const mapDispatchToProps = { getdata }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(Styles)(withRouter(Home)))
