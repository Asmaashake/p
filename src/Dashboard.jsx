import React, { useState, useEffect } from "react";
import apiClient from "./api/config";
import { Layout, Row, Button } from "antd";
import { ReloadOutlined, UserOutlined } from "@ant-design/icons";
import HeaderBar1 from "./component/HeaderBar1";
import Ai from "./component/Ai";
import StatsCards from "./component/StatsCards";
import FiltersBar from "./component/FiltersBar";
import DataTable from "./component/DataTable";
import DashboardFooter from "./component/DashboardFooter";
import TraineesTable from "./component/TraineesTable";
import TrainersTable from "./component/TrainersTable";

const { Content } = Layout;

// بيانات ثابتة
const gender = ["ذكر", "أنثى"];
const surveyStatus = ["مكتمل", "غير مكتمل", "جزئي"];
const Institute = [
  "الحسينية",
  "معهد الجفر",
  "معهد الرمثا",
  "معهد الريشة",
  "معهد الزرقاء",
  "معهد الطفيلة",
  "معهد العقبة",
  "معهد الكرك",
  "معهد الكورة",
  "معهد الموقر",
  "معهد جرش",
  "معهد ذيبان",
  "معهد عجلون",
  "معهد مادبا",
  "معهد ماركا",
  "معهد معان",
  "معهد السرحان",
  "العقبة/القويرة",
  "رحاب",
  "الصفاوي",
  "مركز العقبة (HUB)",
  "الرويشد",
  "مشغل قرا بني هاشم",
];
const professions = [
  "إدارة تزويد مأمور",
  "التمديدات الصحية",
  "تكييف وتبريد",
  "حداد ألمنيوم",
  "حداد فاصلون",
  "دهان أثاث خشبي",
  "دهان مباني / مجهز ديكورات جبسية",
  "فني آلات صناعية",
  "كهربائي تمديدات منزلي وتحكم",
  "كهربائي سيارات",
  "نجار أثاث",
  "ميكانيك مركبات خفيفة",
];
const area = ["شمال", "جنوب", "شرق", "غرب"];

export default function Dashboard() {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTable, setActiveTable] = useState("table1");
  const [filters, setFilters] = useState({
    search: "",
    job: null,
    center: null,
    status: null,
    area: null,
  });

  const [traineesCount, setTraineesCount] = useState(0);
  const [trainersCount, setTrainersCount] = useState(0);

  // جلب بيانات المتدربين
  const fetchData1 = () => {
    setLoading(true);
    apiClient
      .get("/api/admin/get-users")
      .then((res) => {
        const formatted = res.data.map((u, index) => ({
          key: u.nationalId,
          name: `${u.firstName} ${u.lastName}`,
          id: u.nationalId,
          phone: u.phone || "غير محدد",
          age: Math.floor(Math.random() * 15) + 18, // Random age for demo
          area: u.region || "غير محدد",
          gender: u.gender === "M" ? "ذكر" : "أنثى",
          trainingCenter: u.institute || "غير محدد",
          job: u.profession || "غير محدد",
          surveyStatus: u.surveyCompletionStatus || "غير مكتمل",
        }));
        setData1(formatted);
        if (activeTable === "table1") setFilteredData(formatted);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  };

  // جلب بيانات المدربين
  const fetchData2 = () => {
    setLoading(true);
    apiClient
      .get("/api/admin/get-trainers")
      .then((res) => {
        const formatted = res.data.map((p, index) => ({
          key: p.nationalId,
          name: `${p.firstName} ${p.lastName}`,
          id: p.nationalId,
          phone: p.phone || "غير محدد",
          age: Math.floor(Math.random() * 15) + 25, // Random age for demo
          area: p.region || "غير محدد",
          gender: p.gender === "M" ? "ذكر" : "أنثى",
          trainingCenter: p.institute || "غير محدد",
          job: p.profession || "غير محدد",
          surveyStatus: p.surveyCompletionStatus || "غير مكتمل",
        }));
        setData2(formatted);
        if (activeTable === "table2") setFilteredData(formatted);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching trainers:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData1();
    fetchData2();
  }, []);

  // تحديث الأعداد بعد تطبيق الفلاتر
  useEffect(() => {
    if (activeTable === "table1") setTraineesCount(filteredData.length);
    if (activeTable === "table2") setTrainersCount(filteredData.length);
  }, [filteredData, activeTable]);

  const applyFilters = ({ search, job, center, status, area: areaFilter }) => {
    let data = activeTable === "table1" ? data1 : data2;

    if (search && search.trim() !== "") {
      data = data.filter(
        (d) =>
          d.name?.toLowerCase().includes(search.toLowerCase()) ||
          d.phone.includes(search)
      );
    }
    if (job && job !== "الكل") data = data.filter((d) => d.job === job);
    if (areaFilter && areaFilter !== "الكل")
      data = data.filter((d) => d.area === areaFilter);
    if (center && center !== "الكل")
      data = data.filter((d) => d.trainingCenter === center);
    if (status && status !== "الكل")
      data = data.filter((d) => d.surveyStatus === status);

    setFilteredData(data);
  };

  const switchTable = (table) => {
    setActiveTable(table);
    setFilters({
      search: "",
      job: null,
      center: null,
      status: null,
      area: null,
    });
    setFilteredData(table === "table1" ? data1 : data2);
  };

  const columns1 = [
    { title: "الاسم", dataIndex: "name", key: "name" },
    { title: "رقم الهاتف", dataIndex: "phone", key: "phone" },
    { title: "العمر", dataIndex: "age", key: "age" },
    { title: "اقليم", dataIndex: "area", key: "area" },
    { title: "النوع", dataIndex: "gender", key: "gender" },
    { title: "المهنة", dataIndex: "job", key: "job" },
    { title: "المعهد", dataIndex: "trainingCenter", key: "trainingCenter" },
    {
      title: "حالة الاستبيان",
      dataIndex: "surveyStatus",
      key: "surveyStatus",
      render: (status) => {
        const color =
          status === "مكتمل" ? "green" : status === "جزئي" ? "gold" : "red";
        return (
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: color,
              }}
            />
            {status}
          </span>
        );
      },
    },
  ];

  const columns2 = columns1; // نفس الأعمدة تقريبًا للمدربين

  const cards = [
    {
      icon: <UserOutlined style={{ fontSize: 30, color: "#522524" }} />,
      title: "عدد المتدربين",
      description: traineesCount,
    },
    {
      icon: <UserOutlined style={{ fontSize: 30, color: "#522524" }} />,
      title: "عدد المدربين",
      description: trainersCount,
    },
    {
      icon: <UserOutlined style={{ fontSize: 30, color: "#522524" }} />,
      title: "معدل استجابة المتدربين",
      description: `${
        traineesCount
          ? Math.round(
              (data1.filter((d) => d.surveyStatus === "مكتمل").length /
                traineesCount) *
                100
            )
          : 0
      }%`,
    },
    {
      icon: <UserOutlined style={{ fontSize: 30, color: "#522524" }} />,
      title: "معدل استجابة المدربين",
      description: `${
        trainersCount
          ? Math.round(
              (data2.filter((d) => d.surveyStatus === "مكتمل").length /
                trainersCount) *
                100
            )
          : 0
      }%`,
    },
  ];

  return (
    <Layout style={{ textAlign: "right", direction: "rtl" }}>
      <HeaderBar1 />
      <Content style={{ padding: 20 }}>
        <Row>
          <Ai />
        </Row>
        <StatsCards cards={cards} />

        <div style={{ marginBottom: 16 }}>
          <Button
            style={{ marginRight: 8 }}
            onClick={() => switchTable("table1")}
          >
            <TrainersTable />
          </Button>
          <Button
            style={{ marginRight: 8 }}
            onClick={() => switchTable("table2")}
          >
            <TraineesTable />
          </Button>
          <Button
            style={{ marginRight: 8 }}
            icon={<ReloadOutlined />}
            onClick={activeTable === "table1" ? fetchData1 : fetchData2}
          />
        </div>

        <FiltersBar
          professions={professions}
          Institute={Institute}
          surveyStatus={surveyStatus}
          filters={filters}
          setFilters={setFilters}
          applyFilters={applyFilters}
          filteredData={filteredData}
          area={area}
          tableType={activeTable === "table1" ? "users" : "users"}
        />

        <DataTable
          loading={loading}
          filteredData={filteredData}
          columns={activeTable === "table1" ? columns1 : columns2}
          scroll={{ x: 1200, y: 400 }} // تمرير أفقي وعمودي
          footer={() => `عدد السجلات: ${filteredData.length}`}
        />
      </Content>
      <DashboardFooter />
    </Layout>
  );
}
