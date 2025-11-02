// Login.js
import React, { useState } from "react";
import { Layout, Button, Input, Form, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import apiClient from "./api/config";
import Anachor from "./component/Anchor";
import "./AppStyles.css";
const { Content } = Layout;
const { Text } = Typography;

export default function Login() {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [forgotMessage, setForgotMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const usernameValid = /^\d{10}$/.test(values.username);
    if (!usernameValid) {
      message.error(
        "الرقم الوطني يجب أن يتكون من 10 أرقام فقط ولا يحتوي على حروف أو رموز"
      );
      return;
    }

    setLoading(true);
    console.log("Attempting login with:", {
      nationalId: values.username,
      password: values.password,
    });

    try {
      const response = await apiClient.post("/api/users/login", {
        nationalId: values.username,
        password: values.password,
      });

      console.log("Login response:", response.data);

      if (response.data.success) {
        // Store the JWT token
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        message.success("تم تسجيل الدخول بنجاح");

        // Use a small delay to ensure the success message is shown
        setTimeout(() => {
          // Redirect based on user role
          if (response.data.user.role === "admin") {
            navigate("/admin");
          } else {
            // Trainers and trainees go to survey dashboard
            navigate("/surveys");
          }
        }, 1000);
      } else {
        message.error(response.data.message || "فشل تسجيل الدخول");
      }
    } catch (error) {
      console.error("Login error:", error.response || error);
      if (error.response?.data?.message) {
        message.error(`خطأ في تسجيل الدخول: ${error.response.data.message}`);
      } else {
        message.error("الرقم الوطني أو كلمة المرور غير صحيحة");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setForgotMessage(
      `الرقم الوطني: ${loginData.username}, كلمة المرور: ${loginData.password}`
    );
  };

  // 🔹 تنسيق موحد للحقول
  const inputStyle = {
    width: "350px",
    height: "45px",
    textAlign: "right",
    fontSize: "15px",
    borderRadius: "6px",
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
      <Content className="login-content" style={{ textAlign: "center" }}>
        <h2 style={{ marginBottom: "0px" }}>منصة تقييم التدريب المهني</h2>
        <h2 style={{ marginBottom: "20px" }}>تسجيل دخول الاداريين</h2>

        <Form
          name="loginForm"
          layout="vertical"
          onFinish={onFinish}
          style={{
            textAlign: "right",
            direction: "rtl",
            display: "inline-block",
          }}
        >
          <img
            src="https://tse4.mm.bing.net/th/id/OIP.HEil-u4k_qmvxrr4fbu2OAAAAA?pid=Api&P=0&h=220"
            alt="National Employment & Training"
            style={{ marginBottom: "25px", width: "340px" }}
          />

          <Form.Item
            label="الرقم الوطني"
            name="username"
            className="login-input"
            rules={[{ required: true, message: "الرجاء ادخال الرقم الوطني" }]}
          >
            <Input
              style={inputStyle}
              placeholder="ادخل الرقم الوطني"
              maxLength={10}
            />
          </Form.Item>

          <Form.Item
            label="كلمة المرور"
            name="password"
            className="login-input"
            rules={[{ required: true, message: "الرجاء ادخال كلمة المرور" }]}
          >
            <Input.Password
              style={inputStyle}
              placeholder="ادخل كلمة المرور"
              maxLength={12}
            />
          </Form.Item>

          <Form.Item style={{ textAlign: "right" }}>
            <Button
              type="link"
              onClick={handleForgotPassword}
              className="login-link"
              style={{ marginBottom: "10px", fontSize: "13px" }}
            >
              نسيت كلمة المرور
            </Button>

            <Button
              htmlType="submit"
              loading={loading}
              className="login-btn"
              style={{
                backgroundColor: "#522524",
                color: "#fff", // اللون الافتراضي للنص
                width: "350px",
                height: "45px",
                borderRadius: "6px",
                fontSize: "15px",
              }}
              onMouseDown={(e) => (e.currentTarget.style.color = "#000")} // عند النقر يصبح أسود
              onMouseUp={(e) => (e.currentTarget.style.color = "#fff")} // عند رفع اليد يعود للأبيض
            >
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
