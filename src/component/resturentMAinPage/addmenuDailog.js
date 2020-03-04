import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Select, message } from 'antd';
import { auth, db } from '../../firebaseConfige';
import { connect } from 'react-redux'
import { thisExpression } from '@babel/types';

const { Option } = Select;
class MenuDailog extends React.Component {
    constructor() {
        super()
        this.state = {
            val: []
        }

    }
    add = () => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                var data = Object.values(this.props.data)
                var key = Object.keys(this.props.data)
                for (var i = 0; i < data.length; i++) {
                    if (key[i] == user.uid) {
                        if (data[i].subItems && this.state.val.length) {
                            var val = this.state.val
                            for (var j = 0; j < val.length; j++) {
                                console.log(val[j])
                                data[i].subItems.push(val[j])
                            }
                            console.log(data[i])
                            this.setState({
                                val: []
                            })
                            db.ref().child('wholeData').child('resturents').child(user.uid).update(data[i]).then(() => {
                                message.success('your changes is save')
                                this.props.close()
                            })
                        } else {
                            data[i].subItems = this.state.val
                            // data[i].subItems.push()
                            console.log(data[i])
                            this.setState({
                                val: []
                            })
                            if (data[i].subItems) {
                                db.ref().child('wholeData').child('resturents').child(user.uid).update(data[i]).then(() => {
                                    message.success('your changes is save')
                                    this.props.close()
                                })
                            }
                        }
                    }
                }
            }
        })
    }
    render() {
        return (
            <div>
                <Dialog
                    keepMounted
                    maxWidth="sm"
                    fullWidth={true}
                    open={this.props.open}
                    onClose={this.props.close}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">Add Menu</DialogTitle>
                    <DialogContent>
                        <Select mode="tags" style={{ width: '97%' }} onChange={(ev) => {
                            console.log(ev)
                            this.setState({ val: ev })
                        }} tokenSeparators={[',']}>
                            {/* {children} */}
                        </Select>,
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.close} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={this.add} color="primary" autoFocus>
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

}


const mapStateToProps = (state) => {
    return {
        data: state.resturents,
    }
}
const mapDispatchToProps = {}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuDailog)