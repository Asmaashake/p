import React, { useState } from "react";
import { Layout, Button, Input, Form, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import Anachor from "./component/Anchor";

const { Content } = Layout;
const { Text } = Typography;

export default function Login() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [forgotMessage, setForgotMessage] = useState("");
  const navigate = useNavigate();

  const onFinish = () => {
    // تحقق الرقم الوطني: 10 أرقام فقط
    const usernameValid = /^\d{10}$/.test(loginData.username);
    if (!usernameValid) {
      alert("الرقم الوطني يجب أن يتكون من 10 أرقام فقط ولا يحتوي على حروف أو رموز");
      return; // يمنع الدخول
    }

    // التحقق من كلمة المرور
    if (loginData.username === "2000200012" && loginData.password === "12345$as") {
      localStorage.setItem("isLoggedIn", true);
      navigate("/dash");
    } else {
      alert("الرقم الوطني أو كلمة المرور غير صحيحة");
    }
  };

  const handleForgotPassword = () => {
    setForgotMessage(
      `الرقم الوطني: ${loginData.username}, كلمة المرور: ${loginData.password}`
    );
  };

  return (
    <Layout
      style={{
        minHeight: "53vh",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "45px",
      }}
    >
      <Content className="login-content">
        <h2>منصة تقييم التدريب المهني</h2>
        <h2>تسجيل دخول الاداريين</h2>

        <Form
          name="loginForm"
          layout="vertical"
          onFinish={onFinish}
          style={{ textAlign: "right", direction: "rtl" }}
        >
          <img
            src="https://tse4.mm.bing.net/th/id/OIP.HEil-u4k_qmvxrr4fbu2OAAAAA?pid=Api&P=0&h=220"
            alt="National Employment & training"
          />

          {/* الرقم الوطني - أرقام فقط */}
          <Form.Item
            label="الرقم الوطني"
            name="username"
            style={{ textAlign: "right" }}
            className="login-input"
            required
            rules={[{ required: true, message: "الرجاء ادخال الرقم الوطني" }]}
          >
            <Input
              placeholder="ادخل الرقم الوطني"
              maxLength={10}
              value={loginData.username}
              onChange={(event) => {
                const value = event.target.value;
                // يسمح فقط بالأرقام
                if (/^\d*$/.test(value)) {
                  setLoginData({ ...loginData, username: value });
                }
              }}
            />
          </Form.Item>

          {/* كلمة المرور */}
          <Form.Item
            label="كلمة المرور"
            name="password"
            className="login-input"
            required
            rules={[
              {
                required: true,
                message:
                  "ادخال كلمة المرور المكونة من 8 وتحتوي على رمز خاص ",
              },
            ]}
          >
            <Input.Password
              placeholder="ادخل كلمة المرور"
              maxLength={8}
              value={loginData.password}
              onChange={(event) =>
                setLoginData({ ...loginData, password: event.target.value })
              }
            />
          </Form.Item>

          {/* الأزرار */}
          <Form.Item>
            <Button
              type="link"
              onClick={handleForgotPassword}
              className="login-link"
            >
              نسيت كلمة المرور
            </Button>
            <Button htmlType="submit" block className="login-btn">
              دخول لوحة التحكم
            </Button>
          </Form.Item>

          <Form.Item>
            <Anachor />
          </Form.Item>

          {forgotMessage && <Text type="warning">{forgotMessage}</Text>}
        </Form>
      </Content>
    </Layout>
  );
}
