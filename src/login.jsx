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
    setForgotMessage(`الرقم الوطني: ${loginData.username}, كلمة المرور : ${loginData.password}`);
  };

  return (
    <Layout style={{ minHeight: "100vh", justifyContent: "center", alignItems: "center" }}>
      <Content className="login-content">
        <h2>تسجيل دخول الاداريين</h2>
        <Form name="loginForm" layout="vertical" onFinish={onFinish}>
          <Form.Item label="الرقم الوطني " name="username" className="login-input">
            <Input placeholder="ادخل الرقم الوطني" />
          </Form.Item>
          <Form.Item label="كلمة المرور " name="password" className="login-input">
            <Input.Password placeholder="ادخل كلمة المرور " />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" block className="login-btn"  onClick={() => { navigate("/dashboard"); // ← يرجع على login
  }}>تسجيل لوحة الدخول</Button>
          </Form.Item>
          <Form.Item>
            <Button type="link" onClick={handleForgotPassword} className="login-link">نسيت كلمة المرور </Button>
          </Form.Item>
          {forgotMessage && <Text type="warning">{forgotMessage}</Text>}
        </Form>
      </Content>
    </Layout>
  );
}
