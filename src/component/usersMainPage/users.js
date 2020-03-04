import React from 'react'
import { Paper } from '@material-ui/core'
import WebMap from './webMap'
import AppBarComponent from './appbar'
import { withStyles } from '@material-ui/core/styles';
import MobMap from './mobMap';
import img from './download.jpg'
import { connect } from 'react-redux'

const Styles = theme => ({
    paperWeb: {
        height: "90vh",
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        backgroundImage: `url(${img})`,
        // backgroundColor: '#2f4454',
        boxShadow: 'none',
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    },
    rgbaDiv: {
        height: "90vh",
        overflowY: 'scroll',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    papermob: {
        height: "90vh",
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        backgroundImage: `url(${img})`,
        // backgroundColor: '#2f4454',
        boxShadow: 'none',
        boxShadow: 'none',
        display: 'block',
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    }
})
class UsersMainPage extends React.Component {
    constructor() {
        super()
        this.state = {
            ResturentName: "",
            arr: []
        }
    }
    change = (ev) => {
        this.setState({
            ResturentName: ev.target.value,
            arr :[],
        }, (ev) => {

            let { arr } = this.state
            var filter = () => {
                return Object.values(this.props.data).filter(place => {
                    var regex = new RegExp(this.state.ResturentName, "gi");
                    return place.ResturentName.match(regex)
                })
            }
            // console.log()
            arr = filter()

            this.setState({
                arr
            }, () => {
                console.log(this.state.arr)
            })
        })

    }
    render() {
        const { classes } = this.props
        return (
            <div>
                <AppBarComponent ResturentName={this.state.ResturentName} val={this.change} />
                <main>
                    <Paper className={classes.paperWeb}>
                        <div id ="scroll" className={classes.rgbaDiv}>
                            <WebMap arr={this.state.arr.length ? this.state.arr : [] } />
                        </div>
                    </Paper>
                    <Paper className={classes.papermob}>
                        <div id ="scroll" className={classes.rgbaDiv}>
                            <MobMap arr={this.state.arr.length ? this.state.arr : [] } />
                        </div>
                    </Paper>
                </main>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.resturents,
        images: state.ProfileImages
    }
}
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(Styles)(UsersMainPage))
