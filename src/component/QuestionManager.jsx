import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  message,
  Popconfirm,
} from "antd";
import apiClient from "../api/config";

const { Option } = Select;

const QuestionManager = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [form] = Form.useForm();

  // Survey type options
  const surveyTypes = [
    "pre-training",
    "post-training",
    "trainer-equipment",
    "trainer-students",
  ];

  // Survey type Arabic labels
  const surveyTypeLabels = {
    "pre-training": "قبل التدريب",
    "post-training": "بعد التدريب",
    "trainer-equipment": "تقييم المعدات",
    "trainer-students": "تقييم المتدربين",
  };

  // Sections based on requirements
  const sections = [
    "personal-info",
    "safety-health",
    "profession-awareness",
    "general",
    "trainee-self-evaluation",
    "curriculum-evaluation",
    "trainer-evaluation",
    "training-environment",
  ];

  // Section Arabic labels
  const sectionLabels = {
    "personal-info": "المعلومات الشخصية",
    "safety-health": "السلامة والصحة المهنية",
    "profession-awareness": "الوعي المهني",
    general: "عام",
    "trainee-self-evaluation": "التقييم الذاتي للمتدرب",
    "curriculum-evaluation": "تقييم المنهج",
    "trainer-evaluation": "تقييم المدرب",
    "training-environment": "بيئة التدريب",
  };

  // Table columns
  const columns = [
    {
      title: "الرقم",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "نص السؤال",
      dataIndex: "text",
      key: "text",
    },
    {
      title: "القسم",
      dataIndex: "section",
      key: "section",
      width: 150,
      render: (section) => sectionLabels[section] || section,
    },
    {
      title: "نوع الاستبيان",
      dataIndex: "surveyType",
      key: "surveyType",
      width: 150,
      render: (surveyType) => surveyTypeLabels[surveyType] || surveyType,
    },
    {
      title: "الإجراءات",
      key: "actions",
      width: 200,
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => handleEdit(record)}>
            تعديل
          </Button>
          <Popconfirm
            title="حذف هذا السؤال؟"
            description="لا يمكن التراجع عن هذا الإجراء إذا كان السؤال لا يحتوي على إجابات."
            onConfirm={() => handleDelete(record.id)}
            okText="نعم"
            cancelText="لا"
          >
            <Button type="primary" danger>
              حذف
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Fetch questions
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/api/admin/questions");
      setQuestions(response.data);
    } catch (error) {
      message.error("فشل في تحميل الأسئلة");
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      if (editingQuestion) {
        await apiClient.put(
          `/api/admin/questions/${editingQuestion.id}`,
          values
        );
        message.success("تم تحديث السؤال بنجاح");
      } else {
        await apiClient.post("/api/admin/questions", values);
        message.success("تم إنشاء السؤال بنجاح");
      }
      setModalVisible(false);
      form.resetFields();
      setEditingQuestion(null);
      fetchQuestions();
    } catch (error) {
      message.error(error.response?.data?.message || "فشلت العملية");
      console.error("Error submitting question:", error);
    }
  };

  // Handle edit button click
  const handleEdit = (question) => {
    setEditingQuestion(question);
    form.setFieldsValue(question);
    setModalVisible(true);
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/api/admin/questions/${id}`);
      message.success("تم حذف السؤال بنجاح");
      fetchQuestions();
    } catch (error) {
      message.error(error.response?.data?.message || "فشل في حذف السؤال");
      console.error("Error deleting question:", error);
    }
  };

  // Handle modal cancel
  const handleCancel = () => {
    setModalVisible(false);
    setEditingQuestion(null);
    form.resetFields();
  };

  return (
    <div style={{ padding: "24px", direction: "rtl" }}>
      <div
        style={{
          marginBottom: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ margin: 0 }}>إدارة الأسئلة</h1>
        <Button type="primary" onClick={() => setModalVisible(true)}>
          إضافة سؤال جديد
        </Button>
      </div>

      <Table
        loading={loading}
        columns={columns}
        dataSource={questions}
        rowKey="id"
        scroll={{ x: 1000 }}
      />

      <Modal
        title={editingQuestion ? "تعديل السؤال" : "إضافة سؤال جديد"}
        open={modalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={editingQuestion || {}}
        >
          <Form.Item
            name="text"
            label="نص السؤال"
            rules={[{ required: true, message: "الرجاء إدخال نص السؤال!" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="keyword"
            label="الكلمة المفتاحية"
            rules={[
              { required: true, message: "الرجاء إدخال كلمة مفتاحية فريدة!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="section"
            label="القسم"
            rules={[{ required: true, message: "الرجاء اختيار قسم!" }]}
          >
            <Select>
              {sections.map((section) => (
                <Option key={section} value={section}>
                  {sectionLabels[section] || section}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="surveyType"
            label="نوع الاستبيان"
            rules={[
              { required: true, message: "الرجاء اختيار نوع الاستبيان!" },
            ]}
          >
            <Select>
              {surveyTypes.map((type) => (
                <Option key={type} value={type}>
                  {surveyTypeLabels[type] || type}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Space style={{ width: "100%", justifyContent: "flex-end" }}>
              <Button onClick={handleCancel}>إلغاء</Button>
              <Button type="primary" htmlType="submit">
                {editingQuestion ? "تحديث" : "إنشاء"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default QuestionManager;
