import React from "react";
import { Button, Input, Select, Space, Typography } from "antd";

const { Search } = Input;
const { Option } = Select;
const { Text } = Typography;

export default function FiltersBar({
  professions,
  Institute,
  surveyStatus,
  filters,
  setFilters,
  applyFilters,
  area,
  filteredData,
  exportActive,
  importActive,
  setExportActive,
  setImportActive,
}) {
  const handleChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  return (
    <Space style={{ marginBottom: 20 }} wrap>
      <Search
        placeholder="بحث بالاسم أو الرقم"
        allowClear
        value={filters.search}
        onChange={(e) => handleChange("search", e.target.value)}
        style={{ width: 200 }}
      />

      <Select
        placeholder="اختر المهنة"
        allowClear
        value={filters.job}
        onChange={(val) => handleChange("job", val)}
        style={{ width: 180 }}
      >
        {professions.map((job, i) => <Option key={i} value={job}>{job}</Option>)}
      </Select>
      <Select
        placeholder="اقليم"
        allowClear
        value={filters.area}
        onChange={(val) => handleChange("area", val)}
        style={{ width: 180 }}
      >
        {area.map((area, i) => <Option key={i} value={area}>{area}</Option>)}
      </Select>
      <Select
        placeholder="اختر المعهد"
        allowClear
        value={filters.center}
        onChange={(val) => handleChange("center", val)}
        style={{ width: 180 }}
      >
        {Institute.map((c, i) => <Option key={i} value={c}>{c}</Option>)}
      </Select>

      <Select
        placeholder="اختر حالة الاستبيان"
        allowClear
        value={filters.status}
        onChange={(val) => handleChange("status", val)}
        style={{ width: 180 }}
      >
        {surveyStatus.map((s, i) => <Option key={i} value={s}>{s}</Option>)}
      </Select>

      <Text strong>عدد السجلات: {filteredData.length}</Text>

      <Button
        
        style={{
          backgroundColor:"#522524",color:"#fff",

          border: "1px solid #522524",
        }}
        onClick={() => { setExportActive(true); setImportActive(false); alert("تم التصدير"); }}
      >
        تصدير
      </Button>

      <Button
        style={{
          backgroundColor:"#522524",color:"#fff",
          border: "1px solid #522524",
        }}
        onClick={() => { setExportActive(false); setImportActive(true); alert("تم الاستيراد"); }}
      >
        استيراد
      </Button>
    </Space>
  );
}
