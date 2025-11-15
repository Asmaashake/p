import React, { useState, useEffect } from 'react';
import {
  Table,
  Card,
  Row,
  Col,
  Select,
  Input,
  Button,
  Modal,
  Tag,
  Drawer,
  Space,
  Divider,
  Progress,
  Typography,
  Collapse,
  Statistic,
  message,
  Spin
} from 'antd';
import {
  EyeOutlined,
  ReloadOutlined,
  SearchOutlined,
  BarChartOutlined,
  UserOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import apiClient from '../api/config';

const { Option } = Select;
const { Search } = Input;
const { Title, Text } = Typography;
const { Panel } = Collapse;

const SurveyResponsesAdmin = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [filters, setFilters] = useState({
    surveyType: null,
    region: null,
    area: null,
    search: ''
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });

  // Modal and drawer states
  const [detailDrawerVisible, setDetailDrawerVisible] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [statsModalVisible, setStatsModalVisible] = useState(false);

  // Survey type options
  const surveyTypes = [
    { value: 'pre-training', label: 'قبل التدريب' },
    { value: 'post-training', label: 'بعد التدريب' },
    { value: 'trainer-equipment', label: 'تقييم المعدات' },
    { value: 'trainer-students', label: 'تقييم المتدربين' }
  ];

  // Region options
  const regions = ['Central', 'North', 'South'];

  const fetchSurveyResponses = async (page = 1) => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: pagination.pageSize,
        ...filters
      };

      // Remove empty filters
      Object.keys(params).forEach(key => {
        if (!params[key] || params[key] === '') {
          delete params[key];
        }
      });

      const response = await apiClient.get('/api/admin/survey-responses', { params });

      if (response.data.success) {
        setResponses(response.data.data);
        setPagination(prev => ({
          ...prev,
          current: response.data.stats.currentPage,
          total: response.data.stats.totalResponses
        }));
      }
    } catch (error) {
      console.error('Error fetching survey responses:', error);
      message.error('فشل في تحميل ردود الاستبيان');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await apiClient.get('/api/admin/survey-responses/stats');
      if (response.data.success) {
        setStats(response.data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      message.error('فشل في تحميل الإحصائيات');
    }
  };

  const viewResponseDetail = async (record) => {
    setLoading(true);
    try {
      const response = await apiClient.get(
        `/api/admin/survey-responses/${record.nationalId}/${record.surveyType}`
      );
      
      if (response.data.success) {
        setSelectedResponse(response.data.data);
        setDetailDrawerVisible(true);
      }
    } catch (error) {
      console.error('Error fetching response detail:', error);
      message.error('فشل في تحميل تفاصيل الرد');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurveyResponses();
    fetchStats();
  }, []);

  useEffect(() => {
    fetchSurveyResponses(1);
  }, [filters]);

  const handleTableChange = (paginationInfo) => {
    fetchSurveyResponses(paginationInfo.current);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      surveyType: null,
      region: null,
      area: null,
      search: ''
    });
  };

  const columns = [
    {
      title: 'المتدرب',
      key: 'user',
      width: 200,
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 'bold' }}>{record.userInfo?.name}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            {record.userInfo?.nationalId}
          </div>
        </div>
      )
    },
    {
      title: 'نوع الاستبيان',
      dataIndex: 'surveyType',
      key: 'surveyType',
      width: 150,
      render: (surveyType) => {
        const typeConfig = surveyTypes.find(t => t.value === surveyType);
        return (
          <Tag color="blue">
            {typeConfig ? typeConfig.label : surveyType}
          </Tag>
        );
      }
    },
    {
      title: 'المعهد',
      key: 'institute',
      width: 200,
      render: (_, record) => record.userInfo?.institute || 'غير محدد'
    },
    {
      title: 'المهنة',
      key: 'profession',
      width: 150,
      render: (_, record) => record.userInfo?.profession || 'غير محدد'
    },
    {
      title: 'المنطقة',
      key: 'region',
      width: 100,
      render: (_, record) => record.userInfo?.region || 'غير محدد'
    },
    {
      title: 'عدد الإجابات',
      dataIndex: 'answersCount',
      key: 'answersCount',
      width: 120,
      render: (count) => (
        <Tag color={count > 0 ? 'green' : 'red'}>
          {count} إجابة
        </Tag>
      )
    },
    {
      title: 'تاريخ الإرسال',
      dataIndex: 'submittedAt',
      key: 'submittedAt',
      width: 150,
      render: (date) => date ? new Date(date).toLocaleDateString('ar-EG') : 'غير محدد'
    },
    {
      title: 'الإجراءات',
      key: 'actions',
      width: 100,
      fixed: 'right',
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          icon={<EyeOutlined />}
          onClick={() => viewResponseDetail(record)}
        >
          عرض
        </Button>
      )
    }
  ];

  return (
    <div style={{ padding: '20px', direction: 'rtl' }}>
      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        <Col span={24}>
          <Card>
            <Row justify="space-between" align="middle">
              <Col>
                <Title level={3} style={{ margin: 0 }}>
                  <FileTextOutlined style={{ marginLeft: 8 }} />
                  ردود الاستبيان
                </Title>
              </Col>
              <Col>
                <Space>
                  <Button
                    icon={<BarChartOutlined />}
                    onClick={() => setStatsModalVisible(true)}
                  >
                    الإحصائيات
                  </Button>
                  <Button
                    icon={<ReloadOutlined />}
                    onClick={() => fetchSurveyResponses()}
                  >
                    تحديث
                  </Button>
                </Space>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        <Col span={24}>
          <Card title="الفلاتر">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={6}>
                <Search
                  placeholder="البحث بالاسم أو الرقم الوطني"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  style={{ width: '100%' }}
                />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Select
                  placeholder="نوع الاستبيان"
                  value={filters.surveyType}
                  onChange={(value) => handleFilterChange('surveyType', value)}
                  style={{ width: '100%' }}
                  allowClear
                >
                  {surveyTypes.map(type => (
                    <Option key={type.value} value={type.value}>
                      {type.label}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Select
                  placeholder="المنطقة"
                  value={filters.region}
                  onChange={(value) => handleFilterChange('region', value)}
                  style={{ width: '100%' }}
                  allowClear
                >
                  {regions.map(region => (
                    <Option key={region} value={region}>
                      {region}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Button onClick={resetFilters} style={{ width: '100%' }}>
                  إعادة تعيين
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Main Table */}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Table
              columns={columns}
              dataSource={responses}
              loading={loading}
              pagination={{
                ...pagination,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} من ${total} رد`
              }}
              onChange={handleTableChange}
              scroll={{ x: 1200 }}
              rowKey="id"
            />
          </Card>
        </Col>
      </Row>

      {/* Response Detail Drawer */}
      <Drawer
        title={selectedResponse ? `تفاصيل رد ${selectedResponse.userInfo.name}` : ''}
        placement="left"
        width={600}
        open={detailDrawerVisible}
        onClose={() => setDetailDrawerVisible(false)}
      >
        {selectedResponse && (
          <div>
            {/* User Info */}
            <Card title="معلومات المتدرب" size="small" style={{ marginBottom: 16 }}>
              <Row gutter={[16, 8]}>
                <Col span={12}>
                  <Text strong>الاسم:</Text> {selectedResponse.userInfo.name}
                </Col>
                <Col span={12}>
                  <Text strong>الرقم الوطني:</Text> {selectedResponse.userInfo.nationalId}
                </Col>
                <Col span={12}>
                  <Text strong>الهاتف:</Text> {selectedResponse.userInfo.phone}
                </Col>
                <Col span={12}>
                  <Text strong>الجنس:</Text> {selectedResponse.userInfo.gender}
                </Col>
                <Col span={12}>
                  <Text strong>المعهد:</Text> {selectedResponse.userInfo.institute}
                </Col>
                <Col span={12}>
                  <Text strong>المهنة:</Text> {selectedResponse.userInfo.profession}
                </Col>
              </Row>
            </Card>

            {/* Survey Info */}
            <Card title="معلومات الاستبيان" size="small" style={{ marginBottom: 16 }}>
              <Row gutter={[16, 8]}>
                <Col span={12}>
                  <Text strong>نوع الاستبيان:</Text>{' '}
                  <Tag color="blue">
                    {surveyTypes.find(t => t.value === selectedResponse.surveyType)?.label}
                  </Tag>
                </Col>
                <Col span={12}>
                  <Text strong>تاريخ الإرسال:</Text>{' '}
                  {new Date(selectedResponse.submittedAt).toLocaleDateString('ar-EG')}
                </Col>
                <Col span={24} style={{ marginTop: 8 }}>
                  <Text strong>معدل الإكمال:</Text>
                  <Progress
                    percent={selectedResponse.completionRate}
                    status={selectedResponse.completionRate === 100 ? 'success' : 'active'}
                    format={percent => `${percent}%`}
                  />
                  <Text type="secondary">
                    {selectedResponse.answeredQuestions} من {selectedResponse.totalQuestions} سؤال
                  </Text>
                </Col>
              </Row>
            </Card>

            {/* Answers */}
            <Card title="الإجابات التفصيلية" size="small">
              <Collapse>
                {selectedResponse.detailedAnswers && 
                 Object.values(
                   selectedResponse.detailedAnswers.reduce((sections, answer) => {
                     const section = answer.questionSection || 'عام';
                     if (!sections[section]) {
                       sections[section] = [];
                     }
                     sections[section].push(answer);
                     return sections;
                   }, {})
                 ).map((sectionAnswers, index) => {
                   const sectionName = sectionAnswers[0]?.questionSection || 'عام';
                   return (
                     <Panel 
                       key={index}
                       header={`${sectionName} (${sectionAnswers.length} أسئلة)`}
                     >
                       {sectionAnswers.map((answer, answerIndex) => (
                         <div key={answerIndex} style={{ marginBottom: 16 }}>
                           <Text strong>{answer.questionText}</Text>
                           <div style={{ 
                             padding: '8px 12px', 
                             backgroundColor: answer.hasAnswer ? '#f6ffed' : '#fff2e8',
                             border: `1px solid ${answer.hasAnswer ? '#d9f7be' : '#ffbb96'}`,
                             borderRadius: 4,
                             marginTop: 4
                           }}>
                             <Text style={{ 
                               color: answer.hasAnswer ? '#52c41a' : '#fa8c16'
                             }}>
                               {answer.answer}
                             </Text>
                           </div>
                         </div>
                       ))}
                     </Panel>
                   );
                 })
                }
              </Collapse>
            </Card>
          </div>
        )}
      </Drawer>

      {/* Statistics Modal */}
      <Modal
        title="إحصائيات ردود الاستبيان"
        open={statsModalVisible}
        onCancel={() => setStatsModalVisible(false)}
        footer={null}
        width={800}
      >
        {stats && (
          <div>
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
              <Col span={8}>
                <Statistic
                  title="إجمالي المستخدمين"
                  value={stats.overview.totalUsers}
                  prefix={<UserOutlined />}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="إجمالي الردود"
                  value={stats.overview.totalResponses}
                  prefix={<FileTextOutlined />}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="معدل الاستجابة"
                  value={stats.overview.overallCompletionRate}
                  suffix="%"
                />
              </Col>
            </Row>

            <Divider />

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card title="الردود حسب نوع الاستبيان" size="small">
                  {stats.responsesByType.map(item => (
                    <div key={item.surveyType} style={{ marginBottom: 8 }}>
                      <Text>
                        {surveyTypes.find(t => t.value === item.surveyType)?.label}: 
                      </Text>
                      <Text strong style={{ marginRight: 8 }}>
                        {item.count}
                      </Text>
                    </div>
                  ))}
                </Card>
              </Col>
              <Col span={12}>
                <Card title="الردود حسب المنطقة" size="small">
                  {stats.responsesByRegion.map(item => (
                    <div key={item.region} style={{ marginBottom: 8 }}>
                      <Text>{item.region}: </Text>
                      <Text strong style={{ marginRight: 8 }}>
                        {item.count}
                      </Text>
                    </div>
                  ))}
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SurveyResponsesAdmin;