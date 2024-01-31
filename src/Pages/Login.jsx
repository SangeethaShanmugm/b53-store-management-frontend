import React from 'react'
import { Row, Col, Form, Input, Button, message } from "antd"
import { API } from '../global'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()

    const onFinish = (values) => {
        console.log(values)
        axios.post(`${API}/users/login`, values)
            .then((res) => {
                console.log(res)
                message.success("Login Success")
                localStorage.setItem("user_data", JSON.stringify(res.data))
                navigate("/home")

            }).catch((err) => {
                message.error("Invalid Credentials")
            })
    }
    return (
        <div>
            <Row>
                <Col lg={8} xs={22}>
                    <Form onFinish={onFinish}>
                        <h1 className='text-center'>Store Management</h1>
                        <h4>Login</h4>
                        <Form.Item name="userId" label="User ID">
                            <Input id="username" placeholder="2" />
                        </Form.Item>

                        <Form.Item name="password" label="Password">
                            <Input id="password" placeholder="john@123" />
                        </Form.Item>

                        <Button htmlType="submit" type="primary">Login</Button>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default Login