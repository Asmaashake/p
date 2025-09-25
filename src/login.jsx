
import React, { useState } from "react";
import { Layout, Button, Input, Form, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import Anachor from "./component/Anchor";


const { Content } = Layout;
const { Text } = Typography;

export default function Login() {
const [loginData, setLoginData] = useState({ username: "", password: "" });
const [forgotMessage, setForgotMessage] = useState("");
const navigate = useNavigate();

const onFinish = (values) => {
    console.log("Login Data:", values);
    setLoginData(values);
    localStorage.setItem("isLoggedIn", true);
    navigate("/dash");  };

const handleForgotPassword = () => {
    setForgotMessage(`الرقم الوطني:${loginData.username},كلمة المرور :${loginData.password}`);
};

return (
    <Layout style={{ minHeight: "50vh", justifyContent: "center", alignItems: "center", paddingTop:"50px" }}>
    <Content className="login-content">
        <h2>تسجيل دخول الاداريين</h2>
            <Form  name="loginForm" layout="vertical" onFinish={onFinish} onSubmit={(event) => { event.preventDefault(); console.log(loginData) }}>
                <img   src="https://tse4.mm.bing.net/th/id/OIP.HEil-u4k_qmvxrr4fbu2OAAAAA?pid=Api&P=0&h=220" alt="National Employment & training"/>
            <Form.Item label="الرقم الوطني " name="username" className="login-input"  required rules={[{ required: true,message:'الرجاء ادخال الرقم الوطني'}]} >
            <Input placeholder="ادخل الرقم الوطني"maxLength={10} value={loginData.username}
                    onChange={(event) => {
                    setLoginData({...loginData, name: event.target.value, })

                        }} />
        </Form.Item>
        <Form.Item label="كلمة المرور " name="password" className="login-input" required  rules={[{ required: true,message:'ادخال كلمة المرور المكونة من 8 وتحتوي على رمز خاص '}]}>
            <Input.Password placeholder="ادخل كلمة المرور " maxLength={8} value={loginData.password}
                    onChange={(event) => {
                    setLoginData({...loginData, password: event.target.value, })

                        }}/>
        </Form.Item>
                <Form.Item>
                    
                    <Button type="link" onClick={handleForgotPassword} className="login-link">نسيت كلمة المرور </Button>
                    <Button htmlType="submit" block className="login-btn"  >تسجيل لوحة الدخول</Button>
        </Form.Item>
                <Form.Item>
                    <Anachor/>
                </Form.Item>
        {forgotMessage && <Text type="warning">{forgotMessage}</Text>}
        </Form>
    </Content>
    </Layout>
);
}