import React from 'react'
import { Dialog, DialogTitle, List, ListItem, ListItemText } from '@material-ui/core'
import ResturentSignUp from './resturentSignUp'
import UserSignUp from './userSignUp'

class SignUp extends React.Component {
    constructor() {
        super()
        this.state = {
            select: "",
            open : false
        }
    }
    change = (email)=>{
        if(email){
            this.setState({ select: email , open : !this.state.open })
        }else{
            this.setState({ 
                open : !this.state.open,
                select : ""
             })
        }
    }
    render() {
        return (
            <div>
                
                <Dialog onClose={this.props.close} aria-labelledby="simple-dialog-title" open={this.props.open}>
                    <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
                    <List>
                        {['Resturent SignUp', 'User SignUp'].map(email => (
                            <ListItem button onClick={()=>this.change(email)} key={email}>
                                <ListItemText primary={email} /> <br />
                            </ListItem>
                        ))}
                    </List>
                </Dialog>
                {this.state.select == 'Resturent SignUp' ? 
                    <ResturentSignUp open = {this.state.open} close = {this.change} close2 = {this.props.close}/>
                :null}
                {this.state.select == 'User SignUp' ? 
                    <UserSignUp open = {this.state.open} close = {this.change} close2 = {this.props.close}/>
                :null}
            </div>
        )
    }
}
export default SignUp