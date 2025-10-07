import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

export default function DashboardFooter() {
  return (
    <Footer style={{ textAlign: "center" }}>
      Dashboard ©{new Date().getFullYear()}
    </Footer>
  );
}
