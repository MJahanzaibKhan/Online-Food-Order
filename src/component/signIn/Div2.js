import React from 'react'
import { Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { Button } from 'antd';
const Styles = theme => ({
    imgDiv: {
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: 'url(https://images.deliveryhero.io/image/foodpanda/home-vendor-pk.jpg?width=2000&height=1280)',
        height: '280px',
        [theme.breakpoints.up('sm')]: {
            height: '404px',
        }
    },
    textDiv: {
        [theme.breakpoints.up('sm')]: {
            width: '400px',
            padding: '24px',
            margin: 0,
            position: 'absolute',
            left: '48px',
            bottom: '-700px'
        },
        margin: '-64px 0 0',
        padding: '16px',
        textAlign: 'left',
        backgroundColor: '#fff',
    },
    para: {
        fontFamily: 'MuseoSans,Arial,sans-serif',
        fontSize: '1.4rem',
        fontWeight: '300',
        lineHeight: '1.25em',
        color: '#707070',
        textAlign: 'left'
    }
})
class Div2 extends React.Component {
    render() {
        const { classes } = this.props
        return (
            <Paper style={{ width: '100%', height: '50vh' }}>
                {/* <h1>You prepare the food, we handle the rest</h1> */}
                <p></p>
                <Paper className={classes.imgDiv} />
                <Paper className={classes.textDiv}>
                    <h2>List your restaurant on Online Food Order app</h2><br />
                    <p className={classes.para}>Would you like thousands of new customers
                         to taste your amazing food? So would we!</p>
                    <p className={classes.para}>It's simple: we list your menu online, help you process orders,
                        pick them up, and deliver them to hungry pandas - in a heartbeat!</p>
                    <p className={classes.para}>Interested? Let's start our partnership today!</p>
                    <p><Button onClick = {()=>this.props.model('Resturent')} type="danger" style={{ height: '6vh' }} block>Get Started</Button></p>
                </Paper>
            </Paper>
        )
    }
}
export default withStyles(Styles)(Div2)