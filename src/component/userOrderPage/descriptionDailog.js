import React from 'react';
import { Input, Form, message, Modal } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
class Description extends React.Component {
    constructor() {
        super()
        this.state = {
            quantity: "",
            extra: ""
        }
    }
    change = (ev, val) => {
        this.setState({
            [val]: ev.target.value
        })
    }
    add = () => {
        if (this.state.quantity) {
            var data = this.props.data.value
            var obj = {
                quantity: this.state.quantity,
                extra: this.state.extra,
                totalprice: data.price * this.state.quantity
            }
            data.description = obj
            this.props.addItem(data, this.props.data.index)
            console.log(data)
            this.setState({
                quantity: "",
                extra: ""
            })
        } else {
            message.error('please add quantity')
        }

    }
    render() {
        return (
            <Modal
                title="Enter Item Detail"
                visible={this.props.open}
                onOk={this.add}
                okText="addTocart"
                okButtonProps={{ type: "danger" }}
                onCancel={this.props.close}
            >
                <Form>
                    <Form.Item label="Quantity">
                        <Input value={this.state.quantity} onChange={(ev) => this.change(ev, 'quantity')} />
                    </Form.Item>
                    <Form.Item label="Description">
                        <TextArea value={this.state.extra} onChange={(ev) => this.change(ev, 'extra')} />
                    </Form.Item>
                </Form>
            </Modal>
        )

    }
}
export default Description