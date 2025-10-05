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
import Ai from './component/Ai';

// تعريف البطاقات مع نوعها (percentage أو number)
 const cards = [
    { icon:<UserOutlined style={{fontSize:30,color:"#522524"}}/>, title:"معدل استجابة المدربين", description:"60%" },
    { icon:<UserOutlined style={{fontSize:30,color:"#522524"}}/>, title:"معدل استجابة المتدربين ", description:"40%"},
    { icon:<UserOutlined style={{fontSize:30,color:"#522524"}}/>, title:"اجمالي المدربين", description:"20"},
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
  const [selectedSurveyStatus, setSelectedSurveyStatus] = useState(null);

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
          phone:"9627"+Math.floor(10000000+Math.random()*90000000),
          id:"32",
          email: u.email,
          city: u.address.city,
          job: professions[Math.floor(Math.random() * professions.length)], // توزيع عشوائي
          trainingCenter: Institute[Math.floor(Math.random() * Institute.length)],
          surveyStatus: Math.random() > 0.5 ? "مكتمل":"غير مكتمل",
          
        }));
          console.log("ارقام الهواتف", formatted.map(f => f.phone));

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
          phone:"9627"+Math.floor(10000000+Math.random()*90000000),
          body: p.body,
          email: "example@mail.com",
          job: professions[Math.floor(Math.random() * professions.length)],
          city: "عمان",
          trainingCenter: Institute[Math.floor(Math.random() * Institute.length)],
                    surveyStatus: Math.random() > 0.5 ? "مكتمل":"غير مكتمل",

          
        }));
                  console.log("ارقام الهواتف", formatted.map(f => f.phone));
        setData2(formatted);
        if (activeTable === "table2") setFilteredData(formatted);
        setLoading(false);
      }).catch(() => setLoading(false));
  };

  useEffect(() => {
  setFilteredData(activeTable === "table1" ? data1 : data2);
}, [activeTable, data1, data2]);


  const applyFilters = (
  value = searchText, 
  job = selectedJob, 
  center = selectedCenter,
  surveyStatus = selectedSurveyStatus
) => {
  let filtered = activeTable === "table1" ? data1 : data2;

  // فلتر البحث
  if (value) {
    filtered = filtered.filter(item => {
      if (activeTable === "table1") {
        return item.name.toLowerCase().includes(value.toLowerCase()) ||
               item.phone.includes(value);
      } else {
        return (item.title && item.title.toLowerCase().includes(value.toLowerCase())) ||
               (item.phone && item.phone.includes(value));
      }
    });
  }

  // فلتر المهنة
  if (job) {
    filtered = filtered.filter(item => item.job === job);
  }

  // فلتر المعهد
  if (center) {
    filtered = filtered.filter(item => item.trainingCenter === center);
  }

  // فلتر حالة الاستبيان
  if (surveyStatus) {
    filtered = filtered.filter(item => item.surveyStatus === surveyStatus);
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
    {title: "رقم الهاتف", dataIndex: "phone", key: "phone" },
    {title: "رقم الدفعة", dataIndex: "id", key: "id" },
    { title: "الايميل", dataIndex: "email", key: "email" },
    { title: "المهنة", dataIndex: "job", key: "job" },
    { title: "المعهد", dataIndex: "trainingCenter", key: "trainingCenter" },
    { 
    title: "حالة الاستبيان", 
    dataIndex: "surveyStatus", 
    key: "surveyStatus",
    render: (status) => status || "غير محدد"
  }
  ];

  const columns2 = [
    { title: "الاسم ", dataIndex: "title", key: "title" },
    { title: "العمل", dataIndex: "body", key: "body" },
    { title: "الايميل", dataIndex: "email", key: "email" },
    {title: "رقم الهاتف", dataIndex: "phone", key: "phone" },
    { title: "المهنة", dataIndex: "job", key: "job" },
    { title: "المنطقة", dataIndex: "city", key: "city" },
    { title: "المعهد", dataIndex: "trainingCenter", key: "trainingCenter" },
    { 
    title: "حالة الاستبيان", 
    dataIndex: "surveyStatus", 
    key: "surveyStatus",
    render: (status) => status || "غير محدد"
  }
  ];

  const switchTable = (table) => {
  setActiveTable(table);
  setSearchText("");
  setSelectedJob(null);
  setSelectedCenter(null);
};


  return (
    <Layout style={{  }}>
    <Sider
  width={300}  // مثال: 300px
  className="custom-sider"
  style={{ textAlign: "center", fontSize: 18, fontWeight: "bold", backgroundColor: "#522524" }}
>

        <span style={{ color: "#4abb33ff" }}>National</span>{" "}
        <span style={{ color: "#b4513fff" }}> Employment </span>{" "}
        <span style={{ color: "#ddcc32ff" }}> &training</span>
        <hr/>
        
        <span style={{ color: "#ffffffff" }}>Chat Ai </span>{" "}
        <Ai />
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
        <Content style={{ margin: "1px" }}>
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
  placeholder="البحث من خلال الاسم أو الرقم"
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
              <Select
  placeholder="اختر حالة الاستبيان"
  style={{ width: 180 }}
  allowClear
  value={selectedSurveyStatus}
  onChange={(value) => {
    setSelectedSurveyStatus(value);
    applyFilters(searchText, selectedJob, selectedCenter, value);
  }}
>
  <Option value="مكتمل">مكتمل</Option>
  <Option value="غير مكتمل">غير مكتمل</Option>
</Select>

              {/* عدد السجلات */}
              <Text strong>عدد السجلات: {filteredData.length}</Text>
            
          <Button type="default" className="custom-btn"
            onClick={() => {
              localStorage.removeItem("isLoggedIn");
              navigate("/form1");
                }}>form1</Button>
              <Button type="default" className="custom-btn"
            onClick={() => {
              localStorage.removeItem("isLoggedIn");
              navigate("/form2");
            }}>form2</Button>
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

