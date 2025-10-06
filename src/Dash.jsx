import React, { useEffect, useState } from "react";
import { ArrowLeftOutlined, ReloadOutlined } from "@ant-design/icons";
import {
  Layout, Button, Table, Spin, Input, Space, Card, Row, Col, Select, Typography, Tag
} from "antd";


import axios from "axios";
import { UserOutlined, CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import './AppStyles.css';
import Ai from './component/Ai';

const { Header, Content, Footer } = Layout;
const { Search } = Input;
const { Option } = Select;
const { Text } = Typography;

// === البيانات المساعدة ===
const cards = [
  { icon: <UserOutlined style={{ fontSize: 30, color: "#522524" }} />, title: "معدل استجابة المدربين", description: "60%" },
  { icon: <UserOutlined style={{ fontSize: 30, color: "#522524" }} />, title: "معدل استجابة المتدربين", description: "40%" },
  { icon: <UserOutlined style={{ fontSize: 30, color: "#522524" }} />, title: "إجمالي المدربين", description: "20" },
  { icon: <UserOutlined style={{ fontSize: 30, color: "#522524" }} />, title: "إجمالي المتدربين", description: "10" }
];

const Institute = [
  "الحسينية", "معهد الجفر", "معهد الرمثا", "معهد الريشة", "معهد الزرقاء", "معهد الطفيلة",
  "معهد العقبة", "معهد الكرك", "معهد الكورة", "معهد الموقر", "معهد جرش", "معهد ذيبان",
  "معهد عجلون", "معهد مادبا", "معهد ماركا", "معهد معان", "معهد السرحان", "العقبة/القويرة",
  "رحاب", "الصفاوي", "مركز العقبة (HUB)", "الرويشد", "مشغل قرا بني هاشم"
];

const professions = [
  "إدارة تزويد مأمور", "التمديدات الصحية", "تكييف وتبريد", "حداد ألمنيوم", "حداد فاصلون",
  "دهان أثاث خشبي", "دهان مباني / مجهز ديكورات جبسية", "فني آلات صناعية", "قصير , مركب قواطع جبس",
  "كهربائي تمديدات منزلي وتحكم", "كهربائي سيارات", "لحام أنابيب", "مركب خلايا طاقة شمسية",
  "نجار أثاث", "نجار طوبار , حداد تسليح", "خياط نسائي", "حلاق نسائي", "بستنة عامة",
  "خضراوات محمية", "تسويق الكتروني", "ميكانيك مركبات خفيفة"
];

const gender = ["ذكر", "أنثى"];
const surveyStatus = ["مكتمل", "غير مكتمل", "جزئي"];

export default function Dashboard() {
  const navigate = useNavigate();
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedSurveyStatus, setSelectedSurveyStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [activeTable, setActiveTable] = useState("table1");
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedCenter, setSelectedCenter] = useState(null);

  // جلب البيانات للمتدربين
  const fetchData1 = () => {
    setLoading(true);
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then(res => {
        const formatted = res.data.map(u => ({
          key: u.id,
          name: u.name,
          age: u.id + 18,
          phone: "07" + Math.floor(10000000 + Math.random() * 90000000),
          id: "32",
          gender: gender[Math.floor(Math.random() * gender.length)],
          city: u.address.city,
          job: professions[Math.floor(Math.random() * professions.length)],
          trainingCenter: Institute[Math.floor(Math.random() * Institute.length)],
          surveyStatus: surveyStatus[Math.floor(Math.random() * surveyStatus.length)],
        }));
        setData1(formatted);
        if (activeTable === "table1") setFilteredData(formatted);
        setLoading(false);
      }).catch(() => setLoading(false));
  };

  // جلب البيانات للمدربين
  const fetchData2 = () => {
    setLoading(true);
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then(res => {
        const formatted = res.data.slice(0, 20).map(p => ({
          key: p.id,
          title: p.title,
          body: p.body,
          phone: "077" + Math.floor(10000000 + Math.random() * 90000000),
          age: p.id + 18,
          gender: gender[Math.floor(Math.random() * gender.length)],
          job: professions[Math.floor(Math.random() * professions.length)],
          city: "عمان",
          trainingCenter: Institute[Math.floor(Math.random() * Institute.length)],
          surveyStatus: surveyStatus[Math.floor(Math.random() * surveyStatus.length)],
        }));
        setData2(formatted);
        if (activeTable === "table2") setFilteredData(formatted);
        setLoading(false);
      }).catch(() => setLoading(false));
  };

  useEffect(() => {
    setFilteredData(activeTable === "table1" ? data1 : data2);
  }, [activeTable, data1, data2]);

  const applyFilters = (value = searchText, job = selectedJob, center = selectedCenter, status = selectedSurveyStatus) => {
    let filtered = activeTable === "table1" ? data1 : data2;
    if (value) {
      filtered = filtered.filter(item =>
        (item.name?.toLowerCase().includes(value.toLowerCase()) || item.title?.toLowerCase().includes(value.toLowerCase()) || item.phone.includes(value))
      );
    }
    if (job) filtered = filtered.filter(item => item.job === job);
    if (center) filtered = filtered.filter(item => item.trainingCenter === center);
    if (status) filtered = filtered.filter(item => item.surveyStatus === status);
    setFilteredData(filtered);
  };

  const columns1 = [
    { title: "الاسم", dataIndex: "name", key: "name" },
    { title: "رقم الهاتف", dataIndex: "phone", key: "phone" },
    { title: "رقم الدفعة", dataIndex: "id", key: "id" },
    { title: "العمر", dataIndex: "age", key: "age" },
    { title: "النوع", dataIndex: "gender", key: "gender" },
    { title: "المهنة", dataIndex: "job", key: "job" },
    { title: "المعهد", dataIndex: "trainingCenter", key: "trainingCenter" },
    {
      title: "حالة الاستبيان",
      dataIndex: "surveyStatus",
      key: "surveyStatus",
      render: (status) => {
        let color = "";

        if (status === "مكتمل") color = "green";
        else if (status === "غير مكتمل") color = "red";
        else if (status === "جزئي") color = "gold";

        return (
          <span style={{ color: "black", display: "flex", alignItems: "center", gap: 5 }}>
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: color,
                display: "inline-block"
              }}
            />
            {status}
          </span>
        );
      }
    }

  ];

  const columns2 = [
    { title: "الاسم", dataIndex: "title", key: "title" },
    { title: "العمل", dataIndex: "body", key: "body" },
    { title: "العمر", dataIndex: "age", key: "age" },
    { title: "النوع", dataIndex: "gender", key: "gender" },
    { title: "رقم الهاتف", dataIndex: "phone", key: "phone" },
    { title: "المهنة", dataIndex: "job", key: "job" },
    { title: "المنطقة", dataIndex: "city", key: "city" },
    { title: "المعهد", dataIndex: "trainingCenter", key: "trainingCenter" },
    {
      title: "حالة الاستبيان",
      dataIndex: "surveyStatus",
      key: "surveyStatus",
      render: (status) => {
        let color = "";

        if (status === "مكتمل") color = "green";
        else if (status === "غير مكتمل") color = "red";
        else if (status === "جزئي") color = "gold";

        return (
          <span style={{ color: "black", display: "flex", alignItems: "center", gap: 5 }}>
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: color,
                display: "inline-block"
              }}
            />
            {status}
          </span>
        );
      }
    }

  ];

  const switchTable = (table) => {
    setActiveTable(table);
    setSearchText("");
    setSelectedJob(null);
    setSelectedCenter(null);
  };

  const buttonStyle = { backgroundColor: "#522524", color: "#fff", borderColor: "#522524" };
const [exportActive, setExportActive] = useState(false);
const [importActive, setImportActive] = useState(false);
  return (
      

    <Layout style={{ textAlign: "right", direction: "rtl" }}>
      <Layout>
        <Header
          style={{
            backgroundColor: "#ffff",
            color: "#522524",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "left", gap: 10 }}>
            <Button style={buttonStyle} onClick={() => navigate("/dash")}>لوحة التحكم الإدارية</Button>
            <Button style={buttonStyle} onClick={() => navigate("/form1")}>إدارة الاستبيان</Button>
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

        <Content style={{ padding: 20 }}>
          <Row><Ai /></Row>
          <Row gutter={[16, 16]} style={{ marginBottom: 30 }}>
            {cards.map((card, i) => (
              <Col xs={24} sm={12} md={6} key={i}>
                <Card hoverable className="custom-card">
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    {card.icon}
                    <div>
                      <h3>{card.title}</h3>
                      <p>{card.description}</p>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          <Space style={{ marginBottom: 20 }} wrap>
            <Button
              onClick={activeTable === "table1" ? fetchData1 : fetchData2}
              style={buttonStyle}
              icon={<ReloadOutlined />}
            />

            <Button
              style={{
                backgroundColor: activeTable === "table1" ? "#ffffff" : "#522524",
                color: activeTable === "table1" ? "#522524" : "#ffffff",
                border: "1px solid #522524",
              }}
              onClick={() => switchTable("table1")}
            >
              بيانات المتدربين
            </Button>

            <Button
              style={{
                backgroundColor: activeTable === "table2" ? "#ffffff" : "#522524",
                color: activeTable === "table2" ? "#522524" : "#ffffff",
                border: "1px solid #522524",
              }}
              onClick={() => switchTable("table2")}
            >
              بيانات المدربين
            </Button>

            <Search
              placeholder="بحث بالاسم أو الرقم"
              allowClear
              onSearch={val => applyFilters(val)}
              value={searchText}
              onChange={e => applyFilters(e.target.value)}
              style={{ width: 200 }}
            />

            <Select placeholder="اختر المهنة" style={{ width: 180 }} allowClear onChange={(v) => applyFilters(searchText, v)}>
              {professions.map((job, i) => <Option key={i} value={job}>{job}</Option>)}
            </Select>

            <Select placeholder="اختر المعهد" style={{ width: 180 }} allowClear onChange={(v) => applyFilters(searchText, selectedJob, v)}>
              {Institute.map((c, i) => <Option key={i} value={c}>{c}</Option>)}
            </Select>

            <Select placeholder="اختر حالة الاستبيان" style={{ width: 180 }} allowClear onChange={(v) => applyFilters(searchText, selectedJob, selectedCenter, v)}>
              {surveyStatus.map((s, i) => <Option key={i} value={s}>{s}</Option>)}
            </Select>

            <Text strong>عدد السجلات: {filteredData.length}</Text>

            {/* أزرار تصدير واستيراد */}
            <Button
              style={{
                backgroundColor: exportActive ? "#ffffff" : "#522524",
                color: exportActive ? "#522524" : "#ffffff",
                border: "1px solid #522524",
              }}
              onClick={() => {
                setExportActive(true);
                setImportActive(false);
                alert("Export clicked");
              }}
            >
              تصدير
            </Button>

            <Button
              style={{
                backgroundColor: importActive ? "#ffffff" : "#522524",
                color: importActive ? "#522524" : "#ffffff",
                border: "1px solid #522524",
              }}
              onClick={() => {
                setExportActive(false);
                setImportActive(true);
                alert("Import clicked");
              }}
            >
              استيراد
            </Button>
          </Space>

          {loading ? <Spin size="large" /> :
            <Table dataSource={filteredData} columns={activeTable === "table1" ? columns1 : columns2} />}
        </Content>

        <Footer style={{ textAlign: "center" }}>
          Dashboard ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
}