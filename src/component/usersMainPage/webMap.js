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
import { Empty } from 'antd';
import { ButtonBase } from '@material-ui/core';

const Styles = theme => ({
    card: {
        margin: '8px',
        width: "40%",
        maxWidth: 345,
    },
    flexDiv: {
        justifyContent: "space-evenly",
        display: "flex",
        flexWrap: "wrap",
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
    },
    image: {
        position: 'relative',
        height: 200,
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '4px solid currentColor',
            },
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
});

class WebMAp extends React.Component {
    constructor() {
        super()
        this.state = {
            imageurl: [],
            imageName: []
        }
    }
    route = (name) => {
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
                if (this.props.images && this.props.imagesName && !this.state.imageName.length) {
                    this.setState({
                        imageName: this.props.imagesName,
                        imageurl: this.props.images,
                    })
                    console.log(this.props.images)
                } else {
                    console.log(this.props.images, this.state.imageName)
                }
            }, 5000)
        } else {
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
    componentWillReceiveProps() {
        setTimeout(() => {
            if (this.props.images && this.props.imagesName) {
                this.setState({
                    imageName: this.props.imagesName,
                    imageurl: this.props.images,
                })
                console.log(this.props.images)
            } else {
                console.log(this.state.imageurl, this.state.imageName)
            }
        }, 2000)
    }
    render() {
        const { classes } = this.props

        return (
            <div className={classes.flexDiv}>
                {this.state.imageName.length ?

                    this.props.arr.length ?
                        this.props.arr.map((value, i) => {
                            return (
                                <ButtonBase
                                    onClick={() => this.route(value.ResturentName)}
                                    focusRipple
                                    key={i}
                                    className={classes.image}
                                    focusVisibleClassName={classes.focusVisible}
                                    // className={classes.card}
                                    style={{
                                        width: '30%',
                                        marginTop: '12px',
                                    }}
                                >
                                    {this.state.imageName ?
                                        this.state.imageName.map((name, index2) => {
                                            if (name == value.ResturentName) {
                                                return (
                                                    <span
                                                        className={classes.imageSrc}
                                                        style={{
                                                            backgroundImage: `url(${this.state.imageurl[index2]})`,
                                                        }}
                                                    />
                                                )
                                            }
                                        }) : null}

                                    <span className={classes.imageBackdrop} />
                                    <span className={classes.imageButton}>
                                        <Typography
                                            component="span"
                                            variant="subtitle1"
                                            color="inherit"
                                            className={classes.imageTitle}
                                        >
                                            {value.ResturentName}
                                            <span className={classes.imageMarked} />
                                        </Typography>
                                    </span>
                                </ButtonBase>

                            )
                        })
                        :
                        this.props.data ?
                            Object.values(this.props.data).map((value, i) => {
                                return (
                                    <ButtonBase
                                        onClick={() => this.route(value.ResturentName)}
                                        focusRipple
                                        key={i}
                                        className={classes.image}
                                        focusVisibleClassName={classes.focusVisible}
                                        // className={classes.card}
                                        style={{
                                            width: '30%',
                                            marginTop: '12px',
                                        }}
                                    >
                                        {this.state.imageName ?
                                            this.state.imageName.map((name, index2) => {
                                                if (name == value.ResturentName) {
                                                    return (
                                                        <span
                                                            className={classes.imageSrc}
                                                            style={{
                                                                backgroundImage: `url(${this.state.imageurl[index2]})`,
                                                            }}
                                                        />
                                                    )
                                                }
                                            }) : null}

                                        <span className={classes.imageBackdrop} />
                                        <span className={classes.imageButton}>
                                            <Typography
                                                component="span"
                                                variant="subtitle1"
                                                color="inherit"
                                                className={classes.imageTitle}
                                            >
                                                {value.ResturentName}
                                                <span className={classes.imageMarked} />
                                            </Typography>
                                        </span>
                                    </ButtonBase>
                                )
                            }) : null



                    :
                    <div class="lds-circle"><div></div></div>
                }
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.resturents,
        images: state.ProfileImages,
        imagesName: state.ProfileImagesName
    }
}
const mapDispatchToProps = { getdata }
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(Styles)(withRouter(WebMAp)))