import React, { useEffect, useState } from "react";
import { Layout, Button, Table, Spin, Input, Space, Card, Row, Col } from "antd";
import axios from "axios";
import { UserOutlined, LockOutlined, MailOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;

export default function Dashboard() {
  const navigate = useNavigate();
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [activeTable, setActiveTable] = useState("table1");

  const fetchData1 = () => {
    setLoading(true);
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then(res => {
        const formatted = res.data.map(u => ({
          key: u.id,
          name: u.name,
          email: u.email,
          city: u.address.city
        }));
        setData1(formatted);
        if(activeTable==="table1") setFilteredData(formatted);
        setLoading(false);
      }).catch(()=>setLoading(false));
  };

  const fetchData2 = () => {
    setLoading(true);
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then(res => {
        const formatted = res.data.slice(0,20).map(p=>({
          key: p.id,
          title: p.title,
          body: p.body
        }));
        setData2(formatted);
        if(activeTable==="table2") setFilteredData(formatted);
        setLoading(false);
      }).catch(()=>setLoading(false));
  };

  useEffect(()=>{
    fetchData1();
    fetchData2();
  },[]);

  const onSearch = (value)=>{
    setSearchText(value);
    let filtered = activeTable==="table1"?data1:data2;
    filtered = filtered.filter(item =>
      activeTable==="table1" ? item.name.toLowerCase().includes(value.toLowerCase()) 
      : item.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const columns1 = [
    { title: "الاسم ", dataIndex: "name", key: "name" },
    { title: "الايميل", dataIndex: "email", key: "email" },
    { title: "المهنة", dataIndex: "city", key: "city" },
  ];

  const columns2 = [
    { title: "الاسم ", dataIndex: "title", key: "title" },
    { title: "العمل", dataIndex: "body", key: "body" },
  ];

  const switchTable = (table)=>{
    setActiveTable(table);
    setFilteredData(table==="table1"?data1:data2);
    setSearchText("");
  };

  const cards = [
    { icon:<UserOutlined style={{fontSize:30,color:"#522524"}}/>, title:"معدل استجابة المدربين", description:"20%"},
    { icon:<UserOutlined style={{fontSize:30,color:"#522524"}}/>, title:"معدل استجابة المتدربين ", description:"40%"},
    { icon:<InfoCircleOutlined style={{fontSize:30,color:"#522524"}}/>, title:"اجمالي المدربين", description:"4"},
    { icon:<InfoCircleOutlined style={{fontSize:30,color:"#522524"}}/>, title:"اجمالي المتدربين", description:"5"}
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider className="custom-sider">الوطنية للتدريب والتشغيل </Sider>

      <Layout>
        <Header className="custom-header">
          <h2>لوحة التحكم الادارية</h2>
         <Button 
  type="default" 
  className="custom-btn-default" 
  onClick={() => {
    localStorage.removeItem("isLoggedIn"); // لو بدك يمسح جلسة الدخول
    navigate("/"); // ← يرجع على login
  }}
>
  العودة
</Button>

        </Header>

        <Content style={{ margin:"20px" }}>
          <div style={{ padding:24, minHeight:360, background:"#fff" }}>
            
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

            <Space style={{ marginBottom:20 }} className="custom-search">
              <Button className="custom-btn" type={activeTable==="table1"?"primary":"default"} onClick={()=>switchTable("table1")}>بيانات المتدربين</Button>
              <Button className="custom-btn" type={activeTable==="table2"?"primary":"default"} onClick={()=>switchTable("table2")}>بيانات المتدربين</Button>
              <Button onClick={activeTable==="table1"?fetchData1:fetchData2} className="custom-btn">اعادة تحميل البيانات</Button>
              <Search
                placeholder={activeTable==="table1"?"البحث من خلال الاسم":"البحث من خلال الاسم"}
                allowClear
                onSearch={onSearch}
                value={searchText}
                onChange={e=>onSearch(e.target.value)}
                style={{ width:200 }}
              />
            </Space>

            {loading ? <Spin size="large" /> : <Table dataSource={filteredData} columns={activeTable==="table1"?columns1:columns2} />}
          </div>
        </Content>

        <Footer style={{ textAlign:"center", fontFamily:"AnNahar" }}>Dashboard ©{new Date().getFullYear()}</Footer>
      </Layout>
    </Layout>
  );
}
