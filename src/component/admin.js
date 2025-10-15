import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

export default function AdminPage() {
  const [form1Submissions, setForm1Submissions] = useState([]);
  const [form2Submissions, setForm2Submissions] = useState([]);
  const [activeForm, setActiveForm] = useState("form1"); // form1 أو form2

  // تحميل البيانات من localStorage عند التحميل
  useEffect(() => {
    const stored1 = JSON.parse(localStorage.getItem("form1Submissions") || "[]");
    setForm1Submissions(stored1);

    const stored2 = JSON.parse(localStorage.getItem("form2Submissions") || "[]");
    setForm2Submissions(stored2);
  }, []);

  const saveToLocalStorage = (key, data) => {
    if (key === "form1") setForm1Submissions(data);
    else setForm2Submissions(data);
    localStorage.setItem(key === "form1" ? "form1Submissions" : "form2Submissions", JSON.stringify(data));
  };

  const handleDelete = (key, index) => {
    if (window.confirm("هل أنت متأكد من حذف هذا السجل؟")) {
      const data = key === "form1" ? form1Submissions : form2Submissions;
      const updated = data.filter((_, i) => i !== index);
      saveToLocalStorage(key, updated);
    }
  };

  const handleDeleteAll = (key) => {
    if (window.confirm("هل تريد حذف جميع السجلات؟")) {
      saveToLocalStorage(key, []);
    }
  };

  const downloadJSON = (key) => {
    const data = key === "form1" ? form1Submissions : form2Submissions;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${key}_data.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadExcel = (key) => {
    const data = key === "form1" ? form1Submissions : form2Submissions;
    const flatData = data.map((s) => ({
      الاسم: s.traineeName || "غير محدد",
      المهنة: s.selectedProfession || "غير محدد",
      المعهد: s.trainingCenter || "غير محدد",
      التقييم: s.evaluation || "غير محدد",
      ...Object.fromEntries(
        (s.answers || []).map((a, i) => [
          `س${i + 1}: ${a?.question || "غير محدد"}`,
          a?.answer || "غير محدد"
        ])
      ),
      التاريخ: s.date || "غير محدد",
    }));

    const ws = XLSX.utils.json_to_sheet(flatData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `${key} Data`);
    XLSX.writeFile(wb, `${key}_data.xlsx`);
  };

  const renderTable = (data, key, title) => (
    <div style={{ marginTop: "20px" }}>
      <h2>📋 بيانات {title}</h2>
      {data.length === 0 ? (
        <p>لا توجد بيانات بعد.</p>
      ) : (
        <>
          <div style={{ marginBottom: "15px" }}>
            <button onClick={() => downloadJSON(key)} style={{ padding: "8px 12px", cursor: "pointer" }}>
              🔽 تحميل JSON
            </button>
            <button
              onClick={() => downloadExcel(key)}
              style={{ marginInlineStart: "10px", padding: "8px 12px", cursor: "pointer" }}
            >
              📊 تحميل Excel
            </button>
            <button
              onClick={() => handleDeleteAll(key)}
              style={{
                marginInlineStart: "10px",
                backgroundColor: "#522524",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              🚮 حذف الكل
            </button>
          </div>

          {data.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                marginBottom: "15px",
                borderRadius: "8px",
                padding: "15px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3>🧾 {item.traineeName || "غير محدد"}</h3>
                <button
                  onClick={() => handleDelete(key, index)}
                  style={{
                    backgroundColor: "#522524",
                    color: "white",
                    border: "none",
                    padding: "5px 8px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  🗑 حذف
                </button>
              </div>

              <p><strong>المهنة:</strong> {item.selectedProfession || "غير محدد"}</p>
              <p><strong>المعهد:</strong> {item.trainingCenter || "غير محدد"}</p>
              <p><strong>التقييم:</strong> {item.evaluation || "غير محدد"}</p>
              <p><strong>التاريخ:</strong> {item.date || "غير محدد"}</p>

              <table
                border="1"
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginTop: "15px",
                  fontSize: "18px",
                }}
              >
                <thead style={{ background: "#f2f2f2" }}>
                  <tr>
                    <th style={{ padding: "12px" }}>السؤال</th>
                    <th style={{ padding: "12px" }}>الإجابة</th>
                  </tr>
                </thead>
                <tbody>
                  {(item.answers || []).map((ans, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? "#fafafa" : "#fff" }}>
                      <td style={{ padding: "12px", verticalAlign: "top" }}>{ans?.question || "غير محدد"}</td>
                      <td style={{ padding: "12px", verticalAlign: "top" }}>{ans?.answer || "غير محدد"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </>
      )}
    </div>
  );

  return (
    <div style={{ direction: "rtl", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setActiveForm("form1")}
          style={{
            padding: "8px 15px",
            marginInlineEnd: "10px",
            cursor: "pointer",
            backgroundColor: activeForm === "form1" ? "#522524" : "#ccc",
            color: activeForm === "form1" ? "#fff" : "#000",
            border: "none",
            borderRadius: "5px",
          }}
        >
          الاستبيان الأول
        </button>
        <button
          onClick={() => setActiveForm("form2")}
          style={{
            padding: "8px 15px",
            cursor: "pointer",
            backgroundColor: activeForm === "form2" ? "#522524" : "#ccc",
            color: activeForm === "form2" ? "#fff" : "#000",
            border: "none",
            borderRadius: "5px",
          }}
        >
          الاستبيان الثاني
        </button>
      </div>

      {activeForm === "form1" && renderTable(form1Submissions, "form1", "الاستبيان الأول")}
      {activeForm === "form2" && renderTable(form2Submissions, "form2", "الاستبيان الثاني")}
    </div>
  );
}