import React, { useState } from "react";
import { Layout, Button, Input, Form, Typography } from "antd";
import { useNavigate } from "react-router-dom";

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
    navigate("/dashboard");
  };

  const handleForgotPassword = () => {
    setForgotMessage(`Username: ${loginData.username}, Password: ${loginData.password}`);
  };

  return (
    <Layout style={{ minHeight: "100vh", justifyContent: "center", alignItems: "center" }}>
      <Content className="login-content">
        <h2>Login</h2>
        <Form name="loginForm" layout="vertical" onFinish={onFinish}>
          <Form.Item label="Username" name="username" className="login-input">
            <Input placeholder="Enter username" />
          </Form.Item>
          <Form.Item label="Password" name="password" className="login-input">
            <Input.Password placeholder="Enter password" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" block className="login-btn">Login</Button>
          </Form.Item>
          <Form.Item>
            <Button type="link" onClick={handleForgotPassword} className="login-link">Forgot Password?</Button>
          </Form.Item>
          {forgotMessage && <Text type="warning">{forgotMessage}</Text>}
        </Form>
      </Content>
    </Layout>
  );
}
