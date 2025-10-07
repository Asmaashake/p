import React, { useState } from "react";
import { Button, Space, Card } from "antd";
import TraineesTable from "./TraineesTable";
import TrainersTable from "./TrainersTable";

const TablesSwitcher = () => {
  const [activeTable, setActiveTable] = useState("trainees");

  return (
    <Card
      title="عرض الجداول"
      style={{ direction: "rtl", textAlign: "right", marginTop: 20 }}
    >
      <Space style={{ marginBottom: 16 }}>
        <Button
          type={activeTable === "trainees" ? "primary" : "default"}
          onClick={() => setActiveTable("trainees")}
        >
          المتدربين
        </Button>

        <Button
          type={activeTable === "trainers" ? "primary" : "default"}
          onClick={() => setActiveTable("trainers")}
        >
          المدربين
        </Button>
      </Space>

      {activeTable === "trainees" && <TraineesTable />}
      {activeTable === "trainers" && <TrainersTable />}
    </Card>
  );
};

export default TablesSwitcher;
