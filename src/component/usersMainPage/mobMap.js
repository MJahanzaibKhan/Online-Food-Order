import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { getdata } from '../../action';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom'
import { storage } from '../../firebaseConfige';
const Styles = theme => ({
    card: {
        margin: '8px',
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },

});

class MobMap extends React.Component {
    constructor() {
        super()
        this.state = {
            imageurl: [],
            imageName: []
        }
    }
    // componentDidMount() {
    //     if (!this.props.data) {
    //         console.log(true)
    //         this.props.getdata()
    //     }
    // }
    route = (name) => {
        console.log(this.props.match.params)
        this.props.match.params.id = name
        this.props.history.push(`/mainpage/${name}`)
    }
    componentWillMount() {
        if (!this.props.data) {
            console.log(true)
            this.props.getdata()
        }
        if (!this.props.images) {
            setTimeout(() => {
                if (this.props.images && this.props.imagesName  && !this.state.imageName.length ) {
                    this.setState({
                        imageName: this.props.imagesName,
                        imageurl: this.props.images,
                    })
                    console.log(this.props.images)
                } else {
                    console.log(this.props.images, this.state.imageName)
                }
            }, 5000)
        }else{
            if (this.props.images && this.props.imagesName && !this.state.imageName.length) {
                this.setState({
                    imageName: this.props.imagesName,
                    imageurl: this.props.images,
                })
                console.log(this.props.images)
            } else {
                console.log(this.props.images, this.state.imageName)
            }
        }
    }
    componentWillReceiveProps(){
        setTimeout(()=>{
        if (this.props.images && this.props.imagesName ) {
            this.setState({
                imageName: this.props.imagesName,
                imageurl: this.props.images,
            })
            console.log(this.props.images)
        } else {
                console.log(this.state.imageurl, this.state.imageName)
            }
        },2000)
    }

    render() {
        const { classes } = this.props
        return (
            <div>
                {this.props.arr.length ?
                    this.props.arr.map((value) => {
                        return (
                            <Card onClick={() => this.route(value.ResturentName)} className={classes.card}>
                                <div className={classes.details}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {value.ResturentName}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Deliver Charges : {value.cash}
                                        </Typography>
                                        <Typography color="textSecondary" component="p">
                                            city : {value.city}
                                        </Typography>
                                        <Typography color="textSecondary" component="p">
                                            area : {value.area}
                                        </Typography>
                                    </CardContent>
                                </div>
                                {this.state.imageName ?
                                    this.state.imageName.map((name, index2) => {
                                        if (name == value.ResturentName) {
                                            return (
                                                <CardMedia
                                                    component="img"
                                                    // // alt="Contemplative Reptile"
                                                    // height="220"
                                                    style={{ width: '50%' }}
                                                    image={this.state.imageurl[index2]}
                                                // title="Contemplative Reptile"
                                                />
                                            )
                                        }
                                    }) : null}
                            </Card>
                        )
                    })
                    :
                    this.props.data ?
                        Object.values(this.props.data).map((value) => {
                            return (
                                <Card onClick={() => this.route(value.ResturentName)} className={classes.card}>
                                    <div className={classes.details}>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {value.ResturentName}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                Deliver Charges : {value.cash}
                                            </Typography>
                                            <Typography color="textSecondary" component="p">
                                                city : {value.city}
                                            </Typography>
                                            <Typography color="textSecondary" component="p">
                                                area : {value.area}
                                            </Typography>
                                        </CardContent>
                                    </div>
                                    {this.state.imageName ?
                                        this.state.imageName.map((name, index2) => {
                                            if (name == value.ResturentName) {
                                                return (
                                                    <CardMedia
                                                        component="img"
                                                        // // alt="Contemplative Reptile"
                                                        // height="220"
                                                        style={{ width: '50%' }}
                                                        image={this.state.imageurl[index2]}
                                                    // title="Contemplative Reptile"
                                                    />
                                                )
                                            }
                                        }) : null}
                                </Card>
                            )
                        })
                        : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        data: state.resturents,
        images: state.ProfileImages,
        imagesName: state.ProfileImagesName
    }
}
const mapDispatchToProps = { getdata }
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(Styles)(withRouter(MobMap)))