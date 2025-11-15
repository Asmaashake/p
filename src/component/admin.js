import React, { useState, useEffect } from "react";
import { Tabs, Layout, Button, Row, Col } from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import SurveyResponsesAdmin from "./SurveyResponsesAdmin";
import QuestionManager from "./QuestionManager";
import { useNavigate } from "react-router-dom";
import HeaderBar1 from "./HeaderBar1";
import DashboardFooter from "./DashboardFooter";

const { Content } = Layout;

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("responses");
  const navigate = useNavigate();

  const onTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <Layout
      style={{ textAlign: "right", direction: "rtl", minHeight: "100vh" }}
    >
      <HeaderBar1 />
      <Content style={{ padding: 20 }}>
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: 20 }}
        >
          <Col>
            <h1>إدارة الاستبيان</h1>
          </Col>
          <Col>
            <Button
              type="default"
              icon={<UserOutlined />}
              onClick={() => navigate("/dash")}
              style={{ marginLeft: 8 }}
            >
              لوحة التحكم
            </Button>
          </Col>
        </Row>

        <Tabs
          activeKey={activeTab}
          onChange={onTabChange}
          items={[
            {
              key: "responses",
              label: (
                <span>
                  <FileTextOutlined />
                  ردود الاستبيان
                </span>
              ),
              children: <SurveyResponsesAdmin />,
            },
            {
              key: "questions",
              label: (
                <span>
                  <QuestionOutlined />
                  إدارة الأسئلة
                </span>
              ),
              children: <QuestionManager />,
            },
          ]}
        />
      </Content>
      <DashboardFooter />
    </Layout>
  );
}
