import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout, Row, Button } from "antd";
import { ReloadOutlined, UserOutlined } from "@ant-design/icons";
import HeaderBar1 from "./component/HeaderBar1";
import Ai from "./component/Ai";
import StatsCards from "./component/StatsCards";
import FiltersBar from "./component/FiltersBar";
import DataTable from "./component/DataTable";
import DashboardFooter from "./component/DashboardFooter";
import TraineesTable from "./component/TrainersTable";
import TrainersTable from "./component/TraineesTable";

const { Content } = Layout;

// بيانات ثابتة
const gender = ["ذكر", "أنثى"];
const surveyStatus = ["مكتمل", "غير مكتمل", "جزئي"];
const Institute = [
  "الحسينية","معهد الجفر","معهد الرمثا","معهد الريشة","معهد الزرقاء","معهد الطفيلة",
  "معهد العقبة","معهد الكرك","معهد الكورة","معهد الموقر","معهد جرش","معهد ذيبان",
  "معهد عجلون","معهد مادبا","معهد ماركا","معهد معان","معهد السرحان","العقبة/القويرة",
  "رحاب","الصفاوي","مركز العقبة (HUB)","الرويشد","مشغل قرا بني هاشم"
];
const professions = [
  "إدارة تزويد مأمور","التمديدات الصحية","تكييف وتبريد","حداد ألمنيوم","حداد فاصلون",
  "دهان أثاث خشبي","دهان مباني / مجهز ديكورات جبسية","فني آلات صناعية",
  "كهربائي تمديدات منزلي وتحكم","كهربائي سيارات","نجار أثاث","ميكانيك مركبات خفيفة"
];
const area = ["شمال", "جنوب", "شرق", "غرب"];

const cards = [
  { icon: <UserOutlined style={{ fontSize: 30, color: "#522524" }} />, title: "معدل استجابة المدربين", description: "60%" },
  { icon: <UserOutlined style={{ fontSize: 30, color: "#522524" }} />, title: "معدل استجابة المتدربين", description: "40%" },
  { icon: <UserOutlined style={{ fontSize: 30, color: "#522524" }} />, title: "إجمالي المدربين", description: "20" },
  { icon: <UserOutlined style={{ fontSize: 30, color: "#522524" }} />, title: "إجمالي المتدربين", description: "10" }
];

export default function Dashboard() {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTable, setActiveTable] = useState("table1");
  const [filters, setFilters] = useState({ search: "", job: null, center: null, status: null, area: null });
  const [exportActive, setExportActive] = useState(false);
  const [importActive, setImportActive] = useState(false);

  const fetchData1 = () => {
    setLoading(true);
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then(res => {
        const formatted = res.data.map(u => ({
          key: u.id,
          name: u.name,
          id: "32",
          phone: "962" + Math.floor(10000000 + Math.random() * 90000000),
          age: u.id + 18,
          area: area[Math.floor(Math.random() * area.length)],
          gender: gender[Math.floor(Math.random() * gender.length)],
          trainingCenter: Institute[Math.floor(Math.random() * Institute.length)],
          job: professions[Math.floor(Math.random() * professions.length)],
          surveyStatus: surveyStatus[Math.floor(Math.random() * surveyStatus.length)],
        }));
        setData1(formatted);
        if (activeTable === "table1") setFilteredData(formatted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const fetchData2 = () => {
    setLoading(true);
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then(res => {
        const formatted = res.data.slice(0, 20).map(p => ({
          key: p.id,
          name: p.title,
          id: "32",
          phone: "962" + Math.floor(10000000 + Math.random() * 90000000),
          age: p.id + 25,
          area: area[Math.floor(Math.random() * area.length)],
          gender: gender[Math.floor(Math.random() * gender.length)],
          trainingCenter: Institute[Math.floor(Math.random() * Institute.length)],
          job: professions[Math.floor(Math.random() * professions.length)],
          surveyStatus: surveyStatus[Math.floor(Math.random() * surveyStatus.length)],
        }));
        setData2(formatted);
        if (activeTable === "table2") setFilteredData(formatted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchData1();
    fetchData2();
  }, []);

  const applyFilters = ({ search, job, center, status, area: areaFilter }) => {
    let data = activeTable === "table1" ? data1 : data2;

    // بحث نصي
    if (search && search.trim() !== "") {
      data = data.filter(d =>
        (d.name?.toLowerCase().includes(search.toLowerCase()) || d.title?.toLowerCase().includes(search.toLowerCase()))
        || d.phone.includes(search)
      );
    }

    // فلترة المهنة
    if (job && job !== "الكل") data = data.filter(d => d.job === job);

    // فلترة الإقليم
    if (areaFilter && areaFilter !== "الكل") data = data.filter(d => d.area === areaFilter);

    // فلترة المركز التدريبي
    if (center && center !== "الكل") data = data.filter(d => d.trainingCenter === center);

    // فلترة حالة الاستبيان
    if (status && status !== "الكل") data = data.filter(d => d.surveyStatus === status);

    setFilteredData(data);
  };

  const switchTable = (table) => {
    setActiveTable(table);
    setFilters({ search: "", job: null, center: null, status: null, area: null });
    setFilteredData(table === "table1" ? data1 : data2);
  };

  const columns1 = [
    { title: "الاسم", dataIndex: "name", key: "name" },
    { title: "رقم الهاتف", dataIndex: "phone", key: "phone" },
    { title: "العمر", dataIndex: "age", key: "age" },
    { title: "رقم الدفعة", dataIndex: "id", key: "id" },
    { title:"اقليم", dataIndex:"area",key:"area" },
    { title: "النوع", dataIndex: "gender", key: "gender" },
    { title: "المهنة", dataIndex: "job", key: "job" },
    { title: "المعهد", dataIndex: "trainingCenter", key: "trainingCenter" },
    { title: "حالة الاستبيان", dataIndex: "surveyStatus", key: "surveyStatus",
      render: status => {
        const color = status === "مكتمل" ? "green" : status === "جزئي" ? "gold" : "red";
        return <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: color }} />
          {status}
        </span>
      }
    }
  ];

  const columns2 = [
    { title: "الاسم", dataIndex: "name", key: "name" },
    { title: "رقم الهاتف", dataIndex: "phone", key: "phone" },
    { title: "العمر", dataIndex: "age", key: "age" },
    { title:"اقليم", dataIndex:"area",key:"area" },
    { title: "النوع", dataIndex: "gender", key: "gender" },
    { title: "المهنة", dataIndex: "job", key: "job" },
    { title: "المعهد", dataIndex: "trainingCenter", key: "trainingCenter" },
    { title: "حالة الاستبيان", dataIndex: "surveyStatus", key: "surveyStatus",
      render: status => {
        const color = status === "مكتمل" ? "green" : status === "جزئي" ? "gold" : "red";
        return <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: color }} />
          {status}
        </span>;
      }
    }
  ];

  return (
    <Layout style={{ textAlign: "right", direction: "rtl" }}>
      <HeaderBar1 />
      <Content style={{ padding: 20 }}>
        <Row><Ai /></Row>
        <StatsCards cards={cards} />

        <div style={{ marginBottom: 16 }}>
          <Button style={{ marginRight: 8 }} onClick={() => switchTable("table1")}><TraineesTable/></Button>
          <Button style={{ marginRight: 8 }} onClick={() => switchTable("table2")}><TrainersTable/></Button>
          <Button style={{ marginRight: 8 }} icon={<ReloadOutlined />} onClick={activeTable === "table1" ? fetchData1 : fetchData2} />
        </div>

        <FiltersBar
          professions={professions}
          Institute={Institute}
          surveyStatus={surveyStatus}
          filters={filters}
          setFilters={setFilters}
          applyFilters={applyFilters}
          filteredData={filteredData}
          exportActive={exportActive}
          area={area}
          importActive={importActive}
          setExportActive={setExportActive}
          setImportActive={setImportActive}
        />

        <DataTable
          loading={loading}
          filteredData={filteredData}
          columns={activeTable === "table1" ? columns1 : columns2}
        
          
        />

      </Content>
      <DashboardFooter />
    </Layout>
  );
}
