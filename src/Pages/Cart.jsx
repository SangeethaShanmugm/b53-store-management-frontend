import React, { useEffect, useState } from 'react'
import { Table, Button, Modal, Form, Input, Select, message } from "antd"
import { useSelector } from 'react-redux'
import axios from 'axios'
import { API } from '../global'
import { useNavigate } from 'react-router-dom'
function Cart() {
    const cartItems = useSelector((state) => state.itemShop.cartItems)
    const [subTotal, setSubTotal] = useState(0)
    const [billChargeModel, setBillChargeModel] = useState(false)
    const navigate = useNavigate()
    console.log(cartItems)

    useEffect(() => {
        let temp = 0;
        cartItems.forEach((item) => {
            temp = temp + item.price * 1
        })
        setSubTotal(temp)
    }, [cartItems])

    const columns = [
        {
            title: "Name",
            dataIndex: "name"
        },
        {
            title: "Image",
            dataIndex: "image",
            render: (image) => {
                <img src={image} alt="" />
            }
        },
        {
            title: "Price",
            dataIndex: "price"
        },
    ]

    const onFinish = (values) => {
        const reqObject = {
            ...values,
            subTotal,
            cartItems,
            tax: Number(((subTotal / 100) * 2).toFixed(2)),
            totalAmount: Number(subTotal + (subTotal / 100) * 2),
            userId: JSON.parse(localStorage.getItem("user_data"))._id
        }
        axios.post(`${API}/bills/charge-bill`, reqObject)
            .then(() => {
                message.success("Bill added successfully")
                navigate("/bills")
            })

    }

    return (
        <div>
            <Table dataSource={cartItems} columns={columns} pagination={false} bordered></Table>

            <div className='d-flex justify-content-end'>
                <div>
                    <h3>SUB TOTAL: <b>Rs. {subTotal}</b></h3>
                </div>
            </div>

            <Button type="primary" onClick={() => setBillChargeModel(true)}>Charge Bill</Button>

            <Modal title="Charge Bill" visible={billChargeModel} footer={false} onCancel={() => setBillChargeModel(false)}>

                <Form onFinish={onFinish}>
                    <Form.Item name="customerName" label="Customer Name">
                        <Input />
                    </Form.Item>
                    <Form.Item name="customerPhoneNumber" label="Customer Phone Number">
                        <Input />
                    </Form.Item>
                    <Form.Item name="paymentMode" label="Payment Mode">
                        <Select>
                            <Select.Option value="cash">CASH</Select.Option>
                            <Select.Option value="card">CARD</Select.Option>
                        </Select>
                    </Form.Item>

                    <div>
                        <h3>SubTotal: <b>Rs. {subTotal}</b></h3>
                        <h5>Tax: <b>Rs. {((subTotal / 100) * 2).toFixed(2)}</b></h5>
                        <h5>Grand Total: <b>Rs. {(subTotal + (subTotal / 100) * 2)}</b></h5>
                    </div>
                    <div className='d-flex justify-content-end'>
                        <Button htmlType="submit" type="primary">GENERATE BILL</Button>
                    </div>
                </Form>
            </Modal>

        </div>
    )
}

export default Cart