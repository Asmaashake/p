import React from "react";
import { Table, Spin } from "antd";

export default function DataTable({ loading, filteredData, columns }) {
return loading ? <Spin size="large" /> : <Table dataSource={filteredData} columns={columns} />;
}
