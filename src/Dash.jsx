import React, { useEffect, useState } from "react";
import { Layout, Button, Table, Spin, Input, Space, Card, Row, Col, Select, Typography } from "antd";
import axios from "axios";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import './AppStyles.css';
const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;
const { Option } = Select;
const { Text } = Typography;
import { Progress } from "antd";

// تعريف البطاقات مع نوعها (percentage أو number)
 const cards = [
    { icon:<UserOutlined style={{fontSize:30,color:"#522524"}}/>, title:"معدل استجابة المدربين", description:"20%" },
    { icon:<UserOutlined style={{fontSize:30,color:"#522524"}}/>, title:"معدل استجابة المتدربين ", description:"40%"},
    { icon:<UserOutlined style={{fontSize:30,color:"#522524"}}/>, title:"اجمالي المدربين", description:"4"},
    { icon:<UserOutlined style={{fontSize:30,color:"#522524"}}/>, title:"اجمالي المتدربين", description:"10"}
  ];


const Institute = [
  "الحسينية","معهد الجفر","معهد الرمثا","معهد الريشة","معهد الزرقاء","معهد الطفيلة",
  "معهد العقبة","معهد الكرك","معهد الكورة","معهد الموقر","معهد جرش","معهد ذيبان",
  "معهد عجلون","معهد مادبا","معهد ماركا","معهد معان","معهد السرحان","العقبه/القويرة",
  "رحاب","الصفاوي","مركز العقبة (HUB)","الرويشد","مشغل قرا بني هاشم"
];

const professions = [
  "إدارة تزويد مأمور","التمديدات الصحية","تكييف وتبريد","حداد ألمنيوم","حداد فاصلون",
  "دهان اثاث خشبي","دهان مباني / مجهز ديكورات جبسية","فني آلات صناعية","قصير , مركب قواطع جبس",
  "كهربائي تمديدات منزلي وتحكم","كهربائي سيارات","لحام أنابيب","مركب خلايا طاقة شمسية",
  "نجار أثاث","نجار طوبار , حداد تسليح","خياط نسائي","حلاق نسائي","بستنة عامة",
  "خضراوات محمية","تسويق الكتروني","ميكانيك مركبات خفيفة"
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [activeTable, setActiveTable] = useState("table1");
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedCenter, setSelectedCenter] = useState(null);

  const fetchData1 = () => {
    setLoading(true);
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then(res => {
        const formatted = res.data.map(u => ({
          key: u.id,
          name: u.name,
          email: u.email,
          city: u.address.city,
          job: professions[Math.floor(Math.random() * professions.length)], // توزيع عشوائي
          trainingCenter: Institute[Math.floor(Math.random() * Institute.length)]
        }));
        setData1(formatted);
        if (activeTable === "table1") setFilteredData(formatted);
        setLoading(false);
      }).catch(() => setLoading(false));
  };

  const fetchData2 = () => {
    setLoading(true);
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then(res => {
        const formatted = res.data.slice(0, 20).map(p => ({
          key: p.id,
          title: p.title,
          body: p.body,
          email: "example@mail.com",
          job: professions[Math.floor(Math.random() * professions.length)],
          city: "عمان",
          trainingCenter: Institute[Math.floor(Math.random() * Institute.length)]
        }));
        setData2(formatted);
        if (activeTable === "table2") setFilteredData(formatted);
        setLoading(false);
      }).catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchData1();
    fetchData2();
  }, []);

  const applyFilters = (value = searchText, job = selectedJob, center = selectedCenter) => {
    let filtered = activeTable === "table1" ? data1 : data2;

    // Search filter
    filtered = filtered.filter(item =>
      activeTable === "table1"
        ? item.name.toLowerCase().includes(value.toLowerCase())
        : item.title.toLowerCase().includes(value.toLowerCase())
    );

    // Job filter
    if (job) {
      filtered = filtered.filter(item => item.job === job);
    }

    // Training center filter
    if (center) {
      filtered = filtered.filter(item => item.trainingCenter === center);
    }

    setFilteredData(filtered);
  };

  const onSearch = (value) => {
    setSearchText(value);
    applyFilters(value, selectedJob, selectedCenter);
  };

  const onJobChange = (value) => {
    setSelectedJob(value);
    applyFilters(searchText, value, selectedCenter);
  };

  const onCenterChange = (value) => {
    setSelectedCenter(value);
    applyFilters(searchText, selectedJob, value);
  };

  const columns1 = [
    { title: "الاسم ", dataIndex: "name", key: "name" },
    { title: "الايميل", dataIndex: "email", key: "email" },
    { title: "المنطقة ", dataIndex: "city", key: "city" },
    { title: "المهنة", dataIndex: "job", key: "job" },
    { title: "المعهد", dataIndex: "trainingCenter", key: "trainingCenter" }
  ];

  const columns2 = [
    { title: "الاسم ", dataIndex: "title", key: "title" },
    { title: "العمل", dataIndex: "body", key: "body" },
    { title: "الايميل", dataIndex: "email", key: "email" },
    { title: "المهنة", dataIndex: "job", key: "job" },
    { title: "المنطقة", dataIndex: "city", key: "city" },
    { title: "المعهد", dataIndex: "trainingCenter", key: "trainingCenter" }
  ];

  const switchTable = (table) => {
    setActiveTable(table);
    setFilteredData(table === "table1" ? data1 : data2);
    setSearchText("");
    setSelectedJob(null);
    setSelectedCenter(null);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
    <Sider className="custom-sider" style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}>
        <span style={{ color: "#16a82aff" }}>الوطنية</span>{" "}
        <span style={{ color: "#c57978ff" }}> للتشغيل</span>{" "}
      <span style={{ color: "#f6fa16ff" }}>والتدريب</span>
      </Sider>
      <Layout>
        <Header className="custom-header">
          <h2>لوحة التحكم الادارية</h2>
          <Button type="default" className="custom-btn-default"
            onClick={() => {
              localStorage.removeItem("isLoggedIn");
              navigate("/");
            }}>العودة</Button>
          
      
        </Header>
        {/* Cards */}
          
          <Row gutter={[16,16]} style={{ marginBottom:30 }}>
              {cards.map((card,i)=>(
                <Col xs={24} sm={12} md={6} key={i}>
                  <Card hoverable className="custom-card">
                    <div style={{ display:"flex", alignItems:"center", gap:16 }}>
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
        
        <Content style={{ margin: "20px" }}>
          <div style={{ padding: 24, minHeight: 360, background: "#fff" }}>

            <Space style={{ marginBottom: 20 }} wrap className="custom-search">
              <Button className="custom-btn"
                type={activeTable === "table1" ? "primary" : "default"}
                onClick={() => switchTable("table1")}>بيانات المتدربين</Button>
              <Button className="custom-btn"
                type={activeTable === "table2" ? "primary" : "default"}
                onClick={() => switchTable("table2")}>بيانات المدربين</Button>
              <Button onClick={activeTable === "table1" ? fetchData1 : fetchData2} className="custom-btn">اعادة تحميل البيانات</Button>

              {/* Search */}
              <Search
                placeholder={activeTable === "table1" ? "البحث من خلال الاسم" : "البحث من خلال الاسم"}
                allowClear
                onSearch={onSearch}
                value={searchText}
                onChange={e => onSearch(e.target.value)}
                style={{ width: 200 }}
              />

              {/* Select - المهنة */}
              <Select
                placeholder="اختر المهنة"
                style={{ width: 180 }}
                allowClear
                value={selectedJob}
                onChange={onJobChange}
              >
                {professions.map((job, i) => (
                  <Option key={i} value={job}>{job}</Option>
                ))}
              </Select>

              {/* Select - المعهد */}
              <Select
                placeholder="اختر المعهد"
                style={{ width: 200 }}
                allowClear
                value={selectedCenter}
                onChange={onCenterChange}
              >
                {Institute.map((inst, i) => (
                  <Option key={i} value={inst}>{inst}</Option>
                ))}
              </Select>

              {/* عدد السجلات */}
              <Text strong>عدد السجلات: {filteredData.length}</Text>
            </Space>

            {loading ? <Spin size="large" /> : <Table dataSource={filteredData} columns={activeTable === "table1" ? columns1 : columns2} />}
          </div>
        </Content>

        <Footer style={{ textAlign: "center", fontFamily: "AnNahar" }}>
          Dashboard ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
}

