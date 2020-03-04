import React from 'react'
import { connect } from 'react-redux'
import { Table, Input, Button, Icon, Popconfirm, Modal } from 'antd';
import { getdata, datefn } from '../../action';
import { auth, db } from '../../firebaseConfige';
let data = [];
let data2 = []
class PendingOrders extends React.Component {
    constructor() {
        super()
        this.state = {
            searchText: '',
            order: [],
            modal: false,
            keys: '',
            selectedKey: "",
            obj: "",
            data: []
        }
    }
    componentWillMount() {
        if (!data.length) {
            this.props.getdata()
        }
    }
    componentWillReceiveProps() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                if (this.props.data.Riders) {
                    var val = this.props.data.Riders[user.uid].yourPendingOrders
                    if (val) {
                        data = Object.values(val)
                        this.setState({
                            data: Object.values(val),
                            keys: Object.keys(val)
                        })
                    }
                }
            }
        })

    }

    booked = () => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                var Ratingname = this.props.data.Riders[user.uid].name
                db.ref().child('wholeData').child('Riders').child(user.uid).child('DelevierdOrders').child(this.state.selectedKey).set(this.state.obj).then(() => {
                    db.ref().child('wholeData').child('resturents').child(this.state.obj.resturentId).child('deliveredOrders').child(this.state.selectedKey).set(this.state.obj).then(() => {
                        db.ref().child('wholeData').child('user').child(this.state.obj.id).child('5StarsRating').set(Ratingname).then(() => {
                            db.ref().child('wholeData').child('user').child(this.state.obj.id).child('AcceptedOrders').child(this.state.selectedKey).remove().then(() => {
                                db.ref().child('wholeData').child('resturents').child(this.state.obj.resturentId).child('pendingOrder').child(this.state.selectedKey).remove().then(() => {
                                    db.ref().child('wholeData').child('Riders').child(user.uid).child('yourPendingOrders').child(this.state.selectedKey).remove().then(() => {
                                        this.setState({
                                            modal: false,
                                            order: "",
                                        })
                                        if (this.props.data.Riders) {
                                            var val = this.props.data.Riders[user.uid].yourPendingOrders
                                            if (val) {
                                                data = Object.values(val)
                                                this.setState({
                                                    data: Object.values(val),
                                                    keys: Object.keys(val)
                                                })
                                            }
                                        }
                                    })
                                })
                            })
                        })
                    })
                })
            }
        })
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
        </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
        </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
    });

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    view = (ord, i) => {
        data2 = ord.order
        this.setState({
            order: ord.order,
            obj: ord,
            modal: true,
            selectedKey: this.state.keys[i]
        })
    }




    render = () => {
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                width: '30%',
                ...this.getColumnSearchProps('name'),
            },
            {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
                width: '20%',
                ...this.getColumnSearchProps('address'),
            },
            {
                title: 'Number',
                dataIndex: 'number',
                key: 'number',
                width: '20%',
                ...this.getColumnSearchProps('number'),
            },
            {
                title: 'Resturent Name',
                dataIndex: 'resturentName',
                key: 'resturentName',
                width: '20%',
                ...this.getColumnSearchProps('resturentName'),
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record, index) => (
                    data.length
                        ?
                        data.length >= 1
                            ?
                            <Button onClick={() => this.view(record, index)}>view order</Button>
                            : null
                        : null
                ),
            }
        ];
        const columns2 = [
            {
                title: 'Quantity',
                dataIndex: 'description.quantity',
                key: 'quantity',
                width: '10%',
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                width: '30%',
            },

            {
                title: 'Description',
                dataIndex: 'description.extra',
                key: 'extra',
            },
            {
                title: 'Total price',
                dataIndex: 'description.totalprice',
                key: 'number',
                width: '20%',
            },

        ];
        return (
            <div>
                <Table
                    pagination={{ pageSize: 20 }}
                    scroll={{ y: 900 }}
                    className={'scroll'} style={{ overflowX: "scroll" }} columns={columns}
                    dataSource={this.state.data.length ? this.state.data : []} />
                <Modal
                    onOk={() => this.booked()}
                    okText={'Deleiverd'}
                    okButtonProps={{ type: 'danger' }}
                    onCancel={() => this.setState({ modal: false })}
                    visible={this.state.modal}>
                    <Table size="small" columns={columns2} dataSource={data2} />
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        data: state,
    }
}
const mapDispatchToProps = { getdata }
export default connect(mapStateToProps, mapDispatchToProps)(PendingOrders)
