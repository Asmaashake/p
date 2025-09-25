import React, { useState } from "react";
import "../AppStyles.css";
export default function TrainingForm() {
const [traineeName, setTraineeName] = useState("");
const [selectedProfession, setSelectedProfession] = useState("");
const [evaluation, setEvaluation] = useState("");
const [notes, setNotes] = useState("");
const questions = [
    { question: " تتطور مهاراتي في المهنة بشكل مستمر خلال مرحلة التدريب المهني؟ تقييم ذاتي للمتدرب", options: ["نعم", "لا", "أحياناً"] },
    { question: "اقوم بكافة التمارين العملية بنفسي في حصة التدريب العملي؟تقييم ذاتي للمتدرب", options: ["ضعيف", "جيد", "جيد جدا","ممتاز"] },
    { question: " استطيع العمل في مهنتي بعد مرحلة التدريب في سوق العمل؟تقييم ذاتي للمتدرب",  options: ["ضعيف", "جيد", "جيد جدا","ممتاز"]},
    { question: " ارتدي كافة معدات السلامة المهنة التي تخص مهنتي اثناء التدريب العملي؟تقييم ذاتي للمتدرب",  options: ["ضعيف", "جيد", "جيد جدا","ممتاز"]},
    { question: " هل تعرف ماهي الشهادة التي ستمنح لك بعد نجاحك بالبرنامج التدريبي؟تقييم ذاتي للمتدرب",  options: ["ضعيف", "جيد", "جيد جدا","ممتاز"]},
    { question: " المعلومات النظرية واضحة في المنهاج ويسهل الرجوع اليها؟تقييم المنهاج التدريبي",   options: ["ضعيف", "جيد", "جيد جدا","ممتاز"]},
    { question: " التمارين العملية واضحة ويسهل تطبيقها اثناء التدريب العملي؟تقييم المنهاج التدريبي", options: ["ضعيف", "جيد", "جيد جدا", "ممتاز"] },
    { question: " البرنامج التدريبي يؤهل المتدرب للعمل  في سوق العمل؟تقييم المنهاج التدريبي", options: ["ضعيف", "جيد", "جيد جدا","ممتاز"] },
    { question: " البرنامج التدريبي ينمي العمل بروح الفريق؟تقييم المنهاج التدريبي",  options: ["ضعيف", "جيد", "جيد جدا","ممتاز"]},
    { question: " البرنامج التدريبي يدرب على مهن ملائمة بما هو مطلوب في سوق العمل ؟تقييم المنهاج التدريبي",  options: ["ضعيف", "جيد", "جيد جدا","ممتاز"]},
    { question: "المدرب متمكن من المهنة التي يدرب عليها؟تقييم المدرب",  options: ["ضعيف", "جيد", "جيد جدا","ممتاز"]},
    { question: "يتجاوب المدرب مع المتدربين ويجيب على أسئلتهم؟تقييم المدرب",   options: ["ضعيف", "جيد", "جيد جدا","ممتاز"]},
    { question: "يتم اعداد بطاقة التمرين العملي لكل تمرين من قبل المدرب؟تقييم المدرب", options: ["ضعيف", "جيد", "جيد جدا", "ممتاز"] },
    { question: "يتعامل المدرب باحترام مع جميع المتدربين؟تقييم المدرب",   options: ["ضعيف", "جيد", "جيد جدا","ممتاز"]},
    { question: "يتوفر في القاعات ادوات التدريب اللازمة للتطبيق العملي بالماده المشروحة؟تقييم البيئة التدريبية", options: ["ضعيف", "جيد", "جيد جدا", "ممتاز"] },
    { question: "يتوفر في القاعات ادوات التدريب اللازمة لشرح المادة النظرية؟تقييم البيئة التدريبية",   options: ["ضعيف", "جيد", "جيد جدا","ممتاز"]},
    { question: "حجم القاعات الصفية يتناسب مع عدد المتدربين؟تقييم البيئة التدريبية", options: ["ضعيف", "جيد", "جيد جدا", "ممتاز"] },
    { question: "يتم تقييد بارتداء معدات السلامة المهنية التي تخص مهنتك أثناء التدريب العملي؟تقييم البيئة التدريبية",   options: ["ضعيف", "جيد", "جيد جدا","ممتاز"]},
    { question: "؟",  options: ["ضعيف", "جيد", "جيد جدا","ممتاز"] }, 
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

        {/* اسم المتدرب */}
        <div className={`card ${traineeName ? "answered" : ""}`}>
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

        {/* الأسئلة السبعة */}
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
        <label>ملاحظاتك واقتراحاتك</label>
        <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="اكتب ملاحظاتك هنا..."
            rows="4"
        ></textarea>
        </div>

        <button type="submit" className="submit-btn">
        إرسال
        </button>
    </form>
    </div>
);
}

