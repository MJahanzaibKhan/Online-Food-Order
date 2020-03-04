import React from 'react';
import { connect } from 'react-redux'
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import "antd/dist/antd.css";
import SignIn from './component/signIn/signIn';
import UsersMainPage from './component/usersMainPage/users';
import Home from './component/resturentMAinPage/home';
import Order from './component/userOrderPage/orderAppbar';
import { getdata } from './action';
import RiderHomePage from './component/RiderPages/RiderHomePage';
class App extends React.Component {
  componentWillMount() {
    // if (!this.props.user) {
    console.log(true)
    this.props.getdata()
    // }
  }
  render() {
    return (
      <Router>
        <Route exact path="/" render={() => <SignIn />} />
        <Route exact path="/mainpage" render={() => <UsersMainPage />} />
        <Route path="/Home" render={() => <Home />} />
        <Route path="/Orders" render={() => <RiderHomePage />} />
        <Route path="/mainpage/:id" render={() => <Order />} />
      </Router>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    user: state,
  }
}
const mapDispatchToProps = { getdata }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

