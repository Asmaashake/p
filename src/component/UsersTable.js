import React, { useState, useEffect } from "react";
import { Table, Spin, message, Tag } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import apiClient from "../api/config";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      title: "National ID",
      dataIndex: "nationalId",
      key: "nationalId",
      fixed: "left",
      width: 120,
    },
    {
      title: "Name",
      key: "name",
      fixed: "left",
      width: 150,
      render: (_, record) => `${record.firstName} ${record.lastName}`,
    },
    {
      title: "Survey Status",
      key: "surveyStatus",
      width: 120,
      render: (_, record) => {
        const { surveyCompletionStatus } = record;
        if (surveyCompletionStatus === "مكتمل") {
          return (
            <Tag icon={<CheckCircleOutlined />} color="success">
              مكتمل
            </Tag>
          );
        } else if (surveyCompletionStatus === "جزئي") {
          return (
            <Tag icon={<MinusCircleOutlined />} color="warning">
              جزئي
            </Tag>
          );
        } else {
          return (
            <Tag icon={<CloseCircleOutlined />} color="default">
              غير مكتمل
            </Tag>
          );
        }
      },
    },
    {
      title: "Pre-Training",
      key: "preTraining",
      width: 120,
      render: (_, record) =>
        record.preTrainingCompleted ? (
          <Tag color="green">✓</Tag>
        ) : (
          <Tag color="red">✗</Tag>
        ),
    },
    {
      title: "Post-Training",
      key: "postTraining",
      width: 120,
      render: (_, record) =>
        record.postTrainingCompleted ? (
          <Tag color="green">✓</Tag>
        ) : (
          <Tag color="red">✗</Tag>
        ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: 120,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      width: 80,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 100,
    },
    {
      title: "Region",
      dataIndex: "region",
      key: "region",
      width: 100,
    },
    {
      title: "Area",
      dataIndex: "area",
      key: "area",
      width: 120,
    },
    {
      title: "Institute",
      dataIndex: "institute",
      key: "institute",
      width: 150,
    },
    {
      title: "Profession",
      dataIndex: "profession",
      key: "profession",
      width: 150,
    },
    {
      title: "Batch",
      dataIndex: "batch",
      key: "batch",
      width: 80,
    },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiClient.get("/api/admin/get-users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        message.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "20px", direction: "rtl" }}>
      <h2>قائمة المستخدمين</h2>
      {loading ? (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <Spin size="large" tip="جاري التحميل..." />
        </div>
      ) : (
        <Table
          dataSource={users}
          columns={columns}
          rowKey="nationalId"
          scroll={{ x: 1500 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50", "100"],
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} من ${total} مستخدم`,
          }}
        />
      )}
    </div>
  );
};

export default UsersTable;
