import React, { useState } from "react";
import "../AppStyles.css";
export default function Form1() {
const [traineeName, setTraineeName] = useState("");
const [selectedProfession, setSelectedProfession] = useState("");
const [evaluation, setEvaluation] = useState("");
const [notes, setNotes] = useState("");
const questions = [
    { question: "القدرة على اجراء العمليات الحسابية والرياضية معلومات شخصية ", options: ["لا يوجد معرفة او قدرة","ضعيف", "جيد", "جيد جدا","ممتاز"] },
    { question: "الثقافة العامة والمعلومات العامة معلومات شخصية", options:  ["لا يوجد معرفة او قدرة","ضعيف", "جيد", "جيد جدا","ممتاز"] },
    { question: " لدي معرفة باخلاقيات المهنة معلومات شخصية ", options:  ["لا يوجد معرفة او قدرة","ضعيف", "جيد", "جيد جدا","ممتاز"] },
    { question: "استطيع ان اعرف على نفسي للوظيفة بشكل جيد معلومات شخصية", options:  ["لا يوجد معرفة او قدرة","ضعيف", "جيد", "جيد جدا","ممتاز"] },
    { question: " لدي المعرفة باللغة الانجليزية المهارة والمعرفة", options:  ["لا يوجد معرفة او قدرة","ضعيف", "جيد", "جيد جدا","ممتاز"] },
    { question: "لدي المعرفة في استخدام الحاسوب المهارة والمعرفة ", options:  ["لا يوجد معرفة او قدرة","ضعيف", "جيد", "جيد جدا","ممتاز"] },
    { question: "لدي القدرة على العمل بروح الفريق المهارة والمعرفة ", options:  ["لا يوجد معرفة او قدرة","ضعيف", "جيد", "جيد جدا","ممتاز"] },
    { question: "لدي المعرفة بمهارات الاتصال والتواصل الفعال المهارة والمعرفة", options:  ["لا يوجد معرفة او قدرة","ضعيف", "جيد", "جيد جدا","ممتاز"] },
    { question: " لدي القدرة على حل المشكلات وصعوبات العمل المهارة والمعرفة", options:  ["لا يوجد معرفة او قدرة","ضعيف", "جيد", "جيد جدا","ممتاز"] },
    { question: "لدي المعرفة بمعدات وادوات السلامة والصحة المهنية تطبيق اجراءات وتعليمات السلامة والصحة المهنية", options:  ["لا يوجد معرفة او قدرة","ضعيف", "جيد", "جيد جدا","ممتاز"] },
    { question: "  القدرة على تطبيق اجراءات السلامة والصحة المهنية تطبيق اجراءات وتعليمات السلامة والصحة المهنية", options:   ["لا يوجد معرفة او قدرة","ضعيف", "جيد", "جيد جدا","ممتاز"]},
    { question: " لدي المعرفة بوظائف معدات السلامة والصحة المهنية تطبيق اجراءات وتعليمات السلامة والصحة المهنية", options: ["لا يوجد معرفة او قدرة","ضعيف", "جيد", "جيد جدا","ممتاز"]  },
    { question: " لدي معرفة بمخاطر العمل  تطبيق اجراءات وتعليمات السلامة والصحة المهنية ", options:  ["لا يوجد معرفة او قدرة","ضعيف", "جيد", "جيد جدا","ممتاز"] },
    { question: "لدي معرفة سابقة بالمهنة التعرف على المهنة", options:   ["لا يوجد معرفة او قدرة","ضعيف", "جيد", "جيد جدا","ممتاز"]},
    { question: "القدرة على قراءة المخططات والمستندات المتعلقة بالعمل التعرف على المهنة ", options:   ["لا يوجد معرفة او قدرة","ضعيف", "جيد", "جيد جدا","ممتاز"]},
    { question: "لدي معرفة باخد الادوات والعدد الخاصة بالمهنة التعرف على المهنة ", options:  ["لا يوجد معرفة او قدرة","ضعيف", "جيد", "جيد جدا","ممتاز"] },
    { question: "لدي المعرفة باخذالقياسات واجراءالحسابات اللازمة/الكميات التعرف على المهنة", options:   ["لا يوجد معرفة او قدرة","ضعيف", "جيد", "جيد جدا","ممتاز"]},
    { question: "لدي القدرة على حساب تكاليف العمل التعرف على المهنة ", options: ["لا يوجد معرفة او قدرة","ضعيف", "جيد", "جيد جدا","ممتاز"] },
    { question: "تنفيذالعمل التعرف على المهنة", options:  ["لا يوجد معرفة او قدرة","ضعيف", "جيد", "جيد جدا","ممتاز"] },
    { question: "هل هناك احد من العتئلة يعمل في نفس المهنة؟", options: ["نعم", "لا"] },
    ];
    const trainingCenters = [
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
    "العقبه/القويرة",
    "رحاب",
    "الصفاوي",
    "مركز العقبة (HUB)",
    "الرويشد",
    "مشغل قرا بني هاشم"
    
];

const [trainingCenter, setTrainingCenter] = useState("");
const [answers, setAnswers] = useState(Array(questions.length).fill(""));

const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
};

const handleSubmit = (e) => {
    e.preventDefault();
    let answersText = questions
    .map((q, i) => `❓ ${q.question}\n📝 إجابة: ${answers[i] || "لم يتم الاختيار"}`)
    .join("\n\n");

    alert(
    `👤 اسم المتدرب: ${traineeName}\n💼 المهنة: ${selectedProfession}\n📊 التقييم: ${evaluation}\n\n${answersText}\n\n📝 الملاحظات: ${notes}`
    );
};

  // حساب التقدم
const completedCount =
    [traineeName, selectedProfession, evaluation,trainingCenter, ...answers].filter(a => a !== "").length;
const totalCount = 4 + questions.length;

return (
    <div className="form-container">
    <form onSubmit={handleSubmit} className="training-form">

        {/* شريط التقدم */}
        <div className="progress-bar">
        <div
            className="progress"
            style={{ width: `${(completedCount / totalCount) * 100}%` }}
        ></div>
        </div>
            <img src="https://tse4.mm.bing.net/th/id/OIP.HEil-u4k_qmvxrr4fbu2OAAAAA?pid=Api&P=0&h=220" alt="National Employment & training" style={{ width:'700px'}} />

        {/* اسم المتدرب */}
            <div className={`card ${traineeName ? "answered" : ""}`}>
                <h1>استبيان التقييم القبلي للمتدرب في مرحلة التدريب المهني/32</h1>
        <label>
            اسم المتدرب <span className="required">*</span>
        </label>
        <input
            type="text"
            value={traineeName}
            onChange={(e) => setTraineeName(e.target.value)}
            required
            placeholder="اكتب اسمك هنا"
        />
        </div>

        {/* المهنة */}
        <div className={`card ${selectedProfession ? "answered" : ""}`}>
        <h3>
            اسم المهنة <span className="required">*</span>
        </h3>
        {[
            "إدارة تزويد مأمور",
            "التمديدات الصحية",
            "تكييف وتبريد",
            "حداد ألمنيوم",
            "حداد فاصلون",
            "دهان اثاث خشبي",
            "دهان مباني / مجهز ديكورات جبسية",
            "فني آلات صناعية",
            "قصير , مركب قواطع جبس",
            "كهربائي تمديدات منزلي وتحكم",
            "كهربائي سيارات",
            "لحام أنابيب",
            "مركب خلايا طاقة شمسية",
            "نجار أثاث",
            "نجار طوبار , حداد تسليح",
            "خياط نسائي",
                    "حلاق نسائي",
                    "بستنة عامة",
                    "خضراوات محمية",
                    "تسويق الكتروني",
                    "ميكانيك مركبات خفيفة"
        
        ].map((job, index) => (
            <label key={index} className="radio-label">
            <input
                type="radio"
                name="profession"
                value={job}
                checked={selectedProfession === job}
                onChange={(e) => setSelectedProfession(e.target.value)}
                required
            />
            {job}
            </label>
        ))}
        </div>
         {/* المعهد التدريبي */}
        <div className={`card ${trainingCenter ? "answered" : ""}`}>
        <h3>
            اسم المعهد التدريبي <span className="required">*</span>
        </h3>
        {trainingCenters.map((center, index) => (
            <label key={index} className="radio-label">
            <input
                type="radio"
                name="trainingCenter"
                value={center}
                checked={trainingCenter === center}
                onChange={(e) => setTrainingCenter(e.target.value)}
                required
            />
            {center}
            </label>
        ))}
        </div>
        {/* التقييم */}
        <div className={`card ${evaluation ? "answered" : ""}`}>
        <h3>
            تقييم البيئة التدريبية <span className="required">*</span>
        </h3>
        {["ضعيف", "جيد", "جيد جدًا", "ممتاز"].map((rate, index) => (
            <label key={index} className="radio-label">
            <input
                type="radio"
                name="evaluation"
                value={rate}
                checked={evaluation === rate}
                onChange={(e) => setEvaluation(e.target.value)}
                required
            />
            {rate}
            </label>
        ))}
        </div>

        {/* الأسئلة  */}
        {questions.map((q, index) => (
        <div
            key={index}
            className={`card ${answers[index] ? "answered" : ""}`}
        >
            <p>{q.question}</p>
            {q.options.map((opt, i) => (
            <label key={i} className="radio-label">
                <input
                type="radio"
                name={`question-${index}`}
                value={opt}
                checked={answers[index] === opt}
                onChange={() => handleAnswerChange(index, opt)}
                required
                />
                {opt}
            </label>
            ))}
        </div>
        ))}

        {/* الملاحظات */}
        <div className={`card ${notes ? "answered" : ""}`}>
        <label>ماهو السبب الذي دفعك لاختيار المهنة؟</label>
        <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="اكتب ملاحظاتك هنا..."
            rows="1"
        ></textarea>
        </div>

        <button type="submit" className="submit-btn">
        إرسال
        </button>
    </form>
    </div>
);
}