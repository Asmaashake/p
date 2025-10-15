import React from "react";
import { Button, Layout } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

export default function HeaderBar1() {
const navigate = useNavigate();
const buttonStyle = { backgroundColor: "#522524", color: "#fff", borderColor: "#522524" };

return (
    <Header
    style={{
        backgroundColor: "#fff",
        color: "#522524",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
    }}
    >
        
    <div style={{ display: "flex", alignItems: "left", gap: 10 }}>
        <Button style={buttonStyle} onClick={() => navigate("/dash")}>لوحة التحكم الإدارية</Button>
            <Button style={buttonStyle} onClick={() => navigate("/admin")}>إدارة الاستبيان</Button>
                    

    </div>

    <Button
        style={{ backgroundColor: "#522524", color: "#fff", borderRadius: "8px" }}
        icon={<ArrowLeftOutlined />}
        onClick={() => {
        localStorage.removeItem("isLoggedIn");
        navigate("/");
        }}
    >
        العودة
    </Button>
    </Header>
);
}

