import apiClient from './config';

class ExportImportService {
  // Export functions
  async exportUsers(format = 'csv') {
    try {
      const response = await apiClient.get(`/api/export-import/export/users?format=${format}`, {
        responseType: 'blob'
      });
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      // Set filename based on format
      const filename = `users_export_${Date.now()}.${format === 'excel' ? 'xlsx' : 'csv'}`;
      link.setAttribute('download', filename);
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(url);
      
      return { success: true, message: 'تم تصدير البيانات بنجاح' };
    } catch (error) {
      console.error('Export users error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'فشل في تصدير البيانات' 
      };
    }
  }

  async exportInstitutes(format = 'csv') {
    try {
      const response = await apiClient.get(`/api/export-import/export/institutes?format=${format}`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      const filename = `institutes_export_${Date.now()}.${format === 'excel' ? 'xlsx' : 'csv'}`;
      link.setAttribute('download', filename);
      
      document.body.appendChild(link);
      link.click();
      
      link.remove();
      window.URL.revokeObjectURL(url);
      
      return { success: true, message: 'تم تصدير المعاهد بنجاح' };
    } catch (error) {
      console.error('Export institutes error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'فشل في تصدير المعاهد' 
      };
    }
  }

  async exportProfessions(format = 'csv') {
    try {
      const response = await apiClient.get(`/api/export-import/export/professions?format=${format}`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      const filename = `professions_export_${Date.now()}.${format === 'excel' ? 'xlsx' : 'csv'}`;
      link.setAttribute('download', filename);
      
      document.body.appendChild(link);
      link.click();
      
      link.remove();
      window.URL.revokeObjectURL(url);
      
      return { success: true, message: 'تم تصدير المهن بنجاح' };
    } catch (error) {
      console.error('Export professions error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'فشل في تصدير المهن' 
      };
    }
  }

  async exportSurveyResponses(format = 'csv') {
    try {
      const response = await apiClient.get(`/api/export-import/export/survey-responses?format=${format}`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      
      const filename = `survey_responses_export_${Date.now()}.${format === 'excel' ? 'xlsx' : 'csv'}`;
      link.setAttribute('download', filename);
      
      document.body.appendChild(link);
      link.click();
      
      link.remove();
      window.URL.revokeObjectURL(url);
      
      return { success: true, message: 'تم تصدير ردود الاستبيان بنجاح' };
    } catch (error) {
      console.error('Export survey responses error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'فشل في تصدير ردود الاستبيان' 
      };
    }
  }

  // Import functions
  async importUsers(file, onProgress) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      if (onProgress) {
        config.onUploadProgress = (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentCompleted);
        };
      }

      const response = await apiClient.post('/api/export-import/import/users', formData, config);
      
      return { 
        success: true, 
        message: 'تم استيراد البيانات بنجاح',
        results: response.data.results
      };
    } catch (error) {
      console.error('Import users error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'فشل في استيراد البيانات',
        error: error.response?.data
      };
    }
  }

  async importInstitutes(file, onProgress) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      if (onProgress) {
        config.onUploadProgress = (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentCompleted);
        };
      }

      const response = await apiClient.post('/api/export-import/import/institutes', formData, config);
      
      return { 
        success: true, 
        message: 'تم استيراد المعاهد بنجاح',
        results: response.data.results
      };
    } catch (error) {
      console.error('Import institutes error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'فشل في استيراد المعاهد',
        error: error.response?.data
      };
    }
  }

  // Utility function to validate file
  validateFile(file) {
    const allowedTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    const allowedExtensions = ['.csv', '.xls', '.xlsx'];
    
    const isValidType = allowedTypes.includes(file.type);
    const isValidExtension = allowedExtensions.some(ext => 
      file.name.toLowerCase().endsWith(ext)
    );

    if (!isValidType && !isValidExtension) {
      return { 
        valid: false, 
        message: 'نوع الملف غير مدعوم. يرجى اختيار ملف CSV أو Excel' 
      };
    }

    // Check file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return { 
        valid: false, 
        message: 'حجم الملف كبير جداً. الحد الأقصى 10 ميجابايت' 
      };
    }

    return { valid: true };
  }

  // Get sample templates for download
  getSampleTemplate(type) {
    const templates = {
      users: {
        headers: ['nationalId', 'firstName', 'lastName', 'phone', 'gender', 'role', 'region', 'area', 'institute', 'profession', 'batch'],
        sample: ['1234567890', 'أحمد', 'محمد', '0791234567', 'M', 'user', 'Central', 'عمان', 'معهد التدريب المهني - عمان', 'مدرب تقني', '1']
      },
      institutes: {
        headers: ['name', 'area', 'region', 'isActive'],
        sample: ['معهد التدريب المهني - عمان', 'عمان', 'Central', 'نعم']
      },
      professions: {
        headers: ['name', 'nameArabic', 'category', 'isActive'],
        sample: ['Technical Trainer', 'مدرب تقني', 'IT', 'نعم']
      }
    };

    const template = templates[type];
    if (!template) return null;

    // Create CSV content
    const csvContent = [
      template.headers.join(','),
      template.sample.join(',')
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${type}_template.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    return { success: true, message: `تم تحميل قالب ${type} بنجاح` };
  }
}

export default new ExportImportService();