import React, { useState, useEffect } from "react";
import {
  Card,
  Radio,
  Button,
  message,
  Spin,
  Progress,
  Space,
  Typography,
  Divider,
  Alert,
} from "antd";
import { CheckCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import apiClient from "../api/config";
import { useNavigate, useParams } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;

const SurveyForm = () => {
  const { type } = useParams(); // 'pre-training' or 'post-training'
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [surveyStatus, setSurveyStatus] = useState(null);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchSurveyStatus();
    fetchQuestions();
  }, [type]);

  const fetchSurveyStatus = async () => {
    try {
      const response = await apiClient.get("/api/surveys/status");
      setSurveyStatus(response.data);

      if (type === "pre-training" && response.data.preTrainingCompleted) {
        message.info("لقد أكملت هذا الاستبيان بالفعل");
      } else if (
        type === "post-training" &&
        response.data.postTrainingCompleted
      ) {
        message.info("لقد أكملت هذا الاستبيان بالفعل");
      }
    } catch (error) {
      console.error("Error fetching survey status:", error);
    }
  };

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/api/surveys/questions/${type}`);
      setQuestions(response.data);
    } catch (error) {
      if (
        error.response?.status === 403 &&
        error.response?.data?.error === "PRE_TRAINING_REQUIRED"
      ) {
        message.error("يجب إكمال استبيان قبل التدريب أولاً");
        setTimeout(() => {
          navigate("/surveys");
        }, 2000);
      } else {
        message.error("فشل في تحميل الأسئلة");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: value,
    });
  };

  const handleSubmit = async () => {
    // Validate all questions are answered
    const unansweredQuestions = questions.filter((q) => !answers[q.id]);

    if (unansweredQuestions.length > 0) {
      message.warning("الرجاء الإجابة على جميع الأسئلة");
      return;
    }

    try {
      setSubmitting(true);

      const responses = Object.entries(answers).map(([questionId, answer]) => ({
        questionId: parseInt(questionId),
        answer: answer,
      }));

      await apiClient.post(`/api/surveys/submit/${type}`, { responses });

      message.success("تم إرسال الاستبيان بنجاح");

      await fetchSurveyStatus();

      setTimeout(() => {
        navigate("/surveys");
      }, 2000);
    } catch (error) {
      if (
        error.response?.status === 403 &&
        error.response?.data?.error === "PRE_TRAINING_REQUIRED"
      ) {
        message.error("يجب إكمال استبيان قبل التدريب أولاً");
        setTimeout(() => {
          navigate("/surveys");
        }, 2000);
      } else {
        message.error(
          error.response?.data?.message || "فشل في إرسال الاستبيان"
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  const isCompleted = () => {
    if (!surveyStatus) return false;
    return type === "pre-training"
      ? surveyStatus.preTrainingCompleted
      : surveyStatus.postTrainingCompleted;
  };

  const getProgress = () => {
    const answered = Object.keys(answers).length;
    const total = questions.length;
    return total > 0 ? Math.round((answered / total) * 100) : 0;
  };

  const getSurveyTitle = () => {
    return type === "pre-training"
      ? "استبيان قبل التدريب"
      : "استبيان بعد التدريب";
  };

  const getSurveyDescription = () => {
    return type === "pre-training"
      ? "يرجى تقييم معرفتك ومهاراتك الحالية قبل بدء التدريب. قيّم كل عبارة من 1 (ضعيف جداً) إلى 5 (ممتاز)."
      : "يرجى تقييم التدريب الذي تلقيته ومدى تحسن مهاراتك. قيّم كل عبارة من 1 (ضعيف جداً) إلى 5 (ممتاز).";
  };

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

  if (isCompleted()) {
    return (
      <div
        style={{
          padding: "24px",
          direction: "rtl",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <Card>
          <div style={{ textAlign: "center", padding: "40px" }}>
            <CheckCircleOutlined
              style={{
                fontSize: "64px",
                color: "#52c41a",
                marginBottom: "24px",
              }}
            />
            <Title level={3}>تم إكمال الاستبيان</Title>
            <Paragraph>
              لقد أكملت {getSurveyTitle()} بالفعل. شكراً لمشاركتك!
            </Paragraph>
            <Button type="primary" onClick={() => navigate("/surveys")}>
              العودة إلى الاستبيانات
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "24px",
        direction: "rtl",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <Card>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div>
            <Title level={2}>{getSurveyTitle()}</Title>
            <Paragraph>{getSurveyDescription()}</Paragraph>
          </div>

          {questions.length > 0 && (
            <div>
              <Text strong>التقدم: {getProgress()}%</Text>
              <Progress percent={getProgress()} status="active" />
            </div>
          )}

          <Alert
            message="مقياس التقييم"
            description={
              <div>
                <p>
                  <strong>1</strong> = ضعيف جداً / لا يوجد معرفة
                </p>
                <p>
                  <strong>2</strong> = ضعيف
                </p>
                <p>
                  <strong>3</strong> = جيد / متوسط
                </p>
                <p>
                  <strong>4</strong> = جيد جداً
                </p>
                <p>
                  <strong>5</strong> = ممتاز
                </p>
              </div>
            }
            type="info"
            showIcon
          />

          <Divider />

          {questions.map((question, index) => (
            <Card
              key={question.id}
              style={{
                marginBottom: "16px",
                background: answers[question.id] ? "#f6ffed" : "#ffffff",
                border: answers[question.id]
                  ? "1px solid #b7eb8f"
                  : "1px solid #d9d9d9",
              }}
            >
              <Space direction="vertical" style={{ width: "100%" }}>
                <Title level={5}>
                  {index + 1}. {question.text}
                </Title>
                <Radio.Group
                  value={answers[question.id]}
                  onChange={(e) =>
                    handleAnswerChange(question.id, e.target.value)
                  }
                  style={{ width: "100%" }}
                >
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Radio value={1}>1 - ضعيف جداً</Radio>
                    <Radio value={2}>2 - ضعيف</Radio>
                    <Radio value={3}>3 - جيد</Radio>
                    <Radio value={4}>4 - جيد جداً</Radio>
                    <Radio value={5}>5 - ممتاز</Radio>
                  </Space>
                </Radio.Group>
              </Space>
            </Card>
          ))}

          <Divider />

          <div style={{ textAlign: "center" }}>
            <Space size="large">
              <Button size="large" onClick={() => navigate("/surveys")}>
                إلغاء
              </Button>
              <Button
                type="primary"
                size="large"
                onClick={handleSubmit}
                loading={submitting}
                disabled={getProgress() < 100}
                icon={submitting ? <LoadingOutlined /> : null}
              >
                {submitting ? "جاري الإرسال..." : "إرسال الاستبيان"}
              </Button>
            </Space>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default SurveyForm;
