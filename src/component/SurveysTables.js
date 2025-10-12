import React, { useState } from "react";
import "../AppStyles.css";

export default function SurveysTables() {
  // بيانات الاستبيان 1
  const [survey1Data, setSurvey1Data] = useState([]);
  // بيانات الاستبيان 2
  const [survey2Data, setSurvey2Data] = useState([]);

  // إضافة بيانات جديدة من نموذج افتراضي (يمكنك ربطها بالـ Form1 و Form2)
  const addSurvey1Entry = (entry) => setSurvey1Data([...survey1Data, entry]);
  const addSurvey2Entry = (entry) => setSurvey2Data([...survey2Data, entry]);

  // تحميل JSON لجميع البيانات
  const downloadAllJSON = () => {
    const allData = { survey1: survey1Data, survey2: survey2Data };
    const blob = new Blob([JSON.stringify(allData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "all_surveys.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  // للتجربة: أزرار لإضافة بيانات افتراضية
  const addDummyData1 = () => {
    addSurvey1Entry({
      traineeName: "أحمد",
      profession: "تكييف وتبريد",
      trainingCenter: "الحسينية",
      evaluation: "جيد جدا",
      answers: ["نعم","جيد","ممتاز"],
      notes: "ملاحظات الاستبيان 1"
    });
  };
  const addDummyData2 = () => {
    addSurvey2Entry({
      traineeName: "سارة",
      profession: "حداد ألمنيوم",
      trainingCenter: "معهد الجفر",
      evaluation: "ممتاز",
      answers: ["أحياناً","جيد","جيد جدا"],
      notes: "ملاحظات الاستبيان 2"
    });
  };

  return (
    <div className="form-container">
      <h2>بيانات الاستبيان 1</h2>
      <button onClick={addDummyData1} className="red-btn">إضافة بيانات تجريبية 1</button>
      <table>
        <thead>
          <tr>
            <th>اسم المتدرب</th>
            <th>المهنة</th>
            <th>المعهد</th>
            <th>التقييم</th>
            <th>الإجابات</th>
            <th>ملاحظات</th>
          </tr>
        </thead>
        <tbody>
          {survey1Data.map((d,i)=>(
            <tr key={i}>
              <td>{d.traineeName}</td>
              <td>{d.profession}</td>
              <td>{d.trainingCenter}</td>
              <td>{d.evaluation}</td>
              <td>{d.answers.join(", ")}</td>
              <td>{d.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>بيانات الاستبيان 2</h2>
      <button onClick={addDummyData2} className="red-btn">إضافة بيانات تجريبية 2</button>
      <table>
        <thead>
          <tr>
            <th>اسم المتدرب</th>
            <th>المهنة</th>
            <th>المعهد</th>
            <th>التقييم</th>
            <th>الإجابات</th>
            <th>ملاحظات</th>
          </tr>
        </thead>
        <tbody>
          {survey2Data.map((d,i)=>(
            <tr key={i}>
              <td>{d.traineeName}</td>
              <td>{d.profession}</td>
              <td>{d.trainingCenter}</td>
              <td>{d.evaluation}</td>
              <td>{d.answers.join(", ")}</td>
              <td>{d.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={downloadAllJSON} className="red-btn" style={{marginTop:"20px"}}>
        تحميل جميع البيانات JSON
      </button>
    </div>
  );
}
