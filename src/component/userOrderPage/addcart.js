import React from 'react'
import { Paper, Table, TableHead, TableRow, TableBody, TableCell, Button, Dialog, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Order from './Order';
import { Typography } from 'antd';
const Styles = theme => ({
    root: {
        flexGrow: 1,
        // overflowX: 'hidden',
    },
    paper: {
        height: '92vh',
        padding: '6px',
        [theme.breakpoints.up('sm')]: {
            background: 'rgba(0,0,0,0.1)'
        },
        background: 'white'

    },
    mobilebtn: {
        width: "100%",
        position: 'fixed',
        top: "90%",
        display: 'block',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    btn: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        width: "30%",
        position: 'fixed',
        top: "90%"
    }
    // webmenu: {
    //     display: 'none',
    //     [theme.breakpoints.up('sm')]: {
    //         display: 'block'
    //     }
    // },
    // mobmenu: {
    //     display: 'block',
    //     [theme.breakpoints.up('sm')]: {
    //         display: 'none'
    //     }
    // }
});

class AddToCart extends React.Component {
    constructor() {
        super()
        this.state = {
            submit: false,
        }
    }
    checkout = () => {
        this.setState({
            submit: !this.state.submit
        })
    }
    render() {
        const { classes } = this.props;
        return (
            <div> <Paper className={classes.paper}>
                <h3 style={{ textAlign: 'center' }}>Your Add To Cart</h3>
                <Divider />
                <Table className={classes.table} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Dish</TableCell>
                            <TableCell align="right">Price</TableCell>

                        </TableRow>
                    </TableHead>
                    {this.props.arr.length ?
                        <TableBody>
                            {this.props.arr.map((item2, index2) => {
                                console.log(item2)
                                return <TableRow key={index2}>
                                    <TableCell align="right">{item2.description.quantity}</TableCell>
                                    <TableCell scope="row">
                                        {item2.name}
                                    </TableCell>
                                    <TableCell align="right">PKR {item2.description.totalprice}</TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                        : null}
                </Table>
                {!this.props.arr.length ?
                    <Typography.Text type="secondary" style={{ textAlign: "center" }}>You haven’t added anything to your cart yet! Start adding your favourite dishes</Typography.Text>
                    : null}
                <div className={classes.btn}>
                    <Divider />
                    <Button disabled={!this.props.arr.length ? true : false} style={{ width: '100%', marginTop: '10px' }} variant='contained' color="secondary" onClick={() => {
                        this.checkout()
                    }}>Check out</Button>
                </div>
                <div className={classes.mobilebtn}>
                    <Divider />
                    <Button disabled={!this.props.arr.length ? true : false} style={{ width: '100%', marginTop: '10px' }} variant='contained' color="secondary" onClick={() => {
                        this.checkout()
                    }}>Check out</Button>
                </div>
            </Paper>
                {this.state.submit ?
                    <Order close = {this.checkout} order={this.props.arr} open={this.state.submit} />
                    : null}
            </div>
        )
    }
}
export default withStyles(Styles)(AddToCart)