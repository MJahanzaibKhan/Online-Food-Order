import React from 'react'
import { Tabs, message } from 'antd';
import { withRouter } from 'react-router-dom'
import RidersnewOrder from './RidersnewOrder';
import YourPEndingORder from './YourPEndingORder';
import DeleverdOrders from './DeleverdOrders';
import { auth } from '../../firebaseConfige';

const { TabPane } = Tabs;
class RiderHomePage extends React.Component {
    constructor() {
        super()
        this.state = {
            activeKey: "1"
        }
    }
    onchange = (key) => {
        this.setState({ activeKey: key })
    }
    render() {
        return (
            <Tabs tabBarExtraContent={true} onChange={this.onchange} tabBarStyle={{ backgroundColor: 'black', color: 'white' }} defaultActiveKey="1">
                <TabPane tab="New Orders" key="1">
                    {this.state.activeKey == '1' ?
                        <RidersnewOrder />
                        : null}
                </TabPane>
                <TabPane tab="Your Pending Orders" key="2">
                    {this.state.activeKey == '2' ?
                        <YourPEndingORder />
                        : null}
                </TabPane>
                <TabPane tab="Your Deliverd Orders" key="3">
                    {this.state.activeKey == '3' ?
                        <DeleverdOrders />
                        : null}
                </TabPane>
                <TabPane tab="SignOut" key="4">
                    {this.state.activeKey == '4' ?
                        <button onClick={

                            auth.signOut().then(() => {
                                this.props.history.push('/')
                            })
                        }>Signout</button>
                        : null}
                </TabPane>
            </Tabs>
        )
    }
}
export default withRouter(RiderHomePage)