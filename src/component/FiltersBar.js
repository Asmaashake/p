import React, { useState } from "react";
import { Button, Input, Select, Space, Typography, Modal, message, Upload, Progress } from "antd";
import { DownloadOutlined, UploadOutlined, FileTextOutlined } from "@ant-design/icons";
import exportImportService from "../api/exportImportService";

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
  tableType = 'users' // Add tableType prop to determine which data to export/import
}) {
  const [exportModalVisible, setExportModalVisible] = useState(false);
  const [importModalVisible, setImportModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const handleExport = async (format) => {
    setLoading(true);
    try {
      let result;
      switch (tableType) {
        case 'users':
          result = await exportImportService.exportUsers(format);
          break;
        case 'institutes':
          result = await exportImportService.exportInstitutes(format);
          break;
        case 'professions':
          result = await exportImportService.exportProfessions(format);
          break;
        case 'survey-responses':
          result = await exportImportService.exportSurveyResponses(format);
          break;
        default:
          result = await exportImportService.exportUsers(format);
      }

      if (result.success) {
        message.success(result.message);
        setExportModalVisible(false);
      } else {
        message.error(result.message);
      }
    } catch (error) {
      message.error('فشل في تصدير البيانات');
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async (file) => {
    const validation = exportImportService.validateFile(file);
    if (!validation.valid) {
      message.error(validation.message);
      return false;
    }

    setLoading(true);
    try {
      let result;
      switch (tableType) {
        case 'users':
          result = await exportImportService.importUsers(file, setUploadProgress);
          break;
        case 'institutes':
          result = await exportImportService.importInstitutes(file, setUploadProgress);
          break;
        default:
          result = await exportImportService.importUsers(file, setUploadProgress);
      }

      if (result.success) {
        message.success(result.message);
        setImportModalVisible(false);
        
        // Show import results
        if (result.results) {
          Modal.info({
            title: 'نتائج الاستيراد',
            content: (
              <div>
                <p>المجموع: {result.results.total}</p>
                <p>المستورد: {result.results.imported}</p>
                <p>المحدث: {result.results.updated}</p>
                {result.results.errors.length > 0 && (
                  <div>
                    <p>أخطاء ({result.results.errors.length}):</p>
                    <ul>
                      {result.results.errors.slice(0, 5).map((error, index) => (
                        <li key={index}>السطر {error.row}: {error.message}</li>
                      ))}
                    </ul>
                    {result.results.errors.length > 5 && <p>... والمزيد</p>}
                  </div>
                )}
              </div>
            ),
          });
        }
        
        // Reload page to show updated data
        window.location.reload();
      } else {
        message.error(result.message);
      }
    } catch (error) {
      message.error('فشل في استيراد البيانات');
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const downloadTemplate = () => {
    const result = exportImportService.getSampleTemplate(tableType);
    if (result.success) {
      message.success(result.message);
    }
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
        icon={<DownloadOutlined />}
        style={{
          backgroundColor:"#522524",
          color:"#fff",
          border: "1px solid #522524",
        }}
        onClick={() => setExportModalVisible(true)}
        loading={loading}
      >
        تصدير
      </Button>

      <Button
        icon={<UploadOutlined />}
        style={{
          backgroundColor:"#522524",
          color:"#fff",
          border: "1px solid #522524",
        }}
        onClick={() => setImportModalVisible(true)}
        loading={loading}
      >
        استيراد
      </Button>

      {/* Export Modal */}
      <Modal
        title="تصدير البيانات"
        open={exportModalVisible}
        onCancel={() => setExportModalVisible(false)}
        footer={null}
        width={400}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <p>اختر تنسيق التصدير:</p>
          <Button 
            block 
            onClick={() => handleExport('csv')}
            loading={loading}
            icon={<FileTextOutlined />}
          >
            تصدير كـ CSV
          </Button>
          <Button 
            block 
            onClick={() => handleExport('excel')}
            loading={loading}
            icon={<FileTextOutlined />}
          >
            تصدير كـ Excel
          </Button>
        </Space>
      </Modal>

      {/* Import Modal */}
      <Modal
        title="استيراد البيانات"
        open={importModalVisible}
        onCancel={() => setImportModalVisible(false)}
        footer={null}
        width={500}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <p>اختر ملف CSV أو Excel لاستيراد البيانات:</p>
            <Button 
              onClick={downloadTemplate} 
              type="dashed" 
              icon={<DownloadOutlined />}
              style={{ marginBottom: 16 }}
            >
              تحميل قالب نموذجي
            </Button>
          </div>
          
          {uploadProgress > 0 && (
            <Progress percent={uploadProgress} status={loading ? "active" : "success"} />
          )}
          
          <Upload.Dragger
            name="file"
            multiple={false}
            accept=".csv,.xlsx,.xls"
            beforeUpload={(file) => {
              handleImport(file);
              return false; // Prevent default upload
            }}
            showUploadList={false}
            disabled={loading}
          >
            <p className="ant-upload-drag-icon">
              <UploadOutlined />
            </p>
            <p className="ant-upload-text">اضغط أو اسحب الملف هنا للتحميل</p>
            <p className="ant-upload-hint">
              يدعم ملفات CSV و Excel فقط (حد أقصى 10MB)
            </p>
          </Upload.Dragger>
        </Space>
      </Modal>
    </Space>
  );
}
