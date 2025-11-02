import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Typography,
  Space,
  Tag,
  Spin,
  Tooltip,
} from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  FormOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/config";

const { Title, Paragraph } = Typography;

const SurveyDashboard = () => {
  const navigate = useNavigate();
  const [surveyStatus, setSurveyStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSurveyStatus();
  }, []);

  const fetchSurveyStatus = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/api/surveys/status");
      setSurveyStatus(response.data);
    } catch (error) {
      console.error("Error fetching survey status:", error);
    } finally {
      setLoading(false);
    }
  };

  const surveys = [
    {
      type: "pre-training",
      title: "استبيان قبل التدريب",
      description: "قيّم معرفتك ومهاراتك الحالية قبل بدء البرنامج التدريبي",
      icon: <FormOutlined style={{ fontSize: "48px", color: "#1890ff" }} />,
      completedKey: "preTrainingCompleted",
    },
    {
      type: "post-training",
      title: "استبيان بعد التدريب",
      description: "قيّم التدريب ومدى تحسن مهاراتك بعد إنهاء البرنامج التدريبي",
      icon: <FormOutlined style={{ fontSize: "48px", color: "#52c41a" }} />,
      completedKey: "postTrainingCompleted",
    },
  ];

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <Spin size="large" tip="جاري التحميل..." />
      </div>
    );
  }

  return (
    <div style={{ padding: "24px", direction: "rtl" }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div>
          <Title level={2}>الاستبيانات</Title>
          <Paragraph>
            يرجى إكمال الاستبيانات التالية لمساعدتنا في تقييم وتحسين البرنامج
            التدريبي
          </Paragraph>
        </div>

        <Row gutter={[24, 24]}>
          {surveys.map((survey) => {
            const isCompleted = surveyStatus?.[survey.completedKey];
            const isPostTraining = survey.type === "post-training";
            const preTrainingCompleted = surveyStatus?.preTrainingCompleted;
            const isLocked = isPostTraining && !preTrainingCompleted;

            return (
              <Col xs={24} md={12} key={survey.type}>
                <Card
                  hoverable={!isCompleted && !isLocked}
                  style={{
                    height: "100%",
                    border: isCompleted
                      ? "2px solid #52c41a"
                      : isLocked
                      ? "1px solid #d9d9d9"
                      : "1px solid #d9d9d9",
                    opacity: isLocked ? 0.7 : 1,
                  }}
                >
                  <Space
                    direction="vertical"
                    size="large"
                    style={{ width: "100%" }}
                  >
                    <div style={{ textAlign: "center" }}>
                      {isLocked ? (
                        <LockOutlined
                          style={{ fontSize: "48px", color: "#d9d9d9" }}
                        />
                      ) : (
                        survey.icon
                      )}
                    </div>

                    <div>
                      <Title level={4}>{survey.title}</Title>
                      <Paragraph>{survey.description}</Paragraph>
                    </div>

                    <div style={{ textAlign: "center" }}>
                      {isCompleted ? (
                        <Space direction="vertical" size="middle">
                          <Tag
                            icon={<CheckCircleOutlined />}
                            color="success"
                            style={{ fontSize: "16px", padding: "8px 16px" }}
                          >
                            تم الإكمال
                          </Tag>
                          <Paragraph type="secondary">
                            شكراً لك على إكمال هذا الاستبيان
                          </Paragraph>
                        </Space>
                      ) : isLocked ? (
                        <Space direction="vertical" size="middle">
                          <Tag
                            icon={<LockOutlined />}
                            color="default"
                            style={{ fontSize: "16px", padding: "8px 16px" }}
                          >
                            مقفل
                          </Tag>
                          <Tooltip title="يجب إكمال استبيان قبل التدريب أولاً">
                            <Button
                              type="default"
                              size="large"
                              disabled
                              icon={<LockOutlined />}
                            >
                              مقفل - أكمل الاستبيان السابق أولاً
                            </Button>
                          </Tooltip>
                        </Space>
                      ) : (
                        <Space direction="vertical" size="middle">
                          <Tag
                            icon={<ClockCircleOutlined />}
                            color="warning"
                            style={{ fontSize: "16px", padding: "8px 16px" }}
                          >
                            قيد الانتظار
                          </Tag>
                          <Button
                            type="primary"
                            size="large"
                            onClick={() => navigate(`/survey/${survey.type}`)}
                          >
                            ابدأ الاستبيان
                          </Button>
                        </Space>
                      )}
                    </div>
                  </Space>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Space>
    </div>
  );
};

export default SurveyDashboard;
